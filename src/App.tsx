import React from 'react';
import { colors, typography, spacing, transitions } from './theme/tokens';
import './App.css';

/**
 * Main App component
 * Simple Hello World splash page with animated gradient background
 */
function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${colors.brand.blue} 0%, ${colors.background.supportBlue} 50%, ${colors.brand.blue} 100%)`,
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
        padding: spacing.lg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating particles */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
        }}
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: colors.background.white,
              borderRadius: '50%',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.2,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content card */}
      <div
        style={{
          background: colors.background.white,
          borderRadius: '32px',
          padding: `${spacing['3xl']} ${spacing['4xl']}`,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%',
          position: 'relative',
          animation: 'fadeInScale 0.8s ease-out',
        }}
      >
        {/* Decorative corner accents */}
        <div
          style={{
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            width: '60px',
            height: '60px',
            borderTop: `4px solid ${colors.brand.blue}`,
            borderLeft: `4px solid ${colors.brand.blue}`,
            borderTopLeftRadius: '32px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            width: '60px',
            height: '60px',
            borderBottom: `4px solid ${colors.brand.blue}`,
            borderRight: `4px solid ${colors.brand.blue}`,
            borderBottomRightRadius: '32px',
          }}
        />

        {/* Hello World text */}
        <h1
          style={{
            fontFamily: typography.fontFamily.base,
            fontSize: typography.fontSize['3xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.text.navy,
            marginBottom: spacing.md,
            lineHeight: typography.lineHeight.tight,
            background: `linear-gradient(135deg, ${colors.brand.blue}, ${colors.text.navy})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Hello World
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: typography.fontFamily.base,
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.regular,
            color: colors.text.secondary,
            lineHeight: typography.lineHeight.relaxed,
            marginBottom: spacing.xl,
          }}
        >
          Welcome to your fresh, clean React app
        </p>

        {/* Pulsing indicator */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: spacing.sm,
            padding: `${spacing.sm} ${spacing.lg}`,
            background: colors.background.lightBlue,
            borderRadius: '24px',
            fontFamily: typography.fontFamily.base,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            color: colors.brand.blue,
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: colors.brand.blue,
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          Ready to build something amazing
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          75% {
            transform: translateY(20px) translateX(-10px);
          }
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.8);
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: ${typography.fontSize['2xl']} !important;
          }
          p {
            font-size: ${typography.fontSize.base} !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
