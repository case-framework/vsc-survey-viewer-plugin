import * as React from "react";
import { OutputFileStructure } from "../model";
import "../Css/Toolbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface SelectFileDropdownProps {
  giveCommandToVscode: (command: string, data: string) => void;
  onChangedSurveyViewCredLoadingState: (state: boolean) => void;
  isSelectSurveyBtnInLoadingState: boolean;
  outputDirFiles: OutputFileStructure | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const SelectFileToPreview: React.FC<SelectFileDropdownProps> = (props) => {
  const [selectSurveyBtnText, setSelectSurveyeBtnText] =
    useState("Survey Selection");

  // Sets the dropdown content based on the files we have in output directory.
  const setDropdowns = (items: OutputFileStructure): React.ReactNode => {
    return items.directoryContent.map((item, index, items) => {
      return (
        <div key={index} className="btn-custom">
          <p
            key={item.surveyName}
            className="fw-bold h7"
            style={{ paddingLeft: "1rem" }}
          >
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
  // Sets the surveys for particular survey study
  const setDropdownItems = (
    items: string[],
    directoryPath: string
  ): React.ReactNode => {
    return items.map((item) => {
      return (
        <button
          key={item}
          className="dropdown-item btn-custom "
          style={{ paddingLeft: "1rem" }}
          type="button"
          id={item}
          onClick={() => {
            props.onChangedSurveyViewCredLoadingState(true);
            // Commanding to get the survey data from selected file.
            props.giveCommandToVscode(
              "fileSelectedForSurvey",
              directoryPath + "/" + item
            );
            // Commanding to set the watcher on selected file , so that the we gets notified when user updated something in the selected file.
            props.giveCommandToVscode(
              "setSelectedSurveyFileChangeWatcher",
              directoryPath + "/" + item
            );
            setSelectSurveyeBtnText(
              item.substring(0, item.lastIndexOf(".")).replace("_", " ")
            );
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
        title={"Survey Selection: " + selectSurveyBtnText}
        aria-haspopup="true"
        aria-expanded="false"
        onClick={() => {
          // Commanding to get files list from the output directory.
          props.giveCommandToVscode("getOutputDirFiles", "");
        }}
      >
        <FontAwesomeIcon
          icon={faFile}
          style={{ width: "20px", height: "20px", paddingRight: "0.3rem" }}
        />
        {props.isSelectSurveyBtnInLoadingState ? (
          <div style={{ width: "80px" }}>
            <div
              className="spinner-border loaderColor"
              style={{ width: "1rem", height: "1rem" }}
              role="status"
            ></div>
          </div>
        ) : selectSurveyBtnText.length <= 16 ? (
          selectSurveyBtnText
        ) : (
          selectSurveyBtnText.substring(0, 15)
        )}
      </button>

      <div
        className="dropdown-menu overflow-auto toolBarDropdownBg"
        aria-labelledby="SelectFileDropdown"
        style={{ minWidth: "228px", maxHeight: "260px" }}
      >
        {props.outputDirFiles ? (
          !props.outputDirFiles.isOutputDirMissing ? (
            setDropdowns(props.outputDirFiles)
          ) : (
            <div>
              {" "}
              {props.giveCommandToVscode(
                "OutputDirNotFoundError",
                "The Output Directory is not yet generated for the project or the opened project is not appropriate."
              )}
            </div>
          )
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default SelectFileToPreview;
