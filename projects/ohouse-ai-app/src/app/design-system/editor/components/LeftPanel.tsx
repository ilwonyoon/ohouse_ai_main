interface SelectedComponent {
  id: string;
  name: string;
  type: 'typography' | 'color' | 'spacing' | 'component';
}

interface LeftPanelProps {
  onComponentSelect: (component: SelectedComponent) => void;
  selectedComponent: SelectedComponent | null;
}

const COMPONENTS = {
  typography: [
    { id: 'heading24', name: 'Heading 24 / Bold' },
    { id: 'heading20', name: 'Heading 20 / Semibold' },
    { id: 'body16', name: 'Body 16 / Regular' },
    { id: 'body14', name: 'Body 14 / Regular' },
  ],
  colors: [
    { id: 'foreground', name: 'Foreground' },
    { id: 'background', name: 'Background' },
    { id: 'border', name: 'Border' },
    { id: 'primary', name: 'Primary / Blue' },
  ],
  spacing: [
    { id: 'small', name: 'Small (8px)' },
    { id: 'medium', name: 'Medium (16px)' },
    { id: 'large', name: 'Large (24px)' },
    { id: 'pagePadding', name: 'Page Padding' },
  ],
};

export function LeftPanel({ onComponentSelect, selectedComponent }: LeftPanelProps) {
  return (
    <div>
      {/* Typography Section */}
      <div style={{ padding: '16px' }}>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#2f3438',
            margin: '0 0 12px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          📝 Typography
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {COMPONENTS.typography.map((component) => (
            <button
              key={component.id}
              onClick={() =>
                onComponentSelect({ ...component, type: 'typography' })
              }
              style={{
                padding: '12px',
                backgroundColor:
                  selectedComponent?.id === component.id
                    ? '#f0f8ff'
                    : '#transparent',
                border:
                  selectedComponent?.id === component.id
                    ? '1px solid #0aa5ff'
                    : '1px solid transparent',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#2f3438',
                textAlign: 'left',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (selectedComponent?.id !== component.id) {
                  e.currentTarget.style.backgroundColor = '#f7f9fa';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedComponent?.id !== component.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {component.name}
            </button>
          ))}
        </div>
      </div>

      {/* Colors Section */}
      <div style={{ padding: '16px', borderTop: '1px solid #e6e6e6' }}>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#2f3438',
            margin: '0 0 12px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          🎨 Colors
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {COMPONENTS.colors.map((component) => (
            <button
              key={component.id}
              onClick={() =>
                onComponentSelect({ ...component, type: 'color' })
              }
              style={{
                padding: '12px',
                backgroundColor:
                  selectedComponent?.id === component.id
                    ? '#f0f8ff'
                    : 'transparent',
                border:
                  selectedComponent?.id === component.id
                    ? '1px solid #0aa5ff'
                    : '1px solid transparent',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#2f3438',
                textAlign: 'left',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (selectedComponent?.id !== component.id) {
                  e.currentTarget.style.backgroundColor = '#f7f9fa';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedComponent?.id !== component.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {component.name}
            </button>
          ))}
        </div>
      </div>

      {/* Spacing Section */}
      <div style={{ padding: '16px', borderTop: '1px solid #e6e6e6' }}>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#2f3438',
            margin: '0 0 12px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          📏 Spacing
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {COMPONENTS.spacing.map((component) => (
            <button
              key={component.id}
              onClick={() =>
                onComponentSelect({ ...component, type: 'spacing' })
              }
              style={{
                padding: '12px',
                backgroundColor:
                  selectedComponent?.id === component.id
                    ? '#f0f8ff'
                    : 'transparent',
                border:
                  selectedComponent?.id === component.id
                    ? '1px solid #0aa5ff'
                    : '1px solid transparent',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#2f3438',
                textAlign: 'left',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (selectedComponent?.id !== component.id) {
                  e.currentTarget.style.backgroundColor = '#f7f9fa';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedComponent?.id !== component.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {component.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
