OpenLayers.Control.PanZoomBar=OpenLayers.Class(OpenLayers.Control.PanZoom,{zoomStopWidth:18,zoomStopHeight:11,slider:null,sliderEvents:null,zoombarDiv:null,divEvents:null,zoomWorldIcon:false,forceFixedZoomLevel:false,mouseDragStart:null,zoomStart:null,initialize:function(){OpenLayers.Control.PanZoom.prototype.initialize.apply(this,arguments)},destroy:function(){this._removeZoomBar();this.map.events.un({changebaselayer:this.redraw,scope:this});OpenLayers.Control.PanZoom.prototype.destroy.apply(this,arguments);delete this.mouseDragStart;delete this.zoomStart},setMap:function(a){OpenLayers.Control.PanZoom.prototype.setMap.apply(this,arguments);this.map.events.register("changebaselayer",this,this.redraw)},redraw:function(){if(this.div!=null){this.removeButtons();this._removeZoomBar()}this.draw()},draw:function(b){OpenLayers.Control.prototype.draw.apply(this,arguments);b=this.position.clone();this.buttons=[];var d=new OpenLayers.Size(18,18);var a=new OpenLayers.Pixel(b.x+d.w/2,b.y);var c=d.w;if(this.zoomWorldIcon){a=new OpenLayers.Pixel(b.x+d.w,b.y)}this._addButton("panup","north-mini.png",a,d);b.y=a.y+d.h;this._addButton("panleft","west-mini.png",b,d);if(this.zoomWorldIcon){this._addButton("zoomworld","zoom-world-mini.png",b.add(d.w,0),d);c*=2}this._addButton("panright","east-mini.png",b.add(c,0),d);this._addButton("pandown","south-mini.png",a.add(0,d.h*2),d);this._addButton("zoomin","zoom-plus-mini.png",a.add(0,d.h*3+5),d);a=this._addZoomBar(a.add(0,d.h*4+5));this._addButton("zoomout","zoom-minus-mini.png",a,d);return this.div},_addZoomBar:function(a){var e=OpenLayers.Util.getImagesLocation();var g=this.id+"_"+this.map.id;var b=this.map.getNumZoomLevels()-1-this.map.getZoom();var c=OpenLayers.Util.createAlphaImageDiv(g,a.add(-1,b*this.zoomStopHeight),new OpenLayers.Size(20,9),e+"slider.png","absolute");this.slider=c;this.sliderEvents=new OpenLayers.Events(this,c,null,true,{includeXY:true});this.sliderEvents.on({mousedown:this.zoomBarDown,mousemove:this.zoomBarDrag,mouseup:this.zoomBarUp,dblclick:this.doubleClick,click:this.doubleClick});var d=new OpenLayers.Size();d.h=this.zoomStopHeight*this.map.getNumZoomLevels();d.w=this.zoomStopWidth;var f=null;if(OpenLayers.Util.alphaHack()){var g=this.id+"_"+this.map.id;f=OpenLayers.Util.createAlphaImageDiv(g,a,new OpenLayers.Size(d.w,this.zoomStopHeight),e+"zoombar.png","absolute",null,"crop");f.style.height=d.h+"px"}else{f=OpenLayers.Util.createDiv("OpenLayers_Control_PanZoomBar_Zoombar"+this.map.id,a,d,e+"zoombar.png")}this.zoombarDiv=f;this.divEvents=new OpenLayers.Events(this,f,null,true,{includeXY:true});this.divEvents.on({mousedown:this.divClick,mousemove:this.passEventToSlider,dblclick:this.doubleClick,click:this.doubleClick});this.div.appendChild(f);this.startTop=parseInt(f.style.top);this.div.appendChild(c);this.map.events.register("zoomend",this,this.moveZoomBar);a=a.add(0,this.zoomStopHeight*this.map.getNumZoomLevels());return a},_removeZoomBar:function(){this.sliderEvents.un({mousedown:this.zoomBarDown,mousemove:this.zoomBarDrag,mouseup:this.zoomBarUp,dblclick:this.doubleClick,click:this.doubleClick});this.sliderEvents.destroy();this.divEvents.un({mousedown:this.divClick,mousemove:this.passEventToSlider,dblclick:this.doubleClick,click:this.doubleClick});this.divEvents.destroy();this.div.removeChild(this.zoombarDiv);this.zoombarDiv=null;this.div.removeChild(this.slider);this.slider=null;this.map.events.unregister("zoomend",this,this.moveZoomBar)},passEventToSlider:function(a){this.sliderEvents.handleBrowserEvent(a)},divClick:function(a){if(!OpenLayers.Event.isLeftClick(a)){return}var e=a.xy.y;var d=OpenLayers.Util.pagePosition(a.object)[1];var c=(e-d)/this.zoomStopHeight;if(this.forceFixedZoomLevel||!this.map.fractionalZoom){c=Math.floor(c)}var b=(this.map.getNumZoomLevels()-1)-c;b=Math.min(Math.max(b,0),this.map.getNumZoomLevels()-1);this.map.zoomTo(b);OpenLayers.Event.stop(a)},zoomBarDown:function(a){if(!OpenLayers.Event.isLeftClick(a)){return}this.map.events.on({mousemove:this.passEventToSlider,mouseup:this.passEventToSlider,scope:this});this.mouseDragStart=a.xy.clone();this.zoomStart=a.xy.clone();this.div.style.cursor="move";this.zoombarDiv.offsets=null;OpenLayers.Event.stop(a)},zoomBarDrag:function(b){if(this.mouseDragStart!=null){var a=this.mouseDragStart.y-b.xy.y;var d=OpenLayers.Util.pagePosition(this.zoombarDiv);if((b.clientY-d[1])>0&&(b.clientY-d[1])<parseInt(this.zoombarDiv.style.height)-2){var c=parseInt(this.slider.style.top)-a;this.slider.style.top=c+"px";this.mouseDragStart=b.xy.clone()}OpenLayers.Event.stop(b)}},zoomBarUp:function(b){if(!OpenLayers.Event.isLeftClick(b)){return}if(this.mouseDragStart){this.div.style.cursor="";this.map.events.un({mouseup:this.passEventToSlider,mousemove:this.passEventToSlider,scope:this});var a=this.zoomStart.y-b.xy.y;var c=this.map.zoom;if(!this.forceFixedZoomLevel&&this.map.fractionalZoom){c+=a/this.zoomStopHeight;c=Math.min(Math.max(c,0),this.map.getNumZoomLevels()-1)}else{c+=Math.round(a/this.zoomStopHeight)}this.map.zoomTo(c);this.mouseDragStart=null;this.zoomStart=null;OpenLayers.Event.stop(b)}},moveZoomBar:function(){var a=((this.map.getNumZoomLevels()-1)-this.map.getZoom())*this.zoomStopHeight+this.startTop+1;this.slider.style.top=a+"px"},CLASS_NAME:"OpenLayers.Control.PanZoomBar"});