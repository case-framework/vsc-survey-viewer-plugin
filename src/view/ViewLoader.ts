import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { OutputFileStructure, SurveyDirectory, SurveyFileContent } from "./app/model";


export default class ViewLoader {
  private readonly _panel: vscode.WebviewPanel | undefined;
  private readonly _extensionPath: string;
  private _disposables: vscode.Disposable[] = [];

  constructor(context: vscode.ExtensionContext) {
    this._extensionPath = context.extensionPath;

    this._panel = vscode.window.createWebviewPanel(
      "Survey Viewer",
      "Survey Viewer",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.file(path.join(context.extensionPath, "surveyViewer")),
        ]
      }
    );

    this._panel.webview.html = this.getWebviewContent();
    this._panel.webview.onDidReceiveMessage(
      message => {
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
      },
      undefined,
      context.subscriptions
    );

  }

  private getWebviewContent(): string {
    // Local path to main script run in the webview
    const reactAppPathOnDisk = vscode.Uri.file(
      path.join(this._extensionPath, "surveyViewer", "surveyViewer.js")
    );
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

  private getFileContent(filePath: string): SurveyFileContent | undefined {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, "utf8");
      let surveyData: SurveyFileContent = JSON.parse(content);

      return surveyData;
    }
    return undefined;
  }

  private getOutputFileContent(): Error | OutputFileStructure | undefined {
    const fullContent: SurveyDirectory[] = [];
    const outputFolderPath =
      path.join(`${vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.path : undefined}`, `output`);
    if (fs.existsSync(outputFolderPath)) {
      fs.readdirSync(outputFolderPath).forEach((file) => {
        let newPath = path.join(`${vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.path : undefined}`, `output/${file}/surveys`);
        let newFiles: string[];

        newFiles = fs.readdirSync(newPath);


        let singleSurveyContent: SurveyDirectory = {
          surveyPath: newPath,
          surveyName: file,
          surveyFiles: newFiles
        };
        fullContent.push(singleSurveyContent);

      });

      const content: OutputFileStructure = {
        isOutputDirMissing: false,
        directoryContent: fullContent
      };

      return content;
    } else {
      const contentWithError: OutputFileStructure = {
        isOutputDirMissing: true,
        directoryContent: []
      };
      return contentWithError;
    }

  }
}