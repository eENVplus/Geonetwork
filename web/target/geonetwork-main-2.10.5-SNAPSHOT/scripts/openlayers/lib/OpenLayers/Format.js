OpenLayers.Format=OpenLayers.Class({options:null,externalProjection:null,internalProjection:null,data:null,keepData:false,initialize:function(a){OpenLayers.Util.extend(this,a);this.options=a},destroy:function(){},read:function(a){OpenLayers.Console.userError(OpenLayers.i18n("readNotImplemented"))},write:function(a){OpenLayers.Console.userError(OpenLayers.i18n("writeNotImplemented"))},CLASS_NAME:"OpenLayers.Format"});