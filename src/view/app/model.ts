import { Survey, SurveyContext, SurveySingleItemResponse } from "survey-engine/data_types";
import { nl, nlBE, fr, de, it } from 'date-fns/locale';

export interface SurveyFileContent {
  studyKey: string;
  survey: Survey;
}
export interface SurveyViewCred {
  config: SimulatorUIConfig;
  surveyAndContext?: {
      survey: Survey;
      context: SurveyContext;
  };
  prefills?: SurveySingleItemResponse[];
  selectedLanguage?: string;
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

export const dateLocales = [
  { code: 'nl', locale: nl, format: 'dd-MM-yyyy' },
  { code: 'nl-be', locale: nlBE, format: 'dd.MM.yyyy' },
  { code: 'fr-be', locale: fr, format: 'dd.MM.yyyy' },
  { code: 'de-be', locale: de, format: 'dd.MM.yyyy' },
  { code: 'it', locale: it, format: 'dd/MM/yyyy' },
];