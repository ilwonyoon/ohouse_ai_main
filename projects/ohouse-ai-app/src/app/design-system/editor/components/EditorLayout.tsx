import { ReactNode } from 'react';

interface EditorLayoutProps {
  children: ReactNode;
}

export function EditorLayout({ children }: EditorLayoutProps) {
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - 64px)',
        width: '100%',
        backgroundColor: '#f7f9fa',
      }}
    >
      {/* Left Panel */}
      <div
        style={{
          width: '250px',
          borderRight: '1px solid #e6e6e6',
          backgroundColor: '#ffffff',
          overflowY: 'auto',
        }}
      >
        {childArray[0]}
      </div>

      {/* Center Canvas */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          padding: '24px',
        }}
      >
        {childArray[1]}
      </div>

      {/* Right Panel */}
      <div
        style={{
          width: '350px',
          borderLeft: '1px solid #e6e6e6',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
        }}
      >
        {childArray[2]}
      </div>
    </div>
  );
}
