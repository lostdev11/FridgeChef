# 🚀 FridgeChef Deployment Guide

## Deploy to Vercel (Recommended)

### Step 1: Sign up for Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" (use your GitHub account)
3. Authorize Vercel to access your GitHub

### Step 2: Import Your Repository
1. Click "New Project"
2. Find "FridgeChef" in your repositories
3. Click "Import"
4. Keep default settings:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
5. Click "Deploy"

### Step 3: Add Environment Variables
1. Go to your project dashboard
2. Click "Settings" → "Environment Variables"
3. Add new variable:
   - Name: `SPOONACULAR_API_KEY`
   - Value: `5c9778db2b934adb9475dd9192c160d7`
   - Environment: Production, Preview, Development
4. Click "Save"
5. Go to "Deployments" and redeploy

### Step 4: Your App is Live!
Your app will be available at: `https://fridgechef-[your-username].vercel.app`

## Alternative: Deploy to Netlify

### Step 1: Sign up for Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "Sign up" (use GitHub)

### Step 2: Connect Repository
1. Click "New site from Git"
2. Choose GitHub
3. Select "FridgeChef" repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click "Deploy site"

### Step 3: Add Environment Variables
1. Go to "Site settings" → "Environment variables"
2. Add: `SPOONACULAR_API_KEY` = `5c9778db2b934adb9475dd9192c160d7`
3. Redeploy

## Troubleshooting

### If the app doesn't load:
1. Check the deployment logs in Vercel/Netlify
2. Make sure environment variables are set
3. Verify the build is successful

### If recipe search doesn't work:
1. Check if the API key is correctly set
2. Verify the API endpoint is working
3. Check browser console for errors

### Common Issues:
- **Build fails**: Make sure all dependencies are in package.json
- **API errors**: Verify the Spoonacular API key is valid
- **Styling issues**: Check if Tailwind CSS is properly configured

## Local Development

To run locally:
```bash
cd fridgechef
npm install
npm run dev
```

Visit: http://localhost:3000 (or 3001 if 3000 is busy) 