import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Ingredient } from '../types';

interface Props {
  onIngredientsSubmit: (ingredients: Ingredient[]) => void;
}

export default function IngredientInput({ onIngredientsSubmit }: Props) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addIngredient = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      setIngredients(prev => [...prev, { name: trimmedValue }]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Check if the user entered a comma
    if (value.includes(',')) {
      const parts = value.split(',');
      const lastPart = parts.pop() || '';
      
      // Add all complete parts as ingredients
      parts.forEach(part => addIngredient(part));
      
      // Keep the last part in the input
      setInputValue(lastPart);
    } else {
      setInputValue(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      addIngredient(inputValue);
      setInputValue('');
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add the current input value if it exists
    if (inputValue.trim()) {
      addIngredient(inputValue);
      setInputValue('');
    }

    if (ingredients.length > 0) {
      setIsLoading(true);
      onIngredientsSubmit(ingredients);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-2 border border-gray-300 rounded-lg bg-white">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full"
            >
              <span>{ingredient.name}</span>
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="p-1 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={ingredients.length === 0 ? "Enter ingredients (press Enter or use commas)" : "Add another ingredient"}
            className="flex-1 min-w-[200px] border-none focus:ring-0 focus:outline-none bg-transparent"
          />
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={isLoading || (ingredients.length === 0 && !inputValue.trim())}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Finding Recipe...' : 'Get Recipe'}
        </button>
      </div>
    </form>
  );
}