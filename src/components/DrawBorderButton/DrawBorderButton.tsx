import React from 'react';
import styles from './DrawBorderButton.module.css';

interface DrawBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function DrawBorderButton({ children, className, ...props }: DrawBorderButtonProps) {
    return (
        <div className={styles.btnWrapper}>
            <button className={`${styles.drawBtn} ${className || ''}`} {...props}>
                <span>{children}</span>
                <svg className={styles.svgOverlay} width="100%" height="100%">
                    <rect className={styles.borderRect} x="0" y="0" width="100%" height="100%" />
                </svg>
            </button>
        </div>
    );
}