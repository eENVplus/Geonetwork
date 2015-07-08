OpenLayers.Strategy.Filter=OpenLayers.Class(OpenLayers.Strategy,{filter:null,cache:null,caching:false,initialize:function(a){OpenLayers.Strategy.prototype.initialize.apply(this,[a]);if(!this.filter||!(this.filter instanceof OpenLayers.Filter)){throw new Error("Filter strategy must be constructed with a filter")}},activate:function(){var a=OpenLayers.Strategy.prototype.activate.apply(this,arguments);if(a){this.cache=[];this.layer.events.on({beforefeaturesadded:this.handleAdd,beforefeaturesremoved:this.handleRemove,scope:this})}return a},deactivate:function(){this.cache=null;if(this.layer&&this.layer.events){this.layer.events.un({beforefeaturesadded:this.handleAdd,beforefeaturesremoved:this.handleRemove,scope:this})}return OpenLayers.Strategy.prototype.deactivate.apply(this,arguments)},handleAdd:function(e){if(!this.caching){var d=e.features;e.features=[];var b;for(var a=0,c=d.length;a<c;++a){b=d[a];if(this.filter.evaluate(b)){e.features.push(b)}else{this.cache.push(b)}}}},handleRemove:function(a){if(!this.caching){this.cache=[]}},setFilter:function(a){this.filter=a;var c=this.cache;this.cache=[];this.handleAdd({features:this.layer.features});if(this.cache.length>0){this.caching=true;this.layer.removeFeatures(this.cache.slice(),{silent:true});this.caching=false}if(c.length>0){var b={features:c};this.handleAdd(b);this.caching=true;this.layer.addFeatures(b.features,{silent:true});this.caching=false}},CLASS_NAME:"OpenLayers.Strategy.Filter"});