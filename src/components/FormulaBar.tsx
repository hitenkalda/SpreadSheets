import React from 'react';

interface FormulaBarProps {
  value: string;
  onChange: (value: string) => void;
  selectedCell: string | null;
}

export function FormulaBar({ value, onChange, selectedCell }: FormulaBarProps) {
  return (
    <div className="flex items-center gap-2 p-2 bg-white border-b">
      <div className="w-20 px-2 py-1 bg-gray-100 rounded text-sm">
        {selectedCell || ''}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
        placeholder="Enter a value or formula..."
      />
    </div>
  );
}