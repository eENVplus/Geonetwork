OpenLayers.Layer.Grid=OpenLayers.Class(OpenLayers.Layer.HTTPRequest,{tileSize:null,grid:null,singleTile:false,ratio:1.5,buffer:2,numLoadingTiles:0,initialize:function(c,b,d,a){OpenLayers.Layer.HTTPRequest.prototype.initialize.apply(this,arguments);this.events.addEventType("tileloaded");this.grid=[]},destroy:function(){this.clearGrid();this.grid=null;this.tileSize=null;OpenLayers.Layer.HTTPRequest.prototype.destroy.apply(this,arguments)},clearGrid:function(){if(this.grid){for(var f=0,b=this.grid.length;f<b;f++){var e=this.grid[f];for(var c=0,a=e.length;c<a;c++){var d=e[c];this.removeTileMonitoringHooks(d);d.destroy()}}this.grid=[]}},clone:function(a){if(a==null){a=new OpenLayers.Layer.Grid(this.name,this.url,this.params,this.getOptions())}a=OpenLayers.Layer.HTTPRequest.prototype.clone.apply(this,[a]);if(this.tileSize!=null){a.tileSize=this.tileSize.clone()}a.grid=[];return a},moveTo:function(d,a,e){OpenLayers.Layer.HTTPRequest.prototype.moveTo.apply(this,arguments);d=d||this.map.getExtent();if(d!=null){var c=!this.grid.length||a;var b=this.getTilesBounds();if(this.singleTile){if(c||(!e&&!b.containsBounds(d))){this.initSingleTile(d)}}else{if(c||!b.containsBounds(d,true)){this.initGriddedTiles(d)}else{this.moveGriddedTiles(d)}}}},setTileSize:function(a){if(this.singleTile){a=this.map.getSize();a.h=parseInt(a.h*this.ratio);a.w=parseInt(a.w*this.ratio)}OpenLayers.Layer.HTTPRequest.prototype.setTileSize.apply(this,[a])},getGridBounds:function(){var a="The getGridBounds() function is deprecated. It will be removed in 3.0. Please use getTilesBounds() instead.";OpenLayers.Console.warn(a);return this.getTilesBounds()},getTilesBounds:function(){var e=null;if(this.grid.length){var a=this.grid.length-1;var d=this.grid[a][0];var b=this.grid[0].length-1;var c=this.grid[0][b];e=new OpenLayers.Bounds(d.bounds.left,d.bounds.bottom,c.bounds.right,c.bounds.top)}return e},initSingleTile:function(f){var a=f.getCenterLonLat();var h=f.getWidth()*this.ratio;var b=f.getHeight()*this.ratio;var g=new OpenLayers.Bounds(a.lon-(h/2),a.lat-(b/2),a.lon+(h/2),a.lat+(b/2));var d=new OpenLayers.LonLat(g.left,g.top);var c=this.map.getLayerPxFromLonLat(d);if(!this.grid.length){this.grid[0]=[]}var e=this.grid[0][0];if(!e){e=this.addTile(g,c);this.addTileMonitoringHooks(e);e.draw();this.grid[0][0]=e}else{e.moveTo(g,c)}this.removeExcessTiles(1,1)},calculateGridLayout:function(a,o,e){var k=e*this.tileSize.w;var c=e*this.tileSize.h;var i=a.left-o.left;var l=Math.floor(i/k)-this.buffer;var j=i/k-l;var f=-j*this.tileSize.w;var m=o.left+l*k;var b=a.top-(o.bottom+c);var h=Math.ceil(b/c)+this.buffer;var n=h-b/c;var d=-n*this.tileSize.h;var g=o.bottom+h*c;return{tilelon:k,tilelat:c,tileoffsetlon:m,tileoffsetlat:g,tileoffsetx:f,tileoffsety:d}},initGriddedTiles:function(i){var g=this.map.getSize();var v=Math.ceil(g.h/this.tileSize.h)+Math.max(1,2*this.buffer);var z=Math.ceil(g.w/this.tileSize.w)+Math.max(1,2*this.buffer);var o=this.getMaxExtent();var r=this.map.getResolution();var q=this.calculateGridLayout(i,o,r);var f=Math.round(q.tileoffsetx);var c=Math.round(q.tileoffsety);var k=q.tileoffsetlon;var n=q.tileoffsetlat;var e=q.tilelon;var j=q.tilelat;this.origin=new OpenLayers.Pixel(f,c);var u=f;var w=k;var t=0;var a=parseInt(this.map.layerContainerDiv.style.left);var s=parseInt(this.map.layerContainerDiv.style.top);do{var h=this.grid[t++];if(!h){h=[];this.grid.push(h)}k=w;f=u;var d=0;do{var b=new OpenLayers.Bounds(k,n,k+e,n+j);var m=f;m-=a;var l=c;l-=s;var p=new OpenLayers.Pixel(m,l);var A=h[d++];if(!A){A=this.addTile(b,p);this.addTileMonitoringHooks(A);h.push(A)}else{A.moveTo(b,p,false)}k+=e;f+=this.tileSize.w}while((k<=i.right+e*this.buffer)||d<z);n-=j;c+=this.tileSize.h}while((n>=i.bottom-j*this.buffer)||t<v);this.removeExcessTiles(t,d);this.spiralTileLoad()},getMaxExtent:function(){return this.maxExtent},spiralTileLoad:function(){var b=[];var h=["right","down","left","up"];var g=0;var a=-1;var k=OpenLayers.Util.indexOf(h,"right");var l=0;while(l<h.length){var j=g;var c=a;switch(h[k]){case"right":c++;break;case"down":j++;break;case"left":c--;break;case"up":j--;break}var f=null;if((j<this.grid.length)&&(j>=0)&&(c<this.grid[0].length)&&(c>=0)){f=this.grid[j][c]}if((f!=null)&&(!f.queued)){b.unshift(f);f.queued=true;l=0;g=j;a=c}else{k=(k+1)%4;l++}}for(var d=0,e=b.length;d<e;d++){var f=b[d];f.draw();f.queued=false}},addTile:function(b,a){},addTileMonitoringHooks:function(a){a.onLoadStart=function(){if(this.numLoadingTiles==0){this.events.triggerEvent("loadstart")}this.numLoadingTiles++};a.events.register("loadstart",this,a.onLoadStart);a.onLoadEnd=function(){this.numLoadingTiles--;this.events.triggerEvent("tileloaded");if(this.numLoadingTiles==0){this.events.triggerEvent("loadend")}};a.events.register("loadend",this,a.onLoadEnd);a.events.register("unload",this,a.onLoadEnd)},removeTileMonitoringHooks:function(a){a.unload();a.events.un({loadstart:a.onLoadStart,loadend:a.onLoadEnd,unload:a.onLoadEnd,scope:this})},moveGriddedTiles:function(c){var b=this.buffer||1;while(true){var a=this.grid[0][0].position;var d=this.map.getViewPortPxFromLayerPx(a);if(d.x>-this.tileSize.w*(b-1)){this.shiftColumn(true)}else{if(d.x<-this.tileSize.w*b){this.shiftColumn(false)}else{if(d.y>-this.tileSize.h*(b-1)){this.shiftRow(true)}else{if(d.y<-this.tileSize.h*b){this.shiftRow(false)}else{break}}}}}},shiftRow:function(n){var c=(n)?0:(this.grid.length-1);var b=this.grid;var f=b[c];var e=this.map.getResolution();var h=(n)?-this.tileSize.h:this.tileSize.h;var g=e*-h;var m=(n)?b.pop():b.shift();for(var j=0,l=f.length;j<l;j++){var d=f[j];var a=d.bounds.clone();var k=d.position.clone();a.bottom=a.bottom+g;a.top=a.top+g;k.y=k.y+h;m[j].moveTo(a,k)}if(n){b.unshift(m)}else{b.push(m)}},shiftColumn:function(m){var d=(m)?-this.tileSize.w:this.tileSize.w;var c=this.map.getResolution();var k=c*d;for(var e=0,g=this.grid.length;e<g;e++){var l=this.grid[e];var j=(m)?0:(l.length-1);var b=l[j];var a=b.bounds.clone();var f=b.position.clone();a.left=a.left+k;a.right=a.right+k;f.x=f.x+d;var h=m?this.grid[e].pop():this.grid[e].shift();h.moveTo(a,f);if(m){l.unshift(h)}else{l.push(h)}}},removeExcessTiles:function(e,c){while(this.grid.length>e){var f=this.grid.pop();for(var b=0,a=f.length;b<a;b++){var d=f[b];this.removeTileMonitoringHooks(d);d.destroy()}}while(this.grid[0].length>c){for(var b=0,a=this.grid.length;b<a;b++){var f=this.grid[b];var d=f.pop();this.removeTileMonitoringHooks(d);d.destroy()}}},onMapResize:function(){if(this.singleTile){this.clearGrid();this.setTileSize()}},getTileBounds:function(d){var c=this.maxExtent;var f=this.getResolution();var e=f*this.tileSize.w;var b=f*this.tileSize.h;var h=this.getLonLatFromViewPortPx(d);var a=c.left+(e*Math.floor((h.lon-c.left)/e));var g=c.bottom+(b*Math.floor((h.lat-c.bottom)/b));return new OpenLayers.Bounds(a,g,a+e,g+b)},CLASS_NAME:"OpenLayers.Layer.Grid"});