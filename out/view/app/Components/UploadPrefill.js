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
// eslint-disable-next-line @typescript-eslint/naming-convention
const UploadPrefill = (props) => {
    const openDialogForFileSelection = () => {
        const inputRef = document.getElementById("input_file");
        console.log(inputRef);
        if (inputRef) {
            inputRef.click();
        }
    };
    const uploadFileForPreFill = (event) => {
        const prefills = event.target.files ? event.target.files[0] : undefined;
        if (prefills) {
            const reader = new FileReader();
            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = () => {
                // Do whatever you want with the file contents
                const res = reader.result;
                if (!res || typeof res !== "string") {
                    console.error("TODO: handle file upload error");
                    return;
                }
                const content = JSON.parse(res);
                props.onPrefillChange(prefills, content);
            };
            reader.readAsText(prefills);
        }
        else {
            props.onPrefillChange(prefills, []);
        }
    };
    return (React.createElement("div", { className: "nav-item", style: { width: "200px", height: "44px", paddingLeft: "1rem", paddingRight: "1rem" } },
        React.createElement("button", { style: { width: "165px" }, id: "get_file", className: "btn btn-secondary", onClick: () => openDialogForFileSelection() },
            " ",
            React.createElement("p", null,
                props.currentSelectFileName.length <= 18
                    ? props.currentSelectFileName
                    : props.currentSelectFileName.substring(0, 17),
                " ")),
        React.createElement("input", { type: "file", id: "input_file", accept: ".json", style: { display: "none" }, onChange: (event) => {
                uploadFileForPreFill(event);
            } })));
};
exports.default = UploadPrefill;
//# sourceMappingURL=UploadPrefill.js.map