import * as React from "react";
import { SurveyContext } from "survey-engine/data_types";
import { ConfigFile } from "../model";
import "../Css/Toolbar.css";
import {MdSettingsSuggest} from "react-icons/md";
import {IoIosCreate} from "react-icons/io";
import { useState } from "react";
interface ChangeConfigProps {
  setConfigDirContentValue: (value: boolean) => void;
  configDirContentValue: boolean;
  onConfigChange: (context: SurveyContext) => void;
  giveCommandToVscode: (command: string, data: string) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ChangeConfig: React.FC<ChangeConfigProps> = (props) => {
  const [selectedFile, setSelectedFile] = useState("Change Config");
  const setConfigFilesList = (
    configFileList: ConfigFile[]
  ): React.ReactNode => {
    console.log(configFileList);
    return configFileList.map((item) => {
      return (
        <button
          className="dropdown-item text-center nav-item btn-custom"
          type="button"
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
    <div className="dropdown nav-item" >
      <button
        className="btn toolBarBg dropdown-toggle  shadow-none btn-custom fw-bold"
        type="button"
        id="ChangeConfig"
        data-bs-toggle="dropdown"
        title={"Change Config: "+selectedFile}
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
        <MdSettingsSuggest className="icons" style={{width:"24px", height: "24px",marginRight:"0.5rem"}}/>
        {selectedFile.length <= 18
            ? selectedFile
            : selectedFile.substring(0, 17)}
      </button>
      <div className="dropdown-menu overflow-auto toolBarDropdownBg rounded" aria-labelledby="ChangeConfig"
       style={{minWidth:"180px", maxHeight: "260px" }}>
        <button
          className="dropdown-item btn-custom"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#EnterFileNameDialog"
        >
          <IoIosCreate className="themeIcon" style={{width:"24px", height: "24px",marginRight:"0.5rem"}}/>
          Create New
        </button>
        <div className="dropdown-divider dividerColor"></div>
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
