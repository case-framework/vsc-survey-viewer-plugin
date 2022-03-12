import * as React from "react";
import * as ReactDOM from "react-dom";
import { Survey, SurveyContext, SurveySingleItemResponse } from "survey-engine/data_types";
import { SurveyFileContent } from "./model";

import SurveySimulator from "./surveySimulator";

declare global {
  interface Window {
    acquireVsCodeApi(): any;
    initialData: SurveyFileContent;
  }
}
interface AppState {
  selectedLanguage?: string;
  languageCodes?: string[];
  surveyKey?: string;
  survey?: Survey;
  surveyContext: SurveyContext;
  prefillsFile?: File;
  prefillValues?: SurveySingleItemResponse[],
  simulatorUIConfig: SimulatorUIConfig;
}

const defaultSurveyContext: SurveyContext = {
  isLoggedIn: false,
  participantFlags: {},
}
const defaultSimulatorUIConfig: SimulatorUIConfig = {
  showKeys: false,
  texts: {
      backBtn: 'Back',
      nextBtn: 'Next',
      submitBtn: 'Submit',
      invalidResponseText: 'Invalid response',
      noSurveyLoaded: 'Survey could not be loaded, please try again.'
  }
}
const initialSurveyCred: AppState = {
  simulatorUIConfig: defaultSimulatorUIConfig,
  surveyContext: defaultSurveyContext,
  survey: window.initialData.survey,
  surveyKey: window.initialData.studyKey
}

interface SimulatorUIConfig {
  texts: SurveyUILabels;
  showKeys: boolean;
}
interface SurveyUILabels {
  backBtn: string;
  nextBtn: string;
  submitBtn: string;
  invalidResponseText: string;
  noSurveyLoaded: string;
}
//const vscode = window.acquireVsCodeApi();



ReactDOM.render(
<SurveySimulator config={initialSurveyCred.simulatorUIConfig}
          surveyAndContext={
            initialSurveyCred.survey ? {
              survey: initialSurveyCred.survey,
              context: initialSurveyCred.surveyContext
            } : undefined
          }
          prefills={initialSurveyCred.prefillValues}
          selectedLanguage={initialSurveyCred.selectedLanguage} />,
document.getElementById("root")
);