import * as React from "react";
import { SurveyContext } from "survey-engine/data_types";
import { ConfigFile } from "../model";

interface ChangeConfigProps {
  setConfigDirContentValue: (value: boolean) => void;
  configDirContentValue: boolean;
  onConfigChange: (context: SurveyContext) => void;
  giveCommandToVscode: (command: string, data: string) => void;
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
          className="dropdown-item text-center nav-item"
          type="button"
          onClick={() => {
            props.giveCommandToVscode(
              "setTheConfigFileChangeWatcher",
              item.configFilePath
            );
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
    <div className="dropdown nav-item" style={{ paddingRight: "1rem" }}>
      <button
        className="btn btn-secondary dropdown-toggle  shadow-none"
        type="button"
        id="ChangeConfig"
        data-bs-toggle="dropdown"
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
          }, 1000);
        }}
      >
        Change Config
      </button>
      <div className="dropdown-menu" aria-labelledby="ChangeConfig">
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
          <div className="text-center">
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
