import { useState } from 'react';

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

interface RightPanelProps {
  selectedComponent: SelectedComponent | null;
  tokens: TokenState;
  onTokenUpdate: (path: string, value: any) => void;
}

export function RightPanel({
  selectedComponent,
  tokens,
  onTokenUpdate,
}: RightPanelProps) {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    typography: true,
    colors: true,
    spacing: true,
  });

  if (!selectedComponent) {
    return (
      <div
        style={{
          color: '#828c94',
          fontSize: '13px',
          textAlign: 'center',
          paddingTop: '24px',
        }}
      >
        Select a component to edit its tokens
      </div>
    );
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (selectedComponent.type === 'typography') {
    const typo = tokens.typography[selectedComponent.id];
    if (!typo) return null;

    const fontSizes = [
      '10px',
      '12px',
      '14px',
      '16px',
      '18px',
      '20px',
      '24px',
      '32px',
    ];
    const fontWeights = [
      { label: 'Regular', value: 400 },
      { label: 'Medium', value: 500 },
      { label: 'Semibold', value: 600 },
      { label: 'Bold', value: 700 },
    ];
    const lineHeights = [
      '14px',
      '16px',
      '18px',
      '20px',
      '24px',
      '26px',
      '28px',
      '32px',
    ];
    const fontFamilies = ['Pretendard', 'SF Pro Text', 'System'];

    return (
      <div>
        <h2
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#2f3438',
            margin: '0 0 24px 0',
          }}
        >
          {selectedComponent.name}
        </h2>

        {/* Typography Section */}
        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={() => toggleSection('typography')}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#f7f9fa',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              color: '#2f3438',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: expandedSections.typography ? '12px' : '0',
            }}
          >
            <span>📝 Typography</span>
            <span>{expandedSections.typography ? '▼' : '▶'}</span>
          </button>

          {expandedSections.typography && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Font Size */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: '#2f3438',
                  }}
                >
                  Font Size
                </label>
                <select
                  value={typo.fontSize}
                  onChange={(e) =>
                    onTokenUpdate(`typography.${selectedComponent.id}.fontSize`, e.target.value)
                  }
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #e6e6e6',
                    fontSize: '13px',
                    color: '#2f3438',
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                  }}
                >
                  {fontSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Font Weight */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: '#2f3438',
                  }}
                >
                  Font Weight
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                  }}
                >
                  {fontWeights.map((weight) => (
                    <button
                      key={weight.value}
                      onClick={() =>
                        onTokenUpdate(
                          `typography.${selectedComponent.id}.fontWeight`,
                          weight.value
                        )
                      }
                      style={{
                        padding: '8px',
                        borderRadius: '6px',
                        border:
                          typo.fontWeight === weight.value
                            ? '2px solid #0aa5ff'
                            : '1px solid #e6e6e6',
                        backgroundColor:
                          typo.fontWeight === weight.value
                            ? '#f0f8ff'
                            : '#ffffff',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#2f3438',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {weight.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Line Height */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: '#2f3438',
                  }}
                >
                  Line Height
                </label>
                <select
                  value={typo.lineHeight}
                  onChange={(e) =>
                    onTokenUpdate(
                      `typography.${selectedComponent.id}.lineHeight`,
                      e.target.value
                    )
                  }
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #e6e6e6',
                    fontSize: '13px',
                    color: '#2f3438',
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                  }}
                >
                  {lineHeights.map((height) => (
                    <option key={height} value={height}>
                      {height}
                    </option>
                  ))}
                </select>
              </div>

              {/* Font Family */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: '#2f3438',
                  }}
                >
                  Font Family
                </label>
                <select
                  value={typo.fontFamily}
                  onChange={(e) =>
                    onTokenUpdate(
                      `typography.${selectedComponent.id}.fontFamily`,
                      e.target.value
                    )
                  }
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #e6e6e6',
                    fontSize: '13px',
                    color: '#2f3438',
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                  }}
                >
                  {fontFamilies.map((family) => (
                    <option key={family} value={family}>
                      {family}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (selectedComponent.type === 'color') {
    const color = tokens.colors[selectedComponent.id];
    if (!color) return null;

    return (
      <div>
        <h2
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#2f3438',
            margin: '0 0 24px 0',
          }}
        >
          {selectedComponent.name}
        </h2>

        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={() => toggleSection('colors')}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#f7f9fa',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              color: '#2f3438',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: expandedSections.colors ? '12px' : '0',
            }}
          >
            <span>🎨 Color</span>
            <span>{expandedSections.colors ? '▼' : '▶'}</span>
          </button>

          {expandedSections.colors && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: '#2f3438',
                  }}
                >
                  Hex Value
                </label>
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                >
                  <input
                    type="text"
                    value={color}
                    onChange={(e) =>
                      onTokenUpdate(`colors.${selectedComponent.id}`, e.target.value)
                    }
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid #e6e6e6',
                      fontSize: '13px',
                      color: '#2f3438',
                      fontFamily: 'monospace',
                    }}
                  />
                  <input
                    type="color"
                    value={color}
                    onChange={(e) =>
                      onTokenUpdate(`colors.${selectedComponent.id}`, e.target.value)
                    }
                    style={{
                      width: '48px',
                      height: '40px',
                      borderRadius: '6px',
                      border: '1px solid #e6e6e6',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              </div>

              {/* Color Preview */}
              <div
                style={{
                  padding: '16px',
                  backgroundColor: color,
                  borderRadius: '8px',
                  border: '1px solid #e6e6e6',
                  minHeight: '80px',
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (selectedComponent.type === 'spacing') {
    const spacing = tokens.spacing[selectedComponent.id];
    if (!spacing) return null;

    return (
      <div>
        <h2
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#2f3438',
            margin: '0 0 24px 0',
          }}
        >
          {selectedComponent.name}
        </h2>

        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={() => toggleSection('spacing')}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#f7f9fa',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              color: '#2f3438',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: expandedSections.spacing ? '12px' : '0',
            }}
          >
            <span>📏 Spacing</span>
            <span>{expandedSections.spacing ? '▼' : '▶'}</span>
          </button>

          {expandedSections.spacing && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {spacing.value !== undefined && (
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 600,
                      marginBottom: '8px',
                      color: '#2f3438',
                    }}
                  >
                    Value
                  </label>
                  <input
                    type="text"
                    value={spacing.value}
                    onChange={(e) =>
                      onTokenUpdate(
                        `spacing.${selectedComponent.id}.value`,
                        e.target.value
                      )
                    }
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid #e6e6e6',
                      fontSize: '13px',
                      color: '#2f3438',
                    }}
                  />
                </div>
              )}

              {spacing.top !== undefined && (
                <>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        marginBottom: '8px',
                        color: '#2f3438',
                      }}
                    >
                      Top
                    </label>
                    <input
                      type="text"
                      value={spacing.top || '0'}
                      onChange={(e) =>
                        onTokenUpdate(
                          `spacing.${selectedComponent.id}.top`,
                          e.target.value
                        )
                      }
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid #e6e6e6',
                        fontSize: '13px',
                        color: '#2f3438',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        marginBottom: '8px',
                        color: '#2f3438',
                      }}
                    >
                      Right
                    </label>
                    <input
                      type="text"
                      value={spacing.right || '0'}
                      onChange={(e) =>
                        onTokenUpdate(
                          `spacing.${selectedComponent.id}.right`,
                          e.target.value
                        )
                      }
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid #e6e6e6',
                        fontSize: '13px',
                        color: '#2f3438',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        marginBottom: '8px',
                        color: '#2f3438',
                      }}
                    >
                      Bottom
                    </label>
                    <input
                      type="text"
                      value={spacing.bottom || '0'}
                      onChange={(e) =>
                        onTokenUpdate(
                          `spacing.${selectedComponent.id}.bottom`,
                          e.target.value
                        )
                      }
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid #e6e6e6',
                        fontSize: '13px',
                        color: '#2f3438',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        marginBottom: '8px',
                        color: '#2f3438',
                      }}
                    >
                      Left
                    </label>
                    <input
                      type="text"
                      value={spacing.left || '0'}
                      onChange={(e) =>
                        onTokenUpdate(
                          `spacing.${selectedComponent.id}.left`,
                          e.target.value
                        )
                      }
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid #e6e6e6',
                        fontSize: '13px',
                        color: '#2f3438',
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
