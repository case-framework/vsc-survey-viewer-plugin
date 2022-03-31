import * as React from "react";
import {  Checkbox,  LoadingPlaceholder,  SurveyView} from 'case-web-ui';
import { dateLocales, OutputFileStructure, SurveyFileContent, SurveyViewCred } from "./model";
import { Survey, SurveyContext, SurveySingleItemResponse } from "survey-engine/data_types";
import {   useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Editor from '@monaco-editor/react';
import clsx from 'clsx';



declare global {
    interface Window {
      acquireVsCodeApi(): any;
      surveyData: SurveyFileContent;
      outPutDirContent: OutputFileStructure;
      changeInSurvey: boolean;
      
    }
  }
  
const vscode = window.acquireVsCodeApi();

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
    survey: window.surveyData? window.surveyData.survey : undefined,
    surveyKey: window.surveyData? window.surveyData.studyKey: undefined
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
      const [outPutDirContentValue, setOutPutDirContentValue] = useState({
          hasValue: false,
          isOutputDirMissing: true
      });


      useEffect(() => {
        const interval = setInterval(() => {
            if(window.changeInSurvey){
                console.log(window.changeInSurvey);
                setSurveyViewCred( {
                    ...initialSurveyCred,
                    surveyAndContext :  window.surveyData.survey ? {
                        survey: window.surveyData.survey,
                     context: initialSurveyCredState.surveyContext
                            } : undefined
                  })
                  window.changeInSurvey = false;
            }
        }, 1000);
        return () => clearInterval(interval);
      }, []);
    

      function giveCommandToExtention(command : string, data: string) {
        vscode.postMessage({
            command: command,
            data: data
        });
      };

      function setDropdowns(items: OutputFileStructure):  React.ReactNode{
        return items.directoryContent.map((item) => {
              return <div> 
              <Dropdown.Item eventKey={item.SurveyName} 
              disabled={true} 
              active= {true}>{item.SurveyName}</Dropdown.Item>
              <Dropdown.Divider />
              {setDropdownItems(item.SurveyFiles, item.SurveyPath)}
              </div>
        
          });
      }

      function setDropdownItems(items:  string[], directoryPath: string):  React.ReactNode{
            return items.map((item) => {
                 return   <div >
                        <Dropdown.Item 
                        eventKey={directoryPath+item}
                        onClick= {()=>{
                            giveCommandToExtention('fileSelectedForPreview', directoryPath+"/"+item);
                            giveCommandToExtention('selectedFileToDetectChanges', directoryPath+"/"+item);
                            const intervalId = setInterval(() => {
                                if(window.surveyData){
                                    setSurveyViewCred( {
                                        ...initialSurveyCred,
                                        surveyAndContext :  window.surveyData.survey ? {
                                            survey: window.surveyData.survey,
                                         context: initialSurveyCredState.surveyContext
                                                } : undefined
                                      })
                                clearInterval(intervalId);
                                }
                                
                    
                            }, 1000);
                        }}
                        >{item}</Dropdown.Item>
                        <Dropdown.Divider />
                        </div>
            });
      }
      
      
    return (
        <div className="container-fluid">
        <div className="container pt-3">
            <div className="row">
                   <DropdownButton
                        id={`selectFileToPreview`}
                        style= {{width: "33%", minWidth: "220px"}}
                        //size="sm"
                        variant="secondary"
                        title="Select File To Preview"
                        onClick={()=>{
                            giveCommandToExtention('getOutputFileContent',"");
                            const intervalId = setInterval(() => {
                                
                                if(window.outPutDirContent.directoryContent.length  && window.outPutDirContent.isOutputDirMissing == false){
                                setOutPutDirContentValue({
                                    hasValue: true,
                                    isOutputDirMissing: false
                                });
                                clearInterval(intervalId);
                                }else if(!window.outPutDirContent.directoryContent.length  && window.outPutDirContent.isOutputDirMissing == true){
                                    setOutPutDirContentValue({
                                        hasValue: true,
                                        isOutputDirMissing: true
                                    });
                                    giveCommandToExtention('missingOutputDirError',"The Output Directory is not yet generated");
                                    clearInterval(intervalId);
                                }
                                console.log(window.outPutDirContent);
                    
                            }, 1000);
                        }}
                        
                    >
                             {outPutDirContentValue.hasValue ? setDropdowns(window.outPutDirContent) :<LoadingPlaceholder color="white" minHeight="10vh"/> }
                    </DropdownButton>
                    <DropdownButton
                     style= {{width: "33%", minWidth: "220px"}}
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
                    <div style={{width: "33%", minWidth: "220px"}}>
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
                    <div className="divider py-1 bg-dark"></div>
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
                            <div>
                                <p className="text-center">Please Select The File To Preview The Survey.</p>
                            </div>
                        }
                    </div>
                    </div>
                    </div>
      );
                   

};

export default SurveySimulator;




