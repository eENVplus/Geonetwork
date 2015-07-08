OpenLayers.Control.MouseToolbar=OpenLayers.Class(OpenLayers.Control.MouseDefaults,{mode:null,buttons:null,direction:"vertical",buttonClicked:null,initialize:function(a,b){OpenLayers.Control.prototype.initialize.apply(this,arguments);this.position=new OpenLayers.Pixel(OpenLayers.Control.MouseToolbar.X,OpenLayers.Control.MouseToolbar.Y);if(a){this.position=a}if(b){this.direction=b}this.measureDivs=[]},destroy:function(){for(var b in this.buttons){var a=this.buttons[b];a.map=null;a.events.destroy()}OpenLayers.Control.MouseDefaults.prototype.destroy.apply(this,arguments)},draw:function(){OpenLayers.Control.prototype.draw.apply(this,arguments);OpenLayers.Control.MouseDefaults.prototype.draw.apply(this,arguments);this.buttons={};var b=new OpenLayers.Size(28,28);var a=new OpenLayers.Pixel(OpenLayers.Control.MouseToolbar.X,0);this._addButton("zoombox","drag-rectangle-off.png","drag-rectangle-on.png",a,b,"Shift->Drag to zoom to area");a=a.add((this.direction=="vertical"?0:b.w),(this.direction=="vertical"?b.h:0));this._addButton("pan","panning-hand-off.png","panning-hand-on.png",a,b,"Drag the map to pan.");a=a.add((this.direction=="vertical"?0:b.w),(this.direction=="vertical"?b.h:0));this.switchModeTo("pan");return this.div},_addButton:function(a,e,d,i,g,h){var f=OpenLayers.Util.getImagesLocation()+e;var c=OpenLayers.Util.getImagesLocation()+d;var b=OpenLayers.Util.createAlphaImageDiv("OpenLayers_Control_MouseToolbar_"+a,i,g,f,"absolute");this.div.appendChild(b);b.imgLocation=f;b.activeImgLocation=c;b.events=new OpenLayers.Events(this,b,null,true);b.events.on({mousedown:this.buttonDown,mouseup:this.buttonUp,dblclick:OpenLayers.Event.stop,scope:this});b.action=a;b.title=h;b.alt=h;b.map=this.map;this.buttons[a]=b;return b},buttonDown:function(a){if(!OpenLayers.Event.isLeftClick(a)){return}this.buttonClicked=a.element.action;OpenLayers.Event.stop(a)},buttonUp:function(a){if(!OpenLayers.Event.isLeftClick(a)){return}if(this.buttonClicked!=null){if(this.buttonClicked==a.element.action){this.switchModeTo(a.element.action)}OpenLayers.Event.stop(a);this.buttonClicked=null}},defaultDblClick:function(b){this.switchModeTo("pan");this.performedDrag=false;var a=this.map.getLonLatFromViewPortPx(b.xy);this.map.setCenter(a,this.map.zoom+1);OpenLayers.Event.stop(b);return false},defaultMouseDown:function(a){if(!OpenLayers.Event.isLeftClick(a)){return}this.mouseDragStart=a.xy.clone();this.performedDrag=false;this.startViaKeyboard=false;if(a.shiftKey&&this.mode!="zoombox"){this.switchModeTo("zoombox");this.startViaKeyboard=true}else{if(a.altKey&&this.mode!="measure"){this.switchModeTo("measure")}else{if(!this.mode){this.switchModeTo("pan")}}}switch(this.mode){case"zoombox":this.map.div.style.cursor="crosshair";this.zoomBox=OpenLayers.Util.createDiv("zoomBox",this.mouseDragStart,null,null,"absolute","2px solid red");this.zoomBox.style.backgroundColor="white";this.zoomBox.style.filter="alpha(opacity=50)";this.zoomBox.style.opacity="0.50";this.zoomBox.style.fontSize="1px";this.zoomBox.style.zIndex=this.map.Z_INDEX_BASE.Popup-1;this.map.viewPortDiv.appendChild(this.zoomBox);this.performedDrag=true;break;case"measure":var c="";if(this.measureStart){var b=this.map.getLonLatFromViewPortPx(this.mouseDragStart);c=OpenLayers.Util.distVincenty(this.measureStart,b);c=Math.round(c*100)/100;c=c+"km";this.measureStartBox=this.measureBox}this.measureStart=this.map.getLonLatFromViewPortPx(this.mouseDragStart);this.measureBox=OpenLayers.Util.createDiv(null,this.mouseDragStart.add(-2-parseInt(this.map.layerContainerDiv.style.left),-2-parseInt(this.map.layerContainerDiv.style.top)),null,null,"absolute");this.measureBox.style.width="4px";this.measureBox.style.height="4px";this.measureBox.style.fontSize="1px";this.measureBox.style.backgroundColor="red";this.measureBox.style.zIndex=this.map.Z_INDEX_BASE.Popup-1;this.map.layerContainerDiv.appendChild(this.measureBox);if(c){this.measureBoxDistance=OpenLayers.Util.createDiv(null,this.mouseDragStart.add(-2-parseInt(this.map.layerContainerDiv.style.left),2-parseInt(this.map.layerContainerDiv.style.top)),null,null,"absolute");this.measureBoxDistance.innerHTML=c;this.measureBoxDistance.style.zIndex=this.map.Z_INDEX_BASE.Popup-1;this.map.layerContainerDiv.appendChild(this.measureBoxDistance);this.measureDivs.push(this.measureBoxDistance)}this.measureBox.style.zIndex=this.map.Z_INDEX_BASE.Popup-1;this.map.layerContainerDiv.appendChild(this.measureBox);this.measureDivs.push(this.measureBox);break;default:this.map.div.style.cursor="move";break}document.onselectstart=OpenLayers.Function.False;OpenLayers.Event.stop(a)},switchModeTo:function(c){if(c!=this.mode){if(this.mode&&this.buttons[this.mode]){OpenLayers.Util.modifyAlphaImageDiv(this.buttons[this.mode],null,null,null,this.buttons[this.mode].imgLocation)}if(this.mode=="measure"&&c!="measure"){for(var b=0,a=this.measureDivs.length;b<a;b++){if(this.measureDivs[b]){this.map.layerContainerDiv.removeChild(this.measureDivs[b])}}this.measureDivs=[];this.measureStart=null}this.mode=c;if(this.buttons[c]){OpenLayers.Util.modifyAlphaImageDiv(this.buttons[c],null,null,null,this.buttons[c].activeImgLocation)}switch(this.mode){case"zoombox":this.map.div.style.cursor="crosshair";break;default:this.map.div.style.cursor="";break}}},leaveMode:function(){this.switchModeTo("pan")},defaultMouseMove:function(e){if(this.mouseDragStart!=null){switch(this.mode){case"zoombox":var d=Math.abs(this.mouseDragStart.x-e.xy.x);var b=Math.abs(this.mouseDragStart.y-e.xy.y);this.zoomBox.style.width=Math.max(1,d)+"px";this.zoomBox.style.height=Math.max(1,b)+"px";if(e.xy.x<this.mouseDragStart.x){this.zoomBox.style.left=e.xy.x+"px"}if(e.xy.y<this.mouseDragStart.y){this.zoomBox.style.top=e.xy.y+"px"}break;default:var d=this.mouseDragStart.x-e.xy.x;var b=this.mouseDragStart.y-e.xy.y;var f=this.map.getSize();var a=new OpenLayers.Pixel(f.w/2+d,f.h/2+b);var c=this.map.getLonLatFromViewPortPx(a);this.map.setCenter(c,null,true);this.mouseDragStart=e.xy.clone()}this.performedDrag=true}},defaultMouseUp:function(a){if(!OpenLayers.Event.isLeftClick(a)){return}switch(this.mode){case"zoombox":this.zoomBoxEnd(a);if(this.startViaKeyboard){this.leaveMode()}break;case"pan":if(this.performedDrag){this.map.setCenter(this.map.center)}}document.onselectstart=null;this.mouseDragStart=null;this.map.div.style.cursor="default"},defaultMouseOut:function(a){if(this.mouseDragStart!=null&&OpenLayers.Util.mouseLeft(a,this.map.div)){if(this.zoomBox){this.removeZoomBox();if(this.startViaKeyboard){this.leaveMode()}}this.mouseDragStart=null;this.map.div.style.cursor="default"}},defaultClick:function(a){if(this.performedDrag){this.performedDrag=false;return false}},CLASS_NAME:"OpenLayers.Control.MouseToolbar"});OpenLayers.Control.MouseToolbar.X=6;OpenLayers.Control.MouseToolbar.Y=300;