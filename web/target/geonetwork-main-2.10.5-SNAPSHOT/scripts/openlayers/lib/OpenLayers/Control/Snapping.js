OpenLayers.Control.Snapping=OpenLayers.Class(OpenLayers.Control,{EVENT_TYPES:["beforesnap","snap","unsnap"],DEFAULTS:{tolerance:10,node:true,edge:true,vertex:true},greedy:true,precedence:["node","vertex","edge"],resolution:null,geoToleranceCache:null,layer:null,feature:null,point:null,initialize:function(a){Array.prototype.push.apply(this.EVENT_TYPES,OpenLayers.Control.prototype.EVENT_TYPES);OpenLayers.Control.prototype.initialize.apply(this,[a]);this.options=a||{};if(this.options.layer){this.setLayer(this.options.layer)}var b=OpenLayers.Util.extend({},this.options.defaults);this.defaults=OpenLayers.Util.applyDefaults(b,this.DEFAULTS);this.setTargets(this.options.targets);if(this.targets.length===0&&this.layer){this.addTargetLayer(this.layer)}this.geoToleranceCache={}},setLayer:function(a){if(this.active){this.deactivate();this.layer=a;this.activate()}else{this.layer=a}},setTargets:function(b){this.targets=[];if(b&&b.length){var d;for(var c=0,a=b.length;c<a;++c){d=b[c];if(d instanceof OpenLayers.Layer.Vector){this.addTargetLayer(d)}else{this.addTarget(d)}}}},addTargetLayer:function(a){this.addTarget({layer:a})},addTarget:function(a){a=OpenLayers.Util.applyDefaults(a,this.defaults);a.nodeTolerance=a.nodeTolerance||a.tolerance;a.vertexTolerance=a.vertexTolerance||a.tolerance;a.edgeTolerance=a.edgeTolerance||a.tolerance;this.targets.push(a)},removeTargetLayer:function(b){var c;for(var a=this.targets.length-1;a>=0;--a){c=this.targets[a];if(c.layer===b){this.removeTarget(c)}}},removeTarget:function(a){return OpenLayers.Util.removeItem(this.targets,a)},activate:function(){var a=OpenLayers.Control.prototype.activate.call(this);if(a){if(this.layer&&this.layer.events){this.layer.events.on({sketchstarted:this.onSketchModified,sketchmodified:this.onSketchModified,vertexmodified:this.onVertexModified,scope:this})}}return a},deactivate:function(){var a=OpenLayers.Control.prototype.deactivate.call(this);if(a){if(this.layer&&this.layer.events){this.layer.events.un({sketchstarted:this.onSketchModified,sketchmodified:this.onSketchModified,vertexmodified:this.onVertexModified,scope:this})}}this.feature=null;this.point=null;return a},onSketchModified:function(a){this.feature=a.feature;this.considerSnapping(a.vertex,a.vertex)},onVertexModified:function(a){this.feature=a.feature;var b=this.layer.map.getLonLatFromViewPortPx(a.pixel);this.considerSnapping(a.vertex,new OpenLayers.Geometry.Point(b.lon,b.lat))},considerSnapping:function(h,d){var a={rank:Number.POSITIVE_INFINITY,dist:Number.POSITIVE_INFINITY,x:null,y:null};var c=false;var j,f;for(var b=0,e=this.targets.length;b<e;++b){f=this.targets[b];j=this.testTarget(f,d);if(j){if(this.greedy){a=j;a.target=f;c=true;break}else{if((j.rank<a.rank)||(j.rank===a.rank&&j.dist<a.dist)){a=j;a.target=f;c=true}}}}if(c){var g=this.events.triggerEvent("beforesnap",{point:h,x:a.x,y:a.y,distance:a.dist,layer:a.target.layer,snapType:this.precedence[a.rank]});if(g!==false){h.x=a.x;h.y=a.y;this.point=h;this.events.triggerEvent("snap",{point:h,snapType:this.precedence[a.rank],layer:a.target.layer,distance:a.dist})}else{c=false}}if(this.point&&!c){h.x=d.x;h.y=d.y;this.point=null;this.events.triggerEvent("unsnap",{point:h})}},testTarget:function(y,f){var w={node:this.getGeoTolerance(y.nodeTolerance),vertex:this.getGeoTolerance(y.vertexTolerance),edge:this.getGeoTolerance(y.edgeTolerance)};var g=Math.max(w.node,w.vertex,w.edge);var h={rank:Number.POSITIVE_INFINITY,dist:Number.POSITIVE_INFINITY};var e=false;var c=y.layer.features;var b,a,d,x,o,p,n;var m=this.precedence.length;var l=new OpenLayers.LonLat(f.x,f.y);for(var u=0,v=c.length;u<v;++u){b=c[u];if(b!==this.feature&&!b._sketch&&b.state!==OpenLayers.State.DELETE&&(!y.filter||y.filter.evaluate(b.attributes))){if(b.atPoint(l,g,g)){for(var t=0,q=Math.min(h.rank+1,m);t<q;++t){a=this.precedence[t];if(y[a]){if(a==="edge"){o=b.geometry.distanceTo(f,{details:true});p=o.distance;if(p<=w[a]&&p<h.dist){h={rank:t,dist:p,x:o.x0,y:o.y0};e=true;break}}else{d=b.geometry.getVertices(a==="node");n=false;for(var s=0,r=d.length;s<r;++s){x=d[s];p=x.distanceTo(f);if(p<=w[a]&&(t<h.rank||(t===h.rank&&p<h.dist))){h={rank:t,dist:p,x:x.x,y:x.y};e=true;n=true}}if(n){break}}}}}}}return e?h:null},getGeoTolerance:function(a){var b=this.layer.map.getResolution();if(b!==this.resolution){this.resolution=b;this.geoToleranceCache={}}var c=this.geoToleranceCache[a];if(c===undefined){c=a*b;this.geoToleranceCache[a]=c}return c},destroy:function(){if(this.active){this.deactivate()}delete this.layer;delete this.targets;OpenLayers.Control.prototype.destroy.call(this)},CLASS_NAME:"OpenLayers.Control.Snapping"});