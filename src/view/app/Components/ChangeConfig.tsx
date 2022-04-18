import * as React from "react";
import { SurveyContext } from "survey-engine/data_types";
import { ConfigFile } from "../model";

interface ChangeConfigProps {
  setConfigDirContentValue: (value: boolean) => void;
  configDirContentValue: boolean;
  onConfigChange: (context: SurveyContext) => void;
  giveCommandToExtension: (command: string, data: string) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ChangeConfig: React.FC<ChangeConfigProps> = (props) => {
  const setConfigFilesList = (
    configFileList: ConfigFile[]
  ): React.ReactNode => {
    console.log(configFileList);
    return configFileList.map((item) => {
      return (
        <button
          className="dropdown-item"
          type="button"
          style={{ width: "165px" }}
          onClick={() => {
            props.giveCommandToExtension("setTheConfigFileChangeWatcher", item.configFilePath);
            props.onConfigChange(item.configFileContent);
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
    <div
      className="dropdown nav-item"
      style={{ width: "25%", minWidth: "165px", height: "44px" , paddingRight: "1rem"}}
    >
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="ChangeConfig"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={() => {
          props.setConfigDirContentValue(false);
          props.giveCommandToExtension("getTheConfigFilesList", "");
          const intervalId = setInterval(() => {
            if (window.configFilesDir) {
              props.setConfigDirContentValue(true);
              clearInterval(intervalId);
            }
          }, 1000);
        }}
      >
        Change Config
      </button>
      <div
        className="dropdown-menu"
        aria-labelledby="ChangeConfig"
        style={{ width: "165px" }}
      >
        <button
          className="dropdown-item"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#EnterFileNameDialog"
        >
          Create New
        </button>
        <div className="dropdown-divider"></div>
        {props.configDirContentValue ? (
          setConfigFilesList(window.configFilesDir.directoryContent)
        ) : (
          <div className="text-center" style={{ width: "165px" }}>
            <div
              className="spinner-border text-secondary"
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

export default ChangeConfig;


