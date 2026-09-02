import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export function ThemeToggle() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    const toggleTheme = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
    }

    return (
        <ActionIcon
            onClick={toggleTheme}
            variant="default"
            size="lg"
            aria-label="Toggle color scheme"
            radius="md"
        >
            {computedColorScheme === 'dark' ? (
                <IconSun size={18} style={{ color: 'var(--mantine-color-yellow-4)' }} />
            ) : (
                <IconMoon size={18} style={{ color: 'var(--app-primary)' }} />
            )}
        </ActionIcon>
    );
}