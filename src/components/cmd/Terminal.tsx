// Main terminal component that handles command execution and display

import React, { useState, useEffect, useRef, useCallback } from 'react';
import TypewriterText from './TypewriterText';
import { getCommand } from './CommandRegistry';
import { parseCommand } from './utils';
import {
  usePortfolio,
  useProjects,
  useSkills,
  useServices,
  useContactConfig,
  useSocialProfiles,
} from '@/services/portfolioQueries';
import type { CommandOutput, TerminalState } from './types';

interface TerminalProps {
  onExit?: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onExit }) => {
  const [state, setState] = useState<TerminalState>({
    commandHistory: [],
    outputHistory: [],
    currentInput: '',
    historyIndex: -1,
    currentDirectory: 'C:\\Legha-gha',
    isExecuting: false,
  });

  // Fetch all portfolio data
  const { data: portfolio } = usePortfolio();
  const { data: projects } = useProjects();
  const { data: skills } = useSkills();
  const { data: services } = useServices();
  const { data: contactConfig } = useContactConfig();
  const { data: socialProfiles } = useSocialProfiles();

  const portfolioData = {
    portfolio,
    projects,
    skills,
    services,
    contactConfig,
    socialProfiles,
  };

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
    if (inputRef.current && !state.isExecuting) {
      inputRef.current.focus();
    }
  }, [state.isExecuting]);

  const addOutput = useCallback((output: CommandOutput) => {
    setState(prev => ({
      ...prev,
      outputHistory: [...prev.outputHistory.slice(-999), output], // Keep last 1000 outputs
    }));
  }, []);

  const executeCommand = useCallback(
    async (input: string) => {
      if (!input.trim()) return;

      const { command, args } = parseCommand(input);

      // Add command to history
      setState(prev => ({
        ...prev,
        commandHistory: [...prev.commandHistory, input],
        historyIndex: -1,
        isExecuting: true,
      }));

      // Add command to output
      const commandOutput: CommandOutput = {
        id: Date.now().toString(),
        command: input,
        output: '',
        timestamp: new Date(),
      };
      addOutput(commandOutput);

      try {
        const cmd = getCommand(command);

        if (!cmd) {
          addOutput({
            id: (Date.now() + 1).toString(),
            command: '',
            output: `'${command}' is not recognized as an internal or external command, operable program or batch file.`,
            timestamp: new Date(),
            isError: true,
          });
          return;
        }

        // Handle special commands
        if (command === 'cls' || command === 'clear') {
          setState(prev => ({
            ...prev,
            outputHistory: prev.outputHistory.filter(output =>
              output.id.startsWith('welcome-')
            ), // Keep only welcome message
            isExecuting: false,
          }));
          return;
        }

        if (command === 'exit') {
          onExit?.();
          return;
        }

        // Execute command with data
        const result = await cmd.execute(args, portfolioData);

        // Handle special return values
        if (result === 'MATRIX_ANIMATION') {
          // TODO: Implement matrix animation
          addOutput({
            id: (Date.now() + 1).toString(),
            command: '',
            output: 'Oops caught up with other projects... (Coming soon!)',
            timestamp: new Date(),
          });
        } else {
          // Handle both string/JSX.Element and object with skipAnimation
          const output =
            typeof result === 'object' && 'output' in result
              ? result.output
              : result;
          const skipAnimation =
            typeof result === 'object' && 'skipAnimation' in result
              ? result.skipAnimation
              : false;

          addOutput({
            id: (Date.now() + 1).toString(),
            command: '',
            output,
            timestamp: new Date(),
            skipAnimation,
          });
        }
      } catch (error) {
        addOutput({
          id: (Date.now() + 1).toString(),
          command: '',
          output: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
          timestamp: new Date(),
          isError: true,
        });
      } finally {
        setState(prev => ({
          ...prev,
          isExecuting: false,
        }));
      }
    },
    [addOutput, onExit]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (state.isExecuting) return;

      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          executeCommand(state.currentInput);
          setState(prev => ({ ...prev, currentInput: '' }));
          break;

        case 'ArrowUp':
          event.preventDefault();
          if (state.historyIndex < state.commandHistory.length - 1) {
            const newIndex = state.historyIndex + 1;
            setState(prev => ({
              ...prev,
              historyIndex: newIndex,
              currentInput:
                prev.commandHistory[prev.commandHistory.length - 1 - newIndex],
            }));
          }
          break;

        case 'ArrowDown':
          event.preventDefault();
          if (state.historyIndex > 0) {
            const newIndex = state.historyIndex - 1;
            setState(prev => ({
              ...prev,
              historyIndex: newIndex,
              currentInput:
                prev.commandHistory[prev.commandHistory.length - 1 - newIndex],
            }));
          } else if (state.historyIndex === 0) {
            setState(prev => ({
              ...prev,
              historyIndex: -1,
              currentInput: '',
            }));
          }
          break;

        case 'Tab':
          event.preventDefault();
          // TODO: Implement tab completion
          break;
      }
    },
    [state, executeCommand]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(prev => ({ ...prev, currentInput: event.target.value }));
    },
    []
  );

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

C:\\Legha-gha> Welcome to the Legha-gha XP Terminal!

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
              C:\\Legha-gha&gt; {output.command}
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
      {!state.isExecuting && (
        <div className="flex items-center">
          <span className="text-green-400">C:\\Legha-gha&gt;</span>
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

      {/* Loading indicator */}
      {state.isExecuting && (
        <div className="flex items-center text-yellow-400">
          <span>Executing command...</span>
          <span
            className={`ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            |
          </span>
        </div>
      )}
    </div>
  );
};

export default Terminal;
