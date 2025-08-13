import { Theme } from "@/lib/types";
import { Inter, JetBrains_Mono, Source_Code_Pro, Fira_Code, Roboto_Mono } from 'next/font/google'

// 1. Dracula Official Theme
export const draculaTheme: Theme = {
  id: 'dracula',
  name: 'Dracula',
  description: 'A dark theme with vibrant colors, perfect for coding at night.',
  colors: {
    pageBackground: '#282a36',
    primaryText: '#f8f8f2',
    secondaryText: '#bd93f9',
    blockBackground: '#44475a',
    blockText: '#f8f8f2',
    accent: '#50fa7b',
  },
  typography: {
    fontFamily: 'Fira Code',
    headingWeight: '700',
    bodyWeight: '400',
    headingSize: '3xl',
    bodySize: 'base',
    blockTextSize: 'base',
  },
  blocks: {
    style: 'filled',
    cornerRadius: 'rounded',
    shadow: 'subtle',
  },
  layout: {
    verticalGap: 16,
    contentWidth: 'wide',
  },
  profile: {
    avatar: {
      shape: 'circle',
      size: 'medium',
      borderWidth: 4,
      borderColor: '#bd93f9',
    },
  },
};

// 2. GitHub Dark Theme
export const githubDarkTheme: Theme = {
  id: 'github-dark',
  name: 'GitHub Dark',
  description: 'A dark theme inspired by GitHub\'s dark mode.',
  colors: {
    pageBackground: '#0d1117',
    primaryText: '#c9d1d9',
    secondaryText: '#8b949e',
    blockBackground: '#161b22',
    blockText: '#c9d1d9',
    accent: '#58a6ff',
  },
  typography: {
    fontFamily: 'Inter',
    headingWeight: '600',
    bodyWeight: '400',
    headingSize: '2xl',
    bodySize: 'base',
    blockTextSize: 'sm',
  },
  blocks: {
    style: 'outline',
    cornerRadius: 'rounded',
    shadow: 'none',
  },
  layout: {
    verticalGap: 16,
    contentWidth: 'standard',
  },
  profile: {
    avatar: {
      shape: 'circle',
      size: 'medium',
      borderWidth: 2,
      borderColor: '#30363d',
    },
  },
};

// 3. Solarized Light Theme
export const solarizedLightTheme: Theme = {
  id: 'solarized-light',
  name: 'Solarized Light',
  description: 'A light theme with a soft, pastel color palette.',
  colors: {
    pageBackground: '#fdf6e3',
    primaryText: '#657b83',
    secondaryText: '#93a1a1',
    blockBackground: '#eee8d5',
    blockText: '#586e75',
    accent: '#268bd2',
  },
  typography: {
    fontFamily: 'Inter',
    headingWeight: '700',
    bodyWeight: '400',
    headingSize: '3xl',
    bodySize: 'lg',
    blockTextSize: 'base',
  },
  blocks: {
    style: 'filled',
    cornerRadius: 'sharp',
    shadow: 'subtle',
  },
  layout: {
    verticalGap: 18,
    contentWidth: 'standard',
  },
  profile: {
    avatar: {
      shape: 'square',
      size: 'medium',
      borderWidth: 0,
      borderColor: 'transparent',
    },
  },
};

// 4. Nord Theme
export const nordTheme: Theme = {
  id: 'nord',
  name: 'Nord',
  description: 'A cool, dark theme inspired by the Arctic.',
  colors: {
    pageBackground: '#2e3440',
    primaryText: '#d8dee9',
    secondaryText: '#81a1c1',
    blockBackground: '#3b4252',
    blockText: '#eceff4',
    accent: '#88c0d0',
  },
  typography: {
    fontFamily: 'JetBrains Mono',
    headingWeight: '600',
    bodyWeight: '400',
    headingSize: '2xl',
    bodySize: 'base',
    blockTextSize: 'base',
  },
  blocks: {
    style: 'filled',
    cornerRadius: 'rounded',
    shadow: 'none',
  },
  layout: {
    verticalGap: 16,
    contentWidth: 'wide',
  },
  profile: {
    avatar: {
      shape: 'circle',
      size: 'large',
      borderWidth: 2,
      borderColor: '#4c566a',
    },
  },
};

