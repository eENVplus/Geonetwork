OpenLayers.Tween=OpenLayers.Class({INTERVAL:10,easing:null,begin:null,finish:null,duration:null,callbacks:null,time:null,interval:null,playing:false,initialize:function(a){this.easing=(a)?a:OpenLayers.Easing.Expo.easeOut},start:function(c,b,d,a){this.playing=true;this.begin=c;this.finish=b;this.duration=d;this.callbacks=a.callbacks;this.time=0;if(this.interval){window.clearInterval(this.interval);this.interval=null}if(this.callbacks&&this.callbacks.start){this.callbacks.start.call(this,this.begin)}this.interval=window.setInterval(OpenLayers.Function.bind(this.play,this),this.INTERVAL)},stop:function(){if(!this.playing){return}if(this.callbacks&&this.callbacks.done){this.callbacks.done.call(this,this.finish)}window.clearInterval(this.interval);this.interval=null;this.playing=false},play:function(){var g={};for(var d in this.begin){var a=this.begin[d];var e=this.finish[d];if(a==null||e==null||isNaN(a)||isNaN(e)){OpenLayers.Console.error("invalid value for Tween")}var h=e-a;g[d]=this.easing.apply(this,[this.time,a,h,this.duration])}this.time++;if(this.callbacks&&this.callbacks.eachStep){this.callbacks.eachStep.call(this,g)}if(this.time>this.duration){this.stop()}},CLASS_NAME:"OpenLayers.Tween"});OpenLayers.Easing={CLASS_NAME:"OpenLayers.Easing"};OpenLayers.Easing.Linear={easeIn:function(e,a,g,f){return g*e/f+a},easeOut:function(e,a,g,f){return g*e/f+a},easeInOut:function(e,a,g,f){return g*e/f+a},CLASS_NAME:"OpenLayers.Easing.Linear"};OpenLayers.Easing.Expo={easeIn:function(e,a,g,f){return(e==0)?a:g*Math.pow(2,10*(e/f-1))+a},easeOut:function(e,a,g,f){return(e==f)?a+g:g*(-Math.pow(2,-10*e/f)+1)+a},easeInOut:function(e,a,g,f){if(e==0){return a}if(e==f){return a+g}if((e/=f/2)<1){return g/2*Math.pow(2,10*(e-1))+a}return g/2*(-Math.pow(2,-10*--e)+2)+a},CLASS_NAME:"OpenLayers.Easing.Expo"};OpenLayers.Easing.Quad={easeIn:function(e,a,g,f){return g*(e/=f)*e+a},easeOut:function(e,a,g,f){return -g*(e/=f)*(e-2)+a},easeInOut:function(e,a,g,f){if((e/=f/2)<1){return g/2*e*e+a}return -g/2*((--e)*(e-2)-1)+a},CLASS_NAME:"OpenLayers.Easing.Quad"};