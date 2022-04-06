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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const case_web_ui_1 = require("case-web-ui");
const model_1 = require("./model");
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const react_2 = __importDefault(require("@monaco-editor/react"));
const clsx_1 = __importDefault(require("clsx"));
const vscode = window.acquireVsCodeApi();
const defaultSurveyContext = {
    isLoggedIn: false,
    participantFlags: {},
};
const defaultSimulatorUIConfig = {
    showKeys: false,
    texts: {
        backBtn: 'Back',
        nextBtn: 'Next',
        submitBtn: 'Submit',
        invalidResponseText: 'Invalid response',
        noSurveyLoaded: 'Survey could not be loaded, please try again.'
    }
};
const initialSurveyCredState = {
    simulatorUIConfig: { ...defaultSimulatorUIConfig },
    surveyContext: { ...defaultSurveyContext },
    survey: window.surveyData ? window.surveyData.survey : undefined,
    surveyKey: window.surveyData ? window.surveyData.studyKey : undefined
};
const initialSurveyCred = {
    config: initialSurveyCredState.simulatorUIConfig,
    surveyAndContext: initialSurveyCredState.survey ? {
        survey: initialSurveyCredState.survey,
        context: initialSurveyCredState.surveyContext
    } : undefined,
    prefills: initialSurveyCredState.prefillValues,
    selectedLanguage: initialSurveyCredState.selectedLanguage
};
const SurveySimulator = (props) => {
    const [surveyViewCred, setSurveyViewCred] = (0, react_1.useState)({
        ...initialSurveyCred
    });
    const [hasSurveyContextEditorErrors, setHasSurveyContextEditorErrors] = (0, react_1.useState)(false);
    const [changedSurveyContextValues, setChangedSurveyContextValues] = (0, react_1.useState)({ ...initialSurveyCred });
    const [changedSelectTheFileBtnText, setChangedSelectTheFileBtnText] = (0, react_1.useState)("Select File To Preview");
    const [outPutDirContentValue, setOutPutDirContentValue] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => {
            if (window.changeInSurvey) {
                console.log(window.changeInSurvey);
                setSurveyViewCred({
                    ...initialSurveyCred,
                    surveyAndContext: window.surveyData.survey ? {
                        survey: window.surveyData.survey,
                        context: initialSurveyCredState.surveyContext
                    } : undefined
                });
                window.changeInSurvey = false;
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    function giveCommandToExtention(command, data) {
        vscode.postMessage({
            command: command,
            data: data
        });
    }
    ;
    function setDropdowns(items) {
        return items.directoryContent.map((item) => {
            return (React.createElement("div", null,
                React.createElement("div", { className: "dropdown-divider" }),
                React.createElement("p", { className: "h5", style: { paddingLeft: "1rem" } }, item.SurveyName),
                setDropdownItems(item.SurveyFiles, item.SurveyPath)));
        });
    }
    function setDropdownItems(items, directoryPath) {
        return items.map((item) => {
            return (React.createElement("button", { className: "dropdown-item", style: { paddingLeft: "3rem" }, type: "button", id: item, onClick: () => {
                    giveCommandToExtention('fileSelectedForPreview', directoryPath + "/" + item);
                    giveCommandToExtention('selectedFileToDetectChanges', directoryPath + "/" + item);
                    const intervalId = setInterval(() => {
                        if (window.surveyData) {
                            setChangedSelectTheFileBtnText(item.substring(0, item.lastIndexOf('.')).replace('_', ' '));
                            setSurveyViewCred({
                                ...initialSurveyCred,
                                surveyAndContext: window.surveyData.survey ? {
                                    survey: window.surveyData.survey,
                                    context: initialSurveyCredState.surveyContext
                                } : undefined
                            });
                            clearInterval(intervalId);
                        }
                    }, 1000);
                } }, item.substring(0, item.lastIndexOf('.')).replace('_', ' ')));
        });
    }
    return (React.createElement("div", { className: "container-fluid" },
        React.createElement("div", { className: "container pt-3" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "dropdown", style: { width: "33%", minWidth: "214px" } },
                    React.createElement("button", { className: "btn btn-secondary dropdown-toggle", type: "button", id: "SelectFileDropdown", "data-bs-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false", onClick: () => {
                            setOutPutDirContentValue(false);
                            giveCommandToExtention('getOutputFileContent', "");
                            const intervalId = setInterval(() => {
                                if (window.outPutDirContent.directoryContent.length && window.outPutDirContent.isOutputDirMissing == false) {
                                    setOutPutDirContentValue(true);
                                    clearInterval(intervalId);
                                }
                                else if (!window.outPutDirContent.directoryContent.length && window.outPutDirContent.isOutputDirMissing == true) {
                                    setOutPutDirContentValue(true);
                                    giveCommandToExtention('missingOutputDirError', "The Output Directory is not yet generated");
                                    clearInterval(intervalId);
                                }
                                console.log(window.outPutDirContent);
                            }, 1000);
                        } },
                        " ",
                        changedSelectTheFileBtnText),
                    React.createElement("div", { className: "dropdown-menu overflow-auto", "aria-labelledby": "SelectFileDropdown", style: { maxHeight: "280px", background: "white" } }, outPutDirContentValue ? setDropdowns(window.outPutDirContent) : React.createElement("div", { className: "text-center", style: { width: "214px" } },
                        React.createElement("div", { className: "spinner-border text-secondary", style: { width: "2rem", height: "2rem" }, role: "status" },
                            React.createElement("span", { className: "sr-only" }))))),
                React.createElement(react_bootstrap_1.DropdownButton, { style: { width: "33%", minWidth: "220px" }, autoClose: "outside", id: `simulator-config`, 
                    //size="sm"
                    variant: "secondary", title: "Change the Config", onSelect: (eventKey) => {
                        switch (eventKey) {
                            case 'apply':
                                console.log(changedSurveyContextValues);
                                setSurveyViewCred(changedSurveyContextValues);
                                break;
                        }
                    } },
                    React.createElement(react_bootstrap_1.Dropdown.Item, { eventKey: "editor" },
                        React.createElement(react_2.default, { width: "400px", height: "250px", defaultLanguage: "json", value: JSON.stringify(defaultSurveyContext, undefined, 4), className: (0, clsx_1.default)({ 'border border-danger': hasSurveyContextEditorErrors }), onValidate: (markers) => {
                                if (markers.length > 0) {
                                    setHasSurveyContextEditorErrors(true);
                                }
                                else {
                                    setHasSurveyContextEditorErrors(false);
                                }
                            }, onChange: (value) => {
                                if (!value) {
                                    return;
                                }
                                let context;
                                try {
                                    context = JSON.parse(value);
                                }
                                catch (e) {
                                    console.error(e);
                                    return;
                                }
                                if (!context) {
                                    return;
                                }
                                setChangedSurveyContextValues({
                                    ...surveyViewCred,
                                    surveyAndContext: surveyViewCred.surveyAndContext ? {
                                        survey: surveyViewCred.surveyAndContext.survey,
                                        context: context
                                    } : undefined
                                });
                                console.log(changedSurveyContextValues);
                            } })),
                    React.createElement(react_bootstrap_1.Dropdown.Divider, null),
                    React.createElement(react_bootstrap_1.Dropdown.Item, { eventKey: "apply" }, "Apply Changes")),
                React.createElement("div", { style: { width: "33%", minWidth: "220px" } },
                    React.createElement(case_web_ui_1.Checkbox, { id: "show-keys-checkbox", name: "show-keys-checkbox", className: "mb-3", checked: surveyViewCred.config.showKeys, onChange: (value) => {
                            console.log(value);
                            setSurveyViewCred({
                                ...surveyViewCred,
                                config: { texts: initialSurveyCredState.simulatorUIConfig.texts,
                                    showKeys: value },
                            });
                        }, label: "Show keys" })))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-12 col-lg-8 offset-lg-2" }, surveyViewCred.surveyAndContext ?
                React.createElement(case_web_ui_1.SurveyView, { loading: false, showKeys: surveyViewCred.config.showKeys, survey: surveyViewCred.surveyAndContext.survey, context: surveyViewCred.surveyAndContext.context, prefills: surveyViewCred.prefills, languageCode: surveyViewCred.selectedLanguage ? surveyViewCred.selectedLanguage : 'en', onSubmit: (responses) => {
                        console.log(responses);
                        console.log(surveyViewCred);
                    }, nextBtnText: surveyViewCred.config.texts.nextBtn, backBtnText: surveyViewCred.config.texts.backBtn, submitBtnText: surveyViewCred.config.texts.submitBtn, invalidResponseText: surveyViewCred.config.texts.invalidResponseText, dateLocales: model_1.dateLocales }) :
                React.createElement("div", { className: "mt-5" },
                    React.createElement("p", { className: "text-center" }, "Please Select The File To Preview The Survey."))))));
};
exports.default = SurveySimulator;
//# sourceMappingURL=surveySimulator.js.map