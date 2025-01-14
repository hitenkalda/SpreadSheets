import React, { useState, useRef, useEffect } from 'react';
import { CellData } from '../types';
import { Calendar } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

interface CellProps {
  id: string;
  data: CellData;
  isSelected: boolean;
  width: number;
  height: number;
  onSelect: () => void;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onDragStart: (e: React.DragEvent, cellId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, cellId: string) => void;
}

export function Cell({
  id,
  data,
  isSelected,
  width,
  height,
  onSelect,
  onChange,
  onKeyDown,
  onDragStart,
  onDragOver,
  onDrop
}: CellProps) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSelected && editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSelected, editing]);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (editing) {
      if (e.key === 'Enter') {
        setEditing(false);
        onKeyDown(e);
      }
    } else {
      onKeyDown(e);
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        setEditing(true);
      }
    }
  };

  const validateInput = (value: string): string => {
    if (data.type === 'number') {
      const num = Number(value);
      if (isNaN(num)) {
        return '#ERROR: Not a number';
      }
      return value;
    }
    if (data.type === 'date') {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return '#ERROR: Invalid date';
      }
      return value;
    }
    return value;
  };

  const handleChange = (value: string) => {
    const validatedValue = validateInput(value);
    onChange(validatedValue);
  };

  const cellStyle = {
    width: `${width}px`,
    height: `${height}px`,
    fontWeight: data.style.bold ? 'bold' : 'normal',
    fontStyle: data.style.italic ? 'italic' : 'normal',
    fontSize: `${data.style.fontSize}px`,
    color: data.style.color,
    backgroundColor: data.style.backgroundColor,
    textAlign: data.style.textAlign as any,
  };

  const renderCellContent = () => {
    if (data.type === 'date' && data.value) {
      return (
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-gray-400" />
          <span>{formatDate(data.value)}</span>
        </div>
      );
    }
    return data.value;
  };

  return (
    <div
      className={`border-r border-b relative ${
        isSelected ? 'ring-2 ring-blue-500 z-10' : ''
      } ${data.type === 'date' ? 'text-blue-600' : ''}`}
      style={cellStyle}
      onClick={onSelect}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isSelected ? 0 : -1}
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, id)}
    >
      {editing ? (
        <input
          ref={inputRef}
          type={data.type === 'date' ? 'date' : 'text'}
          value={data.formula || data.value}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          className="absolute inset-0 w-full h-full px-1 border-none outline-none"
        />
      ) : (
        <div className="px-1 truncate">
          {renderCellContent()}
        </div>
      )}
      {data.type !== 'text' && (
        <div className="absolute top-0 right-0 text-[8px] text-gray-400 px-0.5">
          {data.type}
        </div>
      )}
    </div>
  );
}