import * as React from "react";
import * as ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import '@fontsource/open-sans';
import '@fontsource/open-sans/400-italic.css';
import '@fontsource/open-sans/700.css';
import SurveySimulator from "./surveySimulator";





ReactDOM.render(
<SurveySimulator/>,
document.getElementById("root")
);