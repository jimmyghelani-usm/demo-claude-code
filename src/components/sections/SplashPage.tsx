import { useRef, type RefObject } from 'react';

export function SplashPage() {
  const claudeCodeSectionRef = useRef<HTMLDivElement>(null);
  const cursorSectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: '#ffffff',
        scrollBehavior: 'smooth'
      }}
    >
      {/* Hero Section with Starry Background */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          padding: '20px',
          background: 'radial-gradient(ellipse at top, #1a1a2e 0%, #0a0a0a 70%)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Animated Stars */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none'
          }}
        >
          {[...Array(50)].map((_, i) => {
            const size = Math.random() * 3 + 1;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = Math.random() * 2 + 2;

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: '50%',
                  background: i % 3 === 0 ? '#60a5fa' : i % 3 === 1 ? '#fbbf24' : '#ffffff',
                  boxShadow: `0 0 ${size * 2}px ${i % 3 === 0 ? '#60a5fa' : i % 3 === 1 ? '#fbbf24' : '#ffffff'}`,
                  animation: `blink ${duration}s ease-in-out ${delay}s infinite`
                }}
              />
            );
          })}
        </div>

        <style>
          {`
            @keyframes blink {
              0%, 100% { opacity: 0.2; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.5); }
            }
          `}
        </style>
        <div style={{ maxWidth: '900px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '24px',
              flexWrap: 'wrap'
            }}
          >
            <div
              onClick={() => scrollToSection(claudeCodeSectionRef)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollToSection(claudeCodeSectionRef);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Click to scroll to Claude Code section"
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
                opacity: 1
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              Claude Code
            </div>
            <div style={{ fontSize: '32px', color: '#9ca3af' }}>×</div>
            <div
              onClick={() => scrollToSection(cursorSectionRef)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollToSection(cursorSectionRef);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Click to scroll to Cursor section"
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
                opacity: 1
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              Cursor
            </div>
          </div>

          <p
            style={{
              fontSize: '20px',
              marginBottom: '24px',
              color: '#d1d5db',
              fontWeight: '500'
            }}
          >
            Autonomous Agentic Development Workflows
          </p>

          <p
            style={{
              fontSize: '14px',
              marginBottom: '40px',
              color: '#9ca3af',
              lineHeight: '1.8',
              maxWidth: '700px',
              margin: '0 auto 40px'
            }}
          >
            Orchestrate multi-agent AI workflows with subagents, commands, and hooks for intelligent autonomous coding. Keep Claude Code and Cursor in perfect sync through slash commands and agent coordination.
          </p>
        </div>

        {/* Curved Separator */}
        <div
          style={{
            position: 'absolute',
            bottom: '-400px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '600px',
            borderRadius: '50%',
            // background: 'radial-gradient(circle, rgba(26, 26, 46, 0.8) 0%, rgba(10, 10, 10, 0.6) 100%)',
              background: 'rgba(10, 10, 10, 70)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 1
          }}
          aria-hidden="true"
        />
      </div>

      {/* Claude Code Features Section */}
      <div
        ref={claudeCodeSectionRef}
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '60px 20px',
          width: '100%',
          zIndex: '2',
        }}
      >
        <div
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '32px',
            textAlign: 'center',
            color: '#60a5fa'
          }}
        >
          Claude Code: Subagents, Commands & Hooks
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}
        >
          {/* Subagents Card */}
          <div
            style={{
              padding: '32px',
              background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(96, 165, 250, 0.05) 100%)',
              borderRadius: '12px',
              border: '1px solid rgba(96, 165, 250, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div style={{ fontSize: '28px', marginBottom: '16px' }}>🤖</div>
            <div
              style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#60a5fa'
              }}
            >
              Subagents
            </div>
            <div style={{ fontSize: '13px', color: '#d1d5db', lineHeight: '1.6' }}>
              Dispatch specialized agents like <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>Explore</code>, <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>senior-frontend-engineer</code>, or <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>react-component-tester</code> for focused, autonomous task completion.
            </div>
          </div>

          {/* Commands Card */}
          <div
            style={{
              padding: '32px',
              background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(96, 165, 250, 0.05) 100%)',
              borderRadius: '12px',
              border: '1px solid rgba(96, 165, 250, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div style={{ fontSize: '28px', marginBottom: '16px' }}>⚡</div>
            <div
              style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#60a5fa'
              }}
            >
              Commands
            </div>
            <div style={{ fontSize: '13px', color: '#d1d5db', lineHeight: '1.6' }}>
              Define custom slash commands like <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>/implement-design</code> or <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>/orchestrate</code> that trigger multi-step workflows with preset configurations.
            </div>
          </div>

          {/* Hooks Card */}
          <div
            style={{
              padding: '32px',
              background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(96, 165, 250, 0.05) 100%)',
              borderRadius: '12px',
              border: '1px solid rgba(96, 165, 250, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div style={{ fontSize: '28px', marginBottom: '16px' }}>🪝</div>
            <div
              style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#60a5fa'
              }}
            >
              Hooks
            </div>
            <div style={{ fontSize: '13px', color: '#d1d5db', lineHeight: '1.6' }}>
              Automate responses to tool events. Run shell commands on <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>SubagentStop</code> or <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>UserPromptSubmit</code> events for seamless CI/CD integration.
            </div>
          </div>
        </div>
      </div>

      {/* Cursor Integration Section */}
      <div
        ref={cursorSectionRef}
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '60px 20px',
          width: '100%'
        }}
      >
        <div
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '32px',
            textAlign: 'center',
            color: '#fbbf24'
          }}
        >
          Cursor: Slash Commands for Agent Coordination
        </div>

        <div
          style={{
            padding: '32px',
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            backdropFilter: 'blur(10px)',
            marginBottom: '24px'
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#fbbf24' }}>
            Pseudo-Autonomous Workflow
          </div>
          <div style={{ fontSize: '13px', color: '#d1d5db', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '12px' }}>
              Use Cursor slash commands to reference Claude Code agents without directly executing them. For example, create <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>/review-with-claude-code</code> that shows what a Claude Code workflow would suggest, enabling you to selectively apply recommendations while maintaining editor context.
            </p>
            <p style={{ marginBottom: '0' }}>
              This keeps both tools in sync: Cursor provides local context and UX, while Claude Code provides specialized agents and autonomous execution. The result? Intelligent, coordinated development where each tool plays to its strengths.
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}
        >
          <div
            style={{
              padding: '24px',
              background: 'rgba(251, 191, 36, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(251, 191, 36, 0.2)'
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>🔄</div>
            <div style={{ fontSize: '13px', color: '#d1d5db', lineHeight: '1.6' }}>
              <strong style={{ color: '#fbbf24' }}>Sync</strong>: Both tools reference shared agent configs and outputs
            </div>
          </div>

          <div
            style={{
              padding: '24px',
              background: 'rgba(251, 191, 36, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(251, 191, 36, 0.2)'
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>🎯</div>
            <div style={{ fontSize: '13px', color: '#d1d5db', lineHeight: '1.6' }}>
              <strong style={{ color: '#fbbf24' }}>Context</strong>: Cursor maintains editor context, Claude Code runs agents
            </div>
          </div>

          <div
            style={{
              padding: '24px',
              background: 'rgba(251, 191, 36, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(251, 191, 36, 0.2)'
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>🚀</div>
            <div style={{ fontSize: '13px', color: '#d1d5db', lineHeight: '1.6' }}>
              <strong style={{ color: '#fbbf24' }}>Autonomous</strong>: Commands can trigger autonomous agent workflows
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: '80px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
            fontSize: '12px',
            color: '#6b7280'
          }}
        >
          <p>Intelligent. Autonomous. Synchronized.</p>
          <p style={{ marginTop: '8px' }}>Claude Code Subagents • Cursor Integration • Agentic Development</p>
        </div>
      </div>
    </div>
  );
}
