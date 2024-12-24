import React, { useState } from 'react';
import { X } from 'lucide-react';
import { searchProducts, getAvailableStores } from '../../services/retailers';
import type { StoreProduct } from '../../types/shopping';

interface Props {
  onSelect: (product: StoreProduct) => void;
  onClose: () => void;
}

export default function ProductSearch({ onSelect, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>('');
  const stores = getAvailableStores();

  const handleSearch = async () => {
    if (!query) return;
    const results = await searchProducts(query, selectedStore);
    setProducts(results);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Search Products</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Stores</option>
            {stores.map(store => (
              <option key={store.id} value={store.id}>{store.name}</option>
            ))}
          </select>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border rounded-lg"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Search
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {products.map(product => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelect(product)}
            >
              {product.image && (
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
              )}
              <div className="flex-1">
                <h4 className="font-medium">{product.name}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <img src={product.store.logo} alt={product.store.name} className="h-4" />
                  <span>${product.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}