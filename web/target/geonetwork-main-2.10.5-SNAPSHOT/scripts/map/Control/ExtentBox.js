if(!window.GeoNetwork){window.GeoNetwork={}}if(!GeoNetwork.Control){GeoNetwork.Control={}}GeoNetwork.Control.ExtentBox=OpenLayers.Class(OpenLayers.Control,{type:OpenLayers.Control.TYPE_TOOL,minxelement:null,minyelement:null,maxxelement:null,maxyelement:null,EVENT_TYPES:["finishBox"],initialize:function(a){this.EVENT_TYPES=GeoNetwork.Control.ExtentBox.prototype.EVENT_TYPES.concat(OpenLayers.Control.prototype.EVENT_TYPES);OpenLayers.Control.prototype.initialize.apply(this,arguments);this.handler=new OpenLayers.Handler.RegularPolygon(this,{create:this.startBox,done:this.endBox},{irregular:true})},setMap:function(a){OpenLayers.Control.prototype.setMap.apply(this,arguments)},startBox:function(){this.getOrCreateLayer();this.vectorLayer.destroyFeatures()},endBox:function(){var d=this.handler.feature.geometry.getBounds();var f=new OpenLayers.Feature.Vector(d.toGeometry(),null,this.vectorLayerStyle);this.vectorLayer.addFeatures([f]);this.vectorLayer.refresh();var e=this.map.getProjectionObject();var b=new OpenLayers.Projection("WGS84");var c=new OpenLayers.LonLat(d.left,d.bottom).transform(e,b);var a=new OpenLayers.LonLat(d.right,d.top).transform(e,b);if(this.minxelement){this.minxelement.dom.value=c.lon.toFixed(4)}if(this.maxxelement){this.maxxelement.dom.value=a.lon.toFixed(4)}if(this.minyelement){this.minyelement.dom.value=c.lat.toFixed(4)}if(this.maxyelement){this.maxyelement.dom.value=a.lat.toFixed(4)}this.events.triggerEvent("finishBox",null)},updateMap:function(){if((!this.minxelement)||(!this.maxxelement)||(!this.minyelement)||(!this.maxyelement)){return}this.getOrCreateLayer();var i=this.map.getProjectionObject();var c=new OpenLayers.Projection("WGS84");var h=new OpenLayers.LonLat(this.map.getExtent().left,this.map.getExtent().bottom).transform(i,c);var e=new OpenLayers.LonLat(this.map.getExtent().right,this.map.getExtent().top).transform(i,c);var d=parseFloat(this.minxelement.dom.value);if(isNaN(d)){this.minxelement.dom.value=h.lon}d=parseFloat(this.maxxelement.dom.value);if(isNaN(d)){this.maxxelement.dom.value=e.lon}d=parseFloat(this.minyelement.dom.value);if(isNaN(d)){this.minyelement.dom.value=h.lat}d=parseFloat(this.maxyelement.dom.value);if(isNaN(d)){this.maxyelement.dom.value=e.lat}this.minxelement.dom.value=parseFloat(this.minxelement.dom.value).toFixed(4);this.maxxelement.dom.value=parseFloat(this.maxxelement.dom.value).toFixed(4);this.minyelement.dom.value=parseFloat(this.minyelement.dom.value).toFixed(4);this.maxyelement.dom.value=parseFloat(this.maxyelement.dom.value).toFixed(4);this.vectorLayer.destroyFeatures();var a=new OpenLayers.LonLat(this.minxelement.dom.value,this.minyelement.dom.value).transform(c,i);var f=new OpenLayers.LonLat(this.maxxelement.dom.value,this.maxyelement.dom.value).transform(c,i);var b=new OpenLayers.Bounds();b.extend(a);b.extend(f);var g=new OpenLayers.Feature.Vector(b.toGeometry(),null,this.vectorLayerStyle);this.vectorLayer.addFeatures([g]);this.vectorLayer.refresh()},getOrCreateLayer:function(){if(!this.vectorLayer){this.vectorLayer=this.vectorLayer||new OpenLayers.Layer.Vector("ExtentBox",{style:this.vectorLayerStyle});this.map.addLayer(this.vectorLayer)}return this.vectorLayer},clear:function(){if(this.vectorLayer){this.vectorLayer.destroyFeatures()}},zoomTo:function(){var e=this.map.getProjectionObject();var b=new OpenLayers.Projection("WGS84");var d=new OpenLayers.LonLat(this.minxelement.dom.value,this.minyelement.dom.value).transform(b,e);var a=new OpenLayers.LonLat(this.maxxelement.dom.value,this.maxyelement.dom.value).transform(b,e);var c=new OpenLayers.Bounds();c.extend(d);c.extend(a);this.map.zoomToExtent(c)},CLASS_NAME:"GeoNetwork.Control.ExtentBox"});