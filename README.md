<<<<<<< HEAD
# Forge Viewer Classroom Trainning
Step 1: Very basic viewer
[![LMV](https://img.shields.io/badge/Viewer-v1.2.23-green.svg)](https://developer.autodesk.com/api/view-and-data-api/)

This the the minimal JavaScript needed to get a <b>Viewer</b> running, in only has about 30 lines of code including 
HTML!

## Setup
- Get your token, upload a file and get the urn.
- Replace the token and urn with your own.
- Open the index.html in web browser.
=======
# Forge Viewer Classroom Trainning 
Step 4: With Extension
[![LMV](https://img.shields.io/badge/Viewer-v1.2.23-green.svg)](https://developer.autodesk.com/api/view-and-data-api/)

Based on step 4, we add and load an extension from Forge Viewer. 

## Setup
- Register an app, upload a file and get the urn.
- Replace the client_id, client_secret in credentials_.js, and also urn in index.js with your own.
- Run "Node server.js" in command line to start the website
- Go to localhost:3000 with your browser!
- When the viewer is loaded, you can see the message both from console and message box. Try to load
  and unload it manuly with loadExtension and unloadExtension methods to see the result.
>>>>>>> with-extension

Afterwards, you should see your model displayed in your browser:
![](./screenshot.png)

## Written By
Zhong Wu (Forge Partner Development)
