import * as React from "react";
import { SurveyView } from "case-web-ui";
import {
  dateLocales,
  OutputFileStructure,
  SurveyFileContent,
  SurveyViewCred,
} from "./model";
import {
  SurveyContext,
  SurveySingleItemResponse,
} from "survey-engine/data_types";
import { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Editor from "@monaco-editor/react";
import clsx from "clsx";
import SelectFileToPreview from "./Components/SelectFileToPreview";
import ShowKeysCheckBox from "./Components/ShowKeysCheckBox";
import UploadPrefill from "./Components/UploadPrefill";

declare global {
  interface Window {
    acquireVsCodeApi(): any;
    surveyData: SurveyFileContent;
    outPutDirContent: OutputFileStructure;
    changeInSurvey: boolean;
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
  surveyAndContext: window.surveyData
    ? {
        survey: window.surveyData.survey,
        context: { ...defaultSurveyContext },
      }
    : undefined,
  selectedLanguage: "en",
  prefillValues: [],
  prefillsFile: undefined,
};

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

// eslint-disable-next-line @typescript-eslint/naming-convention
const SurveySimulator: React.FC = (props) => {
  const [surveyViewCred, setSurveyViewCred] = useState<SurveyViewCred>({
    ...initialSurveyCred,
  });
  const [hasSurveyContextEditorErrors, setHasSurveyContextEditorErrors] =
    useState(false);
  const [changedSurveyContextValues, setChangedSurveyContextValues] = useState({
    ...initialSurveyCred,
  });
  const [changedSelectTheFileBtnText, setChangedSelectTheFileBtnText] =
    useState("Select File To Preview");
  const [outPutDirContentValue, setOutPutDirContentValue] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.changeInSurvey) {
        console.log(window.changeInSurvey);
        setSurveyViewCred((prevState) => ({
          ...prevState,
          surveyAndContext: window.surveyData.survey
            ? {
                survey: window.surveyData.survey,
                context: { ...defaultSurveyContext },
              }
            : undefined,
        }));
        window.changeInSurvey = false;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const giveCommandToExtention = (command: string, data: string) => {
    vscode.postMessage({
      command: command,
      data: data,
    });
  };

  return (
    <div className="container-fluid">
      <div className="container pt-3">
        <div className="row">
          <SelectFileToPreview
            giveCommandToExtention={(command: string, data: string) => {
              giveCommandToExtention(command, data);
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
                surveyAndContext: window.surveyData.survey
                  ? {
                      survey: window.surveyData.survey,
                      context: { ...defaultSurveyContext },
                    }
                  : undefined,
              }));
            }}
          />
          <DropdownButton
            style={{ width: "25%", minWidth: "220px" }}
            autoClose="outside"
            id={`simulator-config`}
            //size="sm"
            variant="secondary"
            title="Change the Config"
            onSelect={(eventKey) => {
              switch (eventKey) {
                case "apply":
                  console.log(changedSurveyContextValues);
                  setSurveyViewCred(changedSurveyContextValues);
                  break;
              }
            }}
          >
            <Dropdown.Item eventKey="editor">
              <Editor
                width="400px"
                height="250px"
                defaultLanguage="json"
                value={JSON.stringify(defaultSurveyContext, undefined, 4)}
                className={clsx({
                  "border border-danger": hasSurveyContextEditorErrors,
                })}
                onValidate={(markers) => {
                  if (markers.length > 0) {
                    setHasSurveyContextEditorErrors(true);
                  } else {
                    setHasSurveyContextEditorErrors(false);
                  }
                }}
                onChange={(value) => {
                  if (!value) {
                    return;
                  }
                  let context: SurveyContext;
                  try {
                    context = JSON.parse(value);
                  } catch (e: any) {
                    console.error(e);
                    return;
                  }
                  if (!context) {
                    return;
                  }
                  setChangedSurveyContextValues({
                    ...surveyViewCred,
                    surveyAndContext: surveyViewCred.surveyAndContext
                      ? {
                          survey: surveyViewCred.surveyAndContext.survey,
                          context: context,
                        }
                      : undefined,
                  });
                  console.log(changedSurveyContextValues);
                }}
              />
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="apply">Apply Changes</Dropdown.Item>
          </DropdownButton>

          <UploadPrefill
            onPrefillChange={(
              preFillFile: File | undefined,
              preFillValues: SurveySingleItemResponse[]
            ) => {
              setSurveyViewCred((prevState) => ({
                ...prevState,
                prefillsFile: preFillFile,
                prefillValues: preFillValues,
              }));
            }}
            currentSelectFileName={
              surveyViewCred.prefillsFile
                ? surveyViewCred.prefillsFile.name
                : "Upload Prefill"
            }
          />

          <ShowKeysCheckBox
            currentCheckBoxStatus={surveyViewCred.simulatorUIConfig.showKeys}
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
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-8 offset-lg-2">
          {surveyViewCred.surveyAndContext ? (
            <SurveyView
              loading={false}
              showKeys={surveyViewCred.simulatorUIConfig.showKeys}
              survey={surveyViewCred.surveyAndContext.survey}
              context={surveyViewCred.surveyAndContext.context}
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
                  surveyViewCred.surveyAndContext?.survey.current
                    .surveyDefinition.key
                }_responses_${new Date().toLocaleDateString()}.json`;
                a.click();
                giveCommandToExtention(
                  "showFileDownloadSuccessMsg",
                  "The file is saved"
                );
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
    </div>
  );
};

export default SurveySimulator;
