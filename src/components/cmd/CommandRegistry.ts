// Command registry with all available CMD commands

import {
  createASCIITable,
  formatDate,
  formatTime,
  generateRandomQuote,
  centerText,
} from './utils';
import type { Command } from './types';
import type { Project, Skill, Service } from '@/lib/api/types/portfolio';

// Portfolio-specific commands
const createPortfolioCommands = (): Command[] => {
  const AboutCommand: Command = {
    name: 'about',
    description: 'Display information about the developer',
    usage: 'about',
    execute: async (_args, data) => {
      const portfolio = data?.portfolio;
      if (!portfolio) return 'Loading portfolio data...';

      const aboutData = portfolio.dataabout;
      return `
╭─────────────────────────────────────────╮
│                ABOUT ME                 │
╰─────────────────────────────────────────╯

${aboutData.title}

${aboutData.aboutme}
      `.trim();
    },
  };

  const ProjectsCommand: Command = {
    name: 'projects',
    description: 'List all portfolio projects',
    usage: 'projects',
    execute: async (_args, data) => {
      const projects = data?.projects;
      if (!projects) return 'Loading projects...';

      const table = createASCIITable({
        headers: ['ID', 'Title'],
        rows: projects.map((project: Project) => [project.id, project.title]),
        borderStyle: 'rounded',
      });

      return `\n${table}\n\nUse 'project <id>' to view detailed information about a specific project.`;
    },
  };

  const ProjectCommand: Command = {
    name: 'project',
    description: 'Show detailed information about a specific project',
    usage: 'project <id>',
    execute: async (args, data) => {
      if (args.length === 0) {
        return 'Error: Project ID required. Usage: project <id>';
      }

      const project = data?.projects?.find((p: Project) => p.id === args[0]);
      if (!project) return 'Project not found or loading...';

      return `
╭─────────────────────────────────────────╮
│            PROJECT DETAILS              │
╰─────────────────────────────────────────╯

Title: ${project.title}
Created: ${formatDate(new Date(project.created))}

Description:
${project.description}


Technologies:
${project.technologies.map((tech: string) => `• ${tech}`).join('\n')}

Links:
${project.isDeployed ? `• Deployed: ${project.deployedLink}` : '• Not deployed'}
${project.isPublicRepo ? `• GitHub: ${project.githubLink}` : '• Private repository'}
      `.trim();
    },
  };

  const SkillsCommand: Command = {
    name: 'skills',
    description: 'Display technical skills with proficiency levels',
    usage: 'skills',
    execute: async (_args, data) => {
      const skills = data?.skills;
      if (!skills) return 'Loading skills...';

      const table = createASCIITable({
        headers: ['Skill', 'Proficiency'],
        rows: skills.map((skill: Skill) => [skill.name, `${skill.value}%`]),
        borderStyle: 'single',
      });

      return `\n${table}`;
    },
  };

  const ServicesCommand: Command = {
    name: 'services',
    description: 'List services offered',
    usage: 'services',
    execute: async (_args, data) => {
      const services = data?.services;
      if (!services) return 'Loading services...';

      return services
        .map(
          (service: Service) => `
╭─────────────────────────────────────────╮
│ ${centerText(service.title, 35)} │
╰─────────────────────────────────────────╯

${service.description}
      `
        )
        .join('\n');
    },
  };

  const ContactCommand: Command = {
    name: 'contact',
    description: 'Display contact information',
    usage: 'contact',
    execute: async (_args, data) => {
      const contactConfig = data?.contactConfig;
      if (!contactConfig) return 'Loading contact information...';

      return `
╭─────────────────────────────────────────╮
│            CONTACT INFO                 │
╰─────────────────────────────────────────╯

Email: ${contactConfig.YOUR_EMAIL}
Phone: ${contactConfig.YOUR_FONE}

Description:
${contactConfig.description}

Resume: ${contactConfig.RESUME}
      `.trim();
    },
  };

  const SocialCommand: Command = {
    name: 'social',
    description: 'Display social media links',
    usage: 'social',
    execute: async (_args, data) => {
      const socialProfiles = data?.socialProfiles;
      if (!socialProfiles) return 'Loading social profiles...';

      const links = Object.entries(socialProfiles)
        .filter(([, url]) => url)
        .map(
          ([platform, url]) =>
            `• ${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${url}`
        )
        .join('\n');

      return `
╭─────────────────────────────────────────╮
│            SOCIAL LINKS                 │
╰─────────────────────────────────────────╯

${links || 'No social links available'}
      `.trim();
    },
  };

  const ResumeCommand: Command = {
    name: 'resume',
    description: 'Display resume information and download link',
    usage: 'resume',
    execute: async (_args, data) => {
      const contactConfig = data?.contactConfig;
      if (!contactConfig) return 'Loading resume information...';

      return `
╭─────────────────────────────────────────╮
│              RESUME                     │
╰─────────────────────────────────────────╯

Resume Link: ${contactConfig.RESUME}

To download or view the resume, click the link above or copy it to your browser.
      `.trim();
    },
  };

  return [
    AboutCommand,
    ProjectsCommand,
    ProjectCommand,
    SkillsCommand,
    ServicesCommand,
    ContactCommand,
    SocialCommand,
    ResumeCommand,
  ];
};

