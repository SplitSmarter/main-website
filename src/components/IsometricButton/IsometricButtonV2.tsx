// src/components/IsometricButton/IsometricButton.tsx
import React from 'react';
import styles from './IsometricButtonV2.module.css';

type ButtonVariant = 'cyan' | 'emerald' | 'sunset' | 'amethyst' | 'ruby' | 'midnight';

interface IsometricButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: ButtonVariant;
}

export function IsometricButtonV2({
                                    children,
                                    variant = 'cyan',
                                    className,
                                    ...props
                                }: IsometricButtonProps) {
    const selectedVariantClass = styles[variant] || styles.cyan;

    return (
        <div className={styles.btnWrapper}>
            <button
                className={`${styles.isometricBtn} ${selectedVariantClass} ${className || ''}`}
                {...props}
            >
                {children}
            </button>
        </div>
    );
}