import * as React from "react";
import { SurveyView } from "case-web-ui";
import {
  ConfigFileStructure,
  dateLocales,
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
import { ThemeType } from "./AppConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Css/Toolbar.css";
declare global {
  interface Window {
    acquireVsCodeApi(): any;
    surveyData: SurveyFileContent | undefined;
    configFilesDir: ConfigFileStructure;
    updatedConfigFileData: SurveyContext;
    selectedTheme: ThemeType;
    versionNumber: string;
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
  survey: undefined,
  context: { ...defaultSurveyContext },
  selectedLanguage: "en",
  prefillValues: [],
  prefillsFile: undefined,
  inLoadingState: false,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const SurveySimulator: React.FC = (props) => {
  const [surveyViewCred, setSurveyViewCred] = useState<SurveyViewCred>({
    ...initialSurveyCred,
  });
  const [configDirContentValue, setConfigDirContentValue] = useState(false);
  const [navbarToggleIsOpen, setNavbarToggleIsOpen] = useState(false);
  const [outputDirFiles, setoutputDirFiles] = useState(undefined);
  const [selectSurveyBtnLoadingState, setselectSurveyBtnLoadingState] =
    useState(false);
  useEffect(() => {
    //listener for messages from the vscode
    window.addEventListener("message", (event) => {
      const message = event.data;
      // Sets the values for the globel object in react app
      switch (message.command) {
        case "sendOutputFileContent":
          setoutputDirFiles(message.content);
          break;

        case "setNewSurvey":
          const surveyData = message.content as SurveyFileContent;
          setSurveyViewCred((prevState) => ({
            ...prevState,
            survey: undefined,
            inLoadingState: false,
          }));
          setSurveyViewCred((prevState) => ({
            ...prevState,
            survey: surveyData.survey,
            inLoadingState: false,
          }));
          setselectSurveyBtnLoadingState(false);
          break;

        case "setUpdatedSurvey":
          setSurveyViewCred((prevState) => ({
            ...prevState,
            survey: undefined,
            inLoadingState: false,
          }));
          setSurveyViewCred((prevState) => ({
            ...prevState,
            survey: message.content,
            inLoadingState: false,
          }));
          break;

        case "setConfigFilesList":
          window.configFilesDir = message.content;
          break;

        case "setUpdatedConfigFileData":
          setSurveyViewCred((prevState) => ({
            ...prevState,
            context: window.updatedConfigFileData,
            inLoadingState: false,
          }));
          break;
      }
    });
  }, []);

  const giveCommandToVscode = (command: string, data: string) => {
    vscode.postMessage({
      command: command,
      data: data,
    });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md toolBarBg py-0">
        <button
          className=" btn navbar-toggler shadow-none btn-custom"
          style={{ width: "56px", height: "40px", borderStyle: "none" }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => {
            setNavbarToggleIsOpen(!navbarToggleIsOpen);
          }}
        >
          {navbarToggleIsOpen ? (
            <FontAwesomeIcon
              icon={faXmark}
              style={{ width: "20px", height: "20px" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faBars}
              style={{ width: "20px", height: "20px" }}
            />
          )}
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <SelectFileToPreview
              giveCommandToVscode={(command: string, data: string) => {
                giveCommandToVscode(command, data);
              }}
              onChangedSurveyViewCredLoadingState={(state: boolean) => {
                setselectSurveyBtnLoadingState(state);
                setSurveyViewCred((prevState) => ({
                  ...prevState,
                  inLoadingState: state,
                }));
              }}
              outputDirFiles={outputDirFiles}
              isSelectSurveyBtnInLoadingState={selectSurveyBtnLoadingState}
            />
            <UploadPrefill
              onPrefillChange={(
                preFillFile: File | undefined,
                preFillValues: SurveySingleItemResponse[]
              ) => {
                const lastSelectedSurvey = surveyViewCred.survey;
                setSurveyViewCred((prevState) => ({
                  ...prevState,
                  survey: undefined,
                  inLoadingState: false,
                }));
                setSurveyViewCred((prevState) => ({
                  ...prevState,
                  survey: lastSelectedSurvey ? lastSelectedSurvey : undefined,
                  prefillsFile: preFillFile,
                  prefillValues: preFillValues,
                  inLoadingState: false,
                }));
              }}
              currentSelectFileName={
                surveyViewCred.prefillsFile
                  ? surveyViewCred.prefillsFile.name
                  : "Upload Prefill"
              }
              giveCommandToVscode={(command: string, data: string) => {
                giveCommandToVscode(command, data);
              }}
            />
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
                  inLoadingState: false,
                }));
                setSurveyViewCred((prevState) => ({
                  ...prevState,
                  survey: window.surveyData
                    ? window.surveyData.survey
                    : undefined,
                  context: { ...context },
                  inLoadingState: false,
                }));
              }}
            />
            <ShowKeysCheckBox
              currentCheckBoxStatus={surveyViewCred.simulatorUIConfig.showKeys}
              onCheckBoxStausChange={(newStaus: boolean) => {
                setSurveyViewCred((prevState) => ({
                  ...prevState,
                  simulatorUIConfig: {
                    texts: initialSurveyCred.simulatorUIConfig.texts,
                    showKeys: newStaus,
                    inLoadingState: false,
                  },
                }));
              }}
            />
          </div>
          <div className="navbar-nav">
            <ChangeTheme
              onThemeChange={(value: ThemeType) => {
                console.log(value);
                giveCommandToVscode("changeTheme", value);
              }}
              selectedTheme={
                window.selectedTheme
                  ? window.selectedTheme
                  : ThemeType.defaultTheme
              }
            />
          </div>
        </div>
      </nav>

      <div className="container p-3">
        {!surveyViewCred.inLoadingState ? (
          surveyViewCred.survey ? (
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
                  {
                    type: "json",
                  }
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
            <p className="p-5 text-center" style={{ minHeight: "550px" }}>
              Please Select The File To Preview The Survey.
            </p>
          )
        ) : (
          <div className="p-5 text-center" style={{ minHeight: "550px" }}>
            <div
              className="spinner-border"
              style={{ width: "2rem", height: "2rem", color: "black" }}
              role="status"
            ></div>
          </div>
        )}
      </div>
      <p className="text-muted mt-3 text-center ">{window.versionNumber}</p>
      <EnterFileNameDialog
        giveCommandToVscode={(command: string, data: string) => {
          giveCommandToVscode(command, data);
        }}
      />
    </div>
  );
};

export default SurveySimulator;
