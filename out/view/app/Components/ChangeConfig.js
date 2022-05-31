"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
require("../Css/Toolbar.css");
const md_1 = require("react-icons/md");
const io_1 = require("react-icons/io");
const react_1 = require("react");
// eslint-disable-next-line @typescript-eslint/naming-convention
const ChangeConfig = (props) => {
    const [selectedFile, setSelectedFile] = (0, react_1.useState)("Change Config");
    const setConfigFilesList = (configFileList) => {
        console.log(configFileList);
        return configFileList.map((item) => {
            return (React.createElement("button", { className: "dropdown-item text-center nav-item btn-custom", type: "button", onClick: () => {
                    props.giveCommandToVscode("setTheConfigFileChangeWatcher", item.configFilePath);
                    props.onConfigChange(item.configFileContent);
                    setSelectedFile(item.configFileName);
                } }, item.configFileName.substring(0, item.configFileName.lastIndexOf("."))));
        });
    };
    return (React.createElement("div", { className: "dropdown nav-item" },
        React.createElement("button", { className: "btn toolBarBg dropdown-toggle  shadow-none btn-custom fw-bold", type: "button", id: "ChangeConfig", "data-bs-toggle": "dropdown", title: "Change Config: " + selectedFile, "aria-haspopup": "true", "aria-expanded": "false", onClick: () => {
                props.setConfigDirContentValue(false);
                props.giveCommandToVscode("getTheConfigFilesList", "");
                const intervalId = setInterval(() => {
                    if (window.configFilesDir) {
                        props.setConfigDirContentValue(true);
                        clearInterval(intervalId);
                    }
                }, 1000);
            } },
            React.createElement(md_1.MdSettingsSuggest, { className: "icons", style: { width: "24px", height: "24px", marginRight: "0.5rem" } }),
            selectedFile.length <= 18
                ? selectedFile
                : selectedFile.substring(0, 17)),
        React.createElement("div", { className: "dropdown-menu overflow-auto toolBarDropdownBg", "aria-labelledby": "ChangeConfig", style: { minWidth: "180px", maxHeight: "260px" } },
            React.createElement("button", { className: "dropdown-item btn-custom", type: "button", "data-bs-toggle": "modal", "data-bs-target": "#EnterFileNameDialog" },
                React.createElement(io_1.IoIosCreate, { className: "themeIcon", style: { width: "24px", height: "24px", marginRight: "0.5rem" } }),
                "Create New"),
            React.createElement("div", { className: "dropdown-divider dividerColor" }),
            props.configDirContentValue ? (setConfigFilesList(window.configFilesDir.directoryContent)) : (React.createElement("div", { className: "text-center" },
                React.createElement("div", { className: "spinner-border loaderColor", style: { width: "2rem", height: "2rem" }, role: "status" },
                    React.createElement("span", { className: "sr-only" })))))));
};
exports.default = ChangeConfig;
//# sourceMappingURL=ChangeConfig.js.map