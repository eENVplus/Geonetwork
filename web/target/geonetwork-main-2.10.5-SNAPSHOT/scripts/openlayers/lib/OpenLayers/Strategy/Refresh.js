OpenLayers.Strategy.Refresh=OpenLayers.Class(OpenLayers.Strategy,{force:false,interval:0,timer:null,initialize:function(a){OpenLayers.Strategy.prototype.initialize.apply(this,[a])},activate:function(){var a=OpenLayers.Strategy.prototype.activate.call(this);if(a){if(this.layer.visibility===true){this.start()}this.layer.events.on({visibilitychanged:this.reset,scope:this})}return a},deactivate:function(){var a=OpenLayers.Strategy.prototype.deactivate.call(this);if(a){this.stop()}return a},reset:function(){if(this.layer.visibility===true){this.start()}else{this.stop()}},start:function(){if(this.interval&&typeof this.interval==="number"&&this.interval>0){this.timer=window.setInterval(OpenLayers.Function.bind(this.refresh,this),this.interval)}},refresh:function(){if(this.layer&&this.layer.refresh&&typeof this.layer.refresh=="function"){this.layer.refresh({force:this.force})}},stop:function(){if(this.timer!==null){window.clearInterval(this.timer);this.timer=null}},CLASS_NAME:"OpenLayers.Strategy.Refresh"});