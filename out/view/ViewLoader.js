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
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class ViewLoader {
    constructor(context) {
        this._disposables = [];
        this._extensionPath = context.extensionPath;
        this._panel = vscode.window.createWebviewPanel("Survey Viewer", "Survey Viewer", vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [
                vscode.Uri.file(path.join(context.extensionPath, "surveyViewer")),
            ]
        });
        this._panel.webview.html = this.getWebviewContent();
        this._panel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'getOutputFileContent':
                    if (this._panel) {
                        const content = this.getOutputFileContent();
                        this._panel.webview.postMessage({
                            command: 'sendTheOutputFileContent',
                            content: content
                        });
                    }
                    break;
                case 'fileSelectedForPreview':
                    if (this._panel) {
                        const survey = this.getFileContent(message.data);
                        this._panel.webview.postMessage({
                            command: 'setTheNewSurvey',
                            content: survey
                        });
                    }
                    break;
                case 'missingOutputDirError':
                    if (this._panel) {
                        vscode.window.showErrorMessage(message.data);
                    }
                    break;
                case 'showFileDownloadSuccessMsg':
                    if (this._panel) {
                        vscode.window.showInformationMessage(message.data);
                    }
                    break;
                case 'selectedFileToDetectChanges':
                    if (vscode.workspace.workspaceFolders) {
                        vscode.workspace.createFileSystemWatcher(message.data).onDidChange(() => {
                            if (this._panel) {
                                const survey = this.getFileContent(message.data);
                                this._panel.webview.postMessage({
                                    command: 'setTheUpdatedSurvey',
                                    content: survey
                                });
                            }
                        });
                    }
                    break;
            }
        }, undefined, context.subscriptions);
    }
    getWebviewContent() {
        // Local path to main script run in the webview
        const reactAppPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, "surveyViewer", "surveyViewer.js"));
        const reactAppUri = reactAppPathOnDisk.with({ scheme: "vscode-resource" });
        return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>
        <meta http-equiv="Content-Security-Policy"
                    content="default-src *; style-src * 'unsafe-inline'; script-src * 'unsafe-inline' 'unsafe-eval'; img-src * data: 'unsafe-inline'; connect-src * 'unsafe-inline'; frame-src *;">
        <script>
          window.acquireVsCodeApi = acquireVsCodeApi;
          window.surveyData = undefined;
          window.addEventListener('message', event => {

            const message = event.data; // The JSON data our extension sent

            switch (message.command) {
                case 'sendTheOutputFileContent':
                  window.outPutDirContent = message.content;
                    break;
                    case 'setTheNewSurvey':
                  window.surveyData = message.content;
                    break;
                    case 'setTheUpdatedSurvey':
                    window.changeInSurvey=true;
                  window.surveyData = message.content;
                    break;
            }
        });
        </script>
    </head>
    <body>
        <div id="root"></div>
        <script src="${reactAppUri}"></script>
    </body>
    </html>`;
    }
    getFileContent(filePath) {
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, "utf8");
            let surveyData = JSON.parse(content);
            return surveyData;
        }
        return undefined;
    }
    getOutputFileContent() {
        const fullContent = [];
        const outputFolderPath = path.join(`${vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.path : undefined}`, `output`);
        if (fs.existsSync(outputFolderPath)) {
            fs.readdirSync(outputFolderPath).forEach((file) => {
                let newPath = path.join(`${vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.path : undefined}`, `output/${file}/surveys`);
                let newFiles;
                newFiles = fs.readdirSync(newPath);
                let singleSurveyContent = {
                    surveyPath: newPath,
                    surveyName: file,
                    surveyFiles: newFiles
                };
                fullContent.push(singleSurveyContent);
            });
            const content = {
                isOutputDirMissing: false,
                directoryContent: fullContent
            };
            return content;
        }
        else {
            const contentWithError = {
                isOutputDirMissing: true,
                directoryContent: []
            };
            return contentWithError;
        }
    }
}
exports.default = ViewLoader;
//# sourceMappingURL=ViewLoader.js.map