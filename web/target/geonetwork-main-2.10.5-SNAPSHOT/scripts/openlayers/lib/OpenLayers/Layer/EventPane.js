OpenLayers.Layer.EventPane=OpenLayers.Class(OpenLayers.Layer,{smoothDragPan:true,isBaseLayer:true,isFixed:true,pane:null,mapObject:null,initialize:function(b,a){OpenLayers.Layer.prototype.initialize.apply(this,arguments);if(this.pane==null){this.pane=OpenLayers.Util.createDiv(this.div.id+"_EventPane")}},destroy:function(){this.mapObject=null;this.pane=null;OpenLayers.Layer.prototype.destroy.apply(this,arguments)},setMap:function(a){OpenLayers.Layer.prototype.setMap.apply(this,arguments);this.pane.style.zIndex=parseInt(this.div.style.zIndex)+1;this.pane.style.display=this.div.style.display;this.pane.style.width="100%";this.pane.style.height="100%";if(OpenLayers.Util.getBrowserName()=="msie"){this.pane.style.background="url("+OpenLayers.Util.getImagesLocation()+"blank.gif)"}if(this.isFixed){this.map.viewPortDiv.appendChild(this.pane)}else{this.map.layerContainerDiv.appendChild(this.pane)}this.loadMapObject();if(this.mapObject==null){this.loadWarningMessage()}},removeMap:function(a){if(this.pane&&this.pane.parentNode){this.pane.parentNode.removeChild(this.pane)}OpenLayers.Layer.prototype.removeMap.apply(this,arguments)},loadWarningMessage:function(){this.div.style.backgroundColor="darkblue";var g=this.map.getSize();var a=Math.min(g.w,300);var e=Math.min(g.h,200);var b=new OpenLayers.Size(a,e);var d=new OpenLayers.Pixel(g.w/2,g.h/2);var c=d.add(-b.w/2,-b.h/2);var f=OpenLayers.Util.createDiv(this.name+"_warning",c,b,null,null,null,"auto");f.style.padding="7px";f.style.backgroundColor="yellow";f.innerHTML=this.getWarningHTML();this.div.appendChild(f)},getWarningHTML:function(){return""},display:function(a){OpenLayers.Layer.prototype.display.apply(this,arguments);this.pane.style.display=this.div.style.display},setZIndex:function(a){OpenLayers.Layer.prototype.setZIndex.apply(this,arguments);this.pane.style.zIndex=parseInt(this.div.style.zIndex)+1},moveTo:function(c,d,j){OpenLayers.Layer.prototype.moveTo.apply(this,arguments);if(this.mapObject!=null){var e=this.map.getCenter();var g=this.map.getZoom();if(e!=null){var f=this.getMapObjectCenter();var b=this.getOLLonLatFromMapObjectLonLat(f);var h=this.getMapObjectZoom();var m=this.getOLZoomFromMapObjectZoom(h);if(!(e.equals(b))||!(g==m)){if(j&&this.dragPanMapObject&&this.smoothDragPan){var i=this.map.getViewPortPxFromLonLat(b);var k=this.map.getViewPortPxFromLonLat(e);this.dragPanMapObject(k.x-i.x,i.y-k.y)}else{var a=this.getMapObjectLonLatFromOLLonLat(e);var l=this.getMapObjectZoomFromOLZoom(g);this.setMapObjectCenter(a,l,j)}}}}},getLonLatFromViewPortPx:function(a){var b=null;if((this.mapObject!=null)&&(this.getMapObjectCenter()!=null)){var d=this.getMapObjectPixelFromOLPixel(a);var c=this.getMapObjectLonLatFromMapObjectPixel(d);b=this.getOLLonLatFromMapObjectLonLat(c)}return b},getViewPortPxFromLonLat:function(b){var a=null;if((this.mapObject!=null)&&(this.getMapObjectCenter()!=null)){var d=this.getMapObjectLonLatFromOLLonLat(b);var c=this.getMapObjectPixelFromMapObjectLonLat(d);a=this.getOLPixelFromMapObjectPixel(c)}return a},getOLLonLatFromMapObjectLonLat:function(d){var a=null;if(d!=null){var c=this.getLongitudeFromMapObjectLonLat(d);var b=this.getLatitudeFromMapObjectLonLat(d);a=new OpenLayers.LonLat(c,b)}return a},getMapObjectLonLatFromOLLonLat:function(a){var b=null;if(a!=null){b=this.getMapObjectLonLatFromLonLat(a.lon,a.lat)}return b},getOLPixelFromMapObjectPixel:function(d){var b=null;if(d!=null){var a=this.getXFromMapObjectPixel(d);var c=this.getYFromMapObjectPixel(d);b=new OpenLayers.Pixel(a,c)}return b},getMapObjectPixelFromOLPixel:function(a){var b=null;if(a!=null){b=this.getMapObjectPixelFromXY(a.x,a.y)}return b},CLASS_NAME:"OpenLayers.Layer.EventPane"});