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
const case_web_ui_1 = require("case-web-ui");
const model_1 = require("./model");
const react_1 = require("react");
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
    simulatorUIConfig: defaultSimulatorUIConfig,
    surveyContext: defaultSurveyContext,
    survey: window.initialData.survey,
    surveyKey: window.initialData.studyKey
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
    return (React.createElement("div", { className: "container-fluid" },
        React.createElement("div", { className: "container pt-3" },
            React.createElement("div", { className: "row" },
                React.createElement(case_web_ui_1.Checkbox, { id: "show-keys-checkbox", name: "show-keys-checkbox", className: "mb-3", checked: surveyViewCred.config.showKeys, onChange: (value) => {
                        console.log(value);
                        setSurveyViewCred({
                            config: { texts: initialSurveyCredState.simulatorUIConfig.texts,
                                showKeys: value },
                            surveyAndContext: initialSurveyCredState.survey ? {
                                survey: initialSurveyCredState.survey,
                                context: initialSurveyCredState.surveyContext
                            } : undefined,
                            prefills: initialSurveyCredState.prefillValues,
                            selectedLanguage: initialSurveyCredState.selectedLanguage
                        });
                    }, label: "Show keys" }))),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-12 col-lg-8 offset-lg-2" }, surveyViewCred.surveyAndContext ?
                React.createElement(case_web_ui_1.SurveyView, { loading: false, showKeys: surveyViewCred.config.showKeys, survey: surveyViewCred.surveyAndContext.survey, context: surveyViewCred.surveyAndContext.context, prefills: surveyViewCred.prefills, languageCode: surveyViewCred.selectedLanguage ? surveyViewCred.selectedLanguage : 'en', onSubmit: (responses) => {
                        console.log(responses);
                    }, nextBtnText: surveyViewCred.config.texts.nextBtn, backBtnText: surveyViewCred.config.texts.backBtn, submitBtnText: surveyViewCred.config.texts.submitBtn, invalidResponseText: surveyViewCred.config.texts.invalidResponseText, dateLocales: model_1.dateLocales }) :
                React.createElement(case_web_ui_1.AlertBox, { type: "danger", useIcon: true, content: surveyViewCred.config.texts.noSurveyLoaded })))));
};
exports.default = SurveySimulator;
//# sourceMappingURL=surveySimulator.js.map