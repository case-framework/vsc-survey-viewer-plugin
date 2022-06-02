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
require("../Css/Toolbar.css");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
// eslint-disable-next-line @typescript-eslint/naming-convention
const ChangeTheme = (props) => {
    return (React.createElement("div", { className: "dropdown nav-item" },
        React.createElement("button", { className: "btn toolBarBg dropdown-toggle shadow-none changeThemeBtn fw-bold iconsAndTextAlign", type: "button", id: "ChangeTheme", title: "Change Theme: " + props.selectedTheme, "data-bs-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
            React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faImage, style: { width: "20px", height: "20px", paddingRight: "0.3rem" } }),
            "Change Theme"),
        React.createElement("div", { className: "dropdown-menu overflow-auto toolBarDropdownBg", "aria-labelledby": "ChangeTheme", style: { minWidth: "182px", maxHeight: "260px" } },
            React.createElement("button", { className: `${props.selectedTheme === AppConstants_1.ThemeType.defaultTheme
                    ? "fw-bold themeIcon"
                    : ""} dropdown-item text-center btn-custom`, type: "button", onClick: () => {
                    props.onThemeChange(AppConstants_1.ThemeType.defaultTheme);
                } }, "Default Theme"),
            React.createElement("div", { className: "dropdown-divider dividerColor" }),
            React.createElement("button", { className: `${props.selectedTheme === AppConstants_1.ThemeType.tekenradarTheme
                    ? "fw-bold themeIcon"
                    : ""} dropdown-item text-center btn-custom`, type: "button", onClick: () => {
                    props.onThemeChange(AppConstants_1.ThemeType.tekenradarTheme);
                } }, "Tekenradar Theme"))));
};
exports.default = ChangeTheme;
//# sourceMappingURL=ChangeTheme.js.map