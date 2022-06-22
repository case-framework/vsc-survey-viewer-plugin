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
const AppConstants_1 = require("./app/AppConstants");
class ViewLoader {
    constructor(context) {
        this._disposables = [];
        this._extensionPath = context.extensionPath;
        context.workspaceState.update("selectedTheme", AppConstants_1.ThemeType.defaultTheme);
        this._panel = vscode.window.createWebviewPanel("Survey Viewer", "Survey Viewer", vscode.ViewColumn.Beside, {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [
                vscode.Uri.file(path.join(context.extensionPath, "surveyViewer")),
            ],
        });
        this._panel.webview.html = this.getWebviewContent(AppConstants_1.ThemeType.defaultTheme);
        this._panel.webview.onDidReceiveMessage((message) => {
            switch (message.command) {
                case "getOutputFileContent":
                    if (this._panel) {
                        console.log("pre");
                        const content = this.getOutputFileContent();
                        console.log("post");
                        this._panel.webview.postMessage({
                            command: "sendTheOutputFileContent",
                            content: content,
                        });
                    }
                    break;
                case "fileSelectedForPreview":
                    if (this._panel) {
                        const survey = this.getSurveyFileContent(message.data);
                        this._panel.webview.postMessage({
                            command: "setTheNewSurvey",
                            content: survey,
                        });
                    }
                    break;
                case "showError":
                    if (this._panel) {
                        vscode.window.showErrorMessage(message.data);
                    }
                    break;
                case "showFileDownloadSuccessMsg":
                    if (this._panel) {
                        vscode.window.showInformationMessage(message.data);
                    }
                case "getTheConfigFilesList":
                    if (this._panel) {
                        const content = this.getTheConfigFilesList();
                        this._panel.webview.postMessage({
                            command: "setConfigFilesList",
                            content: content,
                        });
                    }
                    break;
                case "createNewFile":
                    if (this._panel) {
                        this.createNewConfigFile(message.data);
                    }
                    break;
                case "selectedFileToDetectChanges":
                    if (vscode.workspace.workspaceFolders) {
                        vscode.workspace
                            .createFileSystemWatcher(message.data)
                            .onDidChange(() => {
                            if (this._panel) {
                                const survey = this.getSurveyFileContent(message.data);
                                this._panel.webview.postMessage({
                                    command: "setTheUpdatedSurvey",
                                    content: survey,
                                });
                            }
                        });
                    }
                    break;
                case "setTheConfigFileChangeWatcher":
                    if (vscode.workspace.workspaceFolders) {
                        vscode.workspace
                            .createFileSystemWatcher(message.data)
                            .onDidChange(() => {
                            if (this._panel) {
                                const configData = this.getConfigFileContent(message.data);
                                this._panel.webview.postMessage({
                                    command: "setTheUpdatedConfigFileData",
                                    content: configData,
                                });
                            }
                        });
                    }
                    break;
                case "changeTheme":
                    if (message.data !== context.workspaceState.get("selectedTheme")) {
                        vscode.window
                            .showInformationMessage("The Survey will restart. Would to still want to continue", "Yes", "No")
                            .then((value) => {
                            if (value === "Yes") {
                                if (this._panel) {
                                    context.workspaceState.update("selectedTheme", message.data);
                                    this._panel.webview.html = this.getWebviewContent(message.data);
                                    this._panel.webview.postMessage({
                                        command: "updateSelectedTheme",
                                        content: message.data,
                                    });
                                }
                            }
                        });
                    }
                    else {
                        vscode.window.showErrorMessage("Alredy in use");
                    }
                    break;
                case "PrefillFileSelectionError":
                    if (this._panel) {
                        vscode.window.showErrorMessage(message.data);
                    }
                    break;
            }
        }, undefined, context.subscriptions);
    }
    getWebviewContent(themeType) {
        // Local path to main script run in the webview
        const reactAppPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, "surveyViewer", themeType + ".js"));
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
                    case 'setConfigFilesList':
                  window.configFilesDir = message.content;
                    break;
                    case 'setTheUpdatedConfigFileData':
                      window.changeInConfigFile = true;
                      window.updatedConfigFileData = message.content;
                    break;
                    case 'updateSelectedTheme':
                      window.selectedTheme = message.content;
                    break;
            }
        });
        </script>
    </head>
    <body style="padding:0;">
        <div id="root"></div>
        <script src="${reactAppUri}"></script>
    </body>
    </html>`;
    }
    getSurveyFileContent(filePath) {
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, "utf8");
            let surveyData = JSON.parse(content);
            return surveyData;
        }
        return undefined;
    }
    getConfigFileContent(filePath) {
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, "utf8");
            let configData = JSON.parse(content);
            return configData;
        }
        return undefined;
    }
    getOutputFileContent() {
        const fullContent = [];
        const outputFolderPath = path.join(`${vscode.workspace.workspaceFolders
            ? vscode.workspace.workspaceFolders[0].uri.path
            : undefined}`, `output`);
        if (fs.existsSync(outputFolderPath)) {
            fs.readdirSync(outputFolderPath).forEach((file) => {
                let newPath = path.join(`${vscode.workspace.workspaceFolders
                    ? vscode.workspace.workspaceFolders[0].uri.path
                    : undefined}`, `output`, `${file}`, `surveys`);
                let newFiles;
                if (fs.existsSync(newPath)) {
                    newFiles = fs.readdirSync(newPath);
                    let singleSurveyContent = {
                        surveyPath: newPath,
                        surveyName: file,
                        surveyFiles: newFiles,
                    };
                    fullContent.push(singleSurveyContent);
                }
            });
            const content = {
                isOutputDirMissing: false,
                directoryContent: fullContent,
            };
            return content;
        }
        else {
            const contentWithError = {
                isOutputDirMissing: true,
                directoryContent: [],
            };
            return contentWithError;
        }
    }
    createNewConfigFile(fileName) {
        const configFilePath = path.join(`${vscode.workspace.workspaceFolders
            ? vscode.workspace.workspaceFolders[0].uri.path
            : undefined}`, `config`);
        if (fileName !== "") {
            if (!fs.existsSync(configFilePath)) {
                vscode.workspace.fs.createDirectory(vscode.Uri.file(configFilePath));
            }
            const filePath = path.join(configFilePath, fileName + ".json");
            if (!fs.existsSync(filePath)) {
                const defaultDataForTheFile = {
                    isLoggedIn: false,
                    participantFlags: {},
                };
                const fileUri = vscode.Uri.file(filePath);
                vscode.workspace.fs
                    .writeFile(fileUri, new TextEncoder().encode(JSON.stringify(defaultDataForTheFile)))
                    .then((doc) => {
                    vscode.window.showTextDocument(fileUri, { preview: false });
                });
            }
            else {
                vscode.window.showErrorMessage("File Name Already exists");
            }
        }
        else {
            vscode.window.showErrorMessage("File name should not be empty");
        }
    }
    getTheConfigFilesList() {
        const configFilePath = path.join(`${vscode.workspace.workspaceFolders
            ? vscode.workspace.workspaceFolders[0].uri.path
            : undefined}`, `config`);
        if (fs.existsSync(configFilePath)) {
            const fullContent = [];
            fs.readdirSync(configFilePath).forEach((file) => {
                let filePath = path.join(`${vscode.workspace.workspaceFolders
                    ? vscode.workspace.workspaceFolders[0].uri.path
                    : undefined}`, `config`, `${file}`);
                let content = fs.readFileSync(filePath, "utf8");
                let config = JSON.parse(content);
                const singleFileContent = {
                    configFilePath: filePath,
                    configFileName: file,
                    configFileContent: config,
                };
                fullContent.push(singleFileContent);
            });
            const configFileStructure = {
                isConfigDirMissing: false,
                directoryContent: fullContent,
            };
            return configFileStructure;
        }
        else {
            const contentWithError = {
                isConfigDirMissing: true,
                directoryContent: [],
            };
            return contentWithError;
        }
    }
}
exports.default = ViewLoader;
//# sourceMappingURL=ViewLoader.js.map