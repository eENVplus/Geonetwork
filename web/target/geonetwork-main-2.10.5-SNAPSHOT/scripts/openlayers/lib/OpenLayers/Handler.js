OpenLayers.Handler=OpenLayers.Class({id:null,control:null,map:null,keyMask:null,active:false,evt:null,initialize:function(d,b,a){OpenLayers.Util.extend(this,a);this.control=d;this.callbacks=b;var c=this.map||d.map;if(c){this.setMap(c)}this.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME+"_")},setMap:function(a){this.map=a},checkModifiers:function(a){if(this.keyMask==null){return true}var b=(a.shiftKey?OpenLayers.Handler.MOD_SHIFT:0)|(a.ctrlKey?OpenLayers.Handler.MOD_CTRL:0)|(a.altKey?OpenLayers.Handler.MOD_ALT:0);return(b==this.keyMask)},activate:function(){if(this.active){return false}var c=OpenLayers.Events.prototype.BROWSER_EVENTS;for(var b=0,a=c.length;b<a;b++){if(this[c[b]]){this.register(c[b],this[c[b]])}}this.active=true;return true},deactivate:function(){if(!this.active){return false}var c=OpenLayers.Events.prototype.BROWSER_EVENTS;for(var b=0,a=c.length;b<a;b++){if(this[c[b]]){this.unregister(c[b],this[c[b]])}}this.active=false;return true},callback:function(b,a){if(b&&this.callbacks[b]){this.callbacks[b].apply(this.control,a)}},register:function(a,b){this.map.events.registerPriority(a,this,b);this.map.events.registerPriority(a,this,this.setEvent)},unregister:function(a,b){this.map.events.unregister(a,this,b);this.map.events.unregister(a,this,this.setEvent)},setEvent:function(a){this.evt=a;return true},destroy:function(){this.deactivate();this.control=this.map=null},CLASS_NAME:"OpenLayers.Handler"});OpenLayers.Handler.MOD_NONE=0;OpenLayers.Handler.MOD_SHIFT=1;OpenLayers.Handler.MOD_CTRL=2;OpenLayers.Handler.MOD_ALT=4;