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
      vscode.ViewColumn.Two,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.file(context.extensionPath + "surveyViewer"),
        ],
      }
    );

    // Gets the content to load in webview
    this._panel.webview.html = this.getWebviewContent(ThemeType.defaultTheme);

    // Recieves mesages from react app
    this._panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case "getOutputDirFiles":
            if (this._panel) {
              const content = this.getOutputDirFiles();
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
                .then((value: string | undefined) => {
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
              vscode.window.showErrorMessage("Already in use");
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
  // Returns the content for webview of vscode
  private getWebviewContent(themeType: ThemeType): string {
    // Local path to main script run in the webview
    const reactAppPathOnDisk = vscode.Uri.file(
      this._extensionPath + "/surveyViewer" + `/${themeType}` + ".js"
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

         
        </script>
    </head>
    <body style="padding:0;">
        <div id="root"></div>
        <script src="${reactAppUri}"></script>
    </body>
    </html>`;
  }

  // Returns the content of the survey file
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

  // Returns the content of the config file
  private getConfigFileContent(filePath: string): SurveyContext | undefined {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, "utf8");
      let configData: SurveyContext = JSON.parse(content);
      return configData;
    }
    return undefined;
  }

  // Returns the survey files from output directory
  private getOutputDirFiles(): Error | OutputFileStructure | undefined {
    const fullContent: SurveyDirectory[] = [];
    
    if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length < 1) {
      // TODO: display error and return if no workspace found:
      return;
    }
    
    const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;   
    const outputFolderPath = path.join(
      workspaceFolder,
      'output'
    );
   
    console.log("output folder path: " + outputFolderPath);
    console.log("does the path exist: " + fs.existsSync(outputFolderPath));
    if (fs.existsSync(outputFolderPath)) {
      fs.readdirSync(outputFolderPath).forEach((file) => {
        const surveyFolder = path.join(
          outputFolderPath,
          file,
          'surveys'
        );        

        let newFiles: string[];
        if (fs.existsSync(surveyFolder)) {
          newFiles = fs.readdirSync(surveyFolder);

          let singleSurveyContent: SurveyDirectory = {
            surveyPath: surveyFolder,
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
  // Creats a new file for config and opens it in new tab
  private createNewConfigFile(fileName: string) {
    const configFilePath = vscode.workspace.workspaceFolders
      ? vscode.workspace.workspaceFolders[0].uri.path
      : undefined + "/config";

    if (fileName !== "") {
      if (!fs.existsSync(configFilePath)) {
        vscode.workspace.fs.createDirectory(vscode.Uri.file(configFilePath));
      }
      const filePath = configFilePath + `/${fileName}` + ".json";

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
          .then(() => {
            vscode.window.showTextDocument(fileUri, { preview: false });
          });
      } else {
        vscode.window.showErrorMessage("File name already exists");
      }
    } else {
      vscode.window.showErrorMessage("File name should not be empty");
    }
  }
  // Returns the files from the config directory
  private getConfigFilesList(): ConfigFileStructure {
    const configFilePath = vscode.workspace.workspaceFolders
      ? vscode.workspace.workspaceFolders[0].uri.path
      : undefined + "/config";

    if (fs.existsSync(configFilePath)) {
      const fullContent: ConfigFile[] = [];
      fs.readdirSync(configFilePath).forEach((file) => {
        let filePath = vscode.workspace.workspaceFolders
          ? vscode.workspace.workspaceFolders[0].uri.path
          : undefined + "/config" + `/${file}`;

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
