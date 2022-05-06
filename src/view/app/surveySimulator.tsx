import * as React from "react";
import { SurveyView } from "case-web-ui";
import {
  ConfigFileStructure,
  dateLocales,
  OutputFileStructure,
  SimulatorUIConfig,
  SurveyFileContent,
  SurveyViewCred,
} from "./model";
import {
  SurveyContext,
  SurveySingleItemResponse,
} from "survey-engine/data_types";
import { useEffect, useState } from "react";
import SelectFileToPreview from "./Components/SelectFileToPreview";
import ShowKeysCheckBox from "./Components/ShowKeysCheckBox";
import UploadPrefill from "./Components/UploadPrefill";
import EnterFileNameDialog from "./Components/EnterFileNameDialog";
import ChangeConfig from "./Components/ChangeConfig";
import ChangeTheme from "./Components/ChangeTheme";
import {  ThemeType } from "./AppConstants";

declare global {
  interface Window {
    acquireVsCodeApi(): any;
    surveyData: SurveyFileContent;
    outPutDirContent: OutputFileStructure;
    changeInSurvey: boolean;
    configFilesDir: ConfigFileStructure;
    changeInConfigFile: boolean;
    updatedConfigFileData: SurveyContext;
  }
}

const vscode = window.acquireVsCodeApi();

const defaultSurveyContext: SurveyContext = {
  isLoggedIn: false,
  participantFlags: {},
};
const defaultSimulatorUIConfig: SimulatorUIConfig = {
  showKeys: false,
  texts: {
    backBtn: "Back",
    nextBtn: "Next",
    submitBtn: "Submit",
    invalidResponseText: "Invalid response",
    noSurveyLoaded: "Survey could not be loaded, please try again.",
  },
};

