OpenLayers.Layer.Vector=OpenLayers.Class(OpenLayers.Layer,{EVENT_TYPES:["beforefeatureadded","beforefeaturesadded","featureadded","featuresadded","beforefeatureremoved","beforefeaturesremoved","featureremoved","featuresremoved","beforefeatureselected","featureselected","featureunselected","beforefeaturemodified","featuremodified","afterfeaturemodified","vertexmodified","sketchstarted","sketchmodified","sketchcomplete","refresh"],isBaseLayer:false,isFixed:false,isVector:true,features:null,filter:null,selectedFeatures:null,unrenderedFeatures:null,reportError:true,style:null,styleMap:null,strategies:null,protocol:null,renderers:["SVG","VML","Canvas"],renderer:null,rendererOptions:null,geometryType:null,drawn:false,initialize:function(c,b){this.EVENT_TYPES=OpenLayers.Layer.Vector.prototype.EVENT_TYPES.concat(OpenLayers.Layer.prototype.EVENT_TYPES);OpenLayers.Layer.prototype.initialize.apply(this,arguments);if(!this.renderer||!this.renderer.supported()){this.assignRenderer()}if(!this.renderer||!this.renderer.supported()){this.renderer=null;this.displayError()}if(!this.styleMap){this.styleMap=new OpenLayers.StyleMap()}this.features=[];this.selectedFeatures=[];this.unrenderedFeatures={};if(this.strategies){for(var d=0,a=this.strategies.length;d<a;d++){this.strategies[d].setLayer(this)}}},destroy:function(){if(this.strategies){var c,b,a;for(b=0,a=this.strategies.length;b<a;b++){c=this.strategies[b];if(c.autoDestroy){c.destroy()}}this.strategies=null}if(this.protocol){if(this.protocol.autoDestroy){this.protocol.destroy()}this.protocol=null}this.destroyFeatures();this.features=null;this.selectedFeatures=null;this.unrenderedFeatures=null;if(this.renderer){this.renderer.destroy()}this.renderer=null;this.geometryType=null;this.drawn=null;OpenLayers.Layer.prototype.destroy.apply(this,arguments)},clone:function(e){if(e==null){e=new OpenLayers.Layer.Vector(this.name,this.getOptions())}e=OpenLayers.Layer.prototype.clone.apply(this,[e]);var c=this.features;var a=c.length;var d=new Array(a);for(var b=0;b<a;++b){d[b]=c[b].clone()}e.features=d;return e},refresh:function(a){if(this.calculateInRange()&&this.visibility){this.events.triggerEvent("refresh",a)}},assignRenderer:function(){for(var c=0,a=this.renderers.length;c<a;c++){var b=this.renderers[c];var d=(typeof b=="function")?b:OpenLayers.Renderer[b];if(d&&d.prototype.supported()){this.renderer=new d(this.div,this.rendererOptions);break}}},displayError:function(){if(this.reportError){OpenLayers.Console.userError(OpenLayers.i18n("browserNotSupported",{renderers:this.renderers.join("\n")}))}},setMap:function(a){OpenLayers.Layer.prototype.setMap.apply(this,arguments);if(!this.renderer){this.map.removeLayer(this)}else{this.renderer.map=this.map;this.renderer.setSize(this.map.getSize())}},afterAdd:function(){if(this.strategies){var c,b,a;for(b=0,a=this.strategies.length;b<a;b++){c=this.strategies[b];if(c.autoActivate){c.activate()}}}},removeMap:function(c){this.drawn=false;if(this.strategies){var d,b,a;for(b=0,a=this.strategies.length;b<a;b++){d=this.strategies[b];if(d.autoActivate){d.deactivate()}}}},onMapResize:function(){OpenLayers.Layer.prototype.onMapResize.apply(this,arguments);this.renderer.setSize(this.map.getSize())},moveTo:function(g,b,h){OpenLayers.Layer.prototype.moveTo.apply(this,arguments);var e=true;if(!h){this.renderer.root.style.visibility="hidden";this.div.style.left=-parseInt(this.map.layerContainerDiv.style.left)+"px";this.div.style.top=-parseInt(this.map.layerContainerDiv.style.top)+"px";var f=this.map.getExtent();e=this.renderer.setExtent(f,b);this.renderer.root.style.visibility="visible";if(navigator.userAgent.toLowerCase().indexOf("gecko")!=-1){this.div.scrollLeft=this.div.scrollLeft}if(!b&&e){for(var d in this.unrenderedFeatures){var c=this.unrenderedFeatures[d];this.drawFeature(c)}}}if(!this.drawn||b||!e){this.drawn=true;var c;for(var d=0,a=this.features.length;d<a;d++){this.renderer.locked=(d!==(a-1));c=this.features[d];this.drawFeature(c)}}},display:function(a){OpenLayers.Layer.prototype.display.apply(this,arguments);var b=this.div.style.display;if(b!=this.renderer.root.style.display){this.renderer.root.style.display=b}},addFeatures:function(b,k){if(!(b instanceof Array)){b=[b]}var h=!k||!k.silent;if(h){var a={features:b};var g=this.events.triggerEvent("beforefeaturesadded",a);if(g===false){return}b=a.features}var d=[];for(var c=0,f=b.length;c<f;c++){if(c!=(b.length-1)){this.renderer.locked=true}else{this.renderer.locked=false}var j=b[c];if(this.geometryType&&!(j.geometry instanceof this.geometryType)){var e=OpenLayers.i18n("componentShouldBe",{geomType:this.geometryType.prototype.CLASS_NAME});throw e}j.layer=this;if(!j.style&&this.style){j.style=OpenLayers.Util.extend({},this.style)}if(h){if(this.events.triggerEvent("beforefeatureadded",{feature:j})===false){continue}this.preFeatureInsert(j)}d.push(j);this.features.push(j);this.drawFeature(j);if(h){this.events.triggerEvent("featureadded",{feature:j});this.onFeatureInsert(j)}}if(h){this.events.triggerEvent("featuresadded",{features:d})}},removeFeatures:function(e,a){if(!e||e.length===0){return}if(e===this.features){return this.removeAllFeatures(a)}if(!(e instanceof Array)){e=[e]}if(e===this.selectedFeatures){e=e.slice()}var d=!a||!a.silent;if(d){this.events.triggerEvent("beforefeaturesremoved",{features:e})}for(var c=e.length-1;c>=0;c--){if(c!=0&&e[c-1].geometry){this.renderer.locked=true}else{this.renderer.locked=false}var b=e[c];delete this.unrenderedFeatures[b.id];if(d){this.events.triggerEvent("beforefeatureremoved",{feature:b})}this.features=OpenLayers.Util.removeItem(this.features,b);b.layer=null;if(b.geometry){this.renderer.eraseFeatures(b)}if(OpenLayers.Util.indexOf(this.selectedFeatures,b)!=-1){OpenLayers.Util.removeItem(this.selectedFeatures,b)}if(d){this.events.triggerEvent("featureremoved",{feature:b})}}if(d){this.events.triggerEvent("featuresremoved",{features:e})}},removeAllFeatures:function(a){var d=!a||!a.silent;var e=this.features;if(d){this.events.triggerEvent("beforefeaturesremoved",{features:e})}var c;for(var b=e.length-1;b>=0;b--){c=e[b];if(d){this.events.triggerEvent("beforefeatureremoved",{feature:c})}c.layer=null;if(d){this.events.triggerEvent("featureremoved",{feature:c})}}this.renderer.clear();this.features=[];this.unrenderedFeatures={};this.selectedFeatures=[];if(d){this.events.triggerEvent("featuresremoved",{features:e})}},destroyFeatures:function(d,a){var c=(d==undefined);if(c){d=this.features}if(d){this.removeFeatures(d,a);for(var b=d.length-1;b>=0;b--){d[b].destroy()}}},drawFeature:function(a,b){if(!this.drawn){return}if(typeof b!="object"){if(!b&&a.state===OpenLayers.State.DELETE){b="delete"}var c=b||a.renderIntent;b=a.style||this.style;if(!b){b=this.styleMap.createSymbolizer(a,c)}}if(!this.renderer.drawFeature(a,b)){this.unrenderedFeatures[a.id]=a}else{delete this.unrenderedFeatures[a.id]}},eraseFeatures:function(a){this.renderer.eraseFeatures(a)},getFeatureFromEvent:function(a){if(!this.renderer){OpenLayers.Console.error(OpenLayers.i18n("getFeatureError"));return null}var b=this.renderer.getFeatureIdFromEvent(a);return this.getFeatureById(b)},getFeatureBy:function(e,d){var c=null;for(var b=0,a=this.features.length;b<a;++b){if(this.features[b][e]==d){c=this.features[b];break}}return c},getFeatureById:function(a){return this.getFeatureBy("id",a)},getFeatureByFid:function(a){return this.getFeatureBy("fid",a)},onFeatureInsert:function(a){},preFeatureInsert:function(a){},getDataExtent:function(){var b=null;var d=this.features;if(d&&(d.length>0)){b=new OpenLayers.Bounds();var e=null;for(var c=0,a=d.length;c<a;c++){e=d[c].geometry;if(e){b.extend(e.getBounds())}}}return b},CLASS_NAME:"OpenLayers.Layer.Vector"});