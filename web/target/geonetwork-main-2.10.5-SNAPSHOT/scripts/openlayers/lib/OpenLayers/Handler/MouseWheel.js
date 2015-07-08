OpenLayers.Handler.MouseWheel=OpenLayers.Class(OpenLayers.Handler,{wheelListener:null,mousePosition:null,interval:0,delta:0,cumulative:true,initialize:function(c,b,a){OpenLayers.Handler.prototype.initialize.apply(this,arguments);this.wheelListener=OpenLayers.Function.bindAsEventListener(this.onWheelEvent,this)},destroy:function(){OpenLayers.Handler.prototype.destroy.apply(this,arguments);this.wheelListener=null},onWheelEvent:function(k){if(!this.map||!this.checkModifiers(k)){return}var g=false;var m=false;var f=false;var b=OpenLayers.Event.element(k);while((b!=null)&&!f&&!g){if(!g){try{if(b.currentStyle){c=b.currentStyle.overflow}else{var a=document.defaultView.getComputedStyle(b,null);var c=a.getPropertyValue("overflow")}g=(c&&(c=="auto")||(c=="scroll"))}catch(d){}}if(!m){for(var h=0,j=this.map.layers.length;h<j;h++){if(b==this.map.layers[h].div||b==this.map.layers[h].pane){m=true;break}}}f=(b==this.map.div);b=b.parentNode}if(!g&&f){if(m){var l=0;if(!k){k=window.event}if(k.wheelDelta){l=k.wheelDelta/120;if(window.opera&&window.opera.version()<9.2){l=-l}}else{if(k.detail){l=-k.detail/3}}this.delta=this.delta+l;if(this.interval){window.clearTimeout(this._timeoutId);this._timeoutId=window.setTimeout(OpenLayers.Function.bind(function(){this.wheelZoom(k)},this),this.interval)}else{this.wheelZoom(k)}}OpenLayers.Event.stop(k)}},wheelZoom:function(a){var b=this.delta;this.delta=0;if(b){if(this.mousePosition){a.xy=this.mousePosition}if(!a.xy){a.xy=this.map.getPixelFromLonLat(this.map.getCenter())}if(b<0){this.callback("down",[a,this.cumulative?b:-1])}else{this.callback("up",[a,this.cumulative?b:1])}}},mousemove:function(a){this.mousePosition=a.xy},activate:function(a){if(OpenLayers.Handler.prototype.activate.apply(this,arguments)){var b=this.wheelListener;OpenLayers.Event.observe(window,"DOMMouseScroll",b);OpenLayers.Event.observe(window,"mousewheel",b);OpenLayers.Event.observe(document,"mousewheel",b);return true}else{return false}},deactivate:function(a){if(OpenLayers.Handler.prototype.deactivate.apply(this,arguments)){var b=this.wheelListener;OpenLayers.Event.stopObserving(window,"DOMMouseScroll",b);OpenLayers.Event.stopObserving(window,"mousewheel",b);OpenLayers.Event.stopObserving(document,"mousewheel",b);return true}else{return false}},CLASS_NAME:"OpenLayers.Handler.MouseWheel"});