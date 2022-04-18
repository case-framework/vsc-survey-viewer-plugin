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
const SelectFileToPreview_1 = __importDefault(require("./Components/SelectFileToPreview"));
const ShowKeysCheckBox_1 = __importDefault(require("./Components/ShowKeysCheckBox"));
const UploadPrefill_1 = __importDefault(require("./Components/UploadPrefill"));
const EnterFileNameDialog_1 = __importDefault(require("./Components/EnterFileNameDialog"));
const ChangeConfig_1 = __importDefault(require("./Components/ChangeConfig"));
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
    survey: window.surveyData ? window.surveyData.survey : undefined,
    context: { ...defaultSurveyContext },
    selectedLanguage: "en",
    prefillValues: [],
    prefillsFile: undefined,
};
// eslint-disable-next-line @typescript-eslint/naming-convention
const SurveySimulator = (props) => {
    const [surveyViewCred, setSurveyViewCred] = (0, react_1.useState)({
        ...initialSurveyCred,
    });
    const [changedSelectTheFileBtnText, setChangedSelectTheFileBtnText] = (0, react_1.useState)("Select File To Preview");
    const [outPutDirContentValue, setOutPutDirContentValue] = (0, react_1.useState)(false);
    const [configDirContentValue, setConfigDirContentValue] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => {
            if (window.changeInSurvey) {
                setSurveyViewCred((prevState) => ({
                    ...prevState,
                    survey: window.surveyData ? window.surveyData.survey : undefined,
                }));
                window.changeInSurvey = false;
            }
            if (window.changeInConfigFile) {
                setSurveyViewCred((prevState) => ({
                    ...prevState,
                    context: window.updatedConfigFileData,
                }));
                window.changeInConfigFile = false;
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
        React.createElement("div", { className: "container pt-2" },
            React.createElement("nav", { className: "navbar navbar-expand navbar-light bg-light " },
                React.createElement("div", { className: "collapse navbar-collapse justify-content-center order-2", id: "navbarNavAltMarkup" },
                    React.createElement("div", { className: "navbar-nav" },
                        React.createElement(SelectFileToPreview_1.default, { giveCommandToExtention: (command, data) => {
                                giveCommandToExtention(command, data);
                            }, setChangedSelectTheFileBtnText: (newText) => {
                                setChangedSelectTheFileBtnText(newText);
                            }, changedSelectTheFileBtnText: changedSelectTheFileBtnText, setOutPutDirContentValue: (value) => {
                                setOutPutDirContentValue(value);
                            }, outPutDirContentValue: outPutDirContentValue, onChangedSurveyViewCred: () => {
                                setSurveyViewCred((prevState) => ({
                                    ...prevState,
                                    survey: window.surveyData
                                        ? window.surveyData.survey
                                        : undefined,
                                    context: { ...defaultSurveyContext },
                                }));
                            } }),
                        React.createElement(UploadPrefill_1.default, { onPrefillChange: (preFillFile, preFillValues) => {
                                setSurveyViewCred((prevState) => ({
                                    ...prevState,
                                    prefillsFile: preFillFile,
                                    prefillValues: preFillValues,
                                }));
                            }, currentSelectFileName: surveyViewCred.prefillsFile
                                ? surveyViewCred.prefillsFile.name
                                : "Upload Prefill" }),
                        React.createElement(ChangeConfig_1.default, { giveCommandToExtension: (command, data) => {
                                giveCommandToExtention(command, data);
                            }, setConfigDirContentValue: (value) => {
                                setConfigDirContentValue(value);
                            }, configDirContentValue: configDirContentValue, onConfigChange: (context) => {
                                setSurveyViewCred((prevState) => ({
                                    ...prevState,
                                    survey: window.surveyData
                                        ? window.surveyData.survey
                                        : undefined,
                                    context: { ...context },
                                }));
                            } }),
                        React.createElement(ShowKeysCheckBox_1.default, { currentCheckBoxStatus: surveyViewCred.simulatorUIConfig.showKeys, onCheckBoxStausChange: (newStaus) => {
                                setSurveyViewCred((prevState) => ({
                                    ...prevState,
                                    simulatorUIConfig: {
                                        texts: initialSurveyCred.simulatorUIConfig.texts,
                                        showKeys: newStaus,
                                    },
                                }));
                            } }))))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-12 col-lg-8 offset-lg-2" }, surveyViewCred.survey ? (React.createElement(case_web_ui_1.SurveyView, { loading: false, showKeys: surveyViewCred.simulatorUIConfig.showKeys, survey: surveyViewCred.survey, context: surveyViewCred.context, prefills: surveyViewCred.prefillValues, languageCode: surveyViewCred.selectedLanguage
                    ? surveyViewCred.selectedLanguage
                    : "en", onSubmit: (responses) => {
                    const exportData = responses.slice();
                    var a = document.createElement("a");
                    var file = new Blob([JSON.stringify(exportData, undefined, 2)], { type: "json" });
                    a.href = URL.createObjectURL(file);
                    a.download = `${surveyViewCred.survey?.current.surveyDefinition.key}_responses_${new Date().toLocaleDateString()}.json`;
                    a.click();
                    giveCommandToExtention("showFileDownloadSuccessMsg", "The file is saved");
                }, nextBtnText: surveyViewCred.simulatorUIConfig.texts.nextBtn, backBtnText: surveyViewCred.simulatorUIConfig.texts.backBtn, submitBtnText: surveyViewCred.simulatorUIConfig.texts.submitBtn, invalidResponseText: surveyViewCred.simulatorUIConfig.texts.invalidResponseText, dateLocales: model_1.dateLocales })) : (React.createElement("div", { className: "mt-5" },
                React.createElement("p", { className: "text-center" }, "Please Select The File To Preview The Survey."))))),
        React.createElement(EnterFileNameDialog_1.default, { giveCommandToExtention: (command, data) => {
                giveCommandToExtention(command, data);
            } })));
};
exports.default = SurveySimulator;
//# sourceMappingURL=SurveySimulator.js.map