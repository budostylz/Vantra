// src/components/icons/ShareIcon.tsx
import React from "react";

type Props = React.SVGProps<SVGSVGElement> & { size?: number };

export default function ShareIcon({ size = 18, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {/* iOS-style share: arrow out of tray */}
      <path d="M12 16V4" />
      <path d="M8.5 7.5L12 4l3.5 3.5" />
      <rect x="4" y="10" width="16" height="10" rx="2" />
    </svg>
  );
}
