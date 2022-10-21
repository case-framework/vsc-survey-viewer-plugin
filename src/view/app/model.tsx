import {
  Survey,
  SurveyContext,
  SurveySingleItemResponse,
} from "survey-engine/data_types";
import { nl, nlBE, fr, de, it } from "date-fns/locale";


export interface SurveyViewCred {
  survey?: Survey;
  context?: SurveyContext;
  selectedLanguage?: string;
  languageCodes?: string[];
  surveyKey?: string;
  prefillsFile?: File;
  prefillValues?: SurveySingleItemResponse[];
  simulatorUIConfig: SimulatorUIConfig;
  inLoadingState: boolean;
}
export interface SimulatorUIConfig {
  texts: SurveyUILabels;
  showKeys: boolean;
}
export interface SurveyUILabels {
  backBtn: string;
  nextBtn: string;
  submitBtn: string;
  invalidResponseText: string;
  noSurveyLoaded: string;
}
export interface OutputFileStructure {
  isOutputDirMissing: Boolean;
  directoryContent: SurveyDirectory[];
}
export interface SurveyDirectory {
  surveyPath: string;
  surveyName: string;
  surveyFiles: string[];
}
export interface SimulatorUIConfig {
  texts: SurveyUILabels;
  showKeys: boolean;
}
export interface SurveyUILabels {
  backBtn: string;
  nextBtn: string;
  submitBtn: string;
  invalidResponseText: string;
  noSurveyLoaded: string;
}
export interface ConfigFileStructure {
  isConfigDirMissing: Boolean;
  directoryContent: ConfigFile[];
}
export interface ConfigFile {
  configFilePath: string;
  configFileName: string;
}
export const dateLocales = [
  { code: "nl", locale: nl, format: "dd-MM-yyyy" },
  { code: "nl-be", locale: nlBE, format: "dd.MM.yyyy" },
  { code: "fr-be", locale: fr, format: "dd.MM.yyyy" },
  { code: "de-be", locale: de, format: "dd.MM.yyyy" },
  { code: "it", locale: it, format: "dd/MM/yyyy" },
];
