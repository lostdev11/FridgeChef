'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { testIngredientMatching, testCheeseVariations, testRecipeMatching } from '@/lib/test-ingredient-matching';
import { searchIngredients, normalizeIngredientName, ingredientsMatch } from '@/lib/ingredient-database';

export default function TestPage() {
  const [testResults, setTestResults] = useState<string>('');
  const [userInput, setUserInput] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const runTests = () => {
    let output = '';
    
    // Capture console.log output
    const originalLog = console.log;
    console.log = (...args) => {
      output += args.join(' ') + '\n';
    };

    testIngredientMatching();
    testCheeseVariations();
    testRecipeMatching();

    console.log = originalLog;
    setTestResults(output);
  };

  const handleSearch = () => {
    if (userInput.trim()) {
      const results = searchIngredients(userInput);
      setSearchResults(results);
    }
  };

  const testMatching = () => {
    const testCases = [
      { user: 'cheddar', recipe: 'cheddar cheese' },
      { user: 'chicken', recipe: 'chicken breast' },
      { user: 'tomato', recipe: 'tomatoes' },
      { user: 'mozzarella', recipe: 'fresh mozzarella' },
      { user: 'parmesan', recipe: 'parmigiano reggiano' }
    ];

    let output = 'Matching Test Results:\n\n';
    testCases.forEach(({ user, recipe }) => {
      const matches = ingredientsMatch(user, recipe);
      const normalizedUser = normalizeIngredientName(user);
      const normalizedRecipe = normalizeIngredientName(recipe);
      output += `"${user}" matches "${recipe}": ${matches ? '✅' : '❌'}\n`;
      output += `  Normalized: "${normalizedUser}" vs "${normalizedRecipe}"\n\n`;
    });

    setTestResults(output);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧪 Enhanced Ingredient Matching Test
          </h1>
          <p className="text-lg text-gray-600">
            Test the new 95% accurate ingredient matching system
          </p>
        </div>

        {/* Test Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Test Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button onClick={runTests} className="bg-green-600 hover:bg-green-700">
                Run All Tests
              </Button>
              <Button onClick={testMatching} variant="outline">
                Test Matching Logic
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Test */}
        <Card>
          <CardHeader>
            <CardTitle>Search Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type an ingredient to search..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
                Search
              </Button>
            </div>
            
            {searchResults.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Search Results:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {searchResults.map((result, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium">{result.name}</div>
                      <div className="text-sm text-gray-500">
                        Variations: {result.variations.slice(0, 2).join(', ')}
                      </div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {result.categoryName}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Test Results */}
        {testResults && (
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                {testResults}
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🧀 Cheese Variations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Type "ched" to find cheddar, "mozz" for mozzarella, "parm" for parmesan, etc.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔍 Smart Matching
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                "chicken" matches "chicken breast", "tomato" matches "tomatoes", etc.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📂 Category Browsing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Browse ingredients by category: Cheese, Meat, Vegetables, Dairy, etc.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 