// Classic Windows CMD commands
const createClassicCommands = (): Command[] => {
  const HelpCommand: Command = {
    name: 'help',
    description: 'Display help information',
    usage: 'help [command]',
    execute: async args => {
      const allCommands = [
        ...createPortfolioCommands(),
        ...createClassicCommands(),
      ];

      if (args.length > 0) {
        const command = allCommands.find(
          (cmd: Command) => cmd.name === args[0]
        );
        if (command) {
          return {
            output: `
${command.name.toUpperCase()}
${'='.repeat(command.name.length)}

Description: ${command.description}
Usage: ${command.usage}
          `.trim(),
            skipAnimation: true,
          };
        }
        return {
          output: `Command '${args[0]}' not found. Type 'help' to see all available commands.`,
          skipAnimation: true,
        };
      }

      const portfolioCommands = createPortfolioCommands();
      const classicCommands = createClassicCommands();

      return {
        output: `
╭─────────────────────────────────────────╮
│            AVAILABLE COMMANDS           │
╰─────────────────────────────────────────╯

PORTFOLIO COMMANDS:
${portfolioCommands.map((cmd: Command) => `  ${cmd.name.padEnd(12)} - ${cmd.description}`).join('\n')}

CLASSIC CMD COMMANDS:
${classicCommands.map(cmd => `  ${cmd.name.padEnd(12)} - ${cmd.description}`).join('\n')}

EASTER EGGS:
  matrix         - Matrix rain animation
  tree           - ASCII tree structure
  whoami         - Fun personal facts
  fortune        - Random inspirational quote
  rickroll       - Surprise command 😄

Type 'help <command>' for detailed information about a specific command.
      `.trim(),
        skipAnimation: true,
      };
    },
  };

  const ClearCommand: Command = {
    name: 'cls',
    description: 'Clear the screen',
    usage: 'cls',
    execute: async () => {
      return 'CLEAR_SCREEN';
    },
  };

  const EchoCommand: Command = {
    name: 'echo',
    description: 'Display messages',
    usage: 'echo <message>',
    execute: async args => {
      return args.join(' ');
    },
  };

  const DirCommand: Command = {
    name: 'dir',
    description: 'List directory contents',
    usage: 'dir',
    execute: async () => {
      const files = [
        { name: 'about.txt', size: '2.1 KB', date: '2024-01-15' },
        { name: 'projects/', size: '<DIR>', date: '2024-01-15' },
        { name: 'skills.txt', size: '1.8 KB', date: '2024-01-15' },
        { name: 'contact.txt', size: '1.2 KB', date: '2024-01-15' },
        { name: 'resume.pdf', size: '245 KB', date: '2024-01-15' },
        { name: 'gallery/', size: '<DIR>', date: '2024-01-15' },
      ];

      const table = createASCIITable({
        headers: ['Name', 'Size', 'Date Modified'],
        rows: files.map((file: any) => [file.name, file.size, file.date]),
        borderStyle: 'single',
      });

      return `\n${table}\n\n${files.length} file(s) found.`;
    },
  };

  const DateCommand: Command = {
    name: 'date',
    description: 'Display current date',
    usage: 'date',
    execute: async () => {
      return `Current date: ${formatDate(new Date())}`;
    },
  };

  const TimeCommand: Command = {
    name: 'time',
    description: 'Display current time',
    usage: 'time',
    execute: async () => {
      return `Current time: ${formatTime(new Date())}`;
    },
  };

  const VerCommand: Command = {
    name: 'ver',
    description: 'Display version information',
    usage: 'ver',
    execute: async () => {
      return `
Legha-gha XP [Version 5.1.2600]
Portfolio Terminal v1.0.0
Built with React, TypeScript, and ❤️
      `.trim();
    },
  };

  const ExitCommand: Command = {
    name: 'exit',
    description: 'Close the command prompt',
    usage: 'exit',
    execute: async () => {
      return 'EXIT_TERMINAL';
    },
  };

  return [
    HelpCommand,
    ClearCommand,
    EchoCommand,
    DirCommand,
    DateCommand,
    TimeCommand,
    VerCommand,
    ExitCommand,
  ];
};

