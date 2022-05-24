import * as React from "react";
import * as ReactDOM from "react-dom";
import "@fontsource/open-sans";
import "@fontsource/open-sans/400-italic.css";
import "@fontsource/open-sans/700.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "../ScssFiles/defaultTheme.scss";
import SurveySimulator from "../SurveySimulator";

ReactDOM.render(<SurveySimulator />, document.getElementById("root"));
