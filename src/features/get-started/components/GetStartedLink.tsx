import type { MouseEvent, ReactNode } from 'react';

type GetStartedLinkProps = {
  className?: string;
  onGetStarted: () => void;
  children: ReactNode;
};

export function GetStartedLink({ className, onGetStarted, children }: GetStartedLinkProps) {
  return (
    <a
      href="/#get-started"
      className={className}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        onGetStarted();
      }}
    >
      {children}
    </a>
  );
}
