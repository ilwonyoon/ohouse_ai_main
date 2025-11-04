'use client';

import { useState } from 'react';
import { EditorLayout } from './components/EditorLayout';
import { LeftPanel } from './components/LeftPanel';
import { Canvas } from './components/Canvas';
import { RightPanel } from './components/RightPanel';
import { ExportButton } from './components/ExportButton';

interface SelectedComponent {
  id: string;
  name: string;
  type: 'typography' | 'color' | 'spacing' | 'component';
}

interface TokenState {
  typography: {
    [key: string]: {
      fontSize: string;
      fontWeight: number;
      lineHeight: string;
      fontFamily: string;
    };
  };
  colors: {
    [key: string]: string;
  };
  spacing: {
    [key: string]: {
      top?: string;
      right?: string;
      bottom?: string;
      left?: string;
      value?: string;
    };
  };
}

export default function EditorPage() {
  const [selectedComponent, setSelectedComponent] = useState<SelectedComponent | null>(null);
  const [tokens, setTokens] = useState<TokenState>({
    typography: {
      heading24: {
        fontSize: '24px',
        fontWeight: 700,
        lineHeight: '32px',
        fontFamily: 'Pretendard',
      },
      heading20: {
        fontSize: '20px',
        fontWeight: 600,
        lineHeight: '28px',
        fontFamily: 'Pretendard',
      },
      body16: {
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        fontFamily: 'Pretendard',
      },
      body14: {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '20px',
        fontFamily: 'Pretendard',
      },
    },
    colors: {
      foreground: '#2f3438',
      background: '#ffffff',
      border: '#e6e6e6',
      primary: '#0aa5ff',
    },
    spacing: {
      small: { value: '8px' },
      medium: { value: '16px' },
      large: { value: '24px' },
      pagePadding: { top: '16px', right: '16px', bottom: '16px', left: '16px' },
    },
  });

  const handleComponentSelect = (component: SelectedComponent) => {
    setSelectedComponent(component);
  };

  const handleTokenUpdate = (path: string, value: any) => {
    setTokens((prev) => {
      const keys = path.split('.');
      const updated = JSON.parse(JSON.stringify(prev));
      let current = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  return (
    <EditorLayout>
      <LeftPanel onComponentSelect={handleComponentSelect} selectedComponent={selectedComponent} />
      <Canvas selectedComponent={selectedComponent} tokens={tokens} />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <RightPanel
            selectedComponent={selectedComponent}
            tokens={tokens}
            onTokenUpdate={handleTokenUpdate}
          />
        </div>
        <ExportButton tokens={tokens} />
      </div>
    </EditorLayout>
  );
}
