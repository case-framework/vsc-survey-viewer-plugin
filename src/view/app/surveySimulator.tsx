import * as React from "react";
import { AlertBox, Checkbox, SurveyView} from 'case-web-ui';
import { dateLocales, SurveyFileContent, SurveyViewCred } from "./model";
import { Survey, SurveyContext, SurveySingleItemResponse } from "survey-engine/data_types";
import { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Editor from '@monaco-editor/react';
import clsx from 'clsx';

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
    simulatorUIConfig:{ ...defaultSimulatorUIConfig},
    surveyContext: {...defaultSurveyContext},
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
      const [hasSurveyContextEditorErrors, setHasSurveyContextEditorErrors] = useState(false);
      const [changedSurveyContextValues, setChangedSurveyContextValues] = useState({ ...initialSurveyCred});
    return (
        <div className="container-fluid">
        <div className="container pt-3">
            <div className="row">
                     <DropdownButton
                     autoClose="outside"
                        id={`simulator-config`}
                        //size="sm"
                        variant="secondary"
                        title="Change the Config"
                        onSelect={(eventKey) => {
                            switch (eventKey) {
                                case 'apply':
                                    console.log(changedSurveyContextValues);
                                    setSurveyViewCred(
                                        changedSurveyContextValues
                                      );
                                    break;
                            }
                        }}
                    >
                        <Dropdown.Item
                    
                        
                            eventKey="editor"><Editor
                            width="400px"
                            height="250px"
                            defaultLanguage="json"
                            value={JSON.stringify(defaultSurveyContext , undefined, 4)}
                            className={clsx(
                                { 'border border-danger': hasSurveyContextEditorErrors }
                            )}
                            onValidate={(markers) => {
                                if (markers.length > 0) {
                                    setHasSurveyContextEditorErrors(true)
                                } else {
                                    setHasSurveyContextEditorErrors(false)
                                }
                            }}
                            onChange={(value) => {
                                if (!value) { return }
                                let context: SurveyContext;
                                try {
                                    context = JSON.parse(value);
                                } catch (e: any) {
                                    console.error(e);
                                    return
                                }
                                if (!context) { return }
                                setChangedSurveyContextValues ({
                                   ...surveyViewCred,
                                     surveyAndContext :  surveyViewCred.surveyAndContext ? {
                                        survey: surveyViewCred.surveyAndContext.survey,
                                     context: context
                                            } : undefined
                                       
                                  });
                                 console.log(changedSurveyContextValues);
        
                            }}
                        /></Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="apply">Apply Changes</Dropdown.Item>
                    </DropdownButton>
                   {/* <DropdownButton
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
                            ...surveyViewCred,
                            config: { texts: initialSurveyCredState.simulatorUIConfig.texts,
                                showKeys: value},
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
                                    console.log(surveyViewCred);
                                    
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


