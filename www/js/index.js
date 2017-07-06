/*

The MIT License (MIT)

Copyright (c) Thu Aug 18 2016 Zhong Wu zhong.wu@autodesk.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORTOR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

$(document).ready( function(){
    var getToken =  () => {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", '/api/token', false);
        xhr.send(null);
        var response = JSON.parse(xhr.responseText);
        return response.access_token;
    }
    
    
    var viewerApp;


    var options = {
        env: 'AutodeskProduction',
        'getAccessToken': getToken,
        'refreshToken': getToken
    };

    var config = {
        extensions: ["Autodesk.InViewerSearch"],
        inViewerSearchConfig: {
            uiEnabled: true,
            clientId: "adsk.forge.default",
            sessionId: "F969EB70-242F-11E6-BDF4-0800200C9A66",
            loadedModelTab: {
            enabled: true,  // If false, the tab is hidden.
            displayName: 'This View',
            pageSize: 50
            },
            relatedItemsTab: {
            enabled: true,  // If false, the tab is hidden.
            displayName: 'This Item',
            pageSize: 20
            }
        }
    };  
    
    var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6emhvbmd3dWJ1Y2tldC90ZXN0bndkLm53ZA';


    Autodesk.Viewing.Initializer(options, function onInitialized() {
        viewerApp = new Autodesk.Viewing.ViewingApplication('viewer');
        viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D, config);
        viewerApp.loadDocument(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
    });

        
    function onDocumentLoadSuccess(doc) {
        var viewer = viewerApp.getCurrentViewer();
        var viewables = viewerApp.bubble.search({
        'type': 'geometry'
        });
        if (viewables.length === 0) {
        console.error('Document contains no viewables.');
        return;
        }

        // Choose any of the avialble viewables
        viewerApp.selectItem(viewables[0].data, onItemLoadSuccess, onItemLoadFail);
        viewer = viewerApp.getViewer();
    }

    function onDocumentLoadFailure(viewerErrorCode) {
        console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
    }

    function onItemLoadSuccess(viewer, item) {
        console.log('onItemLoadSuccess()!');
    }

    function onItemLoadFail(errorCode) {
        console.error('onItemLoadFail() - errorCode:' + errorCode);
    }

});