import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider } from "@emotion/react";
import theme from "./themes/theme";

console.log("Thanks to https://icanhazdadjoke.com for the dad jokes!");
console.log("Thanks to placebeard.it for the beard images!");

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
