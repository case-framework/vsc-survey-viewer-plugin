import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import {
  ConfigFile,
  ConfigFileStructure,
  OutputFileStructure,
  SurveyDirectory,
  SurveyFileContent,
} from "./app/model";
import { SurveyContext } from "survey-engine/data_types";
import { ThemeType } from "./app/AppConstants";

export default class ViewLoader {
  private readonly _panel: vscode.WebviewPanel | undefined;
  private readonly _extensionPath: string;
  private _disposables: vscode.Disposable[] = [];

  constructor(context: vscode.ExtensionContext) {
    this._extensionPath = context.extensionPath;

    context.workspaceState.update("selectedTheme", ThemeType.defaultTheme);
    this._panel = vscode.window.createWebviewPanel(
      "Survey Viewer",
      "Survey Viewer",
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.file(path.join(context.extensionPath, "surveyViewer")),
        ],
      }
    );

    this._panel.webview.html = this.getWebviewContent(ThemeType.defaultTheme);

    this._panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case "getOutputFileContent":
            if (this._panel) {
              const content = this.getOutputFileContent();
              this._panel.webview.postMessage({
                command: "sendOutputFileContent",
                content: content,
              });
            }
            break;

          case "fileSelectedForPreview":
            if (this._panel) {
              const survey = this.getSurveyFileContent(message.data);
              this._panel.webview.postMessage({
                command: "setNewSurvey",
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
            break;

          case "getConfigFilesList":
            if (this._panel) {
              const content = this.getConfigFilesList();
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
                      command: "setUpdatedSurvey",
                      content: survey,
                    });
                  }
                });
            }
            break;

          case "setConfigFileChangeWatcher":
            if (vscode.workspace.workspaceFolders) {
              vscode.workspace
                .createFileSystemWatcher(message.data)
                .onDidChange(() => {
                  if (this._panel) {
                    const configData = this.getConfigFileContent(message.data);
                    this._panel.webview.postMessage({
                      command: "setUpdatedConfigFileData",
                      content: configData,
                    });
                  }
                });
            }
            break;

          case "changeTheme":
            if (message.data !== context.workspaceState.get("selectedTheme")) {
              vscode.window
                .showInformationMessage(
                  "The survey will restart. Would you still want to continue",
                  "Yes",
                  "No"
                )
                .then((value) => {
                  if (value === "Yes") {
                    if (this._panel) {
                      context.workspaceState.update(
                        "selectedTheme",
                        message.data
                      );
                      this._panel.webview.html = this.getWebviewContent(
                        message.data
                      );
                      this._panel.webview.postMessage({
                        command: "updateSelectedTheme",
                        content: message.data,
                      });
                    }
                  }
                });
            } else {
              vscode.window.showErrorMessage("Alredy in use");
            }
            break;

          case "PrefillFileSelectionError":
            if (this._panel) {
              vscode.window.showErrorMessage(message.data);
            }
            break;
        }
      },
      undefined,
      context.subscriptions
    );
  }

  private getWebviewContent(themeType: ThemeType): string {
    // Local path to main script run in the webview
    const reactAppPathOnDisk = vscode.Uri.file(
      path.join(this._extensionPath, "surveyViewer", themeType + ".js")
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
                case 'sendOutputFileContent':
                  window.outPutDirContent = message.content;
                    break;

                    case 'setNewSurvey':
                  window.surveyData = message.content;
                    break;

                    case 'setUpdatedSurvey':
                    window.changeInSurvey=true;
                  window.surveyData = message.content;
                    break;

                    case 'setConfigFilesList':
                  window.configFilesDir = message.content;
                    break;

                    case 'setUpdatedConfigFileData':
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

  private getSurveyFileContent(
    filePath: string
  ): SurveyFileContent | undefined {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, "utf8");
      let surveyData: SurveyFileContent = JSON.parse(content);
      return surveyData;
    }
    return undefined;
  }

  private getConfigFileContent(filePath: string): SurveyContext | undefined {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, "utf8");
      let configData: SurveyContext = JSON.parse(content);
      return configData;
    }
    return undefined;
  }

  private getOutputFileContent(): Error | OutputFileStructure | undefined {
    const fullContent: SurveyDirectory[] = [];
    const outputFolderPath = path.join(
      `${
        vscode.workspace.workspaceFolders
          ? vscode.workspace.workspaceFolders[0].uri.path
          : undefined
      }`,
      `output`
    );
    console.log(
      vscode.workspace.workspaceFolders
        ? "workspace path: " + vscode.workspace.workspaceFolders[0].uri.path
        : "workspace path: " + undefined
    );
    console.log("output folder path: " + outputFolderPath);
    console.log("does the path exist: " + fs.existsSync(outputFolderPath));
    if (fs.existsSync(outputFolderPath)) {
      fs.readdirSync(outputFolderPath).forEach((file) => {
        let newPath = path.join(
          `${
            vscode.workspace.workspaceFolders
              ? vscode.workspace.workspaceFolders[0].uri.path
              : undefined
          }`,
          `output`,
          `${file}`,
          `surveys`
        );
        let newFiles: string[];

        if (fs.existsSync(newPath)) {
          newFiles = fs.readdirSync(newPath);

          let singleSurveyContent: SurveyDirectory = {
            surveyPath: newPath,
            surveyName: file,
            surveyFiles: newFiles,
          };
          fullContent.push(singleSurveyContent);
        }
      });

      const content: OutputFileStructure = {
        isOutputDirMissing: false,
        directoryContent: fullContent,
      };

      return content;
    } else {
      const contentWithError: OutputFileStructure = {
        isOutputDirMissing: true,
        directoryContent: [],
      };
      return contentWithError;
    }
  }

  private createNewConfigFile(fileName: string) {
    const configFilePath = path.join(
      `${
        vscode.workspace.workspaceFolders
          ? vscode.workspace.workspaceFolders[0].uri.path
          : undefined
      }`,
      `config`
    );
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
          .writeFile(
            fileUri,
            new TextEncoder().encode(JSON.stringify(defaultDataForTheFile))
          )
          .then((doc) => {
            vscode.window.showTextDocument(fileUri, { preview: false });
          });
      } else {
        vscode.window.showErrorMessage("File name already exists");
      }
    } else {
      vscode.window.showErrorMessage("File name should not be empty");
    }
  }

  private getConfigFilesList(): ConfigFileStructure {
    const configFilePath = path.join(
      `${
        vscode.workspace.workspaceFolders
          ? vscode.workspace.workspaceFolders[0].uri.path
          : undefined
      }`,
      `config`
    );
    if (fs.existsSync(configFilePath)) {
      const fullContent: ConfigFile[] = [];
      fs.readdirSync(configFilePath).forEach((file) => {
        let filePath = path.join(
          `${
            vscode.workspace.workspaceFolders
              ? vscode.workspace.workspaceFolders[0].uri.path
              : undefined
          }`,
          `config`,
          `${file}`
        );
        let content = fs.readFileSync(filePath, "utf8");
        let config: SurveyContext = JSON.parse(content);
        const singleFileContent: ConfigFile = {
          configFilePath: filePath,
          configFileName: file,
          configFileContent: config,
        };
        fullContent.push(singleFileContent);
      });
      const configFileStructure: ConfigFileStructure = {
        isConfigDirMissing: false,
        directoryContent: fullContent,
      };

      return configFileStructure;
    } else {
      const contentWithError = {
        isConfigDirMissing: true,
        directoryContent: [],
      };

      return contentWithError;
    }
  }
}
