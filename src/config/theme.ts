import {createTheme, virtualColor} from '@mantine/core';
import type {CSSVariablesResolver, MantineColorsTuple, DefaultMantineColor} from '@mantine/core';

// 1. Define Primary Brand Palettes (10 Shades Each)
const brandBlue: MantineColorsTuple = [
    '#eef3ff',
    '#dce4f7',
    '#b9c7e2',
    '#94a8ce',
    '#748dc0',
    '#5f7cb9',
    '#5474b6',
    '#4463a0',
    '#395890',
    '#2b4b81',
];

const brandTeal: MantineColorsTuple = [
    '#e6fcf5',
    '#c3fae8',
    '#96f2d7',
    '#63e6be',
    '#38d9a9',
    '#20c997',
    '#12b886',
    '#0ca678',
    '#099268',
    '#087f5b',
];

// 2. Mantine Theme Config
export const appTheme = createTheme({
    primaryColor: 'brand',
    primaryShade: {light: 6, dark: 5},
    defaultRadius: 'sm',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    colors: {
        brand: brandBlue,
        teal: brandTeal,

        // Virtual Color: Swaps palette automatically on theme change
        adaptiveBrand: virtualColor({
            name: 'adaptiveBrand',
            light: 'brand',
            dark: 'teal',
        }),
    },
});

// 3. CSS Variables Resolver: Maps custom colors to standard CSS variables
export const resolver: CSSVariablesResolver = (theme) => ({
    variables: {
        '--app-font-family': theme.fontFamily,
        '--app-radius': typeof theme.defaultRadius === 'number'
            ? `${theme.defaultRadius}px`
            : `var(--mantine-radius-${theme.defaultRadius || 'sm'})`,
    },
    light: {
        '--app-bg': '#f8f9fa',
        '--app-surface': '#ffffff',
        '--app-border': '#dee2e6',
        '--app-text-main': '#212529',
        '--app-text-muted': '#868e96',
        '--app-primary': theme.colors.brand[6],
        '--app-primary-hover': theme.colors.brand[7],
    },
    dark: {
        '--app-bg': '#101113',
        '--app-surface': '#1a1b1e',
        '--app-border': '#2c2e33',
        '--app-text-main': '#c1c2c5',
        '--app-text-muted': '#909296',
        '--app-primary': theme.colors.brand[5],
        '--app-primary-hover': theme.colors.brand[4],
    },
});

// 4. TypeScript Override for Autocomplete & Color Prop Types
declare module '@mantine/core' {
    export interface MantineThemeColorsOverride {
        colors: Record<
            'brand' | 'teal' | 'adaptiveBrand' | 'dimmed' | 'blue' | 'green' | 'cyan' | DefaultMantineColor,
            MantineColorsTuple
        >;
    }
}