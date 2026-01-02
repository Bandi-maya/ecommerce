'use client';

import React, { useId } from 'react';

interface BackgroundGridProps {
  /**
   * The color of the grid lines.
   * Example: "var(--border-color)" or "#cbd5e1"
   * Default: "#000"
   */
  color?: string;
  /** Size of the grid squares in pixels. Default: 40 */
  cellSize?: number;
  /** Thickness of the grid lines. Default: 1 */
  strokeWidth?: number;
  /**
   * The strength of the radial fade.
   * "100%" = wide visible area, "50%" = focused in center.
   */
  fadeStrength?: string;
  /**
   * Optional extra classes.
   * Useful for opacity adjustments: "opacity-50" or "dark:opacity-20"
   */
  className?: string;
}

export default function BackgroundGrid({
  color = '#000',
  cellSize = 40,
  strokeWidth = 1,
  className = '',
  fadeStrength = '100%',
}: BackgroundGridProps) {
  const id = useId();

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          maskImage: `radial-gradient(ellipse at center, black ${fadeStrength}, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(ellipse at center, black 40%, transparent 100%)`,
        }}
      >
        <svg
          // We don't enforce a low opacity here by default anymore.
          // This allows "var(--border-color)" to render at its natural color.
          // If it's too strong, add "opacity-50" to the component className.
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id={id}
              width={cellSize}
              height={cellSize}
              patternUnits="userSpaceOnUse"
              x="50%"
              y="50%"
            >
              <path
                d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
        </svg>
      </div>
    </div>
  );
}