import * as React from "react";
import { SurveySingleItemResponse } from "survey-engine/data_types";

interface UploadPrefillProps {
  onPrefillChange: (
    preFillFile: File | undefined,
    preFillValues: SurveySingleItemResponse[]
  ) => void;
  currentSelectFileName: String;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const UploadPrefill: React.FC<UploadPrefillProps> = (props) => {
  const openDialogForFileSelection = () => {
    const buttonRef = document.getElementById("get_file");
    if (buttonRef) {
      buttonRef.onclick = function () {
        const inputRef = document.getElementById("input_file");
        if (inputRef) {
          inputRef.click();
        }
      };
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
      props.onPrefillChange(prefills, []);
    }
  };
  return (
    <div style={{ width: "fit-content" , paddingLeft: "1rem"}}>
      <button
        style={{ width: "fit-content" }}
        id="get_file"
        className="btn btn-secondary"
        onClick={() => openDialogForFileSelection()}
      >
        {" "}
        <p>{props.currentSelectFileName.length <= 18?props.currentSelectFileName: props.currentSelectFileName.substring(0, 17)} </p>
      </button>
      <input
        type="file"
        id="input_file"
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
