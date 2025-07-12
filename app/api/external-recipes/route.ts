import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface ExternalRecipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: Array<{
    id: number;
    amount: number;
    unit: string;
    name: string;
  }>;
  usedIngredients: Array<{
    id: number;
    amount: number;
    unit: string;
    name: string;
  }>;
  unusedIngredients: Array<{
    id: number;
    amount: number;
    unit: string;
    name: string;
  }>;
  likes: number;
}

interface RecipeInfo {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  instructions: string;
  analyzedInstructions: Array<{
    name: string;
    steps: Array<{
      number: number;
      step: string;
      ingredients: Array<{
        id: number;
        name: string;
        localizedName: string;
        image: string;
      }>;
    }>;
  }>;
  nutrition: {
    nutrients: Array<{
      name: string;
      amount: number;
      unit: string;
    }>;
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ingredients = searchParams.get('ingredients');
  const number = searchParams.get('number') || '10';
  const ranking = searchParams.get('ranking') || '2'; // 1 = maximize used ingredients, 2 = minimize missing ingredients

  if (!ingredients) {
    return NextResponse.json({ error: 'Ingredients parameter is required' }, { status: 400 });
  }

  try {
    // Use Spoonacular API to find recipes by ingredients
    const apiKey = process.env.SPOONACULAR_API_KEY;
    
    if (!apiKey) {
      // Fallback to a mock response if no API key is available
      return NextResponse.json({
        recipes: [
          {
            id: 1,
            title: "Chicken and Rice Bowl",
            image: "https://spoonacular.com/recipeImages/1-556x370.jpg",
            usedIngredientCount: 3,
            missedIngredientCount: 2,
            missedIngredients: [
              { id: 1, amount: 1, unit: "tbsp", name: "olive oil" },
              { id: 2, amount: 2, unit: "cloves", name: "garlic" }
            ],
            usedIngredients: [
              { id: 3, amount: 1, unit: "cup", name: "chicken" },
              { id: 4, amount: 1, unit: "cup", name: "rice" },
              { id: 5, amount: 1, unit: "piece", name: "onion" }
            ],
            likes: 150
          },
          {
            id: 2,
            title: "Tomato and Cheese Pasta",
            image: "https://spoonacular.com/recipeImages/2-556x370.jpg",
            usedIngredientCount: 2,
            missedIngredientCount: 3,
            missedIngredients: [
              { id: 6, amount: 8, unit: "oz", name: "pasta" },
              { id: 7, amount: 1, unit: "tbsp", name: "olive oil" },
              { id: 8, amount: 2, unit: "cloves", name: "garlic" }
            ],
            usedIngredients: [
              { id: 9, amount: 2, unit: "pieces", name: "tomato" },
              { id: 10, amount: 1, unit: "cup", name: "cheese" }
            ],
            likes: 120
          }
        ],
        totalResults: 2
      });
    }

    // Search for recipes by ingredients
    const searchResponse = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients`,
      {
        params: {
          apiKey,
          ingredients: ingredients,
          number: parseInt(number),
          ranking: parseInt(ranking),
          ignorePantry: true
        }
      }
    );

    const recipes: ExternalRecipe[] = searchResponse.data;

    // Get detailed information for each recipe
    const detailedRecipes = await Promise.all(
      recipes.map(async (recipe) => {
        try {
          const detailResponse = await axios.get(
            `https://api.spoonacular.com/recipes/${recipe.id}/information`,
            {
              params: { apiKey }
            }
          );
          
          const recipeInfo: RecipeInfo = detailResponse.data;
          
          return {
            ...recipe,
            servings: recipeInfo.servings,
            readyInMinutes: recipeInfo.readyInMinutes,
            instructions: recipeInfo.instructions,
            nutrition: recipeInfo.nutrition
          };
        } catch (error) {
          console.error(`Error fetching details for recipe ${recipe.id}:`, error);
          return recipe;
        }
      })
    );

    return NextResponse.json({
      recipes: detailedRecipes,
      totalResults: detailedRecipes.length
    });

  } catch (error) {
    console.error('Error fetching external recipes:', error);
    
    // Return a fallback response
    return NextResponse.json({
      recipes: [
        {
          id: 1,
          title: "Quick Chicken Stir Fry",
          image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=556&h=370&fit=crop",
          usedIngredientCount: 2,
          missedIngredientCount: 3,
          missedIngredients: [
            { id: 1, amount: 1, unit: "tbsp", name: "soy sauce" },
            { id: 2, amount: 1, unit: "tbsp", name: "oil" },
            { id: 3, amount: 1, unit: "piece", name: "ginger" }
          ],
          usedIngredients: [
            { id: 4, amount: 1, unit: "piece", name: "chicken" },
            { id: 5, amount: 1, unit: "piece", name: "onion" }
          ],
          servings: 2,
          readyInMinutes: 20,
          likes: 85
        },
        {
          id: 2,
          title: "Simple Rice and Beans",
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=556&h=370&fit=crop",
          usedIngredientCount: 2,
          missedIngredientCount: 2,
          missedIngredients: [
            { id: 6, amount: 1, unit: "tbsp", name: "oil" },
            { id: 7, amount: 1, unit: "piece", name: "garlic" }
          ],
          usedIngredients: [
            { id: 8, amount: 1, unit: "cup", name: "rice" },
            { id: 9, amount: 1, unit: "can", name: "beans" }
          ],
          servings: 4,
          readyInMinutes: 30,
          likes: 95
        }
      ],
      totalResults: 2,
      error: "Using fallback data due to API error"
    });
  }
} 