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
// eslint-disable-next-line @typescript-eslint/naming-convention
const SelectFileToPreview = (props) => {
    const setDropdowns = (items) => {
        return items.directoryContent.map((item) => {
            return (React.createElement("div", { className: "btn-custom" },
                React.createElement("p", { className: "fw-bold h7", style: { paddingLeft: "1rem" } }, item.surveyName),
                setDropdownItems(item.surveyFiles, item.surveyPath),
                React.createElement("div", { className: "dropdown-divider dividerColor" })));
        });
    };
    const setDropdownItems = (items, directoryPath) => {
        return items.map((item) => {
            return (React.createElement("button", { className: "dropdown-item btn-custom ", style: { paddingLeft: "1rem" }, type: "button", id: item, onClick: () => {
                    props.giveCommandToVscode("fileSelectedForPreview", directoryPath + "/" + item);
                    props.giveCommandToVscode("selectedFileToDetectChanges", directoryPath + "/" + item);
                    const intervalId = setInterval(() => {
                        if (window.surveyData) {
                            props.setChangedSelectTheFileBtnText(item.substring(0, item.lastIndexOf(".")).replace("_", " "));
                            props.onChangedSurveyViewCred();
                            clearInterval(intervalId);
                        }
                    }, 1000);
                } },
                React.createElement("p", { className: "h7 small" }, item.substring(0, item.lastIndexOf(".")).replace("_", " "))));
        });
    };
    return (React.createElement("div", { className: "dropdown nav-item" },
        React.createElement("button", { className: "btn toolBarBg dropdown-toggle shadow-none btn-custom fw-bold", type: "button", id: "SelectFileDropdown", "data-bs-toggle": "dropdown", title: "Select File To Preview: " + props.changedSelectTheFileBtnText, "aria-haspopup": "true", "aria-expanded": "false", onClick: () => {
                props.setOutPutDirContentValue(false);
                props.giveCommandToVscode("getOutputFileContent", "");
                const intervalId = setInterval(() => {
                    if (window.outPutDirContent.directoryContent.length &&
                        window.outPutDirContent.isOutputDirMissing === false) {
                        props.setOutPutDirContentValue(true);
                        clearInterval(intervalId);
                    }
                    else if (!window.outPutDirContent.directoryContent.length &&
                        window.outPutDirContent.isOutputDirMissing === true) {
                        props.setOutPutDirContentValue(true);
                        props.giveCommandToVscode("showError", "The Output Directory is not yet generated for the project or the opened prject is not appropraite");
                        clearInterval(intervalId);
                    }
                    console.log(window.outPutDirContent);
                }, 1000);
            } },
            React.createElement(md_1.MdTextSnippet, { className: "icons", style: { width: "24px", height: "24px", marginRight: "0.5rem" } }),
            props.changedSelectTheFileBtnText.length <= 22
                ? props.changedSelectTheFileBtnText
                : props.changedSelectTheFileBtnText.substring(0, 21)),
        React.createElement("div", { className: "dropdown-menu overflow-auto toolBarDropdownBg", "aria-labelledby": "SelectFileDropdown", style: { minWidth: "228px", maxHeight: "260px" } }, props.outPutDirContentValue ? (setDropdowns(window.outPutDirContent)) : (React.createElement("div", { className: "text-center" },
            React.createElement("div", { className: "spinner-border loaderColor", style: { width: "2rem", height: "2rem" }, role: "status" },
                React.createElement("span", { className: "sr-only" })))))));
};
exports.default = SelectFileToPreview;
//# sourceMappingURL=SelectFileToPreview.js.map