// Easter egg commands
const createEasterEggCommands = (): Command[] => {
  const MatrixCommand: Command = {
    name: 'matrix',
    description: 'Matrix rain animation',
    usage: 'matrix',
    execute: async () => {
      return 'MATRIX_ANIMATION';
    },
  };

  const TreeCommand: Command = {
    name: 'tree',
    description: 'Display ASCII tree structure',
    usage: 'tree',
    execute: async () => {
      return `
Portfolio Structure:
├── About Me
│   ├── Introduction
│   ├── Skills
│   └── Experience
├── Projects
│   ├── Web Applications
│   ├── Mobile Apps
│   └── Open Source
├── Services
│   ├── Web Development
│   ├── UI/UX Design
│   └── Consulting
├── Contact
│   ├── Email
│   ├── Social Media
│   └── Resume
└── Gallery
    ├── Screenshots
    ├── Designs
    └── Demos
      `.trim();
    },
  };

  const WhoamiCommand: Command = {
    name: 'whoami',
    description: 'Display fun personal facts',
    usage: 'whoami',
    execute: async () => {
      return `
╭─────────────────────────────────────────╮
│              WHO AM I?                  │
╰─────────────────────────────────────────╯

• I'm a passionate developer who loves creating amazing web experiences
• I believe in clean code and user-centered design
• Coffee is my fuel ☕
• I enjoy solving complex problems with elegant solutions
• Always learning new technologies and frameworks
• I make the impossible possible, one line of code at a time
• When I'm not coding, I'm probably thinking about coding
• I turn caffeine into code and dreams into reality
      `.trim();
    },
  };

  const FortuneCommand: Command = {
    name: 'fortune',
    description: 'Display a random inspirational quote',
    usage: 'fortune',
    execute: async () => {
      const quote = generateRandomQuote();
      return `
╭─────────────────────────────────────────╮
│              FORTUNE                    │
╰─────────────────────────────────────────╯

"${quote}"

─ Anonymous Developer
      `.trim();
    },
  };

  const RickrollCommand: Command = {
    name: 'rickroll',
    description: 'Never gonna give you up...',
    usage: 'rickroll',
    execute: async () => {
      return `
╭─────────────────────────────────────────╮
│            NEVER GONNA...               │
╰─────────────────────────────────────────╯

We're no strangers to code
You know the rules and so do I
A full commitment's what I'm thinking of
You wouldn't get this from any other guy

I just wanna tell you how I'm feeling
Gotta make you understand

Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you

🎵 Rick Astley - Never Gonna Give You Up 🎵
      `.trim();
    },
  };

  return [
    MatrixCommand,
    TreeCommand,
    WhoamiCommand,
    FortuneCommand,
    RickrollCommand,
  ];
};

// Export all commands
export const getAllCommands = (): Command[] => {
  return [
    ...createPortfolioCommands(),
    ...createClassicCommands(),
    ...createEasterEggCommands(),
  ];
};

export const getCommand = (name: string): Command | undefined => {
  return getAllCommands().find((cmd: Command) => cmd.name === name);
};
