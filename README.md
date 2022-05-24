# Survey Viewer README

# First step when you download the  Extention
1: Run "npm install" cmd to install all the dependencies.\
2: Run "npm run compile" cmd in terminal so that webpack can compile the react app into surveyViewer folder as surveyViewer.js file.

# For testing the extension
1: Open the extension.ts file.\
2: Press "fn+f5" keys and a new vscode window will open where you can test the extension on a json file.\
3: Open the json file which you want to test.\
4: Press "cmd+shift+p" and Type "Survey Preview" and you will find the command in the suggestion with the category of "Survey Viewer".


# After You update something in the code
 First the steps mentioned the "For testing the extension" should be done once and then you will find the "Run Extension" in the side bar of the vscode. When ever you change something in the code and save it, the building will start automatically and you can click the "Run Extension" from the side bar to see the output.


# Features (till now)
1: User can preview the survey from the "Select File To Preview" dropdown. I will show the different surveys with different study from the output directory of the tekenradar-studies project.\
2:  User can upload the saved prefill(The user can save the prefill clicking on the submit button when finished filling the survey) for the survey by clicking on the "Upload Prefill" button.\
3: User can update the configuration of the survey by clicking on the "Change Config" dropdown. The dropdown has two options , either user can create a new config file or can select the already created config files.\
4: User has option to show the keys of the survey by selecting the "Sjow Kays" checkbox.
5: This extension also detects the change in the selected survey file and selected config file and reloads the survey when the change is found.

# Creating Vsix File
1: Install "Visual Studio Code Extensions" with command 'npm install -g vsce'.\
2: run 'vsce package' command to package the extension.
