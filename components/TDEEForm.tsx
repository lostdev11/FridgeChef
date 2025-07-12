'use client';

import { useState } from 'react';

interface TDEEFormProps {
  onTDEEChange: (tdee: number) => void;
}

export default function TDEEForm({ onTDEEChange }: TDEEFormProps) {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'moderate'
  });
  const [tdee, setTdee] = useState<number | null>(null);
  const [showProModal, setShowProModal] = useState(false);

  const activityMultipliers = {
    sedentary: 1.2,      // Little or no exercise
    light: 1.375,        // Light exercise 1-3 days/week
    moderate: 1.55,      // Moderate exercise 3-5 days/week
    active: 1.725,       // Hard exercise 6-7 days/week
    veryActive: 1.9      // Very hard exercise, physical job
  };

  const calculateTDEE = () => {
    const { age, gender, weight, height, activityLevel } = formData;
    
    if (!age || !weight || !height) return;

    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const activityMultiplier = activityMultipliers[activityLevel as keyof typeof activityMultipliers];

    // Mifflin-St Jeor Formula
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    const calculatedTDEE = Math.round(bmr * activityMultiplier);
    setTdee(calculatedTDEE);
    onTDEEChange(calculatedTDEE);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getServingRecommendation = () => {
    if (!tdee) return null;
    
    // Assume average meal is 600-800 calories
    const avgMealCalories = 700;
    const recommendedServings = Math.round(tdee / avgMealCalories);
    
    return Math.max(1, Math.min(recommendedServings, 5)); // Between 1-5 servings
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">⚖️</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">TDEE Calculator</h3>
            <p className="text-sm text-gray-600">Calculate your daily calorie needs</p>
          </div>
        </div>

        <form className="space-y-4">
          {/* Age and Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* Weight and Height */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="70"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="170"
              />
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activity Level
            </label>
            <select
              value={formData.activityLevel}
              onChange={(e) => handleInputChange('activityLevel', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="sedentary">Sedentary (Little or no exercise)</option>
              <option value="light">Light (Exercise 1-3 days/week)</option>
              <option value="moderate">Moderate (Exercise 3-5 days/week)</option>
              <option value="active">Active (Exercise 6-7 days/week)</option>
              <option value="veryActive">Very Active (Hard exercise, physical job)</option>
            </select>
          </div>

          {/* Calculate Button */}
                      <button
              type="button"
              onClick={calculateTDEE}
              className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Calculate TDEE
            </button>
        </form>

        {/* Results */}
        {tdee && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">Your Results</h4>
            <div className="space-y-2">
              <p className="text-blue-700">
                <span className="font-medium">Daily Calorie Needs:</span> {tdee.toLocaleString()} calories
              </p>
              <p className="text-blue-700">
                <span className="font-medium">Recommended Recipe Servings:</span> {getServingRecommendation()} servings per meal
              </p>
            </div>
          </div>
        )}

        {/* Pro Feature - Calorie Adjustment */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-purple-800 mb-1">Custom Calorie Adjustment</h4>
              <p className="text-sm text-purple-600">Adjust calories for weight loss or muscle gain</p>
            </div>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              PRO
            </span>
          </div>
          
          <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
            <div className="flex items-center space-x-4">
              <input
                type="number"
                placeholder="e.g., -500 for weight loss"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                disabled
              />
              <button
                onClick={() => setShowProModal(true)}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
              >
                Upgrade to Pro
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Coming Soon - FridgeChef Pro
            </p>
          </div>
        </div>
      </div>

      {/* Pro Modal */}
      {showProModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">👑</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">FridgeChef Pro</h3>
              <p className="text-gray-600 mb-4">
                Unlock advanced features like custom calorie adjustments, meal planning, and more!
              </p>
              <div className="space-y-2 mb-6 text-left">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">Custom calorie adjustments</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">Advanced meal planning</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">Nutritional insights</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">Priority support</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowProModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Maybe Later
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  disabled
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 