OpenLayers.Handler.Click=OpenLayers.Class(OpenLayers.Handler,{delay:300,single:true,"double":false,pixelTolerance:0,stopSingle:false,stopDouble:false,timerId:null,down:null,rightclickTimerId:null,initialize:function(c,b,a){OpenLayers.Handler.prototype.initialize.apply(this,arguments);if(this.pixelTolerance!=null){this.mousedown=function(d){this.down=d.xy;return true}}},mousedown:null,mouseup:function(b){var a=true;if(this.checkModifiers(b)&&this.control.handleRightClicks&&OpenLayers.Event.isRightClick(b)){a=this.rightclick(b)}return a},rightclick:function(b){if(this.passesTolerance(b)){if(this.rightclickTimerId!=null){this.clearTimer();this.callback("dblrightclick",[b]);return !this.stopDouble}else{var a=this["double"]?OpenLayers.Util.extend({},b):this.callback("rightclick",[b]);var c=OpenLayers.Function.bind(this.delayedRightCall,this,a);this.rightclickTimerId=window.setTimeout(c,this.delay)}}return !this.stopSingle},delayedRightCall:function(a){this.rightclickTimerId=null;if(a){this.callback("rightclick",[a])}return !this.stopSingle},dblclick:function(a){if(this.passesTolerance(a)){if(this["double"]){this.callback("dblclick",[a])}this.clearTimer()}return !this.stopDouble},click:function(b){if(this.passesTolerance(b)){if(this.timerId!=null){this.clearTimer()}else{var a=this.single?OpenLayers.Util.extend({},b):null;this.timerId=window.setTimeout(OpenLayers.Function.bind(this.delayedCall,this,a),this.delay)}}return !this.stopSingle},passesTolerance:function(b){var c=true;if(this.pixelTolerance!=null&&this.down){var a=Math.sqrt(Math.pow(this.down.x-b.xy.x,2)+Math.pow(this.down.y-b.xy.y,2));if(a>this.pixelTolerance){c=false}}return c},clearTimer:function(){if(this.timerId!=null){window.clearTimeout(this.timerId);this.timerId=null}if(this.rightclickTimerId!=null){window.clearTimeout(this.rightclickTimerId);this.rightclickTimerId=null}},delayedCall:function(a){this.timerId=null;if(a){this.callback("click",[a])}},deactivate:function(){var a=false;if(OpenLayers.Handler.prototype.deactivate.apply(this,arguments)){this.clearTimer();this.down=null;a=true}return a},CLASS_NAME:"OpenLayers.Handler.Click"});