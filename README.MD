# Google Sheets Clone

## Project Overview
A highly interactive web application that replicates Google Sheets with core functionalities like data entry, mathematical calculations, dynamic cell updates, and seamless keyboard navigation. The application includes advanced features like drag-and-drop, real-time formula evaluation, and file operations (save/load).

## Key Features

### 1. Spreadsheet Interface
- **Google Sheets UI Replica:** Toolbar with options like New Sheet, Save, Load, Bold, Italic, Alignment, and Data Type selectors.
- **Formula Bar:** For inputting and editing formulas.
- **Editable Grid:** Supports text, number, and date data types with dynamic cell editing.
- **Drag and Drop:** Copy cell content and formulas across cells.
- **Cell Dependencies:** Real-time updates of formulas when dependent cells change.
- **Cell Formatting:** Bold, Italic, text alignment, font color, background color, and borders.
- **Row/Column Operations:** Add, delete, and resize rows and columns.
- **Keyboard Navigation:** Arrow keys, Enter, Tab, Ctrl+C/V for navigation and copy-paste.

### 2. Mathematical Functions
- `=SUM(range)`: Sums values in the specified range.
- `=AVERAGE(range)`: Averages values in the specified range.
- `=MAX(range)`: Returns the maximum value.
- `=MIN(range)`: Returns the minimum value.
- `=COUNT(range)`: Counts numeric values in the range.

### 3. Data Quality Functions
- `=TRIM(cell)`: Removes leading/trailing whitespaces.
- `=UPPER(cell)`: Converts text to uppercase.
- `=LOWER(cell)`: Converts text to lowercase.
- `=REMOVE_DUPLICATES(range)`: Removes duplicate rows.
- `=FIND_AND_REPLACE(find, replace, range)`: Replaces specified text.

### 4. Data Entry and Validation
- **Data Types:** Supports text, numbers, and dates with easy type switching.
- **Validation:** Prevents invalid entries (e.g., text in numeric cells).
- **Formula Input:** Real-time calculation of formulas entered in the formula bar.

### 5. Functional Toolbar
- **Save Button:** Downloads the spreadsheet as a JSON file.
- **Load Button:** Uploads a JSON file to restore data.
- **Bold/Italic/Alignment:** Applies selected styles to cells.
- **Data Type Selector:** Switches cells between text, number, and date types.

### 6. Enhanced Usability
- **Drag-and-Drop:** Smooth copying of data/formulas.
- **Date Picker:** User-friendly date input with calendar integration.
- **Real-Time Formula Updates:** Reflects changes instantly when dependent cells are modified.

## Tech Stack

### Frontend
- **React.js:** Dynamic UI rendering and component-based structure.
- **TypeScript:** Type safety for maintainability and scalability.
- **Tailwind CSS:** Fast and customizable styling.
- **Lucide-React Icons:** For toolbar icons.

### Utilities
- **Custom Formula Parser:** For parsing and evaluating mathematical and data quality functions.
- **LocalStorage API:** For persisting spreadsheet data.

### Optional Backend
- **Node.js + Express.js (Optional):** For future cloud storage capabilities.

## Data Structures

### 1. **Cell Data Representation**
```typescript
interface CellData {
  value: string;         // Raw value or formula (e.g., '=SUM(A1:A5)')
  displayValue: string;  // Evaluated result displayed in the cell
  bold: boolean;         // Bold formatting
  italic: boolean;       // Italic formatting
  textAlign: 'left' | 'center' | 'right';
  type: 'text' | 'number' | 'date';
}
```

### 2. **Spreadsheet State Management**
```typescript
interface SpreadsheetState {
  cells: Record<string, CellData>;  // Keyed by cell reference (e.g., 'A1')
  selectedCell: string | null;      // Currently selected cell
  fileName: string;                 // Name of the file for saving/loading
}
```

### 3. **Formula Parsing and Evaluation**
- Custom parsing engine to interpret formulas.
- Handles ranges (e.g., `A1:A5`) and individual references.
- Supports arithmetic and predefined functions (`SUM`, `AVERAGE`).

## Installation and Running the Project

### Prerequisites
- Node.js >= 14.x
- npm >= 6.x

### Installation
```bash
npm install
```

### Running the Project
```bash
npm run dev
```

### Deployment
- Deployed on vercel, Link - https://spread-sheets.vercel.app/

## Future Enhancements
- **Advanced Formulas:** IF, VLOOKUP support.
- **Data Visualization:** Chart generation.
- **Undo/Redo Functionality.**
- **Cloud Integration:** Save/load to the cloud.

## Conclusion
This Google Sheets Clone offers essential spreadsheet functionality with a clean and responsive UI. With robust data handling, dynamic updates, and user-friendly controls, it serves as a solid foundation for expanding into a full-fledged spreadsheet application.
