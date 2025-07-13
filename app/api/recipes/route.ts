import { NextRequest, NextResponse } from 'next/server';
import recipesData from '../../../data/recipes.json';

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

  const userIngredients = ingredients.split(',').map(ing => ing.trim().toLowerCase());
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
    const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
    const missingIngredients: string[] = [];
    let matchedIngredients = 0;

    // Check each recipe ingredient against user ingredients
    recipeIngredients.forEach(recipeIngredient => {
      const hasMatch = userIngredients.some(userIngredient => {
        // Check if user ingredient is contained in recipe ingredient or vice versa
        return recipeIngredient.includes(userIngredient) || 
               userIngredient.includes(recipeIngredient) ||
               // Handle common variations
               recipeIngredient.includes(userIngredient.replace('s', '')) ||
               userIngredient.includes(recipeIngredient.replace('s', ''));
      });

      if (hasMatch) {
        matchedIngredients++;
      } else {
        // Extract the main ingredient name (before any measurements)
        const mainIngredient = recipeIngredient.split(' ').slice(1).join(' ') || recipeIngredient;
        if (!missingIngredients.includes(mainIngredient)) {
          missingIngredients.push(mainIngredient);
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