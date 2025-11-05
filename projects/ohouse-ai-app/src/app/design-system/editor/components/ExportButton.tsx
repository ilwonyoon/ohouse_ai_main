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

interface ExportButtonProps {
  tokens: TokenState;
}

export function ExportButton({ tokens }: ExportButtonProps) {
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(tokens, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tokens-${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportCSS = () => {
    let cssContent = ':root {\n';

    // Export typography tokens as CSS variables
    for (const [key, typo] of Object.entries(tokens.typography)) {
      cssContent += `  --font-${key}-size: ${typo.fontSize};\n`;
      cssContent += `  --font-${key}-weight: ${typo.fontWeight};\n`;
      cssContent += `  --font-${key}-lineheight: ${typo.lineHeight};\n`;
      cssContent += `  --font-${key}-family: ${typo.fontFamily};\n`;
    }

    // Export color tokens as CSS variables
    for (const [key, color] of Object.entries(tokens.colors)) {
      cssContent += `  --color-${key}: ${color};\n`;
    }

    // Export spacing tokens as CSS variables
    for (const [key, spacing] of Object.entries(tokens.spacing)) {
      if (spacing.value) {
        cssContent += `  --spacing-${key}: ${spacing.value};\n`;
      } else if (spacing.top) {
        cssContent += `  --spacing-${key}-top: ${spacing.top};\n`;
        cssContent += `  --spacing-${key}-right: ${spacing.right};\n`;
        cssContent += `  --spacing-${key}-bottom: ${spacing.bottom};\n`;
        cssContent += `  --spacing-${key}-left: ${spacing.left};\n`;
      }
    }

    cssContent += '}';

    const dataBlob = new Blob([cssContent], { type: 'text/css' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tokens-${new Date().getTime()}.css`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        borderTop: '1px solid #e6e6e6',
        paddingTop: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <h3
        style={{
          fontSize: '14px',
          fontWeight: 700,
          color: '#2f3438',
          margin: 0,
          marginBottom: '12px',
        }}
      >
        📤 Export
      </h3>
      <button
        onClick={handleExportJSON}
        style={{
          padding: '12px',
          backgroundColor: '#0aa5ff',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 600,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#0895d9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#0aa5ff';
        }}
      >
        Download JSON
      </button>
      <button
        onClick={handleExportCSS}
        style={{
          padding: '12px',
          backgroundColor: '#27ae60',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 600,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#229954';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#27ae60';
        }}
      >
        Download CSS
      </button>
    </div>
  );
}
