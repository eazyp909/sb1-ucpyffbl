import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import IngredientInput from './components/IngredientInput';
import RecipeSection from './components/RecipeSection';
import DietaryRestrictions from './components/DietaryRestrictions';
import AuthModal from './components/AuthModal';
import MealPlanner from './components/MealPlanner';
import ShoppingList from './components/shopping/ShoppingList';
import { useAuth } from './hooks/useAuth';
import { generateRecipe } from './services/api';
import type { Ingredient, Recipe } from './types';

export default function App() {
  const { user } = useAuth();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'recipes' | 'planner' | 'shopping'>('recipes');

  // Add error boundary
  useEffect(() => {
    window.onerror = (message) => {
      console.error('Global error:', message);
      setError(message as string);
    };
  }, []);

  const handleIngredientsSubmit = async (ingredients: Ingredient[]) => {
    try {
      setError(null);
      const recipe = await generateRecipe(ingredients, dietaryRestrictions);
      setRecipe(recipe);
    } catch (error) {
      console.error('Failed to generate recipe:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate recipe');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4 mt-8">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-12">
        <Header 
          isLoggedIn={!!user} 
          onAuthClick={() => setIsAuthModalOpen(true)}
          onMealPlannerClick={() => setCurrentView('planner')}
          onShoppingListClick={() => setCurrentView('shopping')}
          onHomeClick={() => setCurrentView('recipes')}
          currentView={currentView}
        />

        {currentView !== 'recipes' && (
          <button
            onClick={() => setCurrentView('recipes')}
            className="mb-6 text-emerald-600 hover:text-emerald-700"
          >
            ← Back to Recipe Finder
          </button>
        )}

        {renderContent()}

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </div>
  );

  function renderContent() {
    switch (currentView) {
      case 'planner':
        return <MealPlanner />;
      case 'shopping':
        return <ShoppingList />;
      default:
        return (
          <>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 text-center">
              Enter the ingredients you have, and let our AI chef create the perfect recipe for you.
              Don't worry if you're missing some ingredients – we'll suggest alternatives!
            </p>

            <div className="max-w-2xl mx-auto mb-8">
              <DietaryRestrictions
                selectedRestrictions={dietaryRestrictions}
                onChange={setDietaryRestrictions}
              />
            </div>

            <div className="mb-12">
              <IngredientInput onIngredientsSubmit={handleIngredientsSubmit} />
            </div>

            <RecipeSection recipe={recipe} />
          </>
        );
    }
  }
}