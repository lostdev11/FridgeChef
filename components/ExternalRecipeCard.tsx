import Image from 'next/image';
import { useState } from 'react';
import { Clock, Users, Heart, CheckCircle, XCircle, ChevronDown, ChevronUp, X } from 'lucide-react';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const matchPercentage = (recipe.usedIngredientCount / (recipe.usedIngredientCount + recipe.missedIngredientCount)) * 100;
  const matchType = matchPercentage >= 80 ? 'full' : 'partial';

  // Find calories from nutrition data
  const calories = recipe.nutrition?.nutrients.find(nutrient => 
    nutrient.name.toLowerCase() === 'calories'
  );

  // Parse instructions into steps if they contain numbered steps
  const parseInstructions = (instructions: string) => {
    if (!instructions) return [];
    
    // Split by common step patterns
    const steps = instructions
      .split(/(?:\d+\.|\d+\)|\n\d+\.|\n\d+\))/)
      .filter(step => step.trim().length > 0)
      .map(step => step.trim());
    
    return steps.length > 1 ? steps : [instructions];
  };

  const instructionSteps = parseInstructions(recipe.instructions || '');

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
            <div className="space-y-2">
              {!isExpanded ? (
                <p className="text-sm text-gray-600">
                  {recipe.instructions.length > 200 
                    ? `${recipe.instructions.substring(0, 200)}...` 
                    : recipe.instructions
                  }
                </p>
              ) : (
                <div className="space-y-3">
                  {instructionSteps.map((step, index) => (
                    <div key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                      <p className="text-sm text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {recipe.instructions.length > 200 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center gap-1"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Show More
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <button 
            onClick={() => setShowModal(true)}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            View Full Recipe
          </button>
          
          {/* Pro Save Recipe Button */}
          <button 
            onClick={() => {
              // This would be connected to a pro user's saved recipes
              alert('Save recipe feature coming soon with FridgeChef Pro!');
            }}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Save Recipe (Pro)
          </button>
        </div>
      </div>

      {/* Full Recipe Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{recipe.title}</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Recipe Stats */}
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                {recipe.servings && (
                  <span className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    Serves {recipe.servings}
                  </span>
                )}
                {recipe.readyInMinutes && (
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {recipe.readyInMinutes} minutes
                  </span>
                )}
                <span className="flex items-center">
                  <Heart className="mr-1 h-4 w-4 text-red-500" />
                  {recipe.likes} likes
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Recipe Image */}
              <div className="aspect-video overflow-hidden rounded-lg">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Match Info */}
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  matchType === 'full' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {matchType === 'full' ? '✅ Full Match' : '🔧 Partial Match'}
                </span>
                <span className="text-sm text-gray-600">
                  {Math.round(matchPercentage)}% ingredient match
                </span>
              </div>

              {/* Nutrition Info */}
              {calories && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Nutrition (per serving)</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Calories</span>
                      <p className="font-medium">{Math.round(calories.amount)} kcal</p>
                    </div>
                    {recipe.nutrition?.nutrients.map((nutrient, index) => {
                      if (nutrient.name.toLowerCase() !== 'calories' && index < 5) {
                        return (
                          <div key={index}>
                            <span className="text-sm text-gray-600 capitalize">
                              {nutrient.name.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </span>
                            <p className="font-medium">{Math.round(nutrient.amount)}{nutrient.unit}</p>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}

              {/* Ingredients */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
                
                {/* Used Ingredients */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    You have ({recipe.usedIngredientCount}):
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {recipe.usedIngredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-2 bg-green-50 p-2 rounded">
                        <span className="text-green-600">✅</span>
                        <span className="text-sm">
                          {ingredient.amount} {ingredient.unit} {ingredient.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Missing Ingredients */}
                {recipe.missedIngredientCount > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-yellow-700 mb-2 flex items-center">
                      <XCircle className="mr-2 h-4 w-4" />
                      You need ({recipe.missedIngredientCount}):
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {recipe.missedIngredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center gap-2 bg-yellow-50 p-2 rounded">
                          <span className="text-yellow-600">❌</span>
                          <span className="text-sm">
                            {ingredient.amount} {ingredient.unit} {ingredient.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Instructions */}
              {recipe.instructions && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h3>
                  <div className="space-y-4">
                    {instructionSteps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <p className="text-gray-700 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-lg">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Here you could add functionality to save recipe, share, etc.
                    alert('Save recipe feature coming soon with FridgeChef Pro! Upgrade to save unlimited recipes and access them anytime.');
                  }}
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Save Recipe (Pro)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 