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
const case_web_ui_1 = require("case-web-ui");
const React = __importStar(require("react"));
// eslint-disable-next-line @typescript-eslint/naming-convention
const ShowKeysCheckBox = (props) => {
    return (React.createElement("div", { className: "nav-item ", style: {
            width: "180px",
            paddingRight: "1rem",
            paddingLeft: "1rem",
            paddingTop: "0.5rem",
        } },
        React.createElement(case_web_ui_1.Checkbox, { id: "show-keys-checkbox", name: "show-keys-checkbox", checked: props.currentCheckBoxStatus, onChange: (value) => {
                props.onCheckBoxStausChange(value);
            }, label: "Show keys" })));
};
exports.default = ShowKeysCheckBox;
//# sourceMappingURL=ShowKeysCheckBox.js.map