'use client';

import { useState } from 'react';

interface SemanticToken {
  [key: string]: string | number;
}

interface SemanticTokenEditorProps {
  componentName: string;
  tokens: SemanticToken;
  onTokenChange: (tokenKey: string, value: string | number) => void;
}

export function SemanticTokenEditor({
  componentName,
  tokens,
  onTokenChange,
}: SemanticTokenEditorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const tokenEntries = Object.entries(tokens);

  return (
    <div
      style={{
        marginTop: '32px',
        padding: '24px',
        backgroundColor: '#f0f8ff',
        border: '2px solid #0aa5ff',
        borderRadius: '12px',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '12px 16px',
          backgroundColor: '#0aa5ff',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 600,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#0895d9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#0aa5ff';
        }}
      >
        <span>✨ Edit Semantic Tokens - {componentName}</span>
        <span style={{ fontSize: '14px' }}>{isOpen ? '▼' : '▶'}</span>
      </button>

      {isOpen && (
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {tokenEntries.map(([key, value]) => {
            const displayKey = key.replace(/([A-Z])/g, ' $1').trim();
            const isColor = key.toLowerCase().includes('color') || key.toLowerCase().includes('background');
            const isSize = key.toLowerCase().includes('size') || key.toLowerCase().includes('radius');

            return (
              <div key={key}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: '#2f3438',
                    textTransform: 'capitalize',
                  }}
                >
                  {displayKey}
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type={isColor ? 'color' : 'text'}
                    value={String(value)}
                    onChange={(e) => {
                      const newValue = isSize ? `${e.target.value}px` : e.target.value;
                      onTokenChange(key, newValue);
                    }}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '6px',
                      border: '2px solid #e6e6e6',
                      fontSize: '14px',
                      color: '#2f3438',
                      fontFamily: isColor ? 'inherit' : 'monospace',
                    }}
                  />
                  {isColor && (
                    <div
                      style={{
                        width: '48px',
                        height: '40px',
                        borderRadius: '6px',
                        border: '2px solid #e6e6e6',
                        backgroundColor: String(value),
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}

          <button
            onClick={() => setIsOpen(false)}
            style={{
              padding: '10px 16px',
              backgroundColor: '#ffffff',
              color: '#0aa5ff',
              border: '2px solid #0aa5ff',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f8ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
          >
            Done Editing
          </button>
        </div>
      )}
    </div>
  );
}
