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
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const ViewLoader_1 = __importDefault(require("./view/ViewLoader"));
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('jsonpreview.preview', () => {
        const view = new ViewLoader_1.default(context);
        // if(vscode.window.activeTextEditor?.document.languageId == "JsonFile"){
        // 	const view = new ViewLoader(vscode.Uri.file(vscode.window.activeTextEditor.document.fileName), context);
        // }else{
        // 	let openDialogOptions: vscode.OpenDialogOptions = {
        // 	canSelectFiles: true,
        // 	canSelectFolders: false,
        // 	canSelectMany: false,
        // 	filters: {
        // 	  Json: ["json"]
        // 	}
        //   };
        //   vscode.window
        // 	.showOpenDialog(openDialogOptions)
        // 	.then(async (uri: vscode.Uri[] | undefined) => {
        // 	  if (uri && uri.length > 0) {
        // 		const view = new ViewLoader(uri[0], context);
        // 	  } else {
        // 		vscode.window.showErrorMessage("No valid file selected!");
        // 		return;
        // 	  }
        // 	});
        // }
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map