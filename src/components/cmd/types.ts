// Command types and interfaces for the CMD app

import React from 'react';

export interface Command {
  name: string;
  description: string;
  usage: string;
  execute: (
    args: string[],
    data?: any
  ) => Promise<
    | string
    | React.JSX.Element
    | { output: string | React.JSX.Element; skipAnimation?: boolean }
  >;
}

export interface CommandOutput {
  id: string;
  command: string;
  output: string | React.JSX.Element;
  timestamp: Date;
  isError?: boolean;
  skipAnimation?: boolean;
}

export interface TerminalState {
  commandHistory: string[];
  outputHistory: CommandOutput[];
  currentInput: string;
  historyIndex: number;
  currentDirectory: string;
  isAnimating: boolean;
}

export interface TypewriterOptions {
  speed?: number; // milliseconds per character
  skipAnimation?: boolean;
  onComplete?: () => void;
}

export interface ASCIITableOptions {
  headers: string[];
  rows: string[][];
  borderStyle?: 'single' | 'double' | 'rounded';
  padding?: number;
}
