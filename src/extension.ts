
import path = require('path');
import * as vscode from 'vscode';
import ViewLoader from './view/ViewLoader';


export function activate(context: vscode.ExtensionContext) {
	if(vscode.workspace.workspaceFolders){
		vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(vscode.workspace.workspaceFolders[0], 'output/tekenradar/surveys/*.json')).onDidChange(() => {
			vscode.commands.executeCommand("workbench.action.webview.reloadWebviewAction");
	   });
   }

	context.subscriptions.push( vscode.commands.registerCommand('jsonpreview.preview', () => {

		if(vscode.window.activeTextEditor?.document.languageId == "JsonFile"){
			const view = new ViewLoader(vscode.Uri.file(vscode.window.activeTextEditor.document.fileName), context.extensionPath);
		}else{
			let openDialogOptions: vscode.OpenDialogOptions = {
			canSelectFiles: true,
			canSelectFolders: false,
			canSelectMany: false,
			filters: {
			  Json: ["json"]
			}
		  };
		
		  vscode.window
			.showOpenDialog(openDialogOptions)
			.then(async (uri: vscode.Uri[] | undefined) => {
			  if (uri && uri.length > 0) {
				const view = new ViewLoader(uri[0], context.extensionPath);
			  } else {
				vscode.window.showErrorMessage("No valid file selected!");
				return;
			  }
			});
		}
		
		
		
		}
	));
}
	



export function deactivate() {}
