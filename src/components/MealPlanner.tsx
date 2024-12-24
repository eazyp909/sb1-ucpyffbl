import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getSavedRecipes } from '../services/recipes';
import type { Recipe } from '../types';

interface MealPlan {
  [key: string]: Recipe | null;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function MealPlanner() {
  const { user } = useAuth();
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadSavedRecipes();
    }
  }, [user]);

  const loadSavedRecipes = async () => {
    try {
      const recipes = await getSavedRecipes(user!.id);
      setSavedRecipes(recipes);
    } catch (error) {
      console.error('Failed to load recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const assignRecipeToDay = (day: string, recipe: Recipe) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: recipe
    }));
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please log in to use the meal planner.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading your recipes...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar size={24} className="text-emerald-600" />
        <h2 className="text-2xl font-bold">Weekly Meal Planner</h2>
      </div>

      <div className="grid gap-6">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">{day}</h3>
            {mealPlan[day] ? (
              <div className="flex justify-between items-center">
                <span>{mealPlan[day]?.title}</span>
                <button
                  onClick={() => assignRecipeToDay(day, null)}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ) : (
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => {
                  const recipe = savedRecipes.find(r => r.id === e.target.value);
                  if (recipe) assignRecipeToDay(day, recipe);
                }}
                value=""
              >
                <option value="">Select a recipe</option>
                {savedRecipes.map(recipe => (
                  <option key={recipe.id} value={recipe.id}>
                    {recipe.title}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}