// 5. Monokai Pro Theme
export const monokaiProTheme: Theme = {
  id: 'monokai-pro',
  name: 'Monokai Pro',
  description: 'A classic dark theme with vibrant colors.',
  colors: {
    pageBackground: '#2D2A2E',
    primaryText: '#FCFCFA',
    secondaryText: '#787577',
    blockBackground: '#403E41',
    blockText: '#FCFCFA',
    accent: '#FF6188',
  },
  typography: {
    fontFamily: 'Source Code Pro',
    headingWeight: '700',
    bodyWeight: '400',
    headingSize: '3xl',
    bodySize: 'base',
    blockTextSize: 'base',
  },
  blocks: {
    style: 'filled',
    cornerRadius: 'rounded',
    shadow: 'medium',
  },
  layout: {
    verticalGap: 12,
    contentWidth: 'standard',
  },
  profile: {
    avatar: {
      shape: 'circle',
      size: 'medium',
      borderWidth: 3,
      borderColor: '#ffd866',
    },
  },
};

// 6. Tokyo Night Theme
export const tokyoNightTheme: Theme = {
  id: 'tokyo-night',
  name: 'Tokyo Night',
  description: 'A dark theme inspired by the Tokyo night skyline.',
  colors: {
    pageBackground: '#1a1b26',
    primaryText: '#a9b1d6',
    secondaryText: '#565f89',
    blockBackground: '#24283b',
    blockText: '#a9b1d6',
    accent: '#7aa2f7',
  },
  typography: {
    fontFamily: 'Inter',
    headingWeight: '700',
    bodyWeight: '400',
    headingSize: '2xl',
    bodySize: 'base',
    blockTextSize: 'sm',
  },
  blocks: {
    style: 'filled',
    cornerRadius: 'rounded',
    shadow: 'subtle',
  },
  layout: {
    verticalGap: 16,
    contentWidth: 'standard',
  },
  profile: {
    avatar: {
      shape: 'circle',
      size: 'medium',
      borderWidth: 2,
      borderColor: '#7aa2f7',
    },
  },
};

// 7. Everforest Dark Theme
export const everforestDarkTheme: Theme = {
  id: 'everforest-dark',
  name: 'Everforest Dark',
  description: 'A dark theme with earthy tones and a calming aesthetic.',
  colors: {
    pageBackground: '#2d353b',
    primaryText: '#d3c6aa',
    secondaryText: '#83c092',
    blockBackground: '#374145',
    blockText: '#d3c6aa',
    accent: '#a7c080',
  },
  typography: {
    fontFamily: 'JetBrains Mono',
    headingWeight: '600',
    bodyWeight: '400',
    headingSize: '2xl',
    bodySize: 'lg',
    blockTextSize: 'base',
  },
  blocks: {
    style: 'filled',
    cornerRadius: 'rounded',
    shadow: 'none',
  },
  layout: {
    verticalGap: 16,
    contentWidth: 'standard',
  },
  profile: {
    avatar: {
      shape: 'square',
      size: 'medium',
      borderWidth: 2,
      borderColor: '#4a555b',
    },
  },
};

// 8. Rosé Pine Theme
export const rosePineTheme: Theme = {
  id: 'rose-pine',
  name: 'Rosé Pine',
  description: 'A serene and elegant theme with soft pastel colors.',
  colors: {
    pageBackground: '#191724',
    primaryText: '#e0def4',
    secondaryText: '#908caa',
    blockBackground: '#26233a',
    blockText: '#e0def4',
    accent: '#eb6f92',
  },
  typography: {
    fontFamily: 'Fira Code',
    headingWeight: '700',
    bodyWeight: '400',
    headingSize: '3xl',
    bodySize: 'base',
    blockTextSize: 'base',
  },
  blocks: {
    style: 'outline',
    cornerRadius: 'rounded',
    shadow: 'none',
  },
  layout: {
    verticalGap: 12,
    contentWidth: 'standard',
  },
  profile: {
    avatar: {
      shape: 'circle',
      size: 'large',
      borderWidth: 3,
      borderColor: '#eb6f92',
    },
  },
};

// You can export them all in an array for easy mapping in your UI
export const allThemes = [
  draculaTheme,
  githubDarkTheme,
  solarizedLightTheme,
  nordTheme,
  monokaiProTheme,
  tokyoNightTheme,
  everforestDarkTheme,
  rosePineTheme,
];

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });
const firaCode = Fira_Code({ subsets: ['latin'], weight: ['400', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '600'] });
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'], weight: ['400', '700'] });
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const getFontStyle = (fontName: string) => {
  switch (fontName) {
    case 'Inter':
      return inter.style.fontFamily;
    case 'Fira Code':
      return firaCode.style.fontFamily;
    case 'JetBrains Mono':
      return jetbrainsMono.style.fontFamily;
    case 'Source Code Pro':
      return sourceCodePro.style.fontFamily;
    case 'Roboto Mono':
      return robotoMono.style.fontFamily;
    default:
      return inter.style.fontFamily; // Default to Inter if not found
  }
}
