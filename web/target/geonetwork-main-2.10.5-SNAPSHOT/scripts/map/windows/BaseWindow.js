Ext.namespace("GeoNetwork");GeoNetwork.BaseWindow=function(a){Ext.apply(this,a);GeoNetwork.BaseWindow.superclass.constructor.call(this)};Ext.extend(GeoNetwork.BaseWindow,Ext.Window,{map:null,initComponent:function(){GeoNetwork.BaseWindow.superclass.initComponent.call(this);this.constrainHeader=true;this.collapsible=true;this.layout="fit";this.plain=true;this.stateful=false}});