OpenLayers.Strategy.Cluster=OpenLayers.Class(OpenLayers.Strategy,{distance:20,threshold:null,features:null,clusters:null,clustering:false,resolution:null,initialize:function(a){OpenLayers.Strategy.prototype.initialize.apply(this,[a])},activate:function(){var a=OpenLayers.Strategy.prototype.activate.call(this);if(a){this.layer.events.on({beforefeaturesadded:this.cacheFeatures,moveend:this.cluster,scope:this})}return a},deactivate:function(){var a=OpenLayers.Strategy.prototype.deactivate.call(this);if(a){this.clearCache();this.layer.events.un({beforefeaturesadded:this.cacheFeatures,moveend:this.cluster,scope:this})}return a},cacheFeatures:function(b){var a=true;if(!this.clustering){this.clearCache();this.features=b.features;this.cluster();a=false}return a},clearCache:function(){this.features=null},cluster:function(a){if((!a||a.zoomChanged)&&this.features){var c=this.layer.map.getResolution();if(c!=this.resolution||!this.clustersExist()){this.resolution=c;var h=[];var m,b,k;for(var e=0;e<this.features.length;++e){m=this.features[e];if(m.geometry){b=false;for(var d=h.length-1;d>=0;--d){k=h[d];if(this.shouldCluster(k,m)){this.addToCluster(k,m);b=true;break}}if(!b){h.push(this.createCluster(this.features[e]))}}}this.layer.removeAllFeatures();if(h.length>0){if(this.threshold>1){var g=h.slice();h=[];var l;for(var e=0,f=g.length;e<f;++e){l=g[e];if(l.attributes.count<this.threshold){Array.prototype.push.apply(h,l.cluster)}else{h.push(l)}}}this.clustering=true;this.layer.addFeatures(h);this.clustering=false}this.clusters=h}}},clustersExist:function(){var b=false;if(this.clusters&&this.clusters.length>0&&this.clusters.length==this.layer.features.length){b=true;for(var a=0;a<this.clusters.length;++a){if(this.clusters[a]!=this.layer.features[a]){b=false;break}}}return b},shouldCluster:function(a,b){var e=a.geometry.getBounds().getCenterLonLat();var c=b.geometry.getBounds().getCenterLonLat();var d=(Math.sqrt(Math.pow((e.lon-c.lon),2)+Math.pow((e.lat-c.lat),2))/this.resolution);return(d<=this.distance)},addToCluster:function(a,b){a.cluster.push(b);a.attributes.count+=1},createCluster:function(c){var b=c.geometry.getBounds().getCenterLonLat();var a=new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(b.lon,b.lat),{count:1});a.cluster=[c];return a},CLASS_NAME:"OpenLayers.Strategy.Cluster"});