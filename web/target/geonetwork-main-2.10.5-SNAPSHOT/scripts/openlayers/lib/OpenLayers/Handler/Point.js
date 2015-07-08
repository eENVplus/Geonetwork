OpenLayers.Handler.Point=OpenLayers.Class(OpenLayers.Handler,{point:null,layer:null,multi:false,drawing:false,mouseDown:false,lastDown:null,lastUp:null,persist:false,layerOptions:null,initialize:function(c,b,a){if(!(a&&a.layerOptions&&a.layerOptions.styleMap)){this.style=OpenLayers.Util.extend(OpenLayers.Feature.Vector.style["default"],{})}OpenLayers.Handler.prototype.initialize.apply(this,arguments)},activate:function(){if(!OpenLayers.Handler.prototype.activate.apply(this,arguments)){return false}var a=OpenLayers.Util.extend({displayInLayerSwitcher:false,calculateInRange:OpenLayers.Function.True},this.layerOptions);this.layer=new OpenLayers.Layer.Vector(this.CLASS_NAME,a);this.map.addLayer(this.layer);return true},createFeature:function(a){var b=this.map.getLonLatFromPixel(a);this.point=new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(b.lon,b.lat));this.callback("create",[this.point.geometry,this.point]);this.point.geometry.clearBounds();this.layer.addFeatures([this.point],{silent:true})},deactivate:function(){if(!OpenLayers.Handler.prototype.deactivate.apply(this,arguments)){return false}if(this.drawing){this.cancel()}this.destroyFeature();if(this.layer.map!=null){this.layer.destroy(false)}this.layer=null;return true},destroyFeature:function(){if(this.layer){this.layer.destroyFeatures()}this.point=null},finalize:function(b){var a=b?"cancel":"done";this.drawing=false;this.mouseDown=false;this.lastDown=null;this.lastUp=null;this.callback(a,[this.geometryClone()]);if(b||!this.persist){this.destroyFeature()}},cancel:function(){this.finalize(true)},click:function(a){OpenLayers.Event.stop(a);return false},dblclick:function(a){OpenLayers.Event.stop(a);return false},modifyFeature:function(a){var b=this.map.getLonLatFromPixel(a);this.point.geometry.x=b.lon;this.point.geometry.y=b.lat;this.callback("modify",[this.point.geometry,this.point]);this.point.geometry.clearBounds();this.drawFeature()},drawFeature:function(){this.layer.drawFeature(this.point,this.style)},getGeometry:function(){var a=this.point&&this.point.geometry;if(a&&this.multi){a=new OpenLayers.Geometry.MultiPoint([a])}return a},geometryClone:function(){var a=this.getGeometry();return a&&a.clone()},mousedown:function(a){if(!this.checkModifiers(a)){return true}if(this.lastDown&&this.lastDown.equals(a.xy)){return true}this.drawing=true;if(this.lastDown==null){if(this.persist){this.destroyFeature()}this.createFeature(a.xy)}else{this.modifyFeature(a.xy)}this.lastDown=a.xy;return false},mousemove:function(a){if(this.drawing){this.modifyFeature(a.xy)}return true},mouseup:function(a){if(this.drawing){this.finalize();return false}else{return true}},CLASS_NAME:"OpenLayers.Handler.Point"});