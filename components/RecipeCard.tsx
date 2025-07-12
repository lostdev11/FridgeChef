import Image from 'next/image';

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
  cookTime?: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  userIngredients: string[];
  matchType: 'full' | 'partial';
  missingIngredients?: string[];
}

const getCultureEmoji = (culture: string): string => {
  const emojiMap: { [key: string]: string } = {
    'Haitian': '🇭🇹',
    'Venezuelan': '🇻🇪',
    'Argentinian': '🇦🇷',
    'Hispanic': '🇪🇸',
    'International': '🌍'
  };
  return emojiMap[culture] || '🍽️';
};

export default function RecipeCard({ recipe, userIngredients, matchType, missingIngredients = [] }: RecipeCardProps) {
  const cultureEmoji = getCultureEmoji(recipe.culture);
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Recipe Image */}
      {recipe.image && (
        <div className="h-48 overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.name}
            width={400}
            height={192}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Recipe Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{cultureEmoji}</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {recipe.culture}
              </span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                matchType === 'full' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {matchType === 'full' ? '✅ Full Match' : '🔧 Partial Match'}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{recipe.name}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Serves {recipe.servings} people</span>
              {recipe.cookTime && (
                <span>⏱️ {recipe.cookTime}</span>
              )}
            </div>
          </div>
        </div>

        {/* Calories */}
        {recipe.calories && (
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-700">
              {recipe.calories} calories per serving
            </span>
          </div>
        )}

        {/* Ingredients */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Ingredients:</h4>
          <div className="space-y-1">
            {recipe.ingredients.map((ingredient, index) => {
              const isAvailable = userIngredients.some(userIngredient => 
                ingredient.toLowerCase().includes(userIngredient.toLowerCase()) ||
                userIngredient.toLowerCase().includes(ingredient.toLowerCase())
              );
              
              return (
                <div key={index} className="flex items-center gap-2">
                  <span className={`text-sm ${
                    isAvailable ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {isAvailable ? '✅' : '❌'} {ingredient}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Missing Ingredients for Partial Matches */}
        {matchType === 'partial' && missingIngredients.length > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="text-sm font-semibold text-yellow-800 mb-2">Missing Ingredients:</h4>
            <div className="flex flex-wrap gap-1">
              {missingIngredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quick Instructions Preview */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Quick Steps:</h4>
          <div className="space-y-1">
            {recipe.instructions.slice(0, 3).map((instruction, index) => (
              <p key={index} className="text-sm text-gray-600">
                {index + 1}. {instruction}
              </p>
            ))}
            {recipe.instructions.length > 3 && (
              <p className="text-sm text-gray-500 italic">
                ... and {recipe.instructions.length - 3} more steps
              </p>
            )}
          </div>
        </div>

        {/* Notes */}
        {recipe.notes && recipe.notes.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Tips:</h4>
            <ul className="space-y-1">
              {recipe.notes.slice(0, 2).map((note, index) => (
                <li key={index} className="text-sm text-gray-600">
                  • {note}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Source Link */}
        {recipe.source && (
          <div className="pt-4 border-t border-gray-200">
            <a
              href={recipe.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-600 hover:text-green-800 font-medium"
            >
              View Recipe →
            </a>
          </div>
        )}
      </div>
    </div>
  );
} 