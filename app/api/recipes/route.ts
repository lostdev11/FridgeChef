import { NextRequest, NextResponse } from 'next/server';
import recipesData from '../../../data/recipes.json';
import { ingredientsMatch, normalizeIngredientName } from '../../../lib/ingredient-database';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

interface Recipe {
  name: string;
  culture: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  notes?: string[];
  calories?: number;
  nutrition?: Record<string, string | number>;
  image?: string | null;
  source?: string;
}

interface MatchResult {
  recipe: Recipe;
  matchType: 'full' | 'partial';
  missingIngredients: string[];
  matchPercentage: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ingredients = searchParams.get('ingredients');
  const culture = searchParams.get('culture');

  if (!ingredients) {
    return NextResponse.json({ error: 'Ingredients parameter is required' }, { status: 400 });
  }

  const userIngredients = ingredients.split(',').map(ing => normalizeIngredientName(ing.trim()));
  const recipes = recipesData as Recipe[];

  // Filter by culture if specified
  let filteredRecipes = recipes;
  if (culture && culture !== 'all') {
    filteredRecipes = recipes.filter(recipe => 
      recipe.culture.toLowerCase() === culture.toLowerCase()
    );
  }

  const matches: MatchResult[] = [];

  filteredRecipes.forEach(recipe => {
    const recipeIngredients = recipe.ingredients;
    const missingIngredients: string[] = [];
    let matchedIngredients = 0;

    // Check each recipe ingredient against user ingredients using enhanced matching
    recipeIngredients.forEach(recipeIngredient => {
      const hasMatch = userIngredients.some(userIngredient => 
        ingredientsMatch(userIngredient, recipeIngredient)
      );

      if (hasMatch) {
        matchedIngredients++;
      } else {
        // Extract the main ingredient name (before any measurements)
        const mainIngredient = recipeIngredient.split(' ').slice(1).join(' ') || recipeIngredient;
        const normalizedMainIngredient = normalizeIngredientName(mainIngredient);
        if (!missingIngredients.includes(normalizedMainIngredient)) {
          missingIngredients.push(normalizedMainIngredient);
        }
      }
    });

    const matchPercentage = (matchedIngredients / recipeIngredients.length) * 100;

    // Only include recipes with at least 30% ingredient match
    if (matchPercentage >= 30) {
      const matchType: 'full' | 'partial' = matchPercentage >= 80 ? 'full' : 'partial';
      
      matches.push({
        recipe,
        matchType,
        missingIngredients,
        matchPercentage
      });
    }
  });

  // Sort by match percentage (highest first), then by match type (full before partial)
  matches.sort((a, b) => {
    if (a.matchType === 'full' && b.matchType === 'partial') return -1;
    if (a.matchType === 'partial' && b.matchType === 'full') return 1;
    return b.matchPercentage - a.matchPercentage;
  });

  // Get unique cultures for filter dropdown
  const cultures = [...new Set(recipes.map(recipe => recipe.culture))].sort();

  return NextResponse.json({
    matches,
    cultures,
    totalMatches: matches.length,
    fullMatches: matches.filter(m => m.matchType === 'full').length,
    partialMatches: matches.filter(m => m.matchType === 'partial').length
  });
} 