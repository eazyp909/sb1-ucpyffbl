import React from 'react';
import { ChefHat, LogIn, Calendar, ShoppingCart } from 'lucide-react';

interface Props {
  isLoggedIn: boolean;
  currentView: 'recipes' | 'planner' | 'shopping';
  onAuthClick: () => void;
  onMealPlannerClick: () => void;
  onShoppingListClick: () => void;
  onHomeClick: () => void;
}

export default function Header({ 
  isLoggedIn, 
  currentView,
  onAuthClick, 
  onMealPlannerClick,
  onShoppingListClick,
  onHomeClick
}: Props) {
  return (
    <header className="flex justify-between items-center mb-12">
      <div 
        className="flex items-center gap-3 cursor-pointer" 
        onClick={onHomeClick}
      >
        <ChefHat size={40} className="text-emerald-600" />
        <h1 className="text-4xl font-bold text-gray-800">Recipe Finder</h1>
      </div>
      
      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <>
            <button
              onClick={onMealPlannerClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'planner'
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-600 border border-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <Calendar size={20} />
              Meal Planner
            </button>
            <button
              onClick={onShoppingListClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'shopping'
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-600 border border-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <ShoppingCart size={20} />
              Shopping List
            </button>
          </>
        )}
        <button
          onClick={onAuthClick}
          className="flex items-center gap-2 px-4 py-2 text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50"
        >
          <LogIn size={20} />
          {isLoggedIn ? 'Profile' : 'Login'}
        </button>
      </div>
    </header>
  );
}