// src/styles/theme.ts

export const theme = {
  colors: {
    // Primary
    DeepBlue: "#12305C",

    // Background
    background: "#F5F2F0",
    sidebarBackground: "#EDE9E6",
    white: "#FFFFFF",

    // Success
    success: "#1A9C53",
    successLight: "#D4EBD8",

    // Text
    textPrimary: "#111827",
    textSecondary: "#6B7280",

    // Border
    border: "#E5E7EB",
  },

  typography: {
    title: {
      size: "48px",
      weight: 700,
    },
    sectionTitle: {
      size: "28px",
      weight: 700,
    },
    cardTitle: {
      size: "18px",
      weight: 600,
    },
    body: {
      size: "14px",
      weight: 500,
    },
    caption: {
      size: "12px",
      weight: 400,
    },
  },

  radius: {
    card: "16px",
    button: "10px",
  },

  shadow: {
    card: "0 2px 8px rgba(0,0,0,0.04)",
  },
};

export type ThemeType = typeof theme;
