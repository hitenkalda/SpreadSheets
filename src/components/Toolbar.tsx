import React, { useState } from 'react';
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight, Save, FileUp, Calendar, Type, Hash, Pencil } from 'lucide-react';

interface ToolbarProps {
  onStyleChange: (style: Partial<{
    bold: boolean;
    italic: boolean;
    textAlign: 'left' | 'center' | 'right';
  }>) => void;
  onTypeChange: (type: 'text' | 'number' | 'date') => void;
  onDataChange: (data: any) => void;
  data: any;
}

export function Toolbar({ onStyleChange, onTypeChange, onDataChange, data }: ToolbarProps) {
  const [fileName, setFileName] = useState('spreadsheet');

  const handleSave = () => {
    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert('File downloaded successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to download file.');
    }
  };

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const loadedData = JSON.parse(e.target?.result as string);
          onDataChange(loadedData);
          alert('File loaded successfully!');
        } catch (error) {
          console.error('Error loading data:', error);
          alert('Failed to load file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-white border-b">
      <div className="flex items-center gap-2 border-r pr-2">
        <input 
          type="text" 
          value={fileName} 
          onChange={(e) => setFileName(e.target.value)} 
          className="p-1 border rounded text-sm"
          placeholder="File Name"
          title="Enter file name"
        />
        <Pencil className="w-4 h-4 text-gray-500" />
      </div>
      
      <div className="flex items-center gap-1 border-r pr-2">
        <button 
          className="p-1 hover:bg-gray-100 rounded"
          onClick={handleSave}
          title="Download File"
        >
          <Save className="w-4 h-4" />
        </button>
        <label className="p-1 hover:bg-gray-100 rounded cursor-pointer" title="Load File">
          <FileUp className="w-4 h-4" />
          <input 
            type="file" 
            accept=".json" 
            onChange={handleLoad} 
            className="hidden"
          />
        </label>
      </div>
      
      <div className="flex items-center gap-1 border-r pr-2">
        <button 
          className="p-1 hover:bg-gray-100 rounded"
          onClick={() => onStyleChange({ bold: true })}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button 
          className="p-1 hover:bg-gray-100 rounded"
          onClick={() => onStyleChange({ italic: true })}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex items-center gap-1 border-r pr-2">
        <button 
          className="p-1 hover:bg-gray-100 rounded"
          onClick={() => onStyleChange({ textAlign: 'left' })}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button 
          className="p-1 hover:bg-gray-100 rounded"
          onClick={() => onStyleChange({ textAlign: 'center' })}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button 
          className="p-1 hover:bg-gray-100 rounded"
          onClick={() => onStyleChange({ textAlign: 'right' })}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button 
          className="p-1 hover:bg-gray-100 rounded flex items-center gap-1 text-sm"
          onClick={() => onTypeChange('text')}
          title="Text"
        >
          <Type className="w-4 h-4" />
          <span>Text</span>
        </button>
        <button 
          className="p-1 hover:bg-gray-100 rounded flex items-center gap-1 text-sm"
          onClick={() => onTypeChange('number')}
          title="Number"
        >
          <Hash className="w-4 h-4" />
          <span>Number</span>
        </button>
        <button 
          className="p-1 hover:bg-gray-100 rounded flex items-center gap-1 text-sm"
          onClick={() => onTypeChange('date')}
          title="Date"
        >
          <Calendar className="w-4 h-4" />
          <span>Date</span>
        </button>
      </div>
    </div>
  );
}
