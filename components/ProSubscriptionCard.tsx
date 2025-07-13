import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Lock, Heart, Calendar, Users } from "lucide-react"
import { useState } from "react"

const subscriptionPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "Basic recipe search",
      "Up to 10 recipes per search",
      "Basic ingredient matching",
      "TDEE calculator"
    ],
    popular: false,
    comingSoon: false
  },
  {
    name: "Pro",
    price: "$2.99",
    period: "per month",
    yearlyPrice: "$25",
    yearlyPeriod: "per year",
    features: [
      "Unlimited recipe searches",
      "Save unlimited recipes",
      "Advanced ingredient matching",
      "Meal planning calendar",
      "Nutrition tracking",
      "Shopping list generator",
      "Priority support"
    ],
    popular: true,
    comingSoon: true
  },
  {
    name: "Family",
    price: "$25",
    period: "per month",
    yearlyPrice: "$35",
    yearlyPeriod: "per year",
    features: [
      "Everything in Pro",
      "Up to 6 family members",
      "Shared meal planning",
      "Family shopping lists",
      "Dietary restrictions per member",
      "Family recipe sharing"
    ],
    popular: false,
    comingSoon: true
  }
]

export default function ProSubscriptionCard() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Start cooking smarter with FridgeChef. Choose the plan that fits your cooking style.
        </p>
        
        {/* Billing Toggle */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              billingCycle === 'yearly' ? 'bg-purple-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
            Yearly
            {billingCycle === 'yearly' && (
              <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Save
              </span>
            )}
          </span>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {subscriptionPlans.map((plan, index) => (
          <Card 
            key={plan.name}
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
              plan.popular 
                ? 'ring-2 ring-purple-500 shadow-lg scale-105' 
                : 'hover:scale-105'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Badge className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {plan.name}
              </CardTitle>
              <div className="mt-4">
                {plan.name === "Free" ? (
                  <div>
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                ) : (
                  <div>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-gray-900">
                        {billingCycle === 'monthly' ? plan.price : plan.yearlyPrice}
                      </span>
                      <span className="text-gray-600 ml-2">
                        {billingCycle === 'monthly' ? plan.period : plan.yearlyPeriod}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="text-xs text-green-600 font-medium">
                        Save with yearly billing
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                {plan.comingSoon ? (
                  <Button 
                    disabled 
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Coming Soon
                  </Button>
                ) : (
                  <Button 
                    variant={plan.popular ? "default" : "outline"}
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-purple-600 hover:bg-purple-700' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Get Started
                  </Button>
                )}
              </div>

              {plan.comingSoon && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  We're working hard to bring you these features!
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Comparison */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Pro Features Preview
        </h3>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
            <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Save Recipes</h4>
            <p className="text-sm text-gray-600">
              Save your favorite recipes and access them anytime
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
            <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Meal Planning</h4>
            <p className="text-sm text-gray-600">
              Plan your meals for the week with smart suggestions
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
            <Zap className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Smart Matching</h4>
            <p className="text-sm text-gray-600">
              Advanced AI-powered ingredient matching
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Family Plans</h4>
            <p className="text-sm text-gray-600">
              Share recipes and meal plans with your family
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 