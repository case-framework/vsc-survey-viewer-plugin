import * as vscode from "vscode";
import ViewLoader from "./view/ViewLoader";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("surveyviewer.preview", () => {
      new ViewLoader(context);
    })
  );
}

export function deactivate() {}
