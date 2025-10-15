// Custom hook for terminal functionality

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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

export const useTerminal = (onExit?: () => void) => {
  const [state, setState] = useState<TerminalState>({
    commandHistory: [],
    outputHistory: [],
    currentInput: '',
    historyIndex: -1,
    currentDirectory: 'C:\\Users\\Legha-gha',
    isAnimating: false,
  });
  const [isWaitingForData, setIsWaitingForData] = useState(false);
  const [pendingCommand, setPendingCommand] = useState<{
    command: string;
    args: string[];
    cmd: any;
  } | null>(null);

  // Fetch all portfolio data
  const { data: portfolio, isLoading: portfolioLoading } = usePortfolio();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: contactConfig, isLoading: contactConfigLoading } =
    useContactConfig();
  const { data: socialProfiles, isLoading: socialProfilesLoading } =
    useSocialProfiles();

  const portfolioData = useMemo(
    () => ({
      portfolio,
      projects,
      skills,
      services,
      contactConfig,
      socialProfiles,
    }),
    [portfolio, projects, skills, services, contactConfig, socialProfiles]
  );

  const animatingOutputs = useRef<Set<string>>(new Set());

  const addOutput = useCallback((output: CommandOutput) => {
    setState(prev => ({
      ...prev,
      outputHistory: [...prev.outputHistory.slice(-999), output], // Keep last 1000 outputs
    }));
  }, []);

  const cancelLoading = useCallback(() => {
    setIsWaitingForData(false);
    setPendingCommand(null);
    addOutput({
      id: (Date.now() + 1).toString(),
      command: '',
      output: 'Command cancelled.',
      timestamp: new Date(),
      skipAnimation: true,
    });
  }, [addOutput]);

  const handleAnimationComplete = useCallback((outputId: string) => {
    animatingOutputs.current.delete(outputId);
    if (animatingOutputs.current.size === 0) {
      setState(prev => ({
        ...prev,
        isAnimating: false,
      }));
    }
  }, []);

  const createAnimationCompleteCallback = useCallback(
    (outputId: string) => {
      return () => handleAnimationComplete(outputId);
    },
    [handleAnimationComplete]
  );

  const isDataAvailableForCommand = useCallback(
    (command: string) => {
      switch (command) {
        case 'about':
          return !portfolioLoading && portfolio;
        case 'projects':
          return !projectsLoading && projects;
        case 'project':
          return !projectsLoading && projects;
        case 'skills':
          return !skillsLoading && skills;
        case 'services':
          return !servicesLoading && services;
        case 'contact':
          return !contactConfigLoading && contactConfig;
        case 'social':
          return !socialProfilesLoading && socialProfiles;
        case 'resume':
          return !contactConfigLoading && contactConfig;
        default:
          return true; // Commands that don't need data
      }
    },
    [
      portfolioLoading,
      portfolio,
      projectsLoading,
      projects,
      skillsLoading,
      skills,
      servicesLoading,
      services,
      contactConfigLoading,
      contactConfig,
      socialProfilesLoading,
      socialProfiles,
    ]
  );

  const getLoadingMessage = useCallback((command: string) => {
    switch (command) {
      case 'about':
        return 'Loading portfolio data...';
      case 'projects':
        return 'Loading projects...';
      case 'project':
        return 'Loading projects...';
      case 'skills':
        return 'Loading skills...';
      case 'services':
        return 'Loading services...';
      case 'contact':
        return 'Loading contact information...';
      case 'social':
        return 'Loading social profiles...';
      case 'resume':
        return 'Loading resume information...';
      default:
        return 'Loading...';
    }
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
          }));
          return;
        }

        if (command === 'exit') {
          onExit?.();
          return;
        }

        // Wait for data to be available if command needs it
        if (!isDataAvailableForCommand(command)) {
          setIsWaitingForData(true);
          setPendingCommand({ command, args, cmd });

          // Add loading output first
          const loadingOutputId = (Date.now() + 1).toString();
          addOutput({
            id: loadingOutputId,
            command: '',
            output: getLoadingMessage(command),
            timestamp: new Date(),
            skipAnimation: true, // Don't animate loading messages
          });

          // Add cancel instruction
          addOutput({
            id: (Date.now() + 2).toString(),
            command: '',
            output: 'Press ESC or Q to cancel...',
            timestamp: new Date(),
            skipAnimation: true,
          });

          return; // Exit early, useEffect will handle execution when data is available
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

          const outputId = (Date.now() + 1).toString();
          addOutput({
            id: outputId,
            command: '',
            output,
            timestamp: new Date(),
            skipAnimation,
          });

          // Track animation if not skipping
          if (!skipAnimation && typeof output === 'string') {
            animatingOutputs.current.add(outputId);
            setState(prev => ({
              ...prev,
              isAnimating: true,
            }));
          }
        }
      } catch (error) {
        addOutput({
          id: (Date.now() + 1).toString(),
          command: '',
          output: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
          timestamp: new Date(),
          isError: true,
        });
      }
    },
    [
      addOutput,
      onExit,
      portfolioData,
      isDataAvailableForCommand,
      getLoadingMessage,
    ]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (state.isAnimating || isWaitingForData) return;

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
    [state, executeCommand, isWaitingForData]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(prev => ({ ...prev, currentInput: event.target.value }));
    },
    []
  );

  // Execute pending command when data becomes available
  useEffect(() => {
    if (pendingCommand && isDataAvailableForCommand(pendingCommand.command)) {
      const { args, cmd } = pendingCommand;
      setPendingCommand(null);
      setIsWaitingForData(false);

      // Execute the command now that data is available
      cmd
        .execute(args, portfolioData)
        .then((result: any) => {
          // Handle the result the same way as in executeCommand
          if (result === 'MATRIX_ANIMATION') {
            addOutput({
              id: (Date.now() + 1).toString(),
              command: '',
              output: 'Oops caught up with other projects... (Coming soon!)',
              timestamp: new Date(),
            });
          } else {
            const output =
              typeof result === 'object' && 'output' in result
                ? result.output
                : result;
            const skipAnimation =
              typeof result === 'object' && 'skipAnimation' in result
                ? result.skipAnimation
                : false;

            const outputId = (Date.now() + 1).toString();
            addOutput({
              id: outputId,
              command: '',
              output,
              timestamp: new Date(),
              skipAnimation,
            });

            // Track animation if not skipping
            if (!skipAnimation && typeof output === 'string') {
              animatingOutputs.current.add(outputId);
              setState(prev => ({
                ...prev,
                isAnimating: true,
              }));
            }
          }
        })
        .catch((error: any) => {
          addOutput({
            id: (Date.now() + 1).toString(),
            command: '',
            output: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
            timestamp: new Date(),
            isError: true,
          });
        });
    }
  }, [
    pendingCommand,
    portfolio,
    projects,
    skills,
    services,
    contactConfig,
    socialProfiles,
    portfolioData,
    isDataAvailableForCommand,
    addOutput,
  ]);

  // Handle global keyboard events for cancellation
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (
        isWaitingForData &&
        (event.key === 'Escape' || event.key === 'q' || event.key === 'Q')
      ) {
        event.preventDefault();
        cancelLoading();
      }
    };

    if (isWaitingForData) {
      document.addEventListener('keydown', handleGlobalKeyDown);
      return () => document.removeEventListener('keydown', handleGlobalKeyDown);
    }
  }, [isWaitingForData, cancelLoading]);

  return {
    state,
    isWaitingForData,
    addOutput,
    createAnimationCompleteCallback,
    handleKeyDown,
    handleInputChange,
  };
};
