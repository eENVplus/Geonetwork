Ext.namespace("GeoNetwork");GeoNetwork.DisclaimerWindow=function(a){Ext.apply(this,a);GeoNetwork.DisclaimerWindow.superclass.constructor.call(this)};Ext.extend(GeoNetwork.DisclaimerWindow,Ext.Window,{disclaimer:null,initComponent:function(){GeoNetwork.BaseWindow.superclass.initComponent.call(this);this.id="disclaimerwindow";this.constrainHeader=true;this.layout="fit";this.plain=true;this.stateful=false;this.title=OpenLayers.i18n("disclaimer.windowTitle");this.minWidth=440;this.minHeight=280;this.width=440;this.height=280;this.autoScroll=true;this.modal=true;this.addButton(OpenLayers.i18n("disclaimer.buttonClose"),function(){this.close()},this);if(this.disclaimer.startsWith("http://")){this.on("show",this.showDisclaimerUrl)}else{var a=new Ext.form.TextArea({hideLabel:true,name:"msg",value:this.disclaimer,anchor:"100% -53",enableKeyEvents:true,listeners:{keydown:function(c,b){if(!(b.getKey()==67&&b.ctrlKey)){b.stopEvent()}}}});this.add(a)}this.doLayout()},showDisclaimerUrl:function(){this.load({url:OpenLayers.ProxyHost+this.disclaimer,text:OpenLayers.i18n("disclaimer.loading"),timeout:30,scripts:false})}});