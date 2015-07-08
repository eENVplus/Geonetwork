OpenLayers.Tile.WFS=OpenLayers.Class(OpenLayers.Tile,{features:null,url:null,request:null,initialize:function(d,a,e,b,c){OpenLayers.Tile.prototype.initialize.apply(this,arguments);this.url=b;this.features=[]},destroy:function(){OpenLayers.Tile.prototype.destroy.apply(this,arguments);this.destroyAllFeatures();this.features=null;this.url=null;if(this.request){this.request.abort();this.request=null}},clear:function(){this.destroyAllFeatures()},draw:function(){if(OpenLayers.Tile.prototype.draw.apply(this,arguments)){if(this.isLoading){this.events.triggerEvent("reload")}else{this.isLoading=true;this.events.triggerEvent("loadstart")}this.loadFeaturesForRegion(this.requestSuccess)}},loadFeaturesForRegion:function(b,a){if(this.request){this.request.abort()}this.request=OpenLayers.Request.GET({url:this.url,success:b,failure:a,scope:this})},requestSuccess:function(b){if(this.features){var d=b.responseXML;if(!d||!d.documentElement){d=b.responseText}if(this.layer.vectorMode){this.layer.addFeatures(this.layer.formatObject.read(d))}else{var a=new OpenLayers.Format.XML();if(typeof d=="string"){d=a.read(d)}var c=a.getElementsByTagNameNS(d,"http://www.opengis.net/gml","featureMember");this.addResults(c)}}if(this.events){this.events.triggerEvent("loadend")}this.request=null},addResults:function(c){for(var b=0;b<c.length;b++){var a=new this.layer.featureClass(this.layer,c[b]);this.features.push(a)}},destroyAllFeatures:function(){while(this.features.length>0){var a=this.features.shift();a.destroy()}},CLASS_NAME:"OpenLayers.Tile.WFS"});