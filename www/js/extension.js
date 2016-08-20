AutodeskNamespace('Viewing.ClassroomTrainning');

Viewing.ClassroomTrainning.Extension = function( viewer, option ){
    Autodesk.Viewing.Extension.call( this, viewer, option );    
};


Viewing.ClassroomTrainning.Extension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
Viewing.ClassroomTrainning.Extension.prototype.constructor = Viewing.ClassroomTrainning.Extension;


Viewing.ClassroomTrainning.Extension.prototype.onToolbarCreated = function(e){
    console.log('toolbar created event is called');
    this.viewer.removeEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreated);
    this.createUI();
};

Viewing.ClassroomTrainning.Extension.prototype.createUI = function(){
    console.log('create UI');
};


Viewing.ClassroomTrainning.Extension.prototype.load  = ()=>{
    if( this.viewer.toolbar){
        this.createUI();
    }else{
        this.viewer.addEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreated );
    }

    console.log('My extension is loaded');
    return true;
};



Viewing.ClassroomTrainning.Extension.prototype.unload  = ()=>{
    
    this.viewer.removeEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreated );
    return true;
    
};


Autodesk.Viewing.theExtensionManager.registerExtension(
    'MyExtension', Viewing.ClassroomTrainning.Extension);

