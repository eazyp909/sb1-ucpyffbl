import React from 'react';
import type { Recipe } from '../types';
import RecipeCard from './RecipeCard';
import ErrorBoundary from './ErrorBoundary';

interface Props {
  recipe: Recipe | null;
  isLoading?: boolean;
  error?: string | null;
}

export default function RecipeSection({ recipe, isLoading, error }: Props) {
  if (error) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!recipe) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <ErrorBoundary>
        <RecipeCard recipe={recipe} />
      </ErrorBoundary>
    </div>
  );
}