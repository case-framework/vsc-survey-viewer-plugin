import * as React from "react";
import { AlertBox, Checkbox, SurveyView} from 'case-web-ui';
import { dateLocales, SurveyFileContent, SurveyViewCred } from "./model";
import { Survey, SurveyContext, SurveySingleItemResponse } from "survey-engine/data_types";
import { useState } from "react";

declare global {
    interface Window {
      acquireVsCodeApi(): any;
      initialData: SurveyFileContent;
    }
  }
  
  //const vscode = window.acquireVsCodeApi();

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
  const initialSurveyCredState: AppState = {
    simulatorUIConfig: defaultSimulatorUIConfig,
    surveyContext: defaultSurveyContext,
    survey: window.initialData.survey,
    surveyKey: window.initialData.studyKey
  }

  const initialSurveyCred: SurveyViewCred = {
    config:initialSurveyCredState.simulatorUIConfig ,
    surveyAndContext : initialSurveyCredState.survey ? {
        survey: initialSurveyCredState.survey,
        context: initialSurveyCredState.surveyContext
      } : undefined,
    prefills:initialSurveyCredState.prefillValues,
    selectedLanguage:initialSurveyCredState.selectedLanguage
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

  
const SurveySimulator: React.FC = (props) => {
    const [surveyViewCred, setSurveyViewCred] = useState<SurveyViewCred>({
        ...initialSurveyCred
      }) ;

    return (
        <div className="container-fluid">
        <div className="container pt-3">
            <div className="row">
                    {/* <DropdownButton
                        id={`simulator-menu`}
                        //size="sm"
                        variant="secondary"
                        title="Menu1"
                        onSelect={(eventKey) => {
                            switch (eventKey) {
                                case 'save':
                                    break;
                                case 'exit':
                                    if (window.confirm('Do you want to exit the simulator (will lose state)?')) {
                                        //props.onExit();
                                    }
                                    break;
                            }
                        }}
                    >
                        <Dropdown.Item
                            disabled
                            eventKey="save">Save Current Survey State</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="exit">Exit Simulator</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        id={`simulator-na`}
                        //size="sm"
                        variant="secondary"
                        title="Menu2"
                        onSelect={(eventKey) => {
                            switch (eventKey) {
                                case 'save':
                                    break;
                                case 'exit':
                                    if (window.confirm('Do you want to exit the simulator (will lose state)?')) {
                                        //props.onExit();
                                    }
                                    break;
                            }
                        }}
                    >
                        <Dropdown.Item
                            disabled
                            eventKey="save">Save Current Survey State</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="exit">Exit Simulator</Dropdown.Item>
                    </DropdownButton> */}
                    <Checkbox
                    id="show-keys-checkbox"
                    name="show-keys-checkbox"
                    className="mb-3"
                    checked={surveyViewCred.config.showKeys}
                    onChange={(value) => {
                        console.log(value);
                        setSurveyViewCred( {
                            config: { texts: initialSurveyCredState.simulatorUIConfig.texts,
                                showKeys: value},
                             surveyAndContext : initialSurveyCredState.survey ? {
                                survey: initialSurveyCredState.survey,
                             context: initialSurveyCredState.surveyContext
                                    } : undefined,
                                prefills:initialSurveyCredState.prefillValues,
                             selectedLanguage:initialSurveyCredState.selectedLanguage
                          })
                    }}
                    label="Show keys"
                />
                    </div>
                </div>
            <div className="row">
        <div className="col-12 col-lg-8 offset-lg-2"
                    //style={{ minHeight: 'calc()' }}
                    >
                        {surveyViewCred.surveyAndContext ?
                            <SurveyView
                                loading={false}
                                showKeys={surveyViewCred.config.showKeys}
                                survey={surveyViewCred.surveyAndContext.survey}
                                context={surveyViewCred.surveyAndContext.context}
                                prefills={surveyViewCred.prefills}
                                languageCode={surveyViewCred.selectedLanguage ? surveyViewCred.selectedLanguage : 'en'}
                                onSubmit={(responses,) => {
                                    console.log(responses);
                                }}
                                nextBtnText={surveyViewCred.config.texts.nextBtn}
                                backBtnText={surveyViewCred.config.texts.backBtn}
                                submitBtnText={surveyViewCred.config.texts.submitBtn}
                                invalidResponseText={surveyViewCred.config.texts.invalidResponseText}
                                dateLocales={dateLocales}
                            /> :
                            <AlertBox type="danger"
                                useIcon={true}
                                content={surveyViewCred.config.texts.noSurveyLoaded}
                            />
                        }
                    </div>
                    </div>
                    </div>
      );

};

export default SurveySimulator;
