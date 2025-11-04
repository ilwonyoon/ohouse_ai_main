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

interface CanvasProps {
  selectedComponent: SelectedComponent | null;
  tokens: TokenState;
}

export function Canvas({ selectedComponent, tokens }: CanvasProps) {
  const renderPreview = () => {
    if (!selectedComponent) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '400px',
            color: '#828c94',
            fontSize: '16px',
          }}
        >
          ← Select a component from the left panel to preview
        </div>
      );
    }

    if (selectedComponent.type === 'typography') {
      const typo = tokens.typography[selectedComponent.id];
      if (!typo) return null;

      return (
        <div
          style={{
            padding: '40px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '2px solid #0aa5ff',
            display: 'inline-block',
          }}
        >
          <h2
            style={{
              fontSize: typo.fontSize,
              fontWeight: typo.fontWeight,
              fontFamily: typo.fontFamily,
              lineHeight: typo.lineHeight,
              margin: 0,
              color: tokens.colors.foreground,
            }}
          >
            {selectedComponent.name}
          </h2>
          <p
            style={{
              fontSize: '13px',
              color: '#828c94',
              margin: '16px 0 0 0',
            }}
          >
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
      );
    }

    if (selectedComponent.type === 'color') {
      const color = tokens.colors[selectedComponent.id];
      if (!color) return null;

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              padding: '40px',
              backgroundColor: color,
              borderRadius: '12px',
              border: '2px solid #0aa5ff',
              width: '200px',
              height: '200px',
            }}
          />
          <div>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#2f3438',
                margin: '0 0 8px 0',
              }}
            >
              {selectedComponent.name}
            </p>
            <p
              style={{
                fontSize: '13px',
                color: '#828c94',
                margin: 0,
                fontFamily: 'monospace',
              }}
            >
              {color}
            </p>
          </div>
        </div>
      );
    }

    if (selectedComponent.type === 'spacing') {
      const spacing = tokens.spacing[selectedComponent.id];
      if (!spacing) return null;

      if (spacing.value) {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div
              style={{
                padding: spacing.value,
                backgroundColor: '#0aa5ff',
                borderRadius: '8px',
                border: '2px solid #0aa5ff',
                minWidth: '100px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '16px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#2f3438',
                  textAlign: 'center',
                }}
              >
                Content
              </div>
            </div>
            <div>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#2f3438',
                  margin: '0 0 8px 0',
                }}
              >
                {selectedComponent.name}
              </p>
              <p
                style={{
                  fontSize: '13px',
                  color: '#828c94',
                  margin: 0,
                  fontFamily: 'monospace',
                }}
              >
                {spacing.value}
              </p>
            </div>
          </div>
        );
      }

      // Show box model for padding/margin
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              border: '2px solid #0aa5ff',
              borderRadius: '8px',
              padding: `${spacing.top || '0'} ${spacing.right || '0'} ${spacing.bottom || '0'} ${spacing.left || '0'}`,
              backgroundColor: 'transparent',
              minWidth: '200px',
            }}
          >
            <div
              style={{
                backgroundColor: '#f0f8ff',
                padding: '16px',
                borderRadius: '4px',
                textAlign: 'center',
                fontSize: '12px',
                color: '#2f3438',
              }}
            >
              Content
            </div>
          </div>
          <div>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#2f3438',
                margin: '0 0 8px 0',
              }}
            >
              {selectedComponent.name}
            </p>
            <p
              style={{
                fontSize: '13px',
                color: '#828c94',
                margin: 0,
                fontFamily: 'monospace',
              }}
            >
              T: {spacing.top || '0'} | R: {spacing.right || '0'} | B:{' '}
              {spacing.bottom || '0'} | L: {spacing.left || '0'}
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '100%',
      }}
    >
      {renderPreview()}
    </div>
  );
}
