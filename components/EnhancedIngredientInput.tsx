'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X, ChevronDown, Send } from 'lucide-react';
import { 
  ingredientDatabase, 
  searchIngredients, 
  getIngredientsByCategory,
  normalizeIngredientName,
  type IngredientItem 
} from '@/lib/ingredient-database';

interface EnhancedIngredientInputProps {
  onIngredientsChange: (ingredients: string[]) => void;
  selectedIngredients: string[];
}

export default function EnhancedIngredientInput({ 
  onIngredientsChange, 
  selectedIngredients 
}: EnhancedIngredientInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<IngredientItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Handle input changes and show suggestions
  const handleInputChange = (value: string) => {
    setInputValue(value);
    
    if (value.trim().length > 0) {
      const results = searchIngredients(value);
      setSuggestions(results.slice(0, 8)); // Limit to 8 suggestions
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle ingredient selection from suggestions
  const handleSuggestionClick = (ingredient: IngredientItem) => {
    const normalizedName = normalizeIngredientName(ingredient.name);
    
    if (!selectedIngredients.includes(normalizedName)) {
      const newIngredients = [...selectedIngredients, normalizedName];
      onIngredientsChange(newIngredients);
    }
    
    setInputValue('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Handle category selection
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setShowCategoryDropdown(false);
    
    if (categoryName) {
      const categoryIngredients = getIngredientsByCategory(categoryName);
      setSuggestions(categoryIngredients.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle manual ingredient addition
  const handleAddIngredient = () => {
    if (inputValue.trim()) {
      const normalizedName = normalizeIngredientName(inputValue.trim());
      
      if (!selectedIngredients.includes(normalizedName)) {
        const newIngredients = [...selectedIngredients, normalizedName];
        onIngredientsChange(newIngredients);
      }
      
      setInputValue('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle ingredient removal
  const handleRemoveIngredient = (ingredientToRemove: string) => {
    const newIngredients = selectedIngredients.filter(ingredient => ingredient !== ingredientToRemove);
    onIngredientsChange(newIngredients);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddIngredient();
  };

  // Handle keyboard navigation
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (suggestions.length > 0) {
        handleSuggestionClick(suggestions[0]);
      } else {
        handleAddIngredient();
      }
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Input Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">🧀</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">What&apos;s in your fridge?</h3>
            <p className="text-sm text-gray-600">Type ingredients or browse categories for suggestions</p>
          </div>
        </div>

        {/* Selected Ingredients */}
        {selectedIngredients.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Selected ingredients:</p>
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                  onClick={() => handleRemoveIngredient(ingredient)}
                >
                  {ingredient} <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type an ingredient (e.g., 'cheddar' or 'chicken')..."
                className="pr-10 rounded-lg border-2 border-green-200 focus:border-green-500"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => {
                    setInputValue('');
                    setSuggestions([]);
                    setShowSuggestions(false);
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              type="submit"
              size="icon"
              className="rounded-lg bg-green-600 hover:bg-green-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {suggestions.map((ingredient, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(ingredient)}
                  className="w-full px-4 py-3 text-left hover:bg-green-50 border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{ingredient.name}</div>
                      <div className="text-sm text-gray-500">
                        {ingredient.variations.slice(0, 2).join(', ')}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {ingredient.categoryName}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          )}
        </form>
      </div>

      {/* Category Browser */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-md font-semibold text-gray-800 mb-4">Browse by Category</h4>
        
        {/* Category Selector */}
        <div className="mb-4">
          <Select value={selectedCategory} onValueChange={handleCategorySelect}>
            <SelectTrigger className="w-full border-green-200 focus:border-green-500">
              <SelectValue placeholder="Select a category to browse ingredients..." />
            </SelectTrigger>
            <SelectContent>
              {ingredientDatabase.map((category) => (
                <SelectItem key={category.name} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Ingredients Grid */}
        {selectedCategory && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {getIngredientsByCategory(selectedCategory).map((ingredient) => {
              const isSelected = selectedIngredients.includes(normalizeIngredientName(ingredient.name));
              return (
                <button
                  key={ingredient.name}
                  onClick={() => handleSuggestionClick(ingredient)}
                  disabled={isSelected}
                  className={`
                    px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-left
                    ${isSelected 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-green-50 text-green-700 hover:bg-green-100 hover:scale-105 active:scale-95 border border-green-200 hover:border-green-300'
                    }
                  `}
                >
                  <div className="font-medium">{ingredient.name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {ingredient.variations[0]}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Quick Add Popular Ingredients */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h5 className="text-sm font-medium text-gray-700 mb-3">Quick Add Popular Ingredients</h5>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {['chicken breast', 'eggs', 'milk', 'cheddar cheese', 'onion', 'garlic'].map((ingredient) => {
              const isSelected = selectedIngredients.includes(ingredient);
              return (
                <button
                  key={ingredient}
                  onClick={() => {
                    if (!isSelected) {
                      const newIngredients = [...selectedIngredients, ingredient];
                      onIngredientsChange(newIngredients);
                    }
                  }}
                  disabled={isSelected}
                  className={`
                    px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    ${isSelected 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100 hover:scale-105 active:scale-95 border border-blue-200 hover:border-blue-300'
                    }
                  `}
                >
                  {ingredient}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 Tips for Better Matching</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Type partial names (e.g., "ched" for cheddar cheese)</li>
          <li>• Use common names (e.g., "tomato" instead of "roma tomato")</li>
          <li>• Browse categories to find specific ingredients</li>
          <li>• Our AI will match variations and synonyms automatically</li>
        </ul>
      </div>
    </div>
  );
} 