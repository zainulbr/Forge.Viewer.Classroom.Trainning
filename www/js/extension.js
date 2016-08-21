AutodeskNamespace('Viewing.ClassroomTrainning');

Viewing.ClassroomTrainning.Extension = function( viewer, option ){
    Autodesk.Viewing.Extension.call( this, viewer, option );  
    _viewer = viewer;
    _self = this;
};


Viewing.ClassroomTrainning.Extension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
Viewing.ClassroomTrainning.Extension.prototype.constructor = Viewing.ClassroomTrainning.Extension;


Viewing.ClassroomTrainning.Extension.prototype.onToolbarCreated = function(e){
    console.log('toolbar created event is called');
    _viewer.removeEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, _self.onToolbarCreated);
    _self.createMyUI();
};

Viewing.ClassroomTrainning.Extension.prototype.createMyUI = function(){
    console.log('create UI');
    // Button 1
    var button1 = new Autodesk.Viewing.UI.Button('my-view-front-button');
    button1.onClick = function(e) {
      _viewer.setViewCube('front');
    };
//    button1.addClass('my-view-front-button');
    button1.setToolTip('View front');

    // Button 2
    var button2 = new Autodesk.Viewing.UI.Button('my-view-back-button');
    button2.onClick = function(e) {
      _viewer.setViewCube('back');
    };
//    button2.addClass('my-view-back-button');
    button2.setToolTip('View Back');

    // SubToolbar
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('my-custom-view-toolbar');
    this.subToolbar.addControl(button1);
    this.subToolbar.addControl(button2);

    _viewer.toolbar.addControl(this.subToolbar);

};


Viewing.ClassroomTrainning.Extension.prototype.load  = ()=>{
    if( _viewer.toolbar){
        _self.createMyUI();
    }else{
        _viewer.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, _self.onToolbarCreated );
        console.log('Events are registered');
    }

    console.log('My extension is loaded');
    return true;
};



Viewing.ClassroomTrainning.Extension.prototype.unload  = ()=>{
    console.log('My extension is unloaded');
//    this.viewer.removeEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, _self.onToolbarCreated );
    return true;
    
};


Autodesk.Viewing.theExtensionManager.registerExtension(
    'MyExtension', Viewing.ClassroomTrainning.Extension);

