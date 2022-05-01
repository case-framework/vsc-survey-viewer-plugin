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
const AppConstants_1 = require("../AppConstants");
// eslint-disable-next-line @typescript-eslint/naming-convention
const ChangeTheme = (props) => {
    return (React.createElement("div", { className: "dropdown nav-item", style: {
            width: "20%",
            minWidth: "130px",
            height: "44px",
            paddingRight: "1rem",
        } },
        React.createElement("button", { className: "btn btn-secondary dropdown-toggle", type: "button", id: "ChangeTheme", "data-bs-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, "Change Theme"),
        React.createElement("div", { className: "dropdown-menu", "aria-labelledby": "ChangeTheme", style: { width: "170px" } },
            React.createElement("button", { className: "dropdown-item text-center", type: "button", onClick: () => {
                    props.onThemeChange(AppConstants_1.ThemeType.defaultTheme);
                } }, "Default Theme"),
            React.createElement("div", { className: "dropdown-divider" }),
            React.createElement("button", { className: "dropdown-item text-center", type: "button", onClick: () => {
                    props.onThemeChange(AppConstants_1.ThemeType.tekenradarTheme);
                } }, "Tekenradar Theme"))));
};
exports.default = ChangeTheme;
//# sourceMappingURL=ChangeTheme.js.map