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
const SelectFileToPreview_1 = __importDefault(require("./Components/SelectFileToPreview"));
const ShowKeysCheckBox_1 = __importDefault(require("./Components/ShowKeysCheckBox"));
const UploadPrefill_1 = __importDefault(require("./Components/UploadPrefill"));
const vscode = window.acquireVsCodeApi();
const defaultSurveyContext = {
    isLoggedIn: false,
    participantFlags: {},
};
const defaultSimulatorUIConfig = {
    showKeys: false,
    texts: {
        backBtn: "Back",
        nextBtn: "Next",
        submitBtn: "Submit",
        invalidResponseText: "Invalid response",
        noSurveyLoaded: "Survey could not be loaded, please try again.",
    },
};
const initialSurveyCred = {
    simulatorUIConfig: { ...defaultSimulatorUIConfig },
    surveyAndContext: window.surveyData
        ? {
            survey: window.surveyData.survey,
            context: { ...defaultSurveyContext },
        }
        : undefined,
    selectedLanguage: "en",
    prefillValues: [],
    prefillsFile: undefined,
};
// eslint-disable-next-line @typescript-eslint/naming-convention
const SurveySimulator = (props) => {
    const [surveyViewCred, setSurveyViewCred] = (0, react_1.useState)({
        ...initialSurveyCred,
    });
    const [hasSurveyContextEditorErrors, setHasSurveyContextEditorErrors] = (0, react_1.useState)(false);
    const [changedSurveyContextValues, setChangedSurveyContextValues] = (0, react_1.useState)({
        ...initialSurveyCred,
    });
    const [changedSelectTheFileBtnText, setChangedSelectTheFileBtnText] = (0, react_1.useState)("Select File To Preview");
    const [outPutDirContentValue, setOutPutDirContentValue] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => {
            if (window.changeInSurvey) {
                console.log(window.changeInSurvey);
                setSurveyViewCred((prevState) => ({
                    ...prevState,
                    surveyAndContext: window.surveyData.survey
                        ? {
                            survey: window.surveyData.survey,
                            context: { ...defaultSurveyContext },
                        }
                        : undefined,
                }));
                window.changeInSurvey = false;
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const giveCommandToExtention = (command, data) => {
        vscode.postMessage({
            command: command,
            data: data,
        });
    };
    return (React.createElement("div", { className: "container-fluid" },
        React.createElement("div", { className: "container pt-3" },
            React.createElement("div", { className: "row" },
                React.createElement(SelectFileToPreview_1.default, { giveCommandToExtention: (command, data) => {
                        giveCommandToExtention(command, data);
                    }, setChangedSelectTheFileBtnText: (newText) => {
                        setChangedSelectTheFileBtnText(newText);
                    }, changedSelectTheFileBtnText: changedSelectTheFileBtnText, setOutPutDirContentValue: (value) => {
                        setOutPutDirContentValue(value);
                    }, outPutDirContentValue: outPutDirContentValue, onChangedSurveyViewCred: () => {
                        setSurveyViewCred((prevState) => ({
                            ...prevState,
                            surveyAndContext: window.surveyData.survey
                                ? {
                                    survey: window.surveyData.survey,
                                    context: { ...defaultSurveyContext },
                                }
                                : undefined,
                        }));
                    } }),
                React.createElement(react_bootstrap_1.DropdownButton, { style: { width: "25%", minWidth: "220px" }, autoClose: "outside", id: `simulator-config`, 
                    //size="sm"
                    variant: "secondary", title: "Change the Config", onSelect: (eventKey) => {
                        switch (eventKey) {
                            case "apply":
                                console.log(changedSurveyContextValues);
                                setSurveyViewCred(changedSurveyContextValues);
                                break;
                        }
                    } },
                    React.createElement(react_bootstrap_1.Dropdown.Item, { eventKey: "editor" },
                        React.createElement(react_2.default, { width: "400px", height: "250px", defaultLanguage: "json", value: JSON.stringify(defaultSurveyContext, undefined, 4), className: (0, clsx_1.default)({
                                "border border-danger": hasSurveyContextEditorErrors,
                            }), onValidate: (markers) => {
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
                                    surveyAndContext: surveyViewCred.surveyAndContext
                                        ? {
                                            survey: surveyViewCred.surveyAndContext.survey,
                                            context: context,
                                        }
                                        : undefined,
                                });
                                console.log(changedSurveyContextValues);
                            } })),
                    React.createElement(react_bootstrap_1.Dropdown.Divider, null),
                    React.createElement(react_bootstrap_1.Dropdown.Item, { eventKey: "apply" }, "Apply Changes")),
                React.createElement(UploadPrefill_1.default, { onPrefillChange: (preFillFile, preFillValues) => {
                        setSurveyViewCred((prevState) => ({
                            ...prevState,
                            prefillsFile: preFillFile,
                            prefillValues: preFillValues,
                        }));
                    }, currentSelectFileName: surveyViewCred.prefillsFile
                        ? surveyViewCred.prefillsFile.name
                        : "Upload Prefill" }),
                React.createElement(ShowKeysCheckBox_1.default, { currentCheckBoxStatus: surveyViewCred.simulatorUIConfig.showKeys, onCheckBoxStausChange: (newStaus) => {
                        setSurveyViewCred((prevState) => ({
                            ...prevState,
                            simulatorUIConfig: {
                                texts: initialSurveyCred.simulatorUIConfig.texts,
                                showKeys: newStaus,
                            },
                        }));
                    } }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-12 col-lg-8 offset-lg-2" }, surveyViewCred.surveyAndContext ? (React.createElement(case_web_ui_1.SurveyView, { loading: false, showKeys: surveyViewCred.simulatorUIConfig.showKeys, survey: surveyViewCred.surveyAndContext.survey, context: surveyViewCred.surveyAndContext.context, prefills: surveyViewCred.prefillValues, languageCode: surveyViewCred.selectedLanguage
                    ? surveyViewCred.selectedLanguage
                    : "en", onSubmit: (responses) => {
                    const exportData = responses.slice();
                    var a = document.createElement("a");
                    var file = new Blob([JSON.stringify(exportData, undefined, 2)], { type: "json" });
                    a.href = URL.createObjectURL(file);
                    a.download = `${surveyViewCred.surveyAndContext?.survey.current
                        .surveyDefinition.key}_responses_${new Date().toLocaleDateString()}.json`;
                    a.click();
                    giveCommandToExtention("showFileDownloadSuccessMsg", "The file is saved");
                }, nextBtnText: surveyViewCred.simulatorUIConfig.texts.nextBtn, backBtnText: surveyViewCred.simulatorUIConfig.texts.backBtn, submitBtnText: surveyViewCred.simulatorUIConfig.texts.submitBtn, invalidResponseText: surveyViewCred.simulatorUIConfig.texts.invalidResponseText, dateLocales: model_1.dateLocales })) : (React.createElement("div", { className: "mt-5" },
                React.createElement("p", { className: "text-center" }, "Please Select The File To Preview The Survey.")))))));
};
exports.default = SurveySimulator;
//# sourceMappingURL=SurveySimulator.js.map