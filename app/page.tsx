"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChefHat, Search, Clock, Calculator, Lock, Github, Shield, Zap, Send, Loader2, Globe } from "lucide-react"
import Image from "next/image"
import ExternalRecipeCard from "@/components/ExternalRecipeCard"
import RecipeSearchDemo, { SPOONACULAR_CREDIT } from "@/components/RecipeSearchDemo"
import ProSubscriptionCard from "@/components/ProSubscriptionCard"

const quickIngredients = [
  "Chicken",
  "Eggs",
  "Milk",
  "Cheese",
  "Rice",
  "Beans",
  "Tomatoes",
  "Onions",
  "Garlic",
  "Bell Peppers",
  "Plantains",
  "Avocado",
]

const sampleRecipes = [
  {
    name: "Pollo Guisado",
    culture: "🇻🇪 Venezuelan",
    match: "Full Match",
    image: "/placeholder.svg?height=200&width=300",
    time: "45 min",
  },
  {
    name: "Griot with Rice",
    culture: "🇭🇹 Haitian",
    match: "Partial Match",
    image: "/placeholder.svg?height=200&width=300",
    time: "1h 30min",
  },
  {
    name: "Empanadas Argentinas",
    culture: "🇦🇷 Argentinian",
    match: "Full Match",
    image: "/placeholder.svg?height=200&width=300",
    time: "1h 15min",
  },
]

interface TDEEData {
  age: string
  weight: string
  height: string
  gender: string
  activity: string
}

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

