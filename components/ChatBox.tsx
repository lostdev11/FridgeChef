'use client';

import { useState } from 'react';
import IngredientButton from './IngredientButton';

interface ChatBoxProps {
  onIngredientsChange: (ingredients: string[]) => void;
}

const commonIngredients = [
  'chicken', 'beef', 'pork', 'fish', 'shrimp',
  'eggs', 'milk', 'cheese', 'butter', 'yogurt',
  'onion', 'garlic', 'tomato', 'bell pepper', 'avocado',
  'rice', 'pasta', 'bread', 'potato', 'carrot',
  'spinach', 'lettuce', 'cucumber', 'lemon', 'lime'
];

export default function ChatBox({ onIngredientsChange }: ChatBoxProps) {
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleAddIngredient = (ingredient: string) => {
    const trimmedIngredient = ingredient.trim().toLowerCase();
    if (trimmedIngredient && !ingredients.includes(trimmedIngredient)) {
      const newIngredients = [...ingredients, trimmedIngredient];
      setIngredients(newIngredients);
      onIngredientsChange(newIngredients);
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    const newIngredients = ingredients.filter(ingredient => ingredient !== ingredientToRemove);
    setIngredients(newIngredients);
    onIngredientsChange(newIngredients);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Split by commas, newlines, or spaces and add each ingredient
      const newIngredients = inputValue
        .split(/[,\n\s]+/)
        .map(ing => ing.trim().toLowerCase())
        .filter(ing => ing && !ingredients.includes(ing));
      
      if (newIngredients.length > 0) {
        const updatedIngredients = [...ingredients, ...newIngredients];
        setIngredients(updatedIngredients);
        onIngredientsChange(updatedIngredients);
        setInputValue('');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Chat-style input */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">🧀</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">What&apos;s in your fridge?</h3>
            <p className="text-sm text-gray-600">Type ingredients or use quick-select buttons below</p>
          </div>
        </div>

        {/* Current ingredients */}
        {ingredients.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                >
                  {ingredient}
                  <button
                    onClick={() => handleRemoveIngredient(ingredient)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Input form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type ingredients separated by commas, spaces, or new lines...&#10;Example: chicken, cheese, onion&#10;or:&#10;chicken&#10;cheese&#10;onion"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
              Press Ctrl+Enter to submit
            </p>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Find Recipes
            </button>
          </div>
        </form>
      </div>

      {/* Quick-select buttons */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-md font-semibold text-gray-800 mb-4">Quick Select Common Ingredients</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {commonIngredients.map((ingredient) => (
            <IngredientButton
              key={ingredient}
              ingredient={ingredient}
              onClick={() => handleAddIngredient(ingredient)}
              disabled={ingredients.includes(ingredient)}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 