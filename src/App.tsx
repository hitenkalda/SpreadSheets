import React, { useState, useCallback } from 'react';
import { Toolbar } from './components/Toolbar';
import { FormulaBar } from './components/FormulaBar';
import { Grid } from './components/Grid';
import { SpreadsheetState, CellData, CellType } from './types';
import { COLUMNS, parseFormula } from './utils/cellUtils';

export default function App() {
  const [state, setState] = useState<SpreadsheetState>({
    cells: {},
    selectedCell: null,
    selectionRange: null,
    columnWidths: COLUMNS.reduce((acc, col) => ({ ...acc, [col]: 100 }), {}),
    rowHeights: {},
    dragStart: null,
  });

  const handleCellSelect = useCallback((cellId: string) => {
    setState((prev) => ({
      ...prev,
      selectedCell: cellId,
    }));
  }, []);

  const handleCellChange = useCallback((cellId: string, value: string) => {
    setState((prev) => {
      const newCells = { ...prev.cells };
      const currentCell = newCells[cellId] || {
        value: '',
        formula: '',
        type: 'text',
        style: {
          bold: false,
          italic: false,
          fontSize: 14,
          color: '#000000',
          backgroundColor: '#ffffff',
          textAlign: 'left'
        }
      };

      if (value.startsWith('=')) {
        const result = parseFormula(value, prev.cells);
        newCells[cellId] = {
          ...currentCell,
          value: String(result),
          formula: value,
        };
      } else {
        newCells[cellId] = {
          ...currentCell,
          value: value,
          formula: '',
        };
      }

      return {
        ...prev,
        cells: newCells,
      };
    });
  }, []);

  const handleStyleChange = useCallback((style: Partial<{ bold: boolean; italic: boolean; textAlign: 'left' | 'center' | 'right' }>) => {
    setState((prev) => {
      if (!prev.selectedCell) return prev;

      const newCells = { ...prev.cells };
      const currentCell = newCells[prev.selectedCell] || {
        value: '',
        formula: '',
        type: 'text',
        style: {
          bold: false,
          italic: false,
          fontSize: 14,
          color: '#000000',
          backgroundColor: '#ffffff',
          textAlign: 'left'
        }
      };

      newCells[prev.selectedCell] = {
        ...currentCell,
        style: {
          ...currentCell.style,
          ...style,
          bold: style.bold ? !currentCell.style.bold : currentCell.style.bold,
          italic: style.italic ? !currentCell.style.italic : currentCell.style.italic,
        },
      };

      return {
        ...prev,
        cells: newCells,
      };
    });
  }, []);

  const handleTypeChange = useCallback((type: CellType) => {
    setState((prev) => {
      if (!prev.selectedCell) return prev;

      const newCells = { ...prev.cells };
      const currentCell = newCells[prev.selectedCell] || {
        value: '',
        formula: '',
        type: 'text',
        style: {
          bold: false,
          italic: false,
          fontSize: 14,
          color: '#000000',
          backgroundColor: '#ffffff',
          textAlign: 'left'
        }
      };

      newCells[prev.selectedCell] = {
        ...currentCell,
        type,
        value: type === 'date' ? new Date().toISOString().split('T')[0] : currentCell.value
      };

      return {
        ...prev,
        cells: newCells
      };
    });
  }, []);

  const handleSave = useCallback(() => {
    const data = JSON.stringify(state);
    localStorage.setItem('spreadsheet-data', data);
  }, [state]);

  const handleLoad = useCallback(() => {
    const data = localStorage.getItem('spreadsheet-data');
    if (data) {
      setState(JSON.parse(data));
    }
  }, []);

  const handleDragStart = useCallback((e: React.DragEvent, cellId: string) => {
    setState(prev => ({
      ...prev,
      dragStart: cellId
    }));
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetCellId: string) => {
    e.preventDefault();
    setState(prev => {
      if (!prev.dragStart || prev.dragStart === targetCellId) return prev;

      const newCells = { ...prev.cells };
      const sourceCell = newCells[prev.dragStart];
      if (!sourceCell) return prev;

      newCells[targetCellId] = { ...sourceCell };
      
      return {
        ...prev,
        cells: newCells,
        dragStart: null
      };
    });
  }, []);

  const selectedCellData = state.selectedCell ? state.cells[state.selectedCell] : null;

  return (
    <div className="h-screen flex flex-col">
      <Toolbar 
        onStyleChange={handleStyleChange}
        onTypeChange={handleTypeChange}
        onSave={handleSave}
        onLoad={handleLoad}
      />
      <FormulaBar
        value={selectedCellData?.formula || selectedCellData?.value || ''}
        onChange={(value) => state.selectedCell && handleCellChange(state.selectedCell, value)}
        selectedCell={state.selectedCell}
      />
      <Grid
        state={state}
        onCellSelect={handleCellSelect}
        onCellChange={handleCellChange}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
    </div>
  );
}