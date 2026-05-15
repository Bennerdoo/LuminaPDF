import { createTheme, MantineColorsTuple } from "@mantine/core";

// Define color tuples using CSS variables
const primary: MantineColorsTuple = [
  "var(--color-primary-50)",
  "var(--color-primary-100)",
  "var(--color-primary-200)",
  "var(--color-primary-300)",
  "var(--color-primary-400)",
  "var(--color-primary-500)",
  "var(--color-primary-600)",
  "var(--color-primary-700)",
  "var(--color-primary-800)",
  "var(--color-primary-900)",
];

const green: MantineColorsTuple = [
  "var(--color-green-50)",
  "var(--color-green-100)",
  "var(--color-green-200)",
  "var(--color-green-300)",
  "var(--color-green-400)",
  "var(--color-green-500)",
  "var(--color-green-600)",
  "var(--color-green-700)",
  "var(--color-green-800)",
  "var(--color-green-900)",
];

const yellow: MantineColorsTuple = [
  "var(--color-yellow-50)",
  "var(--color-yellow-100)",
  "var(--color-yellow-200)",
  "var(--color-yellow-300)",
  "var(--color-yellow-400)",
  "var(--color-yellow-500)",
  "var(--color-yellow-600)",
  "var(--color-yellow-700)",
  "var(--color-yellow-800)",
  "var(--color-yellow-900)",
];

const gray: MantineColorsTuple = [
  "var(--color-gray-50)",
  "var(--color-gray-100)",
  "var(--color-gray-200)",
  "var(--color-gray-300)",
  "var(--color-gray-400)",
  "var(--color-gray-500)",
  "var(--color-gray-600)",
  "var(--color-gray-700)",
  "var(--color-gray-800)",
  "var(--color-gray-900)",
];

export const mantineTheme = createTheme({
  // Primary color
  primaryColor: "primary",

  // Typography
  fontFamily: "var(--font-body)",
  headings: {
    fontFamily: "var(--font-display)",
    fontWeight: "700",
  },

  // Color palette
  colors: {
    primary,
    green,
    yellow,
    gray,
  },

  // Spacing system - uses CSS variables
  spacing: {
    xs: "var(--space-xs)",
    sm: "var(--space-sm)",
    md: "var(--space-md)",
    lg: "var(--space-lg)",
    xl: "var(--space-xl)",
  },

  // Border radius system - Sharp corners for antiquarian look
  defaultRadius: 0,
  radius: {
    xs: "0",
    sm: "0",
    md: "0",
    lg: "0",
    xl: "0",
  },

  // Shadow system
  shadows: {
    xs: "var(--shadow-xs)",
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)",
    xl: "var(--shadow-xl)",
  },

  // Custom variables for specific components
  other: {
    crop: {
      overlayBorder: "var(--color-primary-500)",
      overlayBackground: "rgba(200, 50, 30, 0.1)", // Red with 10% opacity
      handleColor: "var(--color-primary-500)",
      handleBorder: "var(--bg-surface)",
    },
  },

  // Component customizations
  components: {
    Button: {
      defaultProps: {
        radius: 0,
      },
      styles: {
        root: {
          fontWeight: "var(--font-weight-medium)",
          transition: "all 0.2s ease",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        },
      },
      variants: {
        // Custom button variant for PDF tools
        pdfTool: (_theme: any) => ({
          root: {
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-default)",
            color: "var(--text-primary)",
            "&:hover": {
              backgroundColor: "var(--hover-bg)",
              borderColor: "var(--color-primary-500)",
            },
          },
        }),
      },
    } as any,

    Paper: {
      defaultProps: {
        radius: 0,
      },
      styles: {
        root: {
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
        },
      },
    },

    Card: {
      defaultProps: {
        radius: 0,
      },
      styles: {
        root: {
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "var(--shadow-sm)",
        },
      },
    },
    Textarea: {
      styles: (_theme: any) => ({
        input: {
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-default)",
          color: "var(--text-primary)",
          borderRadius: 0,
          "&:focus": {
            borderColor: "var(--color-primary-500)",
            boxShadow: "0 0 0 1px var(--color-primary-500)",
          },
        },
        label: {
          color: "var(--text-secondary)",
          fontWeight: "var(--font-weight-medium)",
          fontFamily: "var(--font-mono)",
          textTransform: "uppercase",
          fontSize: "0.7rem",
        },
      }),
    },

    TextInput: {
      styles: (_theme: any) => ({
        input: {
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-default)",
          color: "var(--text-primary)",
          borderRadius: 0,
          "&:focus": {
            borderColor: "var(--color-primary-500)",
            boxShadow: "0 0 0 1px var(--color-primary-500)",
          },
        },
        label: {
          color: "var(--text-secondary)",
          fontWeight: "var(--font-weight-medium)",
          fontFamily: "var(--font-mono)",
          textTransform: "uppercase",
          fontSize: "0.7rem",
        },
      }),
    },

    PasswordInput: {
      styles: (_theme: any) => ({
        input: {
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-default)",
          color: "var(--text-primary)",
          borderRadius: 0,
          "&:focus": {
            borderColor: "var(--color-primary-500)",
            boxShadow: "0 0 0 1px var(--color-primary-500)",
          },
        },
        label: {
          color: "var(--text-secondary)",
          fontWeight: "var(--font-weight-medium)",
          fontFamily: "var(--font-mono)",
          textTransform: "uppercase",
          fontSize: "0.7rem",
        },
      }),
    },

    Select: {
      styles: {
        input: {
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-default)",
          color: "var(--text-primary)",
          borderRadius: 0,
          "&:focus": {
            borderColor: "var(--color-primary-500)",
            boxShadow: "0 0 0 1px var(--color-primary-500)",
          },
        },
        label: {
          color: "var(--text-secondary)",
          fontWeight: "var(--font-weight-medium)",
          fontFamily: "var(--font-mono)",
          textTransform: "uppercase",
          fontSize: "0.7rem",
        },
        dropdown: {
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-subtle)",
          boxShadow: "var(--shadow-lg)",
          borderRadius: 0,
        },
        option: {
          color: "var(--text-primary)",
          "--combobox-option-hover": "var(--hover-bg)",
          "--combobox-option-selected": "var(--color-primary-100)",
        } as any,
      },
    },

    Tooltip: {
      styles: {
        tooltip: {
          backgroundColor: "var(--paper-dark)",
          color: "var(--ink)",
          border: "1px solid var(--ink)",
          fontSize: "0.75rem",
          fontWeight: "500",
          boxShadow: "var(--shadow-md)",
          borderRadius: 0,
        },
      },
    },

    Checkbox: {
      styles: {
        input: {
          borderColor: "var(--border-default)",
          borderRadius: 0,
          "&:checked": {
            backgroundColor: "var(--color-primary-500)",
            borderColor: "var(--color-primary-500)",
          },
        },
        label: {
          color: "var(--text-primary)",
        },
      },
    },

    Modal: {
      styles: {
        content: {
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "var(--shadow-xl)",
          borderRadius: 0,
        },
        header: {
          backgroundColor: "var(--bg-surface)",
          borderBottom: "1px solid var(--border-subtle)",
        },
        title: {
          color: "var(--text-primary)",
          fontWeight: "var(--font-weight-semibold)",
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
        },
      },
    },

    Notification: {
      styles: {
        root: {
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "var(--shadow-lg)",
          borderRadius: 0,
        },
        title: {
          color: "var(--text-primary)",
        },
        description: {
          color: "var(--text-secondary)",
        },
      },
    },
  },
});