export default function Home() {
  const [ingredients, setIngredients] = useState("")
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [externalRecipes, setExternalRecipes] = useState<ExternalRecipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [showIngredientInput, setShowIngredientInput] = useState(false)
  const [tdeeData, setTdeeData] = useState<TDEEData>({
    age: "",
    weight: "",
    height: "",
    gender: "",
    activity: "",
  })
  const [maintenanceCalories, setMaintenanceCalories] = useState<number | null>(null)

  const addIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient])
    }
  }

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i !== ingredient))
  }

  const searchExternalRecipes = async () => {
    if (selectedIngredients.length === 0) {
      setSearchError("Please add some ingredients first")
      return
    }

    setIsLoading(true)
    setSearchError(null)

    try {
      const ingredientsString = selectedIngredients.join(',')
      const response = await fetch(`/api/external-recipes?ingredients=${encodeURIComponent(ingredientsString)}&number=10`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipes')
      }

      const data = await response.json()
      setExternalRecipes(data.recipes || [])
      
      if (data.error) {
        setSearchError(data.error)
      }
    } catch (error) {
      console.error('Error searching recipes:', error)
      setSearchError('Failed to search recipes. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitIngredients = (e: React.FormEvent) => {
    e.preventDefault()
    if (ingredients.trim()) {
      const newIngredients = ingredients
        .split(/[,\n\s]+/)
        .map(ing => ing.trim().toLowerCase())
        .filter(ing => ing && !selectedIngredients.includes(ing))
      
      if (newIngredients.length > 0) {
        setSelectedIngredients([...selectedIngredients, ...newIngredients])
        setIngredients("")
      }
    }
  }

  const calculateTDEE = () => {
    const { age, weight, height, gender, activity } = tdeeData
    if (!age || !weight || !height || !gender || !activity) return

    // Basic BMR calculation (Mifflin-St Jeor Equation)
    let bmr: number
    if (gender === "male") {
      bmr = 10 * Number.parseFloat(weight) + 6.25 * Number.parseFloat(height) - 5 * Number.parseFloat(age) + 5
    } else {
      bmr = 10 * Number.parseFloat(weight) + 6.25 * Number.parseFloat(height) - 5 * Number.parseFloat(age) - 161
    }

    // Activity multipliers
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    }

    const tdee = bmr * activityMultipliers[activity]
    setMaintenanceCalories(Math.round(tdee))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="px-4 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-2">
              <Image
                src="/Fridge chef circle icon.png"
                alt="FridgeChef Logo"
                width={64}
                height={64}
                className="h-16 w-16 object-cover rounded-full"
              />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-6xl">
            Fridge<span className="text-green-600">Chef</span>
          </h1>
          <p className="mb-8 text-xl text-gray-600 md:text-2xl">Cook smarter with what you already have.</p>
          <Button 
            size="lg" 
            className="rounded-full bg-green-600 px-8 py-3 text-lg hover:bg-green-700"
            onClick={() => setShowIngredientInput(true)}
          >
            Start Cooking
          </Button>
        </div>
      </section>

      {/* Ingredient Entry Section */}
      <section className={`px-4 py-16 transition-all duration-500 ${showIngredientInput ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">🔍 What&apos;s in your fridge?</h2>
          {showIngredientInput && <RecipeSearchDemo />}

          {/* Chat-style input */}
          <form onSubmit={handleSubmitIngredients} className="mb-6">
            <div className="flex gap-2">
              <Textarea
                placeholder="Type your ingredients here... (e.g., chicken, rice, tomatoes)"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="min-h-[60px] rounded-2xl border-2 border-green-200 focus:border-green-500"
              />
              <Button type="submit" size="icon" className="rounded-full bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Selected ingredients */}
          {selectedIngredients.length > 0 && (
            <div className="mb-6">
              <p className="mb-2 text-sm font-medium text-gray-700">Selected ingredients:</p>
              <div className="flex flex-wrap gap-2">
                {selectedIngredients.map((ingredient) => (
                  <Badge
                    key={ingredient}
                    variant="secondary"
                    className="cursor-pointer rounded-full bg-green-100 text-green-800 hover:bg-green-200"
                    onClick={() => removeIngredient(ingredient)}
                  >
                    {ingredient} ×
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Quick select ingredients */}
          <div className="mb-8">
            <p className="mb-4 text-sm font-medium text-gray-700">Quick select:</p>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
              {quickIngredients.map((ingredient) => (
                <Button
                  key={ingredient}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-green-200 hover:bg-green-50 bg-transparent"
                  onClick={() => addIngredient(ingredient)}
                  disabled={selectedIngredients.includes(ingredient)}
                >
                  {ingredient}
                </Button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={searchExternalRecipes}
              disabled={isLoading || selectedIngredients.length === 0}
              size="lg" 
              className="rounded-full bg-green-600 px-8 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Find Recipes
                </>
              )}
            </Button>
          </div>

          {/* Error Message */}
          {searchError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-center">{searchError}</p>
              <p className="text-xs text-red-600 text-center mt-1">
                Check your internet connection and try again. The API key is configured.
              </p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <p className="text-blue-700">Searching thousands of recipes...</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recipe Results Section */}
      <section className="bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            📋 Recipe Suggestions
            {externalRecipes.length > 0 && (
              <span className="ml-2 text-lg font-normal text-gray-600">
                ({externalRecipes.length} recipes found)
              </span>
            )}
          </h2>

          {externalRecipes.length > 0 ? (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-green-600" />
                  Recipes from the Web
                </h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {externalRecipes.map((recipe) => (
                    <ExternalRecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      userIngredients={selectedIngredients}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4">
                <ChefHat className="mx-auto h-16 w-16 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found yet</h3>
              <p className="text-gray-600">
                Add some ingredients above and click "Find Recipes" to discover delicious meals!
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg max-w-md mx-auto">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Try common ingredients like "chicken", "rice", "tomato", or "cheese" to see the feature in action!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TDEE Calculator Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">🔢 TDEE Calculator</h2>

          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Calculator className="mr-2 h-5 w-5 text-green-600" />
                Calculate Your Daily Calorie Needs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={tdeeData.age}
                    onChange={(e) => setTdeeData({ ...tdeeData, age: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={tdeeData.weight}
                    onChange={(e) => setTdeeData({ ...tdeeData, weight: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={tdeeData.height}
                    onChange={(e) => setTdeeData({ ...tdeeData, height: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={tdeeData.gender}
                    onValueChange={(value) => setTdeeData({ ...tdeeData, gender: value })}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="activity">Activity Level</Label>
                <Select
                  value={tdeeData.activity}
                  onValueChange={(value) => setTdeeData({ ...tdeeData, activity: value })}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                    <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="very_active">Very Active (very hard exercise, physical job)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={calculateTDEE} className="w-full rounded-xl bg-green-600 hover:bg-green-700">
                Calculate TDEE
              </Button>

              {maintenanceCalories && (
                <div className="rounded-xl bg-green-50 p-6 text-center">
                  <h3 className="mb-2 text-lg font-semibold text-green-800">Your Maintenance Calories</h3>
                  <p className="text-3xl font-bold text-green-600">{maintenanceCalories} calories/day</p>
                  <p className="mt-2 text-sm text-green-700">
                    Suggested servings: {Math.round(maintenanceCalories / 600)} meals per day
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pro Subscription Section */}
      <ProSubscriptionCard />

      {/* Spoonacular Credit at the bottom */}
      <div className="w-full flex justify-center py-4">
        <span className="text-xs text-gray-400 italic">{SPOONACULAR_CREDIT}</span>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 px-4 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h3 className="mb-4 text-2xl font-bold">
              Fridge<span className="text-green-400">Chef</span>
            </h3>
            <p className="text-gray-400">Cook smarter with what you already have.</p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-8 md:space-y-0">
            <a href="#" className="flex items-center text-gray-400 hover:text-white">
              <Github className="mr-2 h-4 w-4" />
              GitHub Repository
            </a>
            <a href="#" className="flex items-center text-gray-400 hover:text-white">
              <Shield className="mr-2 h-4 w-4" />
              Privacy Policy
            </a>
            <div className="flex items-center text-gray-400">
              <span className="mr-2">Built with</span>
              <Badge variant="outline" className="border-gray-600 text-gray-400">
                ▲ Vercel
              </Badge>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FridgeChef. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 