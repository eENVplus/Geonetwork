OpenLayers.Layer.XYZ=OpenLayers.Class(OpenLayers.Layer.Grid,{isBaseLayer:true,sphericalMercator:false,zoomOffset:0,initialize:function(d,c,b){if(b&&b.sphericalMercator||this.sphericalMercator){b=OpenLayers.Util.extend({maxExtent:new OpenLayers.Bounds(-128*156543.0339,-128*156543.0339,128*156543.0339,128*156543.0339),maxResolution:156543.0339,numZoomLevels:19,units:"m",projection:"EPSG:900913"},b)}c=c||this.url;d=d||this.name;var a=[d,c,{},b];OpenLayers.Layer.Grid.prototype.initialize.apply(this,a)},clone:function(a){if(a==null){a=new OpenLayers.Layer.XYZ(this.name,this.url,this.getOptions())}a=OpenLayers.Layer.Grid.prototype.clone.apply(this,[a]);return a},getURL:function(e){var c=this.map.getResolution();var a=Math.round((e.left-this.maxExtent.left)/(c*this.tileSize.w));var h=Math.round((this.maxExtent.top-e.top)/(c*this.tileSize.h));var g=this.map.getZoom()+this.zoomOffset;var b=this.url;var d=""+a+h+g;if(b instanceof Array){b=this.selectUrl(d,b)}var f=OpenLayers.String.format(b,{x:a,y:h,z:g});return f},addTile:function(b,a){return new OpenLayers.Tile.Image(this,a,b,null,this.tileSize)},setMap:function(a){OpenLayers.Layer.Grid.prototype.setMap.apply(this,arguments);if(!this.tileOrigin){this.tileOrigin=new OpenLayers.LonLat(this.maxExtent.left,this.maxExtent.bottom)}},CLASS_NAME:"OpenLayers.Layer.XYZ"});OpenLayers.Layer.OSM=OpenLayers.Class(OpenLayers.Layer.XYZ,{name:"OpenStreetMap",attribution:"Data CC-By-SA by <a href='http://openstreetmap.org/'>OpenStreetMap</a>",sphericalMercator:true,url:"http://tile.openstreetmap.org/${z}/${x}/${y}.png",clone:function(a){if(a==null){a=new OpenLayers.Layer.OSM(this.name,this.url,this.getOptions())}a=OpenLayers.Layer.XYZ.prototype.clone.apply(this,[a]);return a},CLASS_NAME:"OpenLayers.Layer.OSM"});