const initialSurveyCred: SurveyViewCred = {
  simulatorUIConfig: { ...defaultSimulatorUIConfig },

  survey: window.surveyData ? window.surveyData.survey : undefined,
  context: { ...defaultSurveyContext },
  selectedLanguage: "en",
  prefillValues: [],
  prefillsFile: undefined,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const SurveySimulator: React.FC = (props) => {
  const [surveyViewCred, setSurveyViewCred] = useState<SurveyViewCred>({
    ...initialSurveyCred,
  });
  const [changedSelectTheFileBtnText, setChangedSelectTheFileBtnText] =
    useState("Select File To Preview");
  const [outPutDirContentValue, setOutPutDirContentValue] = useState(false);
  const [configDirContentValue, setConfigDirContentValue] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.changeInSurvey) {
        setSurveyViewCred((prevState) => ({
          ...prevState,
          survey: undefined,
        }));
        setSurveyViewCred((prevState) => ({
          ...prevState,
          survey: window.surveyData ? window.surveyData.survey : undefined,
        }));
        window.changeInSurvey = false;
      }
      if (window.changeInConfigFile) {
        setSurveyViewCred((prevState) => ({
          ...prevState,
          context: window.updatedConfigFileData,
        }));
        window.changeInConfigFile = false;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const giveCommandToVscode = (command: string, data: string) => {
    vscode.postMessage({
      command: command,
      data: data,
    });
  };

  return (
    <div className="container-fluid">
      <div className="container pt-2">
        <nav className="navbar navbar-expand navbar-light bg-light ">
          <div
            className="collapse navbar-collapse justify-content-center order-2"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <SelectFileToPreview
                giveCommandToVscode={(command: string, data: string) => {
                  giveCommandToVscode(command, data);
                }}
                setChangedSelectTheFileBtnText={(newText: string) => {
                  setChangedSelectTheFileBtnText(newText);
                }}
                changedSelectTheFileBtnText={changedSelectTheFileBtnText}
                setOutPutDirContentValue={(value: boolean) => {
                  setOutPutDirContentValue(value);
                }}
                outPutDirContentValue={outPutDirContentValue}
                onChangedSurveyViewCred={() => {
                  setSurveyViewCred((prevState) => ({
                    ...prevState,
                    survey: undefined,
                  }));
                  
                  setSurveyViewCred((prevState) => ({
                    ...prevState,
                    survey: window.surveyData
                      ? window.surveyData.survey
                      : undefined,
                  }));
                  
                }}
              />
              <UploadPrefill
                onPrefillChange={(
                  preFillFile: File | undefined,
                  preFillValues: SurveySingleItemResponse[]
                ) => {
                  setSurveyViewCred((prevState) => ({
                    ...prevState,
                    survey: undefined,
                  }));
                  setSurveyViewCred((prevState) => ({
                    ...prevState,
                    survey: window.surveyData
                    ? window.surveyData.survey
                    : undefined,
                    prefillsFile: preFillFile,
                    prefillValues: preFillValues,
                  }));
                } }
                currentSelectFileName={surveyViewCred.prefillsFile
                  ? surveyViewCred.prefillsFile.name
                  : "Upload Prefill"} 
                  giveCommandToVscode={ (command: string, data: string) => {
                    giveCommandToVscode(command,data);
                  } }              />
              <ChangeConfig
                giveCommandToVscode={(command: string, data: string) => {
                  giveCommandToVscode(command, data);
                }}
                setConfigDirContentValue={(value: boolean) => {
                  setConfigDirContentValue(value);
                }}
                configDirContentValue={configDirContentValue}
                onConfigChange={(context: SurveyContext) => {
                  setSurveyViewCred((prevState) => ({
                    ...prevState,
                    survey: undefined,
                  }));
                  setSurveyViewCred((prevState) => ({
                    ...prevState,
                    survey: window.surveyData
                      ? window.surveyData.survey
                      : undefined,
                    context: { ...context },
                  }));
                }}
              />
              <ShowKeysCheckBox
                currentCheckBoxStatus={
                  surveyViewCred.simulatorUIConfig.showKeys
                }
                onCheckBoxStausChange={(newStaus: boolean) => {
                  setSurveyViewCred((prevState) => ({
                    ...prevState,
                    simulatorUIConfig: {
                      texts: initialSurveyCred.simulatorUIConfig.texts,
                      showKeys: newStaus,
                    },
                  }));
                }}
              />
              <ChangeTheme
                onThemeChange={(value: ThemeType) => {
                  console.log(value);
                  giveCommandToVscode("changeTheme", value);
                }}
              />
            </div>
          </div>
        </nav>
      </div>

      <div className="row">
        <div className="col-12 col-lg-8 offset-lg-2">
          {surveyViewCred.survey ? (
            <SurveyView
              loading={false}
              showKeys={surveyViewCred.simulatorUIConfig.showKeys}
              survey={surveyViewCred.survey}
              context={surveyViewCred.context}
              prefills={surveyViewCred.prefillValues}
              languageCode={
                surveyViewCred.selectedLanguage
                  ? surveyViewCred.selectedLanguage
                  : "en"
              }
              onSubmit={(responses) => {
                const exportData = responses.slice();
                var a = document.createElement("a");
                var file = new Blob(
                  [JSON.stringify(exportData, undefined, 2)],
                  { type: "json" }
                );
                a.href = URL.createObjectURL(file);
                a.download = `${
                  surveyViewCred.survey?.current.surveyDefinition.key
                }_responses_${new Date().toLocaleDateString()}.json`;
                a.click();
                // giveCommandToVscode(
                //   "showFileDownloadSuccessMsg",
                //   "The file is saved"
                // );
              }}
              nextBtnText={surveyViewCred.simulatorUIConfig.texts.nextBtn}
              backBtnText={surveyViewCred.simulatorUIConfig.texts.backBtn}
              submitBtnText={surveyViewCred.simulatorUIConfig.texts.submitBtn}
              invalidResponseText={
                surveyViewCred.simulatorUIConfig.texts.invalidResponseText
              }
              dateLocales={dateLocales}
            />
          ) : (
            <div className="mt-5">
              <p className="text-center">
                Please Select The File To Preview The Survey.
              </p>
            </div>
          )}
        </div>
      </div>
      <EnterFileNameDialog
        giveCommandToVscode={(command: string, data: string) => {
          giveCommandToVscode(command, data);
        }}
      />
    </div>
  );
};

export default SurveySimulator;
