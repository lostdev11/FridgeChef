import Image from 'next/image';
import { Clock, Users, Heart, CheckCircle, XCircle } from 'lucide-react';

interface ExternalRecipe {
  id: number;
  title: string;
  image: string;
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
  likes: number;
  servings?: number;
  readyInMinutes?: number;
  instructions?: string;
  nutrition?: {
    nutrients: Array<{
      name: string;
      amount: number;
      unit: string;
    }>;
  };
}

interface ExternalRecipeCardProps {
  recipe: ExternalRecipe;
  userIngredients: string[];
}

export default function ExternalRecipeCard({ recipe, userIngredients }: ExternalRecipeCardProps) {
  const matchPercentage = (recipe.usedIngredientCount / (recipe.usedIngredientCount + recipe.missedIngredientCount)) * 100;
  const matchType = matchPercentage >= 80 ? 'full' : 'partial';

  // Find calories from nutrition data
  const calories = recipe.nutrition?.nutrients.find(nutrient => 
    nutrient.name.toLowerCase() === 'calories'
  );

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Recipe Image */}
      <div className="h-48 overflow-hidden relative">
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={400}
          height={192}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
          <Heart className="h-3 w-3 text-red-500 fill-current" />
          <span className="text-xs font-medium">{recipe.likes}</span>
        </div>
      </div>
      
      {/* Recipe Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                matchType === 'full' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {matchType === 'full' ? '✅ Full Match' : '🔧 Partial Match'}
              </span>
              <span className="text-xs text-gray-500">
                {Math.round(matchPercentage)}% match
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{recipe.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              {recipe.servings && (
                <span className="flex items-center">
                  <Users className="mr-1 h-3 w-3" />
                  Serves {recipe.servings}
                </span>
              )}
              {recipe.readyInMinutes && (
                <span className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {recipe.readyInMinutes} min
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Calories */}
        {calories && (
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-700">
              {Math.round(calories.amount)} calories per serving
            </span>
          </div>
        )}

        {/* Used Ingredients */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
            <CheckCircle className="mr-1 h-3 w-3 text-green-600" />
            Used Ingredients ({recipe.usedIngredientCount}):
          </h4>
          <div className="space-y-1">
            {recipe.usedIngredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-sm text-green-600">
                  ✅ {ingredient.amount} {ingredient.unit} {ingredient.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Ingredients for Partial Matches */}
        {recipe.missedIngredientCount > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="text-sm font-semibold text-yellow-800 mb-2 flex items-center">
              <XCircle className="mr-1 h-3 w-3 text-yellow-600" />
              Missing Ingredients ({recipe.missedIngredientCount}):
            </h4>
            <div className="space-y-1">
              {recipe.missedIngredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-sm text-yellow-700">
                    ❌ {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Instructions Preview */}
        {recipe.instructions && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Instructions:</h4>
            <p className="text-sm text-gray-600 line-clamp-3">
              {recipe.instructions.length > 200 
                ? `${recipe.instructions.substring(0, 200)}...` 
                : recipe.instructions
              }
            </p>
          </div>
        )}

        {/* Action Button */}
        <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
          View Full Recipe
        </button>
      </div>
    </div>
  );
} 