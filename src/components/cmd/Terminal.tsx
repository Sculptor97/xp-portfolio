// Main terminal component that handles command execution and display

import React, { useState, useEffect, useRef } from 'react';
import TypewriterText from './TypewriterText';
import { useTerminal } from './useTerminal';
import type { CommandOutput } from './types';

interface TerminalProps {
  onExit?: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onExit }) => {
  const {
    state,
    isWaitingForData,
    addOutput,
    createAnimationCompleteCallback,
    handleKeyDown,
    handleInputChange,
  } = useTerminal(onExit);

  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const welcomeShownRef = useRef(false);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [state.outputHistory]);

  // Focus input on mount and after command execution
  useEffect(() => {
    if (inputRef.current && !state.isAnimating && !isWaitingForData) {
      inputRef.current.focus();
    }
  }, [state.isAnimating, isWaitingForData]);

  // Welcome message on first load
  useEffect(() => {
    if (state.outputHistory.length === 0 && !welcomeShownRef.current) {
      welcomeShownRef.current = true;
      const welcomeOutput: CommandOutput = {
        id: `welcome-${Date.now()}`,
        command: '',
        output: `
Legha-gha XP [Version 5.1.2600]
(C) Copyright ${new Date().getFullYear()} Legha-gha.

C:\\Users\\Legha-gha> Welcome to the Legha-gha XP Terminal!

Type 'help' to see all available commands.
Type 'about' to learn more about the developer.
Type 'exit' to exit the terminal.
Use the arrow keys to navigate through the command history.
        `.trim(),
        timestamp: new Date(),
        skipAnimation: true, // Don't animate welcome message
      };
      addOutput(welcomeOutput);
    }
  }, [addOutput, state.outputHistory.length]);

  return (
    <div
      ref={terminalRef}
      className="terminal-container h-full w-full bg-black text-white font-mono text-sm overflow-y-auto p-2"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output History */}
      {state.outputHistory.map(output => (
        <div key={output.id} className="mb-1">
          {output.command && (
            <div className="text-green-400">
              C:\Users\Legha-gha&gt; {output.command}
            </div>
          )}
          {output.output && (
            <div
              className={`whitespace-pre-wrap ${output.isError ? 'text-red-400' : 'text-white'}`}
            >
              {typeof output.output === 'string' ? (
                output.skipAnimation ? (
                  <span
                    className={output.isError ? 'text-red-400' : 'text-white'}
                  >
                    {output.output}
                  </span>
                ) : (
                  <TypewriterText
                    text={output.output}
                    speed={20}
                    className={output.isError ? 'text-red-400' : 'text-white'}
                    onComplete={createAnimationCompleteCallback(output.id)}
                  />
                )
              ) : (
                output.output
              )}
            </div>
          )}
        </div>
      ))}

      {/* Current Input Line */}
      {!state.isAnimating && !isWaitingForData && (
        <div className="flex items-center">
          <span className="text-green-400">C:\Users\Legha-gha&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={state.currentInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="bg-transparent text-white outline-none flex-1 ml-1"
            autoComplete="off"
            spellCheck="false"
          />
          <span
            className={`text-green-400 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
          ></span>
        </div>
      )}
    </div>
  );
};

export default Terminal;
