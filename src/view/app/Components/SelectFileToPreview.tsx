import * as React from "react";
import { OutputFileStructure } from "../model";
import "../Css/Toolbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

interface SelectFileDropdownProps {
  giveCommandToVscode: (command: string, data: string) => void;
  setChangedSelectTheFileBtnText: (newText: string) => void;
  changedSelectTheFileBtnText: string;
  setOutPutDirContentValue: (value: boolean) => void;
  outPutDirContentValue: boolean;
  onChangedSurveyViewCred: () => void;
  onChangedSurveyViewCredLoadingState: (state: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const SelectFileToPreview: React.FC<SelectFileDropdownProps> = (props) => {
  const setDropdowns = (items: OutputFileStructure): React.ReactNode => {
    return items.directoryContent.map((item, index, items) => {
      return (
        <div className="btn-custom">
          <p className="fw-bold h7" style={{ paddingLeft: "1rem" }}>
            {item.surveyName}
          </p>
          {setDropdownItems(item.surveyFiles, item.surveyPath)}
          {items.length !== index + 1 ? (
            <div className="dropdown-divider dividerColor"></div>
          ) : null}
        </div>
      );
    });
  };

  const setDropdownItems = (
    items: string[],
    directoryPath: string
  ): React.ReactNode => {
    return items.map((item) => {
      return (
        <button
          className="dropdown-item btn-custom "
          style={{ paddingLeft: "1rem" }}
          type="button"
          id={item}
          onClick={() => {
            props.giveCommandToVscode(
              "fileSelectedForPreview",
              directoryPath + "/" + item
            );
            props.giveCommandToVscode(
              "selectedFileToDetectChanges",
              directoryPath + "/" + item
            );
            props.setChangedSelectTheFileBtnText("loading");
            props.onChangedSurveyViewCredLoadingState(true);
            const intervalId = setInterval(() => {
              if (window.surveyData) {
                props.setChangedSelectTheFileBtnText(
                  item.substring(0, item.lastIndexOf(".")).replace("_", " ")
                );
                props.onChangedSurveyViewCredLoadingState(false);
                props.onChangedSurveyViewCred();
                clearInterval(intervalId);
              }
            }, 10);
          }}
        >
          <p className="h7 small">
            {item.substring(0, item.lastIndexOf(".")).replace("_", " ")}
          </p>
        </button>
      );
    });
  };

  return (
    <div className="dropdown nav-item">
      <button
        className="btn toolBarBg dropdown-toggle shadow-none btn-custom fw-bold iconsAndTextAlign"
        type="button"
        id="SelectFileDropdown"
        data-bs-toggle="dropdown"
        title={"Survey Selection: " + props.changedSelectTheFileBtnText}
        aria-haspopup="true"
        aria-expanded="false"
        onClick={() => {
          props.setOutPutDirContentValue(false);
          props.giveCommandToVscode("getOutputFileContent", "");
          const intervalId = setInterval(() => {
            if (
              window.outPutDirContent.directoryContent.length &&
              window.outPutDirContent.isOutputDirMissing === false
            ) {
              props.setOutPutDirContentValue(true);
              clearInterval(intervalId);
            } else if (
              !window.outPutDirContent.directoryContent.length &&
              window.outPutDirContent.isOutputDirMissing === true
            ) {
              props.setOutPutDirContentValue(true);
              props.giveCommandToVscode(
                "showError",
                "The Output Directory is not yet generated for the project or the opened prject is not appropraite"
              );
              clearInterval(intervalId);
            }
            console.log(window.outPutDirContent);
          }, 10);
        }}
      >
        <FontAwesomeIcon
          icon={faFile}
          style={{ width: "20px", height: "20px", paddingRight: "0.3rem" }}
        />
        {props.changedSelectTheFileBtnText === "loading" ? (
          <div style={{ width: "80px" }}>
            <div
              className="spinner-border loaderColor"
              style={{ width: "1rem", height: "1rem" }}
              role="status"
            ></div>
          </div>
        ) : props.changedSelectTheFileBtnText.length <= 16 ? (
          props.changedSelectTheFileBtnText
        ) : (
          props.changedSelectTheFileBtnText.substring(0, 15)
        )}
      </button>

      <div
        className="dropdown-menu overflow-auto toolBarDropdownBg"
        aria-labelledby="SelectFileDropdown"
        style={{ minWidth: "228px", maxHeight: "260px" }}
      >
        {props.outPutDirContentValue ? (
          setDropdowns(window.outPutDirContent)
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default SelectFileToPreview;
