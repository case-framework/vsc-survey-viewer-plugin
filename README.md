# jsonpreview README

# First step when you download the  Extention
1: Run "npm install" cmd to install all the dependencies.
2: Run "npm run compile" cmd in terminal so that webpack can compile the react app into surveyViewer folder as surveyViewer.js file.

# For testing the extension
1: Open the extension.ts file.
2: Press "fn+f5" keys and a new vscode window will open where you can test the extension on a json file.
3: Open the json file which you want to test.
4: Press "cmd+shift+p" and Type "Survey Preview" and you will fimd the command in the suggestion with the category of "Survey Viewer".
5: Press Enter and if the json file is not opened then it will aske you to select the json file to test.

# For automation of the compiling of the react app
Run "npm run watch" cmd and when you will change anything in the app folder then it will automaticallly compile the new js file in the surveyViewer Folder.

# Features (till now)
1: You can preview the survey in the new tab.
2: Can detect the change in the json file and roload the opened preview(Working on reload part).
