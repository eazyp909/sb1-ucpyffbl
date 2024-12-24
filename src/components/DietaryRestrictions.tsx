import React from 'react';

const DIETARY_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Nut-Free',
  'Kosher',
  'Halal',
  'Low-Carb',
] as const;

interface Props {
  selectedRestrictions: string[];
  onChange: (restrictions: string[]) => void;
}

export default function DietaryRestrictions({ selectedRestrictions, onChange }: Props) {
  const toggleRestriction = (restriction: string) => {
    const newRestrictions = selectedRestrictions.includes(restriction)
      ? selectedRestrictions.filter(r => r !== restriction)
      : [...selectedRestrictions, restriction];
    onChange(newRestrictions);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Dietary Restrictions</h3>
      <div className="flex flex-wrap gap-2">
        {DIETARY_OPTIONS.map(restriction => (
          <button
            key={restriction}
            onClick={() => toggleRestriction(restriction)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedRestrictions.includes(restriction)
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {restriction}
          </button>
        ))}
      </div>
    </div>
  );
}