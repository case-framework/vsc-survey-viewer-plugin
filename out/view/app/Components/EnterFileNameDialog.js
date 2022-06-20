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
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
// eslint-disable-next-line @typescript-eslint/naming-convention
const EnterFileNameDialog = (props) => {
    const [fileName, setFileName] = React.useState("");
    return (React.createElement("div", { className: "modal fade ", id: "EnterFileNameDialog", tabIndex: -1, role: "dialog", "aria-labelledby": "DialogTitle", "aria-hidden": "true" },
        React.createElement("div", { className: "modal-dialog modal-dialog-centered ", role: "document" },
            React.createElement("div", { className: "modal-content", style: { borderRadius: "0.6rem" } },
                React.createElement("div", { className: "modal-header" },
                    React.createElement("h5", { className: "modal-title", id: "DialogTitle" }, "Create a new file"),
                    React.createElement("button", { type: "button", className: "btn shadow-none", "data-bs-dismiss": "modal", "aria-label": "Close" },
                        React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faXmark, style: { width: "20px", height: "20px" } }))),
                React.createElement("div", { className: "modal-body" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { htmlFor: "EnterFileNameTextfeild" }, "Enter File name"),
                        React.createElement("input", { type: "email", style: { backgroundColor: "#edeff4" }, className: "form-control", onChange: (event) => {
                                setFileName(event.target.value);
                                console.log(event.target.value);
                            }, id: "EnterFileNameTextfeild", "aria-describedby": "emailHelp", placeholder: "" }))),
                React.createElement("div", { className: "modal-footer" },
                    React.createElement("button", { type: "button", className: "btn btn-secondary rounded", "data-bs-dismiss": "modal" }, "Close"),
                    React.createElement("button", { type: "button", className: "btn btn-primary rounded", "data-bs-dismiss": "modal", onClick: () => {
                            props.giveCommandToVscode("createNewFile", fileName);
                        } }, "Create"))))));
};
exports.default = EnterFileNameDialog;
//# sourceMappingURL=EnterFileNameDialog.js.map