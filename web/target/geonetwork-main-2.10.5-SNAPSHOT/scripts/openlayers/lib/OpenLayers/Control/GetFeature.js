OpenLayers.Control.GetFeature=OpenLayers.Class(OpenLayers.Control,{protocol:null,multipleKey:null,toggleKey:null,modifiers:null,multiple:false,click:true,single:true,clickout:true,toggle:false,clickTolerance:5,hover:false,box:false,maxFeatures:10,features:null,hoverFeature:null,handlerOptions:null,handlers:null,hoverResponse:null,filterType:OpenLayers.Filter.Spatial.BBOX,EVENT_TYPES:["featureselected","featuresselected","featureunselected","clickout","beforefeatureselected","beforefeaturesselected","hoverfeature","outfeature"],initialize:function(a){this.EVENT_TYPES=OpenLayers.Control.GetFeature.prototype.EVENT_TYPES.concat(OpenLayers.Control.prototype.EVENT_TYPES);a.handlerOptions=a.handlerOptions||{};OpenLayers.Control.prototype.initialize.apply(this,[a]);this.features={};this.handlers={};if(this.click){this.handlers.click=new OpenLayers.Handler.Click(this,{click:this.selectClick},this.handlerOptions.click||{})}if(this.box){this.handlers.box=new OpenLayers.Handler.Box(this,{done:this.selectBox},OpenLayers.Util.extend(this.handlerOptions.box,{boxDivClassName:"olHandlerBoxSelectFeature"}))}if(this.hover){this.handlers.hover=new OpenLayers.Handler.Hover(this,{move:this.cancelHover,pause:this.selectHover},OpenLayers.Util.extend(this.handlerOptions.hover,{delay:250}))}},activate:function(){if(!this.active){for(var a in this.handlers){this.handlers[a].activate()}}return OpenLayers.Control.prototype.activate.apply(this,arguments)},deactivate:function(){if(this.active){for(var a in this.handlers){this.handlers[a].deactivate()}}return OpenLayers.Control.prototype.deactivate.apply(this,arguments)},selectClick:function(a){var b=this.pixelToBounds(a.xy);this.setModifiers(a);this.request(b,{single:this.single})},selectBox:function(a){var c;if(a instanceof OpenLayers.Bounds){var d=this.map.getLonLatFromPixel(new OpenLayers.Pixel(a.left,a.bottom));var b=this.map.getLonLatFromPixel(new OpenLayers.Pixel(a.right,a.top));c=new OpenLayers.Bounds(d.lon,d.lat,b.lon,b.lat)}else{if(this.click){return}c=this.pixelToBounds(a)}this.setModifiers(this.handlers.box.dragHandler.evt);this.request(c)},selectHover:function(a){var b=this.pixelToBounds(a.xy);this.request(b,{single:true,hover:true})},cancelHover:function(){if(this.hoverResponse){this.protocol.abort(this.hoverResponse);this.hoverResponse=null;OpenLayers.Element.removeClass(this.map.viewPortDiv,"olCursorWait")}},request:function(d,b){b=b||{};var c=new OpenLayers.Filter.Spatial({type:this.filterType,value:d});OpenLayers.Element.addClass(this.map.viewPortDiv,"olCursorWait");var a=this.protocol.read({maxFeatures:b.single==true?this.maxFeatures:undefined,filter:c,callback:function(e){if(e.success()){if(e.features.length){if(b.single==true){this.selectBestFeature(e.features,d.getCenterLonLat(),b)}else{this.select(e.features)}}else{if(b.hover){this.hoverSelect()}else{this.events.triggerEvent("clickout");if(this.clickout){this.unselectAll()}}}}OpenLayers.Element.removeClass(this.map.viewPortDiv,"olCursorWait")},scope:this});if(b.hover==true){this.hoverResponse=a}},selectBestFeature:function(b,a,j){j=j||{};if(b.length){var g=new OpenLayers.Geometry.Point(a.lon,a.lat);var h,d,e;var f=Number.MAX_VALUE;for(var c=0;c<b.length;++c){h=b[c];if(h.geometry){e=g.distanceTo(h.geometry,{edge:false});if(e<f){f=e;d=h;if(f==0){break}}}}if(j.hover==true){this.hoverSelect(d)}else{this.select(d||b)}}},setModifiers:function(a){this.modifiers={multiple:this.multiple||(this.multipleKey&&a[this.multipleKey]),toggle:this.toggle||(this.toggleKey&&a[this.toggleKey])}},select:function(e){if(!this.modifiers.multiple&&!this.modifiers.toggle){this.unselectAll()}if(!(e instanceof Array)){e=[e]}var b=this.events.triggerEvent("beforefeaturesselected",{features:e});if(b!==false){var f=[];var d;for(var c=0,a=e.length;c<a;++c){d=e[c];if(this.features[d.fid||d.id]){if(this.modifiers.toggle){this.unselect(this.features[d.fid||d.id])}}else{b=this.events.triggerEvent("beforefeatureselected",{feature:d});if(b!==false){this.features[d.fid||d.id]=d;f.push(d);this.events.triggerEvent("featureselected",{feature:d})}}}this.events.triggerEvent("featuresselected",{features:f})}},hoverSelect:function(a){var c=a?a.fid||a.id:null;var b=this.hoverFeature?this.hoverFeature.fid||this.hoverFeature.id:null;if(b&&b!=c){this.events.triggerEvent("outfeature",{feature:this.hoverFeature});this.hoverFeature=null}if(c&&c!=b){this.events.triggerEvent("hoverfeature",{feature:a});this.hoverFeature=a}},unselect:function(a){delete this.features[a.fid||a.id];this.events.triggerEvent("featureunselected",{feature:a})},unselectAll:function(){for(var a in this.features){this.unselect(this.features[a])}},setMap:function(b){for(var a in this.handlers){this.handlers[a].setMap(b)}OpenLayers.Control.prototype.setMap.apply(this,arguments)},pixelToBounds:function(b){var e=b.add(-this.clickTolerance/2,this.clickTolerance/2);var a=b.add(this.clickTolerance/2,-this.clickTolerance/2);var c=this.map.getLonLatFromPixel(e);var d=this.map.getLonLatFromPixel(a);return new OpenLayers.Bounds(c.lon,c.lat,d.lon,d.lat)},CLASS_NAME:"OpenLayers.Control.GetFeature"});