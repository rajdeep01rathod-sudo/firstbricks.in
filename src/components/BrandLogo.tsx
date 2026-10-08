import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  variant?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
  variant = 'light',
}) => {
  const isDark = variant === 'dark';

  // Dimensions
  const iconSizes = {
    sm: { w: 26, h: 26 },
    md: { w: 34, h: 34 },
    lg: { w: 46, h: 46 },
    xl: { w: 60, h: 60 },
  };

  const current = iconSizes[size] || iconSizes.md;

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Precision Isometric 3-Brick Staircase with Rising Green Arrow */}
      <svg
        width={current.w}
        height={current.h}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 select-none"
        aria-hidden="true"
      >
        {/* GREEN ASCENDING ARROW (Behind top brick, pointing ↗) */}
        <g id="arrow">
          <path
            d="M58 36L78 18M78 18V30M78 18H66"
            stroke="#10B981"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon points="78,14 86,22 74,24" fill="#10B981" />
        </g>

        {/* BRICK 1: BOTTOM BRICK */}
        {/* Top face */}
        <polygon points="32,60 58,47 42,39 16,52" fill={isDark ? '#64748B' : '#24334A'} />
        {/* Left shaded face */}
        <polygon points="16,52 42,39 42,50 16,63" fill={isDark ? '#475569' : '#162235'} />
        {/* Front shaded face */}
        <polygon points="16,63 42,50 42,61 16,74" fill={isDark ? '#334155' : '#0E1726'} />
        <polygon points="42,50 58,42 58,53 42,61" fill={isDark ? '#1E293B' : '#0A111C'} />

        {/* BRICK 2: MIDDLE BRICK (Vibrant Emerald / Green) */}
        {/* Top face */}
        <polygon points="40,46 66,33 50,25 24,38" fill="#34D399" />
        {/* Left shaded face */}
        <polygon points="24,38 50,25 50,35 24,48" fill="#10B981" />
        {/* Front face */}
        <polygon points="24,48 50,35 50,45 24,58" fill="#059669" />
        <polygon points="50,35 66,27 66,37 50,45" fill="#047857" />

        {/* BRICK 3: TOP BRICK */}
        {/* Top face */}
        <polygon points="48,32 74,19 58,11 32,24" fill={isDark ? '#94A3B8' : '#334155'} />
        {/* Left shaded face */}
        <polygon points="32,24 58,11 58,21 32,34" fill={isDark ? '#64748B' : '#1E293B'} />
        {/* Front face */}
        <polygon points="32,34 58,21 58,31 32,44" fill={isDark ? '#475569' : '#0F172A'} />
        <polygon points="58,21 74,13 74,23 58,31" fill={isDark ? '#334155' : '#090E17'} />
      </svg>

      {/* Wordmark: firstbricks.in matching the branding */}
      {showWordmark && (
        <div className="flex flex-col select-none">
          <div className="flex items-baseline font-extrabold tracking-tight leading-none">
            <span
              className={`${
                size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-3xl' : 'text-lg sm:text-xl'
              } tracking-tight font-black ${isDark ? 'text-white' : 'text-[#0B2545]'}`}
            >
              firstbricks
            </span>
            <span
              className={`${
                size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-3xl' : 'text-lg sm:text-xl'
              } font-black text-[#10B981]`}
            >
              .in
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
