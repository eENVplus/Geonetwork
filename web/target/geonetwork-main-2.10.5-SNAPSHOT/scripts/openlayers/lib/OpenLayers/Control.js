OpenLayers.Control=OpenLayers.Class({id:null,map:null,div:null,type:null,allowSelection:false,displayClass:"",title:"",autoActivate:false,active:null,handler:null,eventListeners:null,events:null,EVENT_TYPES:["activate","deactivate"],initialize:function(a){this.displayClass=this.CLASS_NAME.replace("OpenLayers.","ol").replace(/\./g,"");OpenLayers.Util.extend(this,a);this.events=new OpenLayers.Events(this,null,this.EVENT_TYPES);if(this.eventListeners instanceof Object){this.events.on(this.eventListeners)}if(this.id==null){this.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME+"_")}},destroy:function(){if(this.events){if(this.eventListeners){this.events.un(this.eventListeners)}this.events.destroy();this.events=null}this.eventListeners=null;if(this.handler){this.handler.destroy();this.handler=null}if(this.handlers){for(var a in this.handlers){if(this.handlers.hasOwnProperty(a)&&typeof this.handlers[a].destroy=="function"){this.handlers[a].destroy()}}this.handlers=null}if(this.map){this.map.removeControl(this);this.map=null}},setMap:function(a){this.map=a;if(this.handler){this.handler.setMap(a)}},draw:function(a){if(this.div==null){this.div=OpenLayers.Util.createDiv(this.id);this.div.className=this.displayClass;if(!this.allowSelection){this.div.className+=" olControlNoSelect";this.div.setAttribute("unselectable","on",0);this.div.onselectstart=OpenLayers.Function.False}if(this.title!=""){this.div.title=this.title}}if(a!=null){this.position=a.clone()}this.moveTo(this.position);return this.div},moveTo:function(a){if((a!=null)&&(this.div!=null)){this.div.style.left=a.x+"px";this.div.style.top=a.y+"px"}},activate:function(){if(this.active){return false}if(this.handler){this.handler.activate()}this.active=true;if(this.map){OpenLayers.Element.addClass(this.map.viewPortDiv,this.displayClass.replace(/ /g,"")+"Active")}this.events.triggerEvent("activate");return true},deactivate:function(){if(this.active){if(this.handler){this.handler.deactivate()}this.active=false;if(this.map){OpenLayers.Element.removeClass(this.map.viewPortDiv,this.displayClass.replace(/ /g,"")+"Active")}this.events.triggerEvent("deactivate");return true}return false},CLASS_NAME:"OpenLayers.Control"});OpenLayers.Control.TYPE_BUTTON=1;OpenLayers.Control.TYPE_TOGGLE=2;OpenLayers.Control.TYPE_TOOL=3;