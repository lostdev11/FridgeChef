export interface IngredientCategory {
  name: string;
  ingredients: IngredientItem[];
}

export interface IngredientItem {
  name: string;
  variations: string[];
  synonyms: string[];
  category: string;
}

export const ingredientDatabase: IngredientCategory[] = [
  {
    name: "Cheese",
    ingredients: [
      {
        name: "cheddar cheese",
        variations: ["cheddar", "sharp cheddar", "mild cheddar", "white cheddar", "yellow cheddar"],
        synonyms: ["cheddar", "cheddar cheese", "sharp cheddar", "mild cheddar"],
        category: "cheese"
      },
      {
        name: "mozzarella cheese",
        variations: ["mozzarella", "fresh mozzarella", "buffalo mozzarella", "low-moisture mozzarella"],
        synonyms: ["mozzarella", "mozzarella cheese", "fresh mozzarella"],
        category: "cheese"
      },
      {
        name: "parmesan cheese",
        variations: ["parmesan", "parmigiano reggiano", "grated parmesan", "parmesan cheese"],
        synonyms: ["parmesan", "parmigiano", "parmigiano reggiano"],
        category: "cheese"
      },
      {
        name: "cream cheese",
        variations: ["cream cheese", "philadelphia", "soft cheese"],
        synonyms: ["cream cheese", "philadelphia", "soft cheese"],
        category: "cheese"
      },
      {
        name: "feta cheese",
        variations: ["feta", "feta cheese", "crumbled feta"],
        synonyms: ["feta", "feta cheese"],
        category: "cheese"
      },
      {
        name: "blue cheese",
        variations: ["blue cheese", "gorgonzola", "roquefort", "stilton"],
        synonyms: ["blue cheese", "gorgonzola", "roquefort", "stilton"],
        category: "cheese"
      },
      {
        name: "swiss cheese",
        variations: ["swiss", "swiss cheese", "emmental", "gruyere"],
        synonyms: ["swiss", "emmental", "gruyere"],
        category: "cheese"
      },
      {
        name: "provolone cheese",
        variations: ["provolone", "provolone cheese"],
        synonyms: ["provolone"],
        category: "cheese"
      },
      {
        name: "cottage cheese",
        variations: ["cottage cheese", "curd cheese"],
        synonyms: ["cottage cheese", "curd cheese"],
        category: "cheese"
      },
      {
        name: "ricotta cheese",
        variations: ["ricotta", "ricotta cheese"],
        synonyms: ["ricotta"],
        category: "cheese"
      }
    ]
  },
  {
    name: "Meat",
    ingredients: [
      {
        name: "chicken breast",
        variations: ["chicken", "chicken breast", "boneless chicken breast", "skinless chicken breast"],
        synonyms: ["chicken", "chicken breast", "poultry"],
        category: "meat"
      },
      {
        name: "ground beef",
        variations: ["beef", "ground beef", "hamburger meat", "minced beef"],
        synonyms: ["beef", "ground beef", "hamburger meat"],
        category: "meat"
      },
      {
        name: "pork chops",
        variations: ["pork", "pork chops", "pork loin", "pork tenderloin"],
        synonyms: ["pork", "pork chops", "pork loin"],
        category: "meat"
      },
      {
        name: "salmon",
        variations: ["salmon", "salmon fillet", "fresh salmon", "wild salmon"],
        synonyms: ["salmon", "fish"],
        category: "meat"
      },
      {
        name: "shrimp",
        variations: ["shrimp", "prawns", "jumbo shrimp", "medium shrimp"],
        synonyms: ["shrimp", "prawns", "seafood"],
        category: "meat"
      },
      {
        name: "bacon",
        variations: ["bacon", "streaky bacon", "back bacon", "turkey bacon"],
        synonyms: ["bacon", "pork belly"],
        category: "meat"
      },
      {
        name: "sausage",
        variations: ["sausage", "italian sausage", "breakfast sausage", "chorizo"],
        synonyms: ["sausage", "chorizo", "italian sausage"],
        category: "meat"
      }
    ]
  },
  {
    name: "Vegetables",
    ingredients: [
      {
        name: "onion",
        variations: ["onion", "yellow onion", "white onion", "red onion", "sweet onion"],
        synonyms: ["onion", "yellow onion", "white onion", "red onion"],
        category: "vegetables"
      },
      {
        name: "garlic",
        variations: ["garlic", "garlic cloves", "minced garlic", "garlic powder"],
        synonyms: ["garlic", "garlic cloves"],
        category: "vegetables"
      },
      {
        name: "tomato",
        variations: ["tomato", "tomatoes", "roma tomato", "cherry tomato", "beefsteak tomato"],
        synonyms: ["tomato", "tomatoes"],
        category: "vegetables"
      },
      {
        name: "bell pepper",
        variations: ["bell pepper", "bell peppers", "green bell pepper", "red bell pepper", "yellow bell pepper"],
        synonyms: ["bell pepper", "bell peppers", "capsicum"],
        category: "vegetables"
      },
      {
        name: "carrot",
        variations: ["carrot", "carrots", "baby carrots"],
        synonyms: ["carrot", "carrots"],
        category: "vegetables"
      },
      {
        name: "potato",
        variations: ["potato", "potatoes", "russet potato", "red potato", "yukon gold potato"],
        synonyms: ["potato", "potatoes"],
        category: "vegetables"
      },
      {
        name: "spinach",
        variations: ["spinach", "fresh spinach", "baby spinach", "frozen spinach"],
        synonyms: ["spinach", "leafy greens"],
        category: "vegetables"
      },
      {
        name: "lettuce",
        variations: ["lettuce", "romaine lettuce", "iceberg lettuce", "butter lettuce"],
        synonyms: ["lettuce", "romaine", "iceberg"],
        category: "vegetables"
      },
      {
        name: "cucumber",
        variations: ["cucumber", "cucumbers", "english cucumber"],
        synonyms: ["cucumber", "cucumbers"],
        category: "vegetables"
      },
      {
        name: "avocado",
        variations: ["avocado", "avocados", "ripe avocado"],
        synonyms: ["avocado", "avocados"],
        category: "vegetables"
      },
      {
        name: "mushroom",
        variations: ["mushroom", "mushrooms", "button mushrooms", "portobello mushrooms"],
        synonyms: ["mushroom", "mushrooms"],
        category: "vegetables"
      },
      {
        name: "broccoli",
        variations: ["broccoli", "fresh broccoli", "frozen broccoli"],
        synonyms: ["broccoli"],
        category: "vegetables"
      },
      {
        name: "cauliflower",
        variations: ["cauliflower", "fresh cauliflower"],
        synonyms: ["cauliflower"],
        category: "vegetables"
      }
    ]
  },
  {
    name: "Dairy",
    ingredients: [
      {
        name: "milk",
        variations: ["milk", "whole milk", "skim milk", "2% milk", "almond milk", "soy milk"],
        synonyms: ["milk", "dairy milk"],
        category: "dairy"
      },
      {
        name: "eggs",
        variations: ["egg", "eggs", "large eggs", "extra large eggs"],
        synonyms: ["egg", "eggs"],
        category: "dairy"
      },
      {
        name: "butter",
        variations: ["butter", "unsalted butter", "salted butter", "margarine"],
        synonyms: ["butter", "unsalted butter"],
        category: "dairy"
      },
      {
        name: "yogurt",
        variations: ["yogurt", "yogurt", "greek yogurt", "plain yogurt", "vanilla yogurt"],
        synonyms: ["yogurt", "yogurt"],
        category: "dairy"
      },
      {
        name: "heavy cream",
        variations: ["heavy cream", "whipping cream", "double cream"],
        synonyms: ["heavy cream", "whipping cream"],
        category: "dairy"
      },
      {
        name: "sour cream",
        variations: ["sour cream", "light sour cream"],
        synonyms: ["sour cream"],
        category: "dairy"
      }
    ]
  },
  {
    name: "Grains",
    ingredients: [
      {
        name: "rice",
        variations: ["rice", "white rice", "brown rice", "basmati rice", "jasmine rice"],
        synonyms: ["rice", "white rice", "brown rice"],
        category: "grains"
      },
      {
        name: "pasta",
        variations: ["pasta", "spaghetti", "penne", "fettuccine", "linguine"],
        synonyms: ["pasta", "spaghetti", "penne"],
        category: "grains"
      },
      {
        name: "bread",
        variations: ["bread", "white bread", "whole wheat bread", "sourdough bread"],
        synonyms: ["bread", "white bread", "whole wheat bread"],
        category: "grains"
      },
      {
        name: "flour",
        variations: ["flour", "all-purpose flour", "bread flour", "cake flour"],
        synonyms: ["flour", "all-purpose flour"],
        category: "grains"
      },
      {
        name: "quinoa",
        variations: ["quinoa", "white quinoa", "red quinoa"],
        synonyms: ["quinoa"],
        category: "grains"
      },
      {
        name: "oats",
        variations: ["oats", "rolled oats", "steel cut oats", "quick oats"],
        synonyms: ["oats", "rolled oats"],
        category: "grains"
      }
    ]
  },
  {
    name: "Fruits",
    ingredients: [
      {
        name: "lemon",
        variations: ["lemon", "lemons", "fresh lemon", "lemon juice"],
        synonyms: ["lemon", "lemons"],
        category: "fruits"
      },
      {
        name: "lime",
        variations: ["lime", "limes", "fresh lime", "lime juice"],
        synonyms: ["lime", "limes"],
        category: "fruits"
      },
      {
        name: "apple",
        variations: ["apple", "apples", "granny smith apple", "red delicious apple"],
        synonyms: ["apple", "apples"],
        category: "fruits"
      },
      {
        name: "banana",
        variations: ["banana", "bananas", "ripe banana"],
        synonyms: ["banana", "bananas"],
        category: "fruits"
      },
      {
        name: "orange",
        variations: ["orange", "oranges", "navel orange"],
        synonyms: ["orange", "oranges"],
        category: "fruits"
      },
      {
        name: "strawberry",
        variations: ["strawberry", "strawberries", "fresh strawberries"],
        synonyms: ["strawberry", "strawberries"],
        category: "fruits"
      }
    ]
  },
  {
    name: "Herbs & Spices",
    ingredients: [
      {
        name: "basil",
        variations: ["basil", "fresh basil", "dried basil"],
        synonyms: ["basil"],
        category: "herbs"
      },
      {
        name: "oregano",
        variations: ["oregano", "fresh oregano", "dried oregano"],
        synonyms: ["oregano"],
        category: "herbs"
      },
      {
        name: "thyme",
        variations: ["thyme", "fresh thyme", "dried thyme"],
        synonyms: ["thyme"],
        category: "herbs"
      },
      {
        name: "rosemary",
        variations: ["rosemary", "fresh rosemary", "dried rosemary"],
        synonyms: ["rosemary"],
        category: "herbs"
      },
      {
        name: "parsley",
        variations: ["parsley", "fresh parsley", "dried parsley"],
        synonyms: ["parsley"],
        category: "herbs"
      },
      {
        name: "cilantro",
        variations: ["cilantro", "fresh cilantro", "coriander"],
        synonyms: ["cilantro", "coriander"],
        category: "herbs"
      },
      {
        name: "salt",
        variations: ["salt", "table salt", "kosher salt", "sea salt"],
        synonyms: ["salt", "table salt"],
        category: "herbs"
      },
      {
        name: "black pepper",
        variations: ["black pepper", "pepper", "ground black pepper"],
        synonyms: ["black pepper", "pepper"],
        category: "herbs"
      }
    ]
  },
  {
    name: "Oils & Condiments",
    ingredients: [
      {
        name: "olive oil",
        variations: ["olive oil", "extra virgin olive oil", "light olive oil"],
        synonyms: ["olive oil", "extra virgin olive oil"],
        category: "oils"
      },
      {
        name: "vegetable oil",
        variations: ["vegetable oil", "canola oil", "corn oil"],
        synonyms: ["vegetable oil", "canola oil"],
        category: "oils"
      },
      {
        name: "ketchup",
        variations: ["ketchup", "tomato ketchup"],
        synonyms: ["ketchup", "tomato ketchup"],
        category: "condiments"
      },
      {
        name: "mustard",
        variations: ["mustard", "dijon mustard", "yellow mustard"],
        synonyms: ["mustard", "dijon mustard"],
        category: "condiments"
      },
      {
        name: "mayonnaise",
        variations: ["mayonnaise", "mayo", "light mayonnaise"],
        synonyms: ["mayonnaise", "mayo"],
        category: "condiments"
      },
      {
        name: "soy sauce",
        variations: ["soy sauce", "light soy sauce", "dark soy sauce"],
        synonyms: ["soy sauce"],
        category: "condiments"
      }
    ]
  }
];

