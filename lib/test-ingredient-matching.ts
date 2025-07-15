import { 
  searchIngredients, 
  normalizeIngredientName, 
  ingredientsMatch,
  getIngredientsByCategory 
} from './ingredient-database';

// Test the enhanced ingredient matching functionality
export function testIngredientMatching() {
  console.log('🧪 Testing Enhanced Ingredient Matching...\n');

  // Test 1: Search functionality
  console.log('1. Testing search functionality:');
  const cheeseResults = searchIngredients('ched');
  console.log('   Search for "ched":', cheeseResults.map(r => r.name));
  
  const chickenResults = searchIngredients('chicken');
  console.log('   Search for "chicken":', chickenResults.map(r => r.name));

  // Test 2: Normalization
  console.log('\n2. Testing normalization:');
  console.log('   "cheddar" ->', normalizeIngredientName('cheddar'));
  console.log('   "CHICKEN BREAST" ->', normalizeIngredientName('CHICKEN BREAST'));
  console.log('   "tomatoes" ->', normalizeIngredientName('tomatoes'));

  // Test 3: Ingredient matching
  console.log('\n3. Testing ingredient matching:');
  console.log('   "cheddar" matches "cheddar cheese":', ingredientsMatch('cheddar', 'cheddar cheese'));
  console.log('   "chicken" matches "chicken breast":', ingredientsMatch('chicken', 'chicken breast'));
  console.log('   "tomato" matches "tomatoes":', ingredientsMatch('tomato', 'tomatoes'));
  console.log('   "mozzarella" matches "fresh mozzarella":', ingredientsMatch('mozzarella', 'fresh mozzarella'));

  // Test 4: Category browsing
  console.log('\n4. Testing category browsing:');
  const cheeseCategory = getIngredientsByCategory('Cheese');
  console.log('   Cheese category items:', cheeseCategory.map(c => c.name));

  // Test 5: Edge cases
  console.log('\n5. Testing edge cases:');
  console.log('   Empty search:', searchIngredients('').length);
  console.log('   Non-existent ingredient:', normalizeIngredientName('xyz123'));
  console.log('   Special characters:', normalizeIngredientName('chicken-breast'));

  console.log('\n✅ Ingredient matching tests completed!');
}

// Test specific cheese variations
export function testCheeseVariations() {
  console.log('\n🧀 Testing Cheese Variations...\n');
  
  const cheeseTests = [
    'cheddar',
    'mozzarella', 
    'parmesan',
    'feta',
    'blue cheese',
    'swiss',
    'cream cheese',
    'provolone',
    'cottage cheese',
    'ricotta'
  ];

  cheeseTests.forEach(test => {
    const results = searchIngredients(test);
    console.log(`${test}:`, results.map(r => r.name));
  });
}

// Test recipe matching scenarios
export function testRecipeMatching() {
  console.log('\n🍳 Testing Recipe Matching Scenarios...\n');
  
  const userIngredients = ['chicken breast', 'cheddar cheese', 'onion', 'garlic'];
  const recipeIngredients = [
    '2 chicken breasts, diced',
    '1 cup cheddar cheese, shredded', 
    '1 onion, chopped',
    '3 cloves garlic, minced',
    '2 tablespoons olive oil'
  ];

  console.log('User ingredients:', userIngredients);
  console.log('Recipe ingredients:', recipeIngredients);
  console.log('\nMatching results:');

  recipeIngredients.forEach(recipeIngredient => {
    const hasMatch = userIngredients.some(userIngredient => 
      ingredientsMatch(userIngredient, recipeIngredient)
    );
    console.log(`  ${recipeIngredient}: ${hasMatch ? '✅' : '❌'}`);
  });
} 