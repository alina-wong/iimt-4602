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
        background: {
            default: "#F5F5DC",
            paper: "#4A4A4A",
            appbar: "#F5F5DC",
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
        MuiCard: {
            styleOverrides: {
                root: {
                    "& .MuiTypography-root": {
                        color: "#FFFFFF",
                    },
                },
            },
        },
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