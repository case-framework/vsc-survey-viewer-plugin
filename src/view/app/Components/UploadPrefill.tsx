import * as React from "react";
import { SurveySingleItemResponse } from "survey-engine/data_types";
import "../Css/Toolbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";

interface UploadPrefillProps {
  giveCommandToVscode: (command: string, data: string) => void;
  onPrefillChange: (
    preFillFile: File | undefined,
    preFillValues: SurveySingleItemResponse[]
  ) => void;
  currentSelectFileName: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const UploadPrefill: React.FC<UploadPrefillProps> = (props) => {
  const openDialogForFileSelection = () => {
    const inputRef = document.getElementById("input_file_selector");
    console.log(inputRef);
    if (inputRef) {
      inputRef.click();
    }
  };

  const uploadFileForPreFill = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prefills = event.target.files ? event.target.files[0] : undefined;
    if (prefills) {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const res = reader.result;
        if (!res || typeof res !== "string") {
          console.error("TODO: handle file upload error");
          return;
        }
        const content = JSON.parse(res);
        props.onPrefillChange(prefills, content);
      };
      reader.readAsText(prefills);
    } else {
      props.giveCommandToVscode(
        "PrefillFileSelectionError",
        "No appropriate file is selected"
      );
    }
  };
  return (
    <div className="nav-item">
      <button
        id="get_file"
        className="btn toolBarBg shadow-none btn-custom fw-bold iconsAndTextAlign"
        title={"Upload Prefill: " + props.currentSelectFileName}
        onClick={() => openDialogForFileSelection()}
      >
        <FontAwesomeIcon
          icon={faFileLines}
          style={{ width: "20px", height: "20px", paddingRight: "0.3rem" }}
        />
        {props.currentSelectFileName.length <= 18
          ? props.currentSelectFileName
          : props.currentSelectFileName.substring(0, 17)}
      </button>
      <input
        type="file"
        id="input_file_selector"
        accept=".json"
        style={{ display: "none" }}
        onChange={(event) => {
          uploadFileForPreFill(event);
        }}
      />
    </div>
  );
};

export default UploadPrefill;
