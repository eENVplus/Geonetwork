OpenLayers.Control.Split=OpenLayers.Class(OpenLayers.Control,{EVENT_TYPES:["beforesplit","split","aftersplit"],layer:null,source:null,sourceOptions:null,tolerance:null,edge:true,deferDelete:false,mutual:true,targetFilter:null,sourceFilter:null,handler:null,initialize:function(a){Array.prototype.push.apply(this.EVENT_TYPES,OpenLayers.Control.prototype.EVENT_TYPES);OpenLayers.Control.prototype.initialize.apply(this,[a]);this.options=a||{};if(this.options.source){this.setSource(this.options.source)}},setSource:function(a){if(this.active){this.deactivate();if(this.handler){this.handler.destroy();delete this.handler}this.source=a;this.activate()}else{this.source=a}},activate:function(){var a=OpenLayers.Control.prototype.activate.call(this);if(a){if(!this.source){if(!this.handler){this.handler=new OpenLayers.Handler.Path(this,{done:function(b){this.onSketchComplete({feature:new OpenLayers.Feature.Vector(b)})}},{layerOptions:this.sourceOptions})}this.handler.activate()}else{if(this.source.events){this.source.events.on({sketchcomplete:this.onSketchComplete,afterfeaturemodified:this.afterFeatureModified,scope:this})}}}return a},deactivate:function(){var a=OpenLayers.Control.prototype.deactivate.call(this);if(a){if(this.source&&this.source.events){this.layer.events.un({sketchcomplete:this.onSketchComplete,afterfeaturemodified:this.afterFeatureModified,scope:this})}}return a},onSketchComplete:function(a){this.feature=null;return !this.considerSplit(a.feature)},afterFeatureModified:function(b){if(b.modified){var a=b.feature;if(a.geometry instanceof OpenLayers.Geometry.LineString||a.geometry instanceof OpenLayers.Geometry.MultiLineString){this.feature=b.feature;this.considerSplit(b.feature)}}},removeByGeometry:function(c,d){for(var b=0,a=c.length;b<a;++b){if(c[b].geometry===d){c.splice(b,1);break}}},isEligible:function(a){return(a.state!==OpenLayers.State.DELETE)&&(a.geometry instanceof OpenLayers.Geometry.LineString||a.geometry instanceof OpenLayers.Geometry.MultiLineString)&&(this.feature!==a)&&(!this.targetFilter||this.targetFilter.evaluate(a.attributes))},considerSplit:function(c){var h=false;var f=false;if(!this.sourceFilter||this.sourceFilter.evaluate(c.attributes)){var g=this.layer&&this.layer.features||[];var y,p,a;var m=[],x=[];var d=(this.layer===this.source)&&this.mutual;var b={edge:this.edge,tolerance:this.tolerance,mutual:d};var l=[c.geometry];var o,e;var r,q;for(var v=0,w=g.length;v<w;++v){o=g[v];if(this.isEligible(o)){e=[o.geometry];for(var u=0;u<l.length;++u){r=l[u];for(var s=0;s<e.length;++s){y=e[s];if(r.getBounds().intersectsBounds(y.getBounds())){p=r.split(y,b);if(p){a=this.events.triggerEvent("beforesplit",{source:c,target:o});if(a!==false){if(d){q=p[0];if(q.length>1){q.unshift(u,1);Array.prototype.splice.apply(l,q);u+=q.length-3}p=p[1]}if(p.length>1){p.unshift(s,1);Array.prototype.splice.apply(e,p);s+=p.length-3}}}}}}if(e&&e.length>1){this.geomsToFeatures(o,e);this.events.triggerEvent("split",{original:o,features:e});Array.prototype.push.apply(m,e);x.push(o);f=true}}}if(l&&l.length>1){this.geomsToFeatures(c,l);this.events.triggerEvent("split",{original:c,features:l});Array.prototype.push.apply(m,l);x.push(c);h=true}if(h||f){if(this.deferDelete){var n,t=[];for(var v=0,w=x.length;v<w;++v){n=x[v];if(n.state===OpenLayers.State.INSERT){t.push(n)}else{n.state=OpenLayers.State.DELETE;this.layer.drawFeature(n)}}this.layer.destroyFeatures(t,{silent:true});for(var v=0,w=m.length;v<w;++v){m[v].state=OpenLayers.State.INSERT}}else{this.layer.destroyFeatures(x,{silent:true})}this.layer.addFeatures(m,{silent:true});this.events.triggerEvent("aftersplit",{source:c,features:m})}}return h},geomsToFeatures:function(c,d){var f=c.clone();delete f.geometry;var e;for(var b=0,a=d.length;b<a;++b){e=f.clone();e.geometry=d[b];e.state=OpenLayers.State.INSERT;d[b]=e}},destroy:function(){if(this.active){this.deactivate()}OpenLayers.Control.prototype.destroy.call(this)},CLASS_NAME:"OpenLayers.Control.Split"});