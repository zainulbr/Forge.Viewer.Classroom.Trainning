var recursivePrintChildNode = function(instanceTree, node) {
    instanceTree.enumNodeChildren(node.dbId, function(childId) {
        node.children = node.children || [];

        let childNode = {
            dbId: childId,
            name: instanceTree.getNodeName(childId)
        };

        node.children.push(childNode);
        console.log(childNode);

        recursivePrintChildNode(instanceTree, childNode);
    });
};

class MyExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, option) {
        super(viewer, option);
        this._viewer = viewer;
        console.log(this._viewer);
    };

    onGeometryLoaded() {
        var instanceTree = this.model.getData().instanceTree;
        console.log("print the instance tree of this model.");
        let rootNode = {
            dbId: instanceTree.nodeAccess.rootId,
            name: instanceTree.getNodeName(instanceTree.nodeAccess.rootId)
        };
        console.log(rootNode);
        recursivePrintChildNode(instanceTree, rootNode);

    };


    onSelectionChanged(event) {
        let currentNodeIds = event.dbIdArray;
        let currentModel = event.model;
        if (currentModel) {
            currentNodeIds.forEach(function(nodeId) {
                currentModel.getProperties(nodeId, function(result) {
                    console.log("List properties of DbId:" + nodeId);
                    if (result.properties) {
                        result.properties.forEach(function(prop) {
                            console.log(prop);
                        });
                    };
                });
            })
        };
    };


    load() {
        console.log("My Extension is loaded");
        this._viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, this.onGeometryLoaded);
        this._viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.onSelectionChanged);
        return true;
    };

    unload() {
        alert('My Extension is unloaded');
        this._viewer.removeEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, this.onGeometryLoaded);
        this._viewer.removeEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.onSelectionChanged);
        return true;
    };
}

Autodesk.Viewing.theExtensionManager.registerExtension(
    'MyExtension', MyExtension);



