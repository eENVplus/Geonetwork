OpenLayers.Control.TransformFeature=OpenLayers.Class(OpenLayers.Control,{EVENT_TYPES:["beforesetfeature","setfeature","beforetransform","transform","transformcomplete"],geometryTypes:null,layer:null,preserveAspectRatio:false,rotate:true,feature:null,renderIntent:"temporary",rotationHandleSymbolizer:null,box:null,center:null,scale:1,ratio:1,rotation:0,handles:null,rotationHandles:null,dragControl:null,initialize:function(b,a){this.EVENT_TYPES=OpenLayers.Control.TransformFeature.prototype.EVENT_TYPES.concat(OpenLayers.Control.prototype.EVENT_TYPES);OpenLayers.Control.prototype.initialize.apply(this,[a]);this.layer=b;if(!this.rotationHandleSymbolizer){this.rotationHandleSymbolizer={stroke:false,pointRadius:10,fillOpacity:0,cursor:"pointer"}}this.createBox();this.createControl()},activate:function(){var a=false;if(OpenLayers.Control.prototype.activate.apply(this,arguments)){this.dragControl.activate();this.layer.addFeatures([this.box]);this.rotate&&this.layer.addFeatures(this.rotationHandles);this.layer.addFeatures(this.handles);a=true}return a},deactivate:function(){var a=false;if(OpenLayers.Control.prototype.deactivate.apply(this,arguments)){this.layer.removeFeatures(this.handles);this.rotate&&this.layer.removeFeatures(this.rotationHandles);this.layer.removeFeatures([this.box]);this.dragControl.deactivate();a=true}return a},setMap:function(a){this.dragControl.setMap(a);OpenLayers.Control.prototype.setMap.apply(this,arguments)},setFeature:function(j,c){c=OpenLayers.Util.applyDefaults(c,{rotation:0,scale:1,ratio:1});var i={feature:j};var e=this.rotation;var a=this.center;OpenLayers.Util.extend(this,c);if(this.events.triggerEvent("beforesetfeature",i)===false){return}this.feature=j;this.activate();this._setfeature=true;var b=this.feature.geometry.getBounds();this.box.move(b.getCenterLonLat());this.box.geometry.rotate(-e,a);this._angle=0;var f;if(this.rotation){var g=j.geometry.clone();g.rotate(-this.rotation,this.center);var d=new OpenLayers.Feature.Vector(g.getBounds().toGeometry());d.geometry.rotate(this.rotation,this.center);this.box.geometry.rotate(this.rotation,this.center);this.box.move(d.geometry.getBounds().getCenterLonLat());var h=d.geometry.components[0].components[0];f=h.getBounds().getCenterLonLat()}else{f=new OpenLayers.LonLat(b.left,b.bottom)}this.handles[0].move(f);delete this._setfeature;this.events.triggerEvent("setfeature",i)},createBox:function(){var e=this;this.center=new OpenLayers.Geometry.Point(0,0);var f=new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString([new OpenLayers.Geometry.Point(-1,-1),new OpenLayers.Geometry.Point(0,-1),new OpenLayers.Geometry.Point(1,-1),new OpenLayers.Geometry.Point(1,0),new OpenLayers.Geometry.Point(1,1),new OpenLayers.Geometry.Point(0,1),new OpenLayers.Geometry.Point(-1,1),new OpenLayers.Geometry.Point(-1,0),new OpenLayers.Geometry.Point(-1,-1)]),null,typeof this.renderIntent=="string"?null:this.renderIntent);f.geometry.move=function(i,o){e._moving=true;OpenLayers.Geometry.LineString.prototype.move.apply(this,arguments);e.center.move(i,o);delete e._moving};var a=function(i,o){OpenLayers.Geometry.Point.prototype.move.apply(this,arguments);this._rotationHandle&&this._rotationHandle.geometry.move(i,o);this._handle.geometry.move(i,o)};var n=function(p,i,o){OpenLayers.Geometry.Point.prototype.resize.apply(this,arguments);this._rotationHandle&&this._rotationHandle.geometry.resize(p,i,o);this._handle.geometry.resize(p,i,o)};var l=function(o,i){OpenLayers.Geometry.Point.prototype.rotate.apply(this,arguments);this._rotationHandle&&this._rotationHandle.geometry.rotate(o,i);this._handle.geometry.rotate(o,i)};var h=function(A,w){var F=this.x,C=this.y;OpenLayers.Geometry.Point.prototype.move.call(this,A,w);if(e._moving){return}var D=e.dragControl.handlers.drag.evt;var i=!e._setfeature&&e.preserveAspectRatio;var r=!i&&!(D&&D.shiftKey);var z=new OpenLayers.Geometry.Point(F,C);var u=e.center;this.rotate(-e.rotation,u);z.rotate(-e.rotation,u);var B=this.x-u.x;var s=this.y-u.y;var E=B-(this.x-z.x);var t=s-(this.y-z.y);this.x=F;this.y=C;var p,v=1;if(r){p=Math.abs(t)<0.00001?1:s/t;v=(Math.abs(E)<0.00001?1:(B/E))/p}else{var q=Math.sqrt((E*E)+(t*t));var o=Math.sqrt((B*B)+(s*s));p=o/q}e._moving=true;e.box.geometry.rotate(-e.rotation,u);delete e._moving;e.box.geometry.resize(p,u,v);e.box.geometry.rotate(e.rotation,u);e.transformFeature({scale:p,ratio:v})};var c=function(v,t){var D=this.x,A=this.y;OpenLayers.Geometry.Point.prototype.move.call(this,v,t);if(e._moving){return}var B=e.dragControl.handlers.drag.evt;var u=(B&&B.shiftKey)?45:1;var s=e.center;var z=this.x-s.x;var q=this.y-s.y;var C=z-v;var r=q-t;this.x=D;this.y=A;var o=Math.atan2(r,C);var i=Math.atan2(q,z);var p=i-o;p*=180/Math.PI;e._angle=(e._angle+p)%360;var w=e.rotation%u;if(Math.abs(e._angle)>=u||w!==0){p=Math.round(e._angle/u)*u-w;e._angle=0;e.box.geometry.rotate(p,s);e.transformFeature({rotation:p})}};var m=new Array(8);var j=new Array(4);var k,g,b;for(var d=0;d<8;++d){k=f.geometry.components[d];g=new OpenLayers.Feature.Vector(k.clone(),null,typeof this.renderIntent=="string"?null:this.renderIntent);if(d%2==0){b=new OpenLayers.Feature.Vector(k.clone(),null,typeof this.rotationHandleSymbolizer=="string"?null:this.rotationHandleSymbolizer);b.geometry.move=c;k._rotationHandle=b;j[d/2]=b}k.move=a;k.resize=n;k.rotate=l;g.geometry.move=h;k._handle=g;m[d]=g}this.box=f;this.rotationHandles=j;this.handles=m},createControl:function(){var a=this;this.dragControl=new OpenLayers.Control.DragFeature(this.layer,{documentDrag:true,moveFeature:function(b){if(this.feature===a.feature){this.feature=a.box}OpenLayers.Control.DragFeature.prototype.moveFeature.apply(this,arguments)},onDrag:function(c,b){if(c===a.box){a.transformFeature({center:a.center});a.drawHandles()}},onStart:function(e,c){var b=!a.geometryTypes||OpenLayers.Util.indexOf(a.geometryTypes,e.geometry.CLASS_NAME)!==-1;var d=OpenLayers.Util.indexOf(a.handles,e);d+=OpenLayers.Util.indexOf(a.rotationHandles,e);if(e!==a.feature&&e!==a.box&&d==-2&&b){a.setFeature(e)}},onComplete:function(c,b){a.events.triggerEvent("transformcomplete",{feature:a.feature})}})},drawHandles:function(){var b=this.layer;for(var a=0;a<8;++a){if(this.rotate&&a%2===0){b.drawFeature(this.rotationHandles[a/2],this.rotationHandleSymbolizer)}b.drawFeature(this.handles[a],this.renderIntent)}},transformFeature:function(e){if(!this._setfeature){this.scale*=(e.scale||1);this.ratio*=(e.ratio||1);var b=this.rotation;this.rotation=(this.rotation+(e.rotation||0))%360;if(this.events.triggerEvent("beforetransform",e)!==false){var d=this.feature;var c=d.geometry;var a=this.center;c.rotate(-b,a);if(e.scale||e.ratio){c.resize(e.scale,a,e.ratio)}else{if(e.center){d.move(e.center.getBounds().getCenterLonLat())}}c.rotate(this.rotation,a);this.layer.drawFeature(d);d.toState(OpenLayers.State.UPDATE);this.events.triggerEvent("transform",e)}}this.layer.drawFeature(this.box,this.renderIntent);this.drawHandles()},destroy:function(){var b;for(var a=0;a<8;++a){b=this.box.geometry.components[a];b._handle.destroy();b._handle=null;b._rotationHandle&&b._rotationHandle.destroy();b._rotationHandle=null}this.box.destroy();this.box=null;this.layer=null;this.dragControl.destroy();OpenLayers.Control.prototype.destroy.apply(this,arguments)},CLASS_NAME:"OpenLayers.Control.TransformFeature"});