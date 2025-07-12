'use client';

import { useState } from 'react';

export default function ProFeaturePreview() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-lg p-6 border border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">👑</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-800">Custom Calorie Goals</h3>
              <p className="text-sm text-purple-600">Set personalized calorie targets</p>
            </div>
          </div>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            PRO
          </span>
        </div>

        <div className="space-y-4">
          {/* Calorie Goal Input */}
          <div className="p-4 bg-white rounded-lg border border-purple-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Daily Calorie Goal
            </label>
            <div className="flex space-x-3">
              <input
                type="number"
                placeholder="e.g., 1800"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                disabled
              />
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium flex items-center space-x-2"
              >
                <span>🔒</span>
                <span>Unlock Pro</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Coming Soon - FridgeChef Pro
            </p>
          </div>

          {/* Pro Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 text-sm text-purple-700">
              <span className="text-purple-500">✓</span>
              <span>Advanced meal planning</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-purple-700">
              <span className="text-purple-500">✓</span>
              <span>Nutritional insights</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-purple-700">
              <span className="text-purple-500">✓</span>
              <span>Recipe scaling</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-purple-700">
              <span className="text-purple-500">✓</span>
              <span>Priority support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pro Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">👑</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">FridgeChef Pro</h3>
              <p className="text-gray-600 mb-4">
                Unlock advanced features for personalized meal planning and nutritional insights!
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
                  <span className="text-sm">Recipe scaling</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">Priority support</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
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