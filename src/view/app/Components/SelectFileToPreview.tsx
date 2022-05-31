import * as React from "react";
import { OutputFileStructure } from "../model";
import "../Css/Toolbar.css";
import { MdTextSnippet } from "react-icons/md";

interface SelectFileDropdownProps {
  giveCommandToVscode: (command: string, data: string) => void;
  setChangedSelectTheFileBtnText: (newText: string) => void;
  changedSelectTheFileBtnText: string;
  setOutPutDirContentValue: (value: boolean) => void;
  outPutDirContentValue: boolean;
  onChangedSurveyViewCred: () => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const SelectFileToPreview: React.FC<SelectFileDropdownProps> = (props) => {
  const setDropdowns = (items: OutputFileStructure): React.ReactNode => {
    return items.directoryContent.map((item) => {
      return (
        <div className="btn-custom">
          <p className="fw-bold h4" style={{ paddingLeft: "1rem" }}>
            {item.surveyName}
          </p>
          {setDropdownItems(item.surveyFiles, item.surveyPath)}
          <div className="dropdown-divider dividerColor"></div>
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
            const intervalId = setInterval(() => {
              if (window.surveyData) {
                props.setChangedSelectTheFileBtnText(
                  item.substring(0, item.lastIndexOf(".")).replace("_", " ")
                );
                props.onChangedSurveyViewCred();
                clearInterval(intervalId);
              }
            }, 1000);
          }}
        >
          <p className="h5 small">
            {item.substring(0, item.lastIndexOf(".")).replace("_", " ")}
          </p>
        </button>
      );
    });
  };

  return (
    <div className="dropdown nav-item">
      <button
        className="btn toolBarBg dropdown-toggle shadow-none btn-custom fw-bold"
        type="button"
        id="SelectFileDropdown"
        data-bs-toggle="dropdown"
        title={"Select File To Preview: " + props.changedSelectTheFileBtnText}
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
          }, 1000);
        }}
      >
        <MdTextSnippet
          className="icons"
          style={{ width: "24px", height: "24px", marginRight: "0.5rem" }}
        />
        {props.changedSelectTheFileBtnText.length <= 22
          ? props.changedSelectTheFileBtnText
          : props.changedSelectTheFileBtnText.substring(0, 21)}
      </button>

      <div
        className="dropdown-menu overflow-auto toolBarDropdownBg"
        aria-labelledby="SelectFileDropdown"
        style={{ minWidth: "228px", maxHeight: "260px" }}
      >
        {props.outPutDirContentValue ? (
          setDropdowns(window.outPutDirContent)
        ) : (
          <div className="text-center">
            <div
              className="spinner-border loaderColor"
              style={{ width: "2rem", height: "2rem" }}
              role="status"
            >
              <span className="sr-only"></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectFileToPreview;