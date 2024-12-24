import React from 'react';
import { Clock, Users, ChefHat, BookmarkPlus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { saveRecipe } from '../services/recipes';
import type { Recipe } from '../types';

interface Props {
  recipe: Recipe;
  onSave?: () => void;
}

export default function RecipeCard({ recipe, onSave }: Props) {
  const { user } = useAuth();

  const handleSave = async () => {
    if (!user) return;
    try {
      await saveRecipe(recipe, user.id);
      onSave?.();
    } catch (error) {
      console.error('Failed to save recipe:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{recipe.title}</h2>
          {user && (
            <button
              onClick={handleSave}
              className="p-2 text-emerald-600 hover:text-emerald-700"
              title="Save Recipe"
            >
              <BookmarkPlus size={24} />
            </button>
          )}
        </div>
        
        <div className="flex gap-6 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={20} />
            <span>{recipe.cookingTime}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users size={20} />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <ChefHat size={20} />
            <span>{recipe.difficulty}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
          <ul className="list-disc list-inside space-y-1">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-600">{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Instructions</h3>
          <ol className="list-decimal list-inside space-y-2">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="text-gray-600">{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}