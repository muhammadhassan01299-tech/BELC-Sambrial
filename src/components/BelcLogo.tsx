import React from 'react';

interface BelcLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'badge-only' | 'full-horizontal' | 'badge-with-tagline';
  className?: string;
  theme?: 'dark' | 'light';
}

export const BelcLogo: React.FC<BelcLogoProps> = ({
  size = 'md',
  variant = 'full-horizontal',
  className = '',
  theme = 'dark',
}) => {
  const pixelSizes = {
    sm: 36,
    md: 48,
    lg: 64,
    xl: 88,
  };

  const px = pixelSizes[size];

  // SVG circular seal matching the exact uploaded BELC logo
  const badgeSvg = (
    <svg
      width={px}
      height={px}
      viewBox="0 0 200 200"
      className="shrink-0 transition-transform duration-300 hover:rotate-3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="BELC Sambrial Official Logo"
    >
      {/* Outer base circle */}
      <circle cx="100" cy="100" r="96" fill="#111827" stroke="#FFFFFF" strokeWidth="4" />
      <circle cx="100" cy="100" r="92" stroke="#FFFFFF" strokeWidth="2" fill="none" />
      <circle cx="100" cy="100" r="62" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="3" />

      {/* Curved Text Paths */}
      <defs>
        {/* Top arc for BISMILLAH */}
        <path id="topArc" d="M 28 100 A 72 72 0 0 1 172 100" fill="none" />
        {/* Bottom arc for SAMBRIAL */}
        <path id="bottomArc" d="M 172 100 A 72 72 0 0 1 28 100" fill="none" />
      </defs>

      {/* Top text: BISMILLAH */}
      <text fill="#FFFFFF" fontSize="22" fontWeight="900" letterSpacing="4" textAnchor="middle">
        <textPath href="#topArc" startOffset="50%">
          B I S M I L L A H
        </textPath>
      </text>

      {/* Left Star */}
      <polygon
        points="38,108 42,97 52,97 44,103 47,113 38,107 30,113 33,103 25,97 35,97"
        fill="#FFFFFF"
        transform="scale(0.85) translate(8, 14)"
      />

      {/* Right Star */}
      <polygon
        points="162,108 166,97 176,97 168,103 171,113 162,107 154,113 157,103 149,97 159,97"
        fill="#FFFFFF"
        transform="scale(0.85) translate(14, 14)"
      />

      {/* Bottom text: SAMBRIAL */}
      <text fill="#FFFFFF" fontSize="20" fontWeight="900" letterSpacing="3.5" textAnchor="middle">
        <textPath href="#bottomArc" startOffset="50%">
          SAMBRIAL
        </textPath>
      </text>

      {/* Inner Center BELC with double-stroke effect */}
      <g id="belc-center">
        {/* Inner thin border */}
        <circle cx="100" cy="100" r="60" stroke="#111827" strokeWidth="2.5" fill="none" />
        
        {/* Main BELC Text */}
        <text
          x="100"
          y="114"
          fill="#111827"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="42"
          fontWeight="900"
          letterSpacing="1"
          textAnchor="middle"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          paintOrder="stroke fill"
        >
          BELC
        </text>
      </g>
    </svg>
  );

  if (variant === 'badge-only') {
    return <div className={`inline-flex items-center ${className}`}>{badgeSvg}</div>;
  }

  const textColorRed = '#DC2626'; // Vibrant brand red
  const isDark = theme === 'dark';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {badgeSvg}

      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span
            className="text-xl md:text-2xl font-black tracking-tight"
            style={{ color: textColorRed }}
          >
            Bismillah
          </span>
          <span className="text-xs px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-red-600 text-white shadow-sm">
            SAMBRIAL
          </span>
        </div>
        <span
          className={`text-xs md:text-sm font-semibold tracking-wide ${
            isDark ? 'text-zinc-200' : 'text-zinc-800'
          }`}
        >
          English Language Club
        </span>
      </div>
    </div>
  );
};
