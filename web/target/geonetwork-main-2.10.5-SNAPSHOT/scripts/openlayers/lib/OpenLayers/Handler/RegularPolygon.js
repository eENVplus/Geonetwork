OpenLayers.Handler.RegularPolygon=OpenLayers.Class(OpenLayers.Handler.Drag,{sides:4,radius:null,snapAngle:null,snapToggle:"shiftKey",layerOptions:null,persist:false,irregular:false,angle:null,fixedRadius:false,feature:null,layer:null,origin:null,initialize:function(c,b,a){if(!(a&&a.layerOptions&&a.layerOptions.styleMap)){this.style=OpenLayers.Util.extend(OpenLayers.Feature.Vector.style["default"],{})}OpenLayers.Handler.prototype.initialize.apply(this,[c,b,a]);this.options=(a)?a:{}},setOptions:function(a){OpenLayers.Util.extend(this.options,a);OpenLayers.Util.extend(this,a)},activate:function(){var a=false;if(OpenLayers.Handler.prototype.activate.apply(this,arguments)){var b=OpenLayers.Util.extend({displayInLayerSwitcher:false,calculateInRange:OpenLayers.Function.True},this.layerOptions);this.layer=new OpenLayers.Layer.Vector(this.CLASS_NAME,b);this.map.addLayer(this.layer);a=true}return a},deactivate:function(){var a=false;if(OpenLayers.Handler.Drag.prototype.deactivate.apply(this,arguments)){if(this.dragging){this.cancel()}if(this.layer.map!=null){this.layer.destroy(false);if(this.feature){this.feature.destroy()}}this.layer=null;this.feature=null;a=true}return a},down:function(a){this.fixedRadius=!!(this.radius);var b=this.map.getLonLatFromPixel(a.xy);this.origin=new OpenLayers.Geometry.Point(b.lon,b.lat);if(!this.fixedRadius||this.irregular){this.radius=this.map.getResolution()}if(this.persist){this.clear()}this.feature=new OpenLayers.Feature.Vector();this.createGeometry();this.callback("create",[this.origin,this.feature]);this.layer.addFeatures([this.feature],{silent:true});this.layer.drawFeature(this.feature,this.style)},move:function(c){var f=this.map.getLonLatFromPixel(c.xy);var a=new OpenLayers.Geometry.Point(f.lon,f.lat);if(this.irregular){var g=Math.sqrt(2)*Math.abs(a.y-this.origin.y)/2;this.radius=Math.max(this.map.getResolution()/2,g)}else{if(this.fixedRadius){this.origin=a}else{this.calculateAngle(a,c);this.radius=Math.max(this.map.getResolution()/2,a.distanceTo(this.origin))}}this.modifyGeometry();if(this.irregular){var d=a.x-this.origin.x;var b=a.y-this.origin.y;var e;if(b==0){e=d/(this.radius*Math.sqrt(2))}else{e=d/b}this.feature.geometry.resize(1,this.origin,e);this.feature.geometry.move(d/2,b/2)}this.layer.drawFeature(this.feature,this.style)},up:function(a){this.finalize();if(this.start==this.last){this.callback("done",[a.xy])}},out:function(a){this.finalize()},createGeometry:function(){this.angle=Math.PI*((1/this.sides)-(1/2));if(this.snapAngle){this.angle+=this.snapAngle*(Math.PI/180)}this.feature.geometry=OpenLayers.Geometry.Polygon.createRegularPolygon(this.origin,this.radius,this.sides,this.snapAngle)},modifyGeometry:function(){var d,a;var b=this.feature.geometry.components[0];if(b.components.length!=(this.sides+1)){this.createGeometry();b=this.feature.geometry.components[0]}for(var c=0;c<this.sides;++c){a=b.components[c];d=this.angle+(c*2*Math.PI/this.sides);a.x=this.origin.x+(this.radius*Math.cos(d));a.y=this.origin.y+(this.radius*Math.sin(d));a.clearBounds()}},calculateAngle:function(a,b){var d=Math.atan2(a.y-this.origin.y,a.x-this.origin.x);if(this.snapAngle&&(this.snapToggle&&!b[this.snapToggle])){var c=(Math.PI/180)*this.snapAngle;this.angle=Math.round(d/c)*c}else{this.angle=d}},cancel:function(){this.callback("cancel",null);this.finalize()},finalize:function(){this.origin=null;this.radius=this.options.radius},clear:function(){if(this.layer){this.layer.renderer.clear();this.layer.destroyFeatures()}},callback:function(b,a){if(this.callbacks[b]){this.callbacks[b].apply(this.control,[this.feature.geometry.clone()])}if(!this.persist&&(b=="done"||b=="cancel")){this.clear()}},CLASS_NAME:"OpenLayers.Handler.RegularPolygon"});