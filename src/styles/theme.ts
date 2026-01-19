const theme = {
    fonts: {
      // Change these to swap fonts globally
      heading: "'Libre Baskerville', Georgia, serif",
      body: "'Source Sans 3', system-ui, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },
    colors: {
      text: '#1a1a2e',
      textMuted: '#64748b',
      background: '#fafafa',
      surface: '#ffffff',
      primary: '#6366f1',
      primaryHover: '#4f46e5',
      border: '#e2e8f0',
      codeBg: '#1e1e2e',
      codeText: '#cdd6f4',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      xxl: '3rem',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    maxWidth: '720px',
  } as const;
  
  export type Theme = typeof theme;
  export default theme;