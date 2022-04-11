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
const SelectFileToPreview = (props) => {
    const setDropdowns = (items) => {
        return items.directoryContent.map((item) => {
            return (React.createElement("div", { style: { width: "214px" } },
                React.createElement("div", { className: "dropdown-divider" }),
                React.createElement("p", { className: "h5", style: { paddingLeft: "1rem" } }, item.surveyName),
                setDropdownItems(item.surveyFiles, item.surveyPath)));
        });
    };
    const setDropdownItems = (items, directoryPath) => {
        return items.map((item) => {
            return (React.createElement("button", { className: "dropdown-item", style: { paddingLeft: "3rem" }, type: "button", id: item, onClick: () => {
                    props.giveCommandToExtention("fileSelectedForPreview", directoryPath + "/" + item);
                    props.giveCommandToExtention("selectedFileToDetectChanges", directoryPath + "/" + item);
                    const intervalId = setInterval(() => {
                        if (window.surveyData) {
                            props.setChangedSelectTheFileBtnText(item.substring(0, item.lastIndexOf(".")).replace("_", " "));
                            props.onChangedSurveyViewCred();
                            clearInterval(intervalId);
                        }
                    }, 1000);
                } }, item.substring(0, item.lastIndexOf(".")).replace("_", " ")));
        });
    };
    return (React.createElement("div", { className: "dropdown", style: { width: "25%", minWidth: "214px" } },
        React.createElement("button", { className: "btn btn-secondary dropdown-toggle", style: { width: "214px" }, type: "button", id: "SelectFileDropdown", "data-bs-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false", onClick: () => {
                props.setOutPutDirContentValue(false);
                props.giveCommandToExtention("getOutputFileContent", "");
                const intervalId = setInterval(() => {
                    if (window.outPutDirContent.directoryContent.length &&
                        window.outPutDirContent.isOutputDirMissing === false) {
                        props.setOutPutDirContentValue(true);
                        clearInterval(intervalId);
                    }
                    else if (!window.outPutDirContent.directoryContent.length &&
                        window.outPutDirContent.isOutputDirMissing === true) {
                        props.setOutPutDirContentValue(true);
                        props.giveCommandToExtention("showError", "The Output Directory is not yet generated");
                        clearInterval(intervalId);
                    }
                    console.log(window.outPutDirContent);
                }, 1000);
            } },
            " ",
            props.changedSelectTheFileBtnText),
        React.createElement("div", { className: "dropdown-menu overflow-auto", "aria-labelledby": "SelectFileDropdown", style: { maxHeight: "280px", background: "white" } }, props.outPutDirContentValue ? (setDropdowns(window.outPutDirContent)) : (React.createElement("div", { className: "text-center", style: { width: "214px" } },
            React.createElement("div", { className: "spinner-border text-secondary", style: { width: "2rem", height: "2rem" }, role: "status" },
                React.createElement("span", { className: "sr-only" })))))));
};
exports.default = SelectFileToPreview;
//# sourceMappingURL=SelectFileToPreview.js.map