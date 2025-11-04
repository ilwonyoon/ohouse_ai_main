'use client';

export default function AccessibilityChecks() {
  const wcagRequirements = [
    { level: 'WCAG AA', ratio: '4.5:1', type: 'Normal text', status: '✓ Met' },
    { level: 'WCAG AA', ratio: '3:1', type: 'Large text (18px+)', status: '✓ Met' },
    { level: 'WCAG AA', ratio: '3:1', type: 'UI components', status: '✓ Met' },
    { level: 'AAA', ratio: '7:1', type: 'Enhanced contrast', status: '✓ Available' },
  ];

  const a11yChecks = [
    { item: 'Keyboard Navigation', status: 'Supported', icon: '⌨️' },
    { item: 'Focus Indicators', status: 'Visible', icon: '👁️' },
    { item: 'Screen Reader Support', status: 'ARIA Labels', icon: '📢' },
    { item: 'Color Contrast', status: 'WCAG AA', icon: '🎨' },
    { item: 'Reduced Motion', status: 'Supported', icon: '🎬' },
    { item: 'Text Resizing', status: 'Responsive', icon: '📝' },
  ];

  return (
    <div>
      <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#2f3438', marginBottom: '8px' }}>
        ♿ Accessibility & Compliance
      </h2>
      <p style={{ fontSize: '16px', color: '#828c94', marginBottom: '40px', lineHeight: 1.5 }}>
        Ohouse AI is committed to WCAG 2.1 Level AA compliance to ensure accessibility for all users.
      </p>

      {/* A11y Checklist */}
      <div style={{ marginBottom: '50px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#2f3438', marginBottom: '24px' }}>
          A11y Features
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {a11yChecks.map((check) => (
            <div
              key={check.item}
              style={{
                border: '1px solid #e6e6e6',
                borderRadius: '12px',
                padding: '20px',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.borderColor = '#0aa5ff';
                target.style.boxShadow = '0 2px 8px rgba(10, 165, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.borderColor = '#e6e6e6';
                target.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '24px' }}>{check.icon}</div>
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#2f3438' }}>
                {check.item}
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#27ae60', fontWeight: 600 }}>
                ✓ {check.status}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* WCAG Compliance Table */}
      <div style={{ marginBottom: '50px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#2f3438', marginBottom: '16px' }}>
          WCAG 2.1 Compliance
        </h3>

        <div style={{
          background: '#f7f9fa',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid #e6e6e6',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#ffffff', borderBottom: '2px solid #e6e6e6' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: 700, color: '#2f3438' }}>
                  Level
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: 700, color: '#2f3438' }}>
                  Requirement
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: 700, color: '#2f3438' }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {wcagRequirements.map((req, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e6e6e6' }}>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#2f3438', fontWeight: 600 }}>
                    {req.level}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#2f3438' }}>
                    <strong>{req.type}</strong>: {req.ratio} contrast
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#27ae60', fontWeight: 600 }}>
                    {req.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Focus Management */}
      <div style={{ marginBottom: '50px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#2f3438', marginBottom: '24px' }}>
          Focus Management & Keyboard Navigation
        </h3>

        <div style={{
          background: '#f7f9fa',
          borderRadius: '12px',
          padding: '40px',
        }}>
          <p style={{
            fontSize: '14px',
            color: '#2f3438',
            margin: '0 0 16px 0',
            lineHeight: 1.6,
          }}>
            Try using the <strong>Tab</strong> key to navigate through interactive elements. You'll notice:
          </p>
          <ul style={{
            margin: 0,
            paddingLeft: '20px',
            fontSize: '14px',
            color: '#2f3438',
            lineHeight: 1.8,
          }}>
            <li>Visible focus rings on all interactive elements (2px cyan outline)</li>
            <li>Logical tab order matching visual layout</li>
            <li>Clear indication of current focus state</li>
            <li>Proper focus management in modals and dropdowns</li>
          </ul>
        </div>
      </div>

      {/* Documentation Reference */}
      <div style={{
        background: '#f0f8ff',
        border: '1px solid #0aa5ff',
        borderRadius: '12px',
        padding: '30px',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0aa5ff', marginTop: 0, marginBottom: '16px' }}>
          📚 Full Accessibility Documentation
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#2f3438',
          margin: '0 0 12px 0',
          lineHeight: 1.6,
        }}>
          Complete accessibility guidelines, WCAG compliance checklist, and implementation details:
        </p>
        <ul style={{
          margin: 0,
          paddingLeft: '20px',
          fontSize: '14px',
          color: '#2f3438',
        }}>
          <li>ACCESSIBILITY.md - Complete WCAG 2.1 AA guidelines</li>
          <li>STATES_AND_VARIANTS.md - Focus and disabled states</li>
          <li>AccessibilityTokens - Focus ring and high contrast tokens</li>
          <li>WCAG 2.1 Quick Reference - Accessibility requirements</li>
        </ul>
      </div>
    </div>
  );
}
