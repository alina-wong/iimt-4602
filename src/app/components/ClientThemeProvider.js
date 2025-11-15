"use client";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const Theme = createTheme({
    palette: {
        mode: "light",
        primary: { 
            main: "#3C3C3C",
        },
        secondary: {
            main: "#3C3C3C",
        },
        // Add custom color variants
        success: {
            main: "#4caf50",
            light: "#e8f5e8",
            dark: "#2e7d32"
        },
        info: {
            main: "#2196f3",
            light: "#e3f2fd",
            dark: "#1565c0"
        },
        warning: {
            main: "#ff9800",
            light: "#fff3e0",
            dark: "#f57c00"
        },
        background: {
            default: "#F5F5DC",
            paper: "#FFFFFF", //cards
            appbar: "#F5F5DC",
            // Add custom background variants
            lightGray: "#f5f3f0",
            darkerGray: "#e8e5e0",
            orderSummary: "#e1dfdcff"
        },
        text: { 
            primary: "#000000",
            secondary: "#333333",
        },
        divider: "#333333",
        action: {
            hover: "#EEEEE5",
            selected: "#3C3C3C",
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#F5F5DC",
                    boxShadow: "none",
                    "& .MuiTypography-root": {
                        color: "#000000",
                    },
                },
            },
        },
        // Add custom component variants
        MuiBox: {
            variants: [
                {
                    props: { variant: 'orderSummary' },
                    style: {
                        backgroundColor: '#e1dfdcff',
                        padding: 24,
                        borderRadius: 8,
                        marginBottom: 8
                    }
                },
                {
                    props: { variant: 'paymentOption' },
                    style: {
                        padding: 16,
                        borderRadius: 8,
                        cursor: 'pointer',
                        border: '1px solid #e0e0e0',
                        '&:hover': {
                            backgroundColor: '#f5f5f5'
                        }
                    }
                }
            ]
        },
        // Removed MuiCard override to use default text colors
    },
});

export default function ClientThemeProvider({ children }) {
    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}