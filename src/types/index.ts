export type CellType = 'text' | 'number' | 'date';

export interface CellData {
  value: string;
  formula: string;
  type: CellType;
  style: CellStyle;
}

export interface CellStyle {
  bold: boolean;
  italic: boolean;
  fontSize: number;
  color: string;
  backgroundColor: string;
  textAlign: 'left' | 'center' | 'right';
}

export interface SpreadsheetState {
  cells: { [key: string]: CellData };
  selectedCell: string | null;
  selectionRange: string[] | null;
  columnWidths: { [key: string]: number };
  rowHeights: { [key: number]: number };
  dragStart: string | null;
}