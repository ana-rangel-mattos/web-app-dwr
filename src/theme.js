import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
    palette: {
        primary: {
            light: "#4d9d9a",
            main: "#218581",
            dark: "#175d5a",
            contrastText: "#fff",
        },
        secondary: {
            light: "#337a77",
            main: "#005955",
            dark: "#003e3b",
            contrastText: "#000814",
            contrastText2: "#000",
        }
    }
});

const darkTheme = createTheme({
    palette: {
        primary: {
            light: "#457b9d",
            main: "#001D3D",
            dark: "#000814",
            contrastText: "#FFD60A",
        },
        secondary: {
            light: "#ff7961",
            main: "#FFD60A",
            dark: "#FFC300",
            contrastText: "#fff",
            contrastText2: "#f7f7f7",
        }
    }
});

export { lightTheme, darkTheme }