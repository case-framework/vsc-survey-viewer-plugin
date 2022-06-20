import * as React from "react";
import { SurveyContext } from "survey-engine/data_types";
import { ConfigFile } from "../model";
import "../Css/Toolbar.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

interface ChangeConfigProps {
  setConfigDirContentValue: (value: boolean) => void;
  configDirContentValue: boolean;
  onConfigChange: (context: SurveyContext) => void;
  giveCommandToVscode: (command: string, data: string) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ChangeConfig: React.FC<ChangeConfigProps> = (props) => {
  const [selectedFile, setSelectedFile] = useState("Config");
  const setConfigFilesList = (
    configFileList: ConfigFile[]
  ): React.ReactNode => {
    console.log(configFileList);
    return configFileList.map((item) => {
      return (
        <button
          className="dropdown-item nav-item btn-custom"
          type="button"
          style={{ paddingTop: "0.2rem", paddingBottom: "0.2rem" }}
          onClick={() => {
            props.giveCommandToVscode(
              "setTheConfigFileChangeWatcher",
              item.configFilePath
            );
            props.onConfigChange(item.configFileContent);
            setSelectedFile(item.configFileName);
          }}
        >
          {item.configFileName.substring(
            0,
            item.configFileName.lastIndexOf(".")
          )}
        </button>
      );
    });
  };
  return (
    <div className="dropdown nav-item">
      <button
        className="btn toolBarBg dropdown-toggle  shadow-none btn-custom fw-bold iconsAndTextAlign"
        type="button"
        id="ChangeConfig"
        data-bs-toggle="dropdown"
        title={"Config: " + selectedFile}
        aria-haspopup="true"
        aria-expanded="false"
        onClick={() => {
          props.setConfigDirContentValue(false);
          props.giveCommandToVscode("getTheConfigFilesList", "");
          const intervalId = setInterval(() => {
            if (window.configFilesDir) {
              props.setConfigDirContentValue(true);
              clearInterval(intervalId);
            }
          }, 10);
        }}
      >
        <FontAwesomeIcon
          icon={faGear}
          style={{ width: "20px", height: "20px", paddingRight: "0.3rem" }}
        />
        {selectedFile.length <= 6 ? selectedFile : selectedFile.substring(0, 5)}
      </button>
      <div
        className="dropdown-menu  overflow-auto toolBarDropdownBg"
        aria-labelledby="ChangeConfig"
        style={{ minWidth: "180px", maxHeight: "260px" }}
      >
        <button
          className="dropdown-item  btn-custom iconsAndTextAlign "
          type="button"
          style={{ paddingTop: "0.2rem", paddingBottom: "0.2rem" }}
          data-bs-toggle="modal"
          data-bs-target="#EnterFileNameDialog"
        >
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{ width: "18px", height: "18px", paddingRight: "0.3rem" }}
          />
          Create New
        </button>
        <div className="dropdown-divider dividerColor"></div>
        <button
          className="dropdown-item   btn-custom iconsAndTextAlign "
          type="button"
          style={{ paddingTop: "0.2rem", paddingBottom: "0.2rem" }}
          onClick={() => {
            props.onConfigChange({
              isLoggedIn: false,
              participantFlags: {},
            });
            setSelectedFile("Config");
          }}
        >
          <FontAwesomeIcon
            icon={faUndo}
            style={{ width: "18px", height: "18px", paddingRight: "0.3rem" }}
          />
          Default Config
        </button>
        <div className="dropdown-divider dividerColor"></div>
        {props.configDirContentValue ? (
          setConfigFilesList(window.configFilesDir.directoryContent)
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ChangeConfig;
