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
require("../Css/ShowKeysCheckBox.css");
// eslint-disable-next-line @typescript-eslint/naming-convention
const ShowKeysCheckBox = (props) => {
    return (React.createElement("div", { className: "nav-item" },
        React.createElement("div", { className: "form-check-custom btn btn-custom" },
            React.createElement("input", { className: "form-check-custom-input shadow-none ", type: "checkbox", value: "", id: "flexCheckChecked", checked: props.currentCheckBoxStatus, onChange: () => {
                    props.onCheckBoxStausChange(!props.currentCheckBoxStatus);
                } }),
            React.createElement("label", { className: "form-check-custom-label fw-bold", htmlFor: "flexCheckChecked" }, "Show Keys"))));
};
exports.default = ShowKeysCheckBox;
//# sourceMappingURL=ShowKeysCheckBox.js.map