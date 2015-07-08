OpenLayers.Strategy.Save=OpenLayers.Class(OpenLayers.Strategy,{EVENT_TYPES:["start","success","fail"],events:null,auto:false,timer:null,initialize:function(a){OpenLayers.Strategy.prototype.initialize.apply(this,[a]);this.events=new OpenLayers.Events(this,null,this.EVENT_TYPES)},activate:function(){var a=OpenLayers.Strategy.prototype.activate.call(this);if(a){if(this.auto){if(typeof this.auto==="number"){this.timer=window.setInterval(OpenLayers.Function.bind(this.save,this),this.auto*1000)}else{this.layer.events.on({featureadded:this.triggerSave,afterfeaturemodified:this.triggerSave,scope:this})}}}return a},deactivate:function(){var a=OpenLayers.Strategy.prototype.deactivate.call(this);if(a){if(this.auto){if(typeof this.auto==="number"){window.clearInterval(this.timer)}else{this.layer.events.un({featureadded:this.triggerSave,afterfeaturemodified:this.triggerSave,scope:this})}}}return a},triggerSave:function(b){var a=b.feature;if(a.state===OpenLayers.State.INSERT||a.state===OpenLayers.State.UPDATE||a.state===OpenLayers.State.DELETE){this.save([b.feature])}},save:function(d){if(!d){d=this.layer.features}this.events.triggerEvent("start",{features:d});var f=this.layer.projection;var c=this.layer.map.getProjectionObject();if(!c.equals(f)){var a=d.length;var e=new Array(a);var h,g;for(var b=0;b<a;++b){h=d[b];g=h.clone();g.fid=h.fid;g.state=h.state;if(h.url){g.url=h.url}g._original=h;g.geometry.transform(c,f);e[b]=g}d=e}this.layer.protocol.commit(d,{callback:this.onCommit,scope:this})},onCommit:function(d){var k={response:d};if(d.success()){var b=d.reqFeatures;var a,l;var c=[];var h=d.insertIds||[];var e=0;for(var f=0,g=b.length;f<g;++f){l=b[f];l=l._original||l;a=l.state;if(a){if(a==OpenLayers.State.DELETE){c.push(l)}else{if(a==OpenLayers.State.INSERT){l.fid=h[e];++e}}l.state=null}}if(c.length>0){this.layer.destroyFeatures(c)}this.events.triggerEvent("success",k)}else{this.events.triggerEvent("fail",k)}},CLASS_NAME:"OpenLayers.Strategy.Save"});