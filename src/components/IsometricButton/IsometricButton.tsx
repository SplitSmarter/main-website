// src/components/IsometricButton/IsometricButton.tsx
import React from 'react';
import styles from './IsometricButton.module.css';

interface IsometricButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function IsometricButton({ children, className, ...props }: IsometricButtonProps) {
    return (
        <div className={styles.btnWrapper}>
            <button className={`${styles.isometricBtn} ${className || ''}`} {...props}>
                {children}
            </button>
        </div>
    );
}