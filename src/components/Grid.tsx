import React from 'react';
import { Cell } from './Cell';
import { COLUMNS, DEFAULT_ROWS, getCellId, navigateCell } from '../utils/cellUtils';
import { SpreadsheetState, CellData } from '../types';

interface GridProps {
  state: SpreadsheetState;
  onCellSelect: (cellId: string) => void;
  onCellChange: (cellId: string, value: string) => void;
  onDragStart: (e: React.DragEvent, cellId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, cellId: string) => void;
}

export function Grid({ state, onCellSelect, onCellChange, onDragStart, onDragOver, onDrop }: GridProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!state.selectedCell) return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        onCellSelect(navigateCell(state.selectedCell, 'up'));
        break;
      case 'ArrowDown':
        e.preventDefault();
        onCellSelect(navigateCell(state.selectedCell, 'down'));
        break;
      case 'ArrowLeft':
        if (!e.shiftKey) {
          e.preventDefault();
          onCellSelect(navigateCell(state.selectedCell, 'left'));
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        onCellSelect(navigateCell(state.selectedCell, 'right'));
        break;
      case 'Enter':
        e.preventDefault();
        onCellSelect(navigateCell(state.selectedCell, 'down'));
        break;
      case 'Tab':
        e.preventDefault();
        onCellSelect(navigateCell(state.selectedCell, e.shiftKey ? 'left' : 'right'));
        break;
    }
  };

  const renderHeaderCell = (content: string | number) => (
    <div className="bg-gray-100 border-r border-b px-1 flex items-center justify-center font-medium">
      {content}
    </div>
  );

  return (
    <div className="flex-1 overflow-auto">
      <div className="inline-block">
        <div className="flex">
          <div className="w-[50px] h-[25px] bg-gray-100 border-r border-b" />
          {COLUMNS.map((col) => (
            <div
              key={col}
              style={{ width: state.columnWidths[col] || 100 }}
              className="h-[25px]"
            >
              {renderHeaderCell(col)}
            </div>
          ))}
        </div>
        
        {Array.from({ length: DEFAULT_ROWS }, (_, i) => i + 1).map((row) => (
          <div key={row} className="flex">
            {renderHeaderCell(row)}
            {COLUMNS.map((col) => {
              const cellId = getCellId(col, row);
              const cellData: CellData = state.cells[cellId] || {
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

              return (
                <Cell
                  key={cellId}
                  id={cellId}
                  data={cellData}
                  isSelected={state.selectedCell === cellId}
                  width={state.columnWidths[col] || 100}
                  height={state.rowHeights[row] || 25}
                  onSelect={() => onCellSelect(cellId)}
                  onChange={(value) => onCellChange(cellId, value)}
                  onKeyDown={handleKeyDown}
                  onDragStart={onDragStart}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}