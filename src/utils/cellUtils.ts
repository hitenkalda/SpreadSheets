export const COLUMNS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const DEFAULT_ROWS = 100;
export const DEFAULT_COLUMN_WIDTH = 100;
export const DEFAULT_ROW_HEIGHT = 25;

export function getCellId(col: string, row: number): string {
  return `${col}${row}`;
}

function evaluateRange(range: string, cells: { [key: string]: any }): number[] {
  const [start, end] = range.split(':');
  const startCol = start.match(/[A-Z]+/)![0];
  const startRow = parseInt(start.match(/\d+/)![0]);
  const endCol = end.match(/[A-Z]+/)![0];
  const endRow = parseInt(end.match(/\d+/)![0]);

  const values: number[] = [];
  
  for (let col = COLUMNS.indexOf(startCol); col <= COLUMNS.indexOf(endCol); col++) {
    for (let row = startRow; row <= endRow; row++) {
      const cellId = getCellId(COLUMNS[col], row);
      const cellValue = cells[cellId]?.value;
      if (cellValue && !isNaN(Number(cellValue))) {
        values.push(Number(cellValue));
      }
    }
  }
  
  return values;
}

export function parseFormula(formula: string, cells: { [key: string]: any }): number | string {
  if (!formula.startsWith('=')) return formula;
  
  try {
    const expression = formula.substring(1).toUpperCase();
    
    // Handle SUM function
    if (expression.startsWith('SUM(')) {
      const range = expression.slice(4, -1);
      const values = evaluateRange(range, cells);
      return values.reduce((a, b) => a + b, 0);
    }
    
    // Handle AVERAGE function
    if (expression.startsWith('AVERAGE(')) {
      const range = expression.slice(8, -1);
      const values = evaluateRange(range, cells);
      return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    }
    
    // Handle MAX function
    if (expression.startsWith('MAX(')) {
      const range = expression.slice(4, -1);
      const values = evaluateRange(range, cells);
      return values.length ? Math.max(...values) : 0;
    }
    
    // Handle MIN function
    if (expression.startsWith('MIN(')) {
      const range = expression.slice(4, -1);
      const values = evaluateRange(range, cells);
      return values.length ? Math.min(...values) : 0;
    }
    
    // Handle COUNT function
    if (expression.startsWith('COUNT(')) {
      const range = expression.slice(6, -1);
      const values = evaluateRange(range, cells);
      return values.length;
    }
    
    // Handle basic arithmetic
    return eval(expression);
  } catch {
    return '#ERROR!';
  }
}

export function getColumnFromId(cellId: string): string {
  return cellId.match(/[A-Z]+/)![0];
}

export function getRowFromId(cellId: string): number {
  return parseInt(cellId.match(/\d+/)![0]);
}

export function navigateCell(currentCell: string, direction: 'up' | 'down' | 'left' | 'right'): string {
  const col = getColumnFromId(currentCell);
  const row = getRowFromId(currentCell);
  
  switch (direction) {
    case 'up':
      return row > 1 ? getCellId(col, row - 1) : currentCell;
    case 'down':
      return getCellId(col, row + 1);
    case 'left':
      const colIndex = COLUMNS.indexOf(col);
      return colIndex > 0 ? getCellId(COLUMNS[colIndex - 1], row) : currentCell;
    case 'right':
      const nextColIndex = COLUMNS.indexOf(col) + 1;
      return nextColIndex < COLUMNS.length ? getCellId(COLUMNS[nextColIndex], row) : currentCell;
  }
}