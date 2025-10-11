// Utility functions for ASCII formatting and text manipulation

import type { ASCIITableOptions } from './types';

// Box-drawing characters for ASCII tables
const BORDERS = {
  single: {
    topLeft: '┌',
    topRight: '┐',
    bottomLeft: '└',
    bottomRight: '┘',
    horizontal: '─',
    vertical: '│',
    cross: '┼',
    topT: '┬',
    bottomT: '┴',
    leftT: '├',
    rightT: '┤',
  },
  double: {
    topLeft: '╔',
    topRight: '╗',
    bottomLeft: '╚',
    bottomRight: '╝',
    horizontal: '═',
    vertical: '║',
    cross: '╬',
    topT: '╦',
    bottomT: '╩',
    leftT: '╠',
    rightT: '╣',
  },
  rounded: {
    topLeft: '╭',
    topRight: '╮',
    bottomLeft: '╰',
    bottomRight: '╯',
    horizontal: '─',
    vertical: '│',
    cross: '┼',
    topT: '┬',
    bottomT: '┴',
    leftT: '├',
    rightT: '┤',
  },
};

export const createASCIITable = (options: ASCIITableOptions): string => {
  const { headers, rows, borderStyle = 'single', padding = 1 } = options;
  const border = BORDERS[borderStyle];

  if (headers.length === 0) return '';

  // Calculate column widths
  const columnWidths = headers.map((header, index) => {
    const headerWidth = header.length;
    const maxRowWidth = Math.max(...rows.map(row => (row[index] || '').length));
    return Math.max(headerWidth, maxRowWidth) + padding * 2;
  });

  // Create top border
  let result = border.topLeft;
  columnWidths.forEach((width, index) => {
    result += border.horizontal.repeat(width);
    if (index < columnWidths.length - 1) {
      result += border.topT;
    }
  });
  result += border.topRight + '\n';

  // Create header row
  result += border.vertical;
  headers.forEach((header, index) => {
    const paddedHeader = header
      .padStart(header.length + padding)
      .padEnd(columnWidths[index]);
    result += paddedHeader + border.vertical;
  });
  result += '\n';

  // Create separator
  result += border.leftT;
  columnWidths.forEach((width, index) => {
    result += border.horizontal.repeat(width);
    if (index < columnWidths.length - 1) {
      result += border.cross;
    }
  });
  result += border.rightT + '\n';

  // Create data rows
  rows.forEach(row => {
    result += border.vertical;
    headers.forEach((_, index) => {
      const cellValue = (row[index] || '').toString();
      const paddedCell = cellValue
        .padStart(cellValue.length + padding)
        .padEnd(columnWidths[index]);
      result += paddedCell + border.vertical;
    });
    result += '\n';
  });

  // Create bottom border
  result += border.bottomLeft;
  columnWidths.forEach((width, index) => {
    result += border.horizontal.repeat(width);
    if (index < columnWidths.length - 1) {
      result += border.bottomT;
    }
  });
  result += border.bottomRight;

  return result;
};

export const formatFileSize = (bytes: number): string => {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const createProgressBar = (
  current: number,
  total: number,
  width: number = 20
): string => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));
  const filled = Math.floor((percentage / 100) * width);
  const empty = width - filled;

  return `[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${percentage.toFixed(1)}%`;
};

export const centerText = (text: string, width: number): string => {
  if (text.length >= width) return text;
  const padding = Math.floor((width - text.length) / 2);
  return ' '.repeat(padding) + text;
};

export const wrapText = (text: string, width: number): string[] => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + word).length <= width) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
};

export const generateRandomQuote = (): string => {
  const quotes = [
    'The best way to predict the future is to create it.',
    "Code is like humor. When you have to explain it, it's bad.",
    'First, solve the problem. Then, write the code.',
    'Experience is the name everyone gives to their mistakes.',
    'In software, the most beautiful code is the most readable.',
    'The only way to go fast is to go well.',
    'Clean code always looks like it was written by someone who cares.',
    'Simplicity is the ultimate sophistication.',
  ];

  return quotes[Math.floor(Math.random() * quotes.length)];
};

export const parseCommand = (
  input: string
): { command: string; args: string[] } => {
  const trimmed = input.trim();
  if (!trimmed) return { command: '', args: [] };

  const parts = trimmed.split(/\s+/);
  return {
    command: parts[0].toLowerCase(),
    args: parts.slice(1),
  };
};
