import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeSelect: "darkAlgorithm",
};

const toggleThemeSlice = createSlice({
    name: "toggleThemeSlice",
    initialState,
    reducers: {
        setThemeLight: (state, { type, payload }) => {
            document.querySelector("html").dataset.bsTheme = "light";
            state.themeSelect = "light";
        },
        setThemeDark: (state, { type, payload }) => {
            state.themeSelect = "darkAlgorithm"
            document.querySelector("html").dataset.bsTheme = "dark";
        },
    },
});

export const { setThemeLight, setThemeDark } = toggleThemeSlice.actions;

export default toggleThemeSlice.reducer;
