export const generateRecipePrompt = (ingredients: string[], restrictions: string[]) => {
  return `Create a recipe using these ingredients: ${ingredients.join(', ')}.
${restrictions.length ? `Dietary restrictions: ${restrictions.join(', ')}.` : ''}
Please provide:
1. Recipe title
2. List of ingredients with quantities
3. Step-by-step instructions
4. Cooking time
5. Number of servings
6. Difficulty level (Easy/Medium/Hard)

Format the response as JSON with the following structure:
{
  "title": "Recipe Title",
  "ingredients": ["ingredient 1", "ingredient 2"],
  "instructions": ["step 1", "step 2"],
  "cookingTime": "30 minutes",
  "servings": 4,
  "difficulty": "Easy"
}`;
};