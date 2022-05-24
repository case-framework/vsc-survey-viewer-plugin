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
// eslint-disable-next-line @typescript-eslint/naming-convention
const ChangeConfig = (props) => {
    const setConfigFilesList = (configFileList) => {
        console.log(configFileList);
        return configFileList.map((item) => {
            return (React.createElement("button", { className: "dropdown-item text-center nav-item", type: "button", onClick: () => {
                    props.giveCommandToVscode("setTheConfigFileChangeWatcher", item.configFilePath);
                    props.onConfigChange(item.configFileContent);
                } }, item.configFileName.substring(0, item.configFileName.lastIndexOf("."))));
        });
    };
    return (React.createElement("div", { className: "dropdown nav-item", style: { paddingRight: "1rem" } },
        React.createElement("button", { className: "btn btn-secondary dropdown-toggle  shadow-none", type: "button", id: "ChangeConfig", "data-bs-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false", onClick: () => {
                props.setConfigDirContentValue(false);
                props.giveCommandToVscode("getTheConfigFilesList", "");
                const intervalId = setInterval(() => {
                    if (window.configFilesDir) {
                        props.setConfigDirContentValue(true);
                        clearInterval(intervalId);
                    }
                }, 1000);
            } }, "Change Config"),
        React.createElement("div", { className: "dropdown-menu", "aria-labelledby": "ChangeConfig" },
            React.createElement("button", { className: "dropdown-item", type: "button", "data-bs-toggle": "modal", "data-bs-target": "#EnterFileNameDialog" }, "Create New"),
            React.createElement("div", { className: "dropdown-divider" }),
            props.configDirContentValue ? (setConfigFilesList(window.configFilesDir.directoryContent)) : (React.createElement("div", { className: "text-center" },
                React.createElement("div", { className: "spinner-border text-secondary", style: { width: "2rem", height: "2rem" }, role: "status" },
                    React.createElement("span", { className: "sr-only" })))))));
};
exports.default = ChangeConfig;
//# sourceMappingURL=ChangeConfig.js.map