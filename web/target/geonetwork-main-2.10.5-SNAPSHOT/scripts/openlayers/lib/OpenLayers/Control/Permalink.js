OpenLayers.Control.Permalink=OpenLayers.Class(OpenLayers.Control,{argParserClass:OpenLayers.Control.ArgParser,element:null,base:"",displayProjection:null,initialize:function(b,c,a){OpenLayers.Control.prototype.initialize.apply(this,[a]);this.element=OpenLayers.Util.getElement(b);this.base=c||document.location.href},destroy:function(){if(this.element.parentNode==this.div){this.div.removeChild(this.element)}this.element=null;this.map.events.unregister("moveend",this,this.updateLink);OpenLayers.Control.prototype.destroy.apply(this,arguments)},setMap:function(d){OpenLayers.Control.prototype.setMap.apply(this,arguments);for(var b=0,a=this.map.controls.length;b<a;b++){var c=this.map.controls[b];if(c.CLASS_NAME==this.argParserClass.CLASS_NAME){if(c.displayProjection!=this.displayProjection){this.displayProjection=c.displayProjection}break}}if(b==this.map.controls.length){this.map.addControl(new this.argParserClass({displayProjection:this.displayProjection}))}},draw:function(){OpenLayers.Control.prototype.draw.apply(this,arguments);if(!this.element){this.div.className=this.displayClass;this.element=document.createElement("a");this.element.innerHTML=OpenLayers.i18n("permalink");this.element.href="";this.div.appendChild(this.element)}this.map.events.on({moveend:this.updateLink,changelayer:this.updateLink,changebaselayer:this.updateLink,scope:this});this.updateLink();return this.div},updateLink:function(){var a=this.base;if(a.indexOf("?")!=-1){a=a.substring(0,a.indexOf("?"))}a+="?"+OpenLayers.Util.getParameterString(this.createParams());this.element.href=a},createParams:function(a,k,e){a=a||this.map.getCenter();var d=OpenLayers.Util.getParameters(this.base);if(a){d.zoom=k||this.map.getZoom();var j=a.lat;var b=a.lon;if(this.displayProjection){var c=OpenLayers.Projection.transform({x:b,y:j},this.map.getProjectionObject(),this.displayProjection);b=c.x;j=c.y}d.lat=Math.round(j*100000)/100000;d.lon=Math.round(b*100000)/100000;e=e||this.map.layers;d.layers="";for(var f=0,h=e.length;f<h;f++){var g=e[f];if(g.isBaseLayer){d.layers+=(g==this.map.baseLayer)?"B":"0"}else{d.layers+=(g.getVisibility())?"T":"F"}}}return d},CLASS_NAME:"OpenLayers.Control.Permalink"});