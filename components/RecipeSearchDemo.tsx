import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Search, Globe, Zap } from 'lucide-react';

export const SPOONACULAR_CREDIT = 'Powered by Spoonacular API';

export default function RecipeSearchDemo() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8">
      {/* Removed heading and credit from here */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <ChefHat className="h-4 w-4 text-green-600" />
              <span className="font-medium text-sm">Smart Matching</span>
            </div>
            <p className="text-xs text-gray-600">
              Find recipes that use your available ingredients with intelligent matching algorithms
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Search className="h-4 w-4 text-green-600" />
              <span className="font-medium text-sm">Global Database</span>
            </div>
            <p className="text-xs text-gray-600">
              Access thousands of recipes from around the world with detailed nutrition information
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-green-600" />
              <span className="font-medium text-sm">Fallback Data</span>
            </div>
            <p className="text-xs text-gray-600">
              Works offline with curated fallback recipes when API is unavailable
            </p>
          </div>
        </div>

        {isExpanded && (
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-gray-900 mb-2">How it works:</h4>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>1. Enter your available ingredients in the input field above</li>
              <li>2. Click "Find Recipes" to search the global recipe database</li>
              <li>3. View recipes with match percentages and missing ingredients</li>
              <li>4. Get detailed nutrition information and cooking instructions</li>
            </ol>
            <div className="mt-3 p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-green-800">
                <strong>✅ API Configured:</strong> Your Spoonacular API key is set up and ready to fetch real-time recipes!
              </p>
            </div>
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full border-green-200 text-green-700 hover:bg-green-50"
        >
          {isExpanded ? 'Show Less' : 'Learn More'}
        </Button>
      </div>
    </div>
  );
} 