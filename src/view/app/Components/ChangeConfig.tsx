import * as React from "react";
import { SurveyContext } from "survey-engine/data_types";
import { ConfigFile, ConfigFileStructure } from "../model";
import "../Css/Toolbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

interface ChangeConfigProps {
  configDirList: ConfigFileStructure;
  onConfigChange: (context: SurveyContext) => void;
  giveCommandToVscode: (command: string, data: string) => void;
  currentConfigFileText: string;
  setSelectedConfigFileText: (fileName: string) => void;
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
          key={item.configFileName}
          className="dropdown-item nav-item btn-custom"
          type="button"
          onClick={() => {
            props.giveCommandToVscode(
              "getSelectedConfigFileContent",
              item.configFilePath
            );
            props.giveCommandToVscode(
              "setSelectedConfigFileChangeWatcher",
              item.configFilePath
            );

            props.setSelectedConfigFileText(item.configFileName);
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
        title={"Config: " + props.currentConfigFileText}
        aria-haspopup="true"
        aria-expanded="false"
        onClick={() => {
          props.giveCommandToVscode("getConfigFilesList", "");
        }}
      >
        <FontAwesomeIcon
          icon={faGear}
          style={{ width: "20px", height: "20px", paddingRight: "0.3rem" }}
        />
        {props.currentConfigFileText.length <= 11
          ? props.currentConfigFileText
          : props.currentConfigFileText.substring(0, 10)}
      </button>
      <div
        className="dropdown-menu  overflow-auto toolBarDropdownBg"
        aria-labelledby="ChangeConfig"
        style={{ minWidth: "180px", maxHeight: "260px" }}
      >
        <button
          className="dropdown-item  btn-custom iconsAndTextAlign "
          type="button"
          style={{ paddingLeft: "1rem" }}
          data-bs-toggle="modal"
          data-bs-target="#EnterFileNameDialog"
        >
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{ width: "18px", height: "18px", paddingRight: "0.3rem" }}
          />
          Create New
        </button>
        <button
          className="dropdown-item btn-custom iconsAndTextAlign "
          type="button"
          style={{ paddingLeft: "1rem" }}
          onClick={() => {
            props.onConfigChange({
              isLoggedIn: false,
              participantFlags: {},
            });
            props.setSelectedConfigFileText("Config");
          }}
        >
          <FontAwesomeIcon
            icon={faUndo}
            style={{ width: "18px", height: "18px", paddingRight: "0.3rem" }}
          />
          Default Config
        </button>
        <div className="dropdown-divider dividerColor"></div>
        {!props.configDirList.isConfigDirMissing ? (
          setConfigFilesList(props.configDirList.directoryContent)
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ChangeConfig;
