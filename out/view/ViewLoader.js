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
    constructor(fileUri, extensionPath) {
        this._disposables = [];
        this._extensionPath = extensionPath;
        let config = this.getFileContent(fileUri);
        if (config) {
            this._panel = vscode.window.createWebviewPanel(`${fileUri.path}`, `${fileUri.path}`, vscode.ViewColumn.One, {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.file(path.join(extensionPath, "configViewer"))
                ]
            });
            this._panel.webview.html = this.getWebviewContent(config);
        }
    }
    getWebviewContent(config) {
        // Local path to main script run in the webview
        const reactAppPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, "configViewer", "configViewer.js"));
        const reactAppUri = reactAppPathOnDisk.with({ scheme: "vscode-resource" });
        const configJson = JSON.stringify(config);
        return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Config View</title>
        <meta http-equiv="Content-Security-Policy"
                    content="default-src 'none';
                             img-src https:;
                             script-src 'unsafe-eval' 'unsafe-inline' vscode-resource:;
                             style-src vscode-resource: 'unsafe-inline';">
        <script>
          window.acquireVsCodeApi = acquireVsCodeApi;
          window.initialData = ${configJson};
        </script>
    </head>
    <body>
        <div id="root"></div>
        <script src="${reactAppUri}"></script>
    </body>
    </html>`;
    }
    getFileContent(fileUri) {
        if (fs.existsSync(fileUri.fsPath)) {
            let content = fs.readFileSync(fileUri.fsPath, "utf8");
            let surveyData = JSON.parse(content);
            return surveyData;
        }
        return undefined;
    }
}
exports.default = ViewLoader;
//# sourceMappingURL=ViewLoader.js.map