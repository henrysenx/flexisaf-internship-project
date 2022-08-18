import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/Home/HomePage";
import Authentication from "./containers/Login/Authentication";
import { useDarkMode } from "./containers/styles/useDarkMode";
import {
  GlobalStyles,
  lightTheme,
  darkTheme,
} from "./containers/styles/globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";

const App = () => {
  const { theme } = useSelector((state) => state.NoteReducer);
  // const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/home" exact element={<Home />} />
          <Route path="/" exact element={<Authentication />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
