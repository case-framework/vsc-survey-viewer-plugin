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
const SurveySimulator = (props) => {
    return (React.createElement("div", { className: "col-12 col-lg-8 offset-lg-2" }, props.surveyAndContext ?
        React.createElement(case_web_ui_1.SurveyView, { loading: false, showKeys: props.config.showKeys, survey: props.surveyAndContext.survey, context: props.surveyAndContext.context, prefills: props.prefills, languageCode: props.selectedLanguage ? props.selectedLanguage : 'en', onSubmit: (responses) => {
                console.log(responses);
            }, nextBtnText: props.config.texts.nextBtn, backBtnText: props.config.texts.backBtn, submitBtnText: props.config.texts.submitBtn, invalidResponseText: props.config.texts.invalidResponseText, dateLocales: model_1.dateLocales }) :
        React.createElement(case_web_ui_1.AlertBox, { type: "danger", useIcon: true, content: props.config.texts.noSurveyLoaded })));
};
exports.default = SurveySimulator;
//# sourceMappingURL=surveySimulator.js.map