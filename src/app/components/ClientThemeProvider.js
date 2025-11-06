"use client";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#8c61ff" },
        background: {
            default: "#1a1625",
            paper: "#2a2238",
        },
        text: { primary: "#e0e0e0" },
    },
    typography: {
        fontFamily: "'Eveleth Solid','Tahoma'",
    },
});

export default function ClientThemeProvider({ children }) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}