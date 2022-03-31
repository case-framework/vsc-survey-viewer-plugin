
import path = require('path');
import * as vscode from 'vscode';
import ViewLoader from './view/ViewLoader';


export function activate(context: vscode.ExtensionContext) {
	

	context.subscriptions.push( vscode.commands.registerCommand('jsonpreview.preview', () => {

		const view = new ViewLoader( context);

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
		
		
		
		}
	));
}
	



export function deactivate() {}
