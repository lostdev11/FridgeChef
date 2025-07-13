# 🚀 Deploy FridgeChef to Vercel (Recommended)

## Why Vercel instead of GitHub Pages?

- ✅ **Supports API routes** - Your recipe search will work perfectly
- ✅ **Automatic deployments** - Deploys on every push to GitHub
- ✅ **Free hosting** - No cost for personal projects
- ✅ **Better performance** - Optimized for Next.js apps

## Step-by-Step Deployment

### 1. Sign up for Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" 
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your repositories

### 2. Import Your Project
1. Click "New Project"
2. Find "FridgeChef" in your repositories
3. Click "Import"
4. Keep all default settings:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
5. Click "Deploy"

### 3. Add Environment Variable
1. After deployment, go to your project dashboard
2. Click "Settings" → "Environment Variables"
3. Add new variable:
   - Name: `SPOONACULAR_API_KEY`
   - Value: `5c9778db2b934adb9475dd9192c160d7`
   - Environment: Production, Preview, Development
4. Click "Save"
5. Go to "Deployments" and redeploy

### 4. Your App is Live!
Your app will be available at: `https://fridgechef-[your-username].vercel.app`

## Features That Will Work
- ✅ Recipe search with Spoonacular API
- ✅ Expandable recipe cards
- ✅ Full recipe modals
- ✅ Ingredient matching
- ✅ Responsive design
- ✅ All API endpoints

## Automatic Deployments
Once set up, Vercel will automatically deploy your app every time you push to GitHub!

## Troubleshooting
- If build fails, check the deployment logs in Vercel
- Make sure the environment variable is set correctly
- The API key should work immediately after setting it 