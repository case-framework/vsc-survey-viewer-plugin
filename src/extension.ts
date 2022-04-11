
import path = require('path');
import * as vscode from 'vscode';
import ViewLoader from './view/ViewLoader';


export function activate(context: vscode.ExtensionContext) {
	

	context.subscriptions.push( vscode.commands.registerCommand('jsonpreview.preview', () => {

		const view = new ViewLoader( context);	
		}
	));
}
	



export function deactivate() {}
