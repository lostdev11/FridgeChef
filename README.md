# FridgeChef 🍳

A full-stack Next.js 14 application that helps users discover multicultural recipes based on ingredients they already have in their fridge.

## Features

- **Smart Ingredient Matching**: Find recipes that match your available ingredients with full and partial matching
- **External Recipe Search**: Pull recipes from the internet using Spoonacular API (fully configured)
- **Multicultural Recipes**: Discover dishes from Haitian, Venezuelan, Argentinian, Hispanic, and International cuisines
- **Chat-Style Input**: Natural language ingredient input with quick-select buttons
- **Cultural Filtering**: Filter recipes by cultural origin
- **TDEE Calculator**: Calculate your Total Daily Energy Expenditure using the Mifflin-St Jeor formula
- **Pro Features Preview**: Preview of upcoming premium features (currently locked)
- **Responsive Design**: Beautiful, modern UI that works on all devices

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Custom SVG logo and favicon
- **Deployment**: Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fridgechef
```

2. Install dependencies:
```bash
npm install
```

3. Set up external recipe API:
   - Create a `.env.local` file in the root directory
   - Add: `SPOONACULAR_API_KEY=5c9778db2b934adb9475dd9192c160d7`
   - This will enable real-time recipe search from Spoonacular API

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
fridgechef/
├── app/
│   ├── api/
│   │   ├── recipes/
│   │   │   └── route.ts          # Local recipe matching API
│   │   └── external-recipes/
│   │       └── route.ts          # External recipe search API
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── components/
│   ├── ChatBox.tsx               # Ingredient input component
│   ├── ExternalRecipeCard.tsx    # External recipe display component
│   ├── IngredientButton.tsx      # Quick-select ingredient buttons
│   ├── RecipeCard.tsx            # Local recipe display component
│   ├── RecipeSearchDemo.tsx      # External recipe search demo
│   ├── TDEEForm.tsx              # Calorie calculator
│   └── ProFeaturePreview.tsx     # Pro features modal
├── data/
│   └── recipes.json              # Multicultural recipe database
├── public/
│   ├── logo.svg                  # Main logo
│   └── favicon.svg               # Favicon
└── README.md
```

## Recipe Matching Logic

The app uses intelligent matching to find recipes:

1. **Full Match**: All required ingredients are available
2. **Partial Match**: Some ingredients are available (shows missing ingredients)
3. **Match Percentage**: Calculated based on available vs required ingredients

## API Endpoints

### GET /api/recipes
Returns local recipes that match the provided ingredients.

**Query Parameters:**
- `ingredients`: Comma-separated list of ingredients

**Response:**
```json
{
  "recipes": [
    {
      "recipe": {
        "name": "Recipe Name",
        "culture": "Haitian",
        "ingredients": ["ingredient1", "ingredient2"],
        "instructions": ["step1", "step2"],
        "cookTime": "30 minutes"
      },
      "matchType": "full" | "partial",
      "missingIngredients": [],
      "matchPercentage": 100
    }
  ]
}
```

### GET /api/external-recipes
Returns recipes from external APIs (Spoonacular) that match the provided ingredients.

**Query Parameters:**
- `ingredients`: Comma-separated list of ingredients
- `number`: Number of recipes to return (default: 10)
- `ranking`: Ranking algorithm (1 = maximize used ingredients, 2 = minimize missing ingredients)

**Response:**
```json
{
  "recipes": [
    {
      "id": 123,
      "title": "Recipe Title",
      "image": "image_url",
      "usedIngredientCount": 3,
      "missedIngredientCount": 2,
      "usedIngredients": [...],
      "missedIngredients": [...],
      "likes": 150,
      "servings": 4,
      "readyInMinutes": 30,
      "instructions": "Cooking instructions...",
      "nutrition": {...}
    }
  ],
  "totalResults": 10
}
```

## Customization

### Adding New Recipes
Edit `data/recipes.json` to add new recipes. Each recipe should include:
- `name`: Recipe name
- `culture`: Cultural origin
- `ingredients`: Array of required ingredients
- `instructions`: Array of cooking steps
- `cookTime`: Estimated cooking time
- `servings`: Number of servings
- `calories`: Optional calorie count

### Styling
The app uses Tailwind CSS with a green color scheme. Customize colors in `tailwind.config.ts`.

## Deployment

The app is ready for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, please open an issue on GitHub or contact the development team.

---

Built with ❤️ using Next.js and Tailwind CSS
