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
const react_1 = __importStar(require("react"));
// eslint-disable-next-line @typescript-eslint/naming-convention
const UploadDialog = (props) => {
    const [selectedFile, setSelectedFile] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (!props.open) {
            setSelectedFile(undefined);
        }
    }, [props.open]);
    return (react_1.default.createElement(case_web_ui_1.Dialog, { title: "File picker", open: props.open, onClose: props.onClose, ariaLabelledBy: "title" },
        react_1.default.createElement("div", { className: "px-3 py-2a" },
            react_1.default.createElement("p", null, "Select a JSON files:"),
            props.open ? react_1.default.createElement(case_web_ui_1.FileDropzone, { accept: "application/json", placeholderText: "Select a file", maxFiles: 1, onDrop: (files) => {
                    if (files.length > 0) {
                        setSelectedFile(files[0]);
                    }
                } }) : null,
            react_1.default.createElement(case_web_ui_1.DialogBtn, { className: "mt-2 me-2", type: "button", color: "primary", outlined: true, label: "Cancel", onClick: () => props.onClose() }),
            react_1.default.createElement("button", { className: "btn btn-primary mt-2", disabled: !selectedFile, onClick: () => {
                    if (!selectedFile) {
                        return;
                    }
                    props.onReady(selectedFile);
                    props.onClose();
                } }, "Open"))));
};
exports.default = UploadDialog;
//# sourceMappingURL=UploadDialog.js.map