AutodeskNamespace('Viewing.ClassroomTrainning');

Viewing.ClassroomTrainning.Extension = function( viewer, option ){
    Autodesk.Viewing.Extension.call( this, viewer, option );
};


Viewing.ClassroomTrainning.Extension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
Viewing.ClassroomTrainning.Extension.prototype.constructor = Viewing.ClassroomTrainning.Extension;


Viewing.ClassroomTrainning.Extension.prototype.load  = ()=>{
    alert('My Extension is loaded');
    return true;
};

Viewing.ClassroomTrainning.Extension.prototype.unload  = ()=>{
    alert('My Extension is unloaded');
    return true;
    
};


Autodesk.Viewing.theExtensionManager.registerExtension(
    'MyExtension', Viewing.ClassroomTrainning.Extension);