// Flatten all ingredients for easier searching
export const allIngredients = ingredientDatabase.flatMap(category => 
  category.ingredients.map(ingredient => ({
    ...ingredient,
    categoryName: category.name
  }))
);

// Search function for ingredients
export function searchIngredients(query: string): IngredientItem[] {
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) return [];
  
  return allIngredients.filter(ingredient => {
    // Check main name
    if (ingredient.name.toLowerCase().includes(lowerQuery)) return true;
    
    // Check variations
    if (ingredient.variations.some(v => v.toLowerCase().includes(lowerQuery))) return true;
    
    // Check synonyms
    if (ingredient.synonyms.some(s => s.toLowerCase().includes(lowerQuery))) return true;
    
    return false;
  });
}

// Get ingredients by category
export function getIngredientsByCategory(categoryName: string): IngredientItem[] {
  const category = ingredientDatabase.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
  return category ? category.ingredients : [];
}

// Normalize ingredient name for better matching
export function normalizeIngredientName(input: string): string {
  const lowerInput = input.toLowerCase().trim();
  
  // Find the best match in our database
  const matches = searchIngredients(lowerInput);
  
  if (matches.length > 0) {
    // Return the most relevant match (usually the first one)
    return matches[0].name;
  }
  
  // If no match found, return the original input
  return lowerInput;
}

// Check if two ingredients match (for recipe matching)
export function ingredientsMatch(userIngredient: string, recipeIngredient: string): boolean {
  const normalizedUser = normalizeIngredientName(userIngredient);
  const normalizedRecipe = normalizeIngredientName(recipeIngredient);
  
  // Direct match
  if (normalizedUser === normalizedRecipe) return true;
  
  // Check if user ingredient is contained in recipe ingredient or vice versa
  if (normalizedRecipe.includes(normalizedUser) || normalizedUser.includes(normalizedRecipe)) return true;
  
  // Check variations and synonyms
  const userMatches = searchIngredients(normalizedUser);
  const recipeMatches = searchIngredients(normalizedRecipe);
  
  // Check if they share any common ingredients
  for (const userMatch of userMatches) {
    for (const recipeMatch of recipeMatches) {
      if (userMatch.name === recipeMatch.name) return true;
    }
  }
  
  return false;
} 