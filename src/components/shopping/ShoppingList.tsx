import React, { useState } from 'react';
import { ShoppingCart, Search, Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import ProductSearch from './ProductSearch';
import type { ShoppingItem } from '../../types/shopping';

export default function ShoppingList() {
  const { user } = useAuth();
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  const addItem = (name: string, quantity: string = '1') => {
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        name,
        quantity,
        checked: false
      }
    ]);
    setNewItemName('');
    setShowSearch(false);
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please log in to use the shopping list.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart size={24} className="text-emerald-600" />
        <h2 className="text-2xl font-bold">Shopping List</h2>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Add item"
            className="flex-1 px-4 py-2 border rounded-lg"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && newItemName) {
                addItem(newItemName);
              }
            }}
          />
          <button
            onClick={() => setShowSearch(true)}
            className="p-2 text-emerald-600 hover:text-emerald-700"
            title="Search Products"
          >
            <Search size={24} />
          </button>
          <button
            onClick={() => newItemName && addItem(newItemName)}
            className="p-2 text-emerald-600 hover:text-emerald-700"
            disabled={!newItemName}
          >
            <Plus size={24} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {items.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleItem(item.id)}
              className="h-5 w-5 text-emerald-600"
            />
            <span className={`flex-1 ${item.checked ? 'line-through text-gray-400' : ''}`}>
              {item.name}
              {item.recipeName && (
                <span className="text-sm text-gray-500 ml-2">
                  (from {item.recipeName})
                </span>
              )}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {showSearch && (
        <ProductSearch
          onSelect={(product) => {
            addItem(product.name);
          }}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
  );
}