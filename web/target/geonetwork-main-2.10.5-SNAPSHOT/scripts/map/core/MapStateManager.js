Ext.namespace("GeoNetwork","GeoNetwork.MapStateManager");GeoNetwork.MapStateManager=function(){var b="@";var g="|";var h="maplayers";var c="mapextent";var a="";var e="";var i=function(k){var m="";var j=document.cookie.indexOf(k+"=");if(j!=-1){j+=k.length+1;var l=document.cookie.indexOf(";",j);if(l==-1){l=document.cookie.length}m=document.cookie.substring(j,l)}return m};var d=function(j,k){var m=j+"="+k;var l=new Date();l.setDate(l.getDate()+1);m+=";expires="+l.toGMTString();document.cookie=m};var f=function(k,j){if(typeof(k)!="undefined"){return k}else{if(typeof(j)!="undefined"){return j}else{return""}}};return{storeMapLayersState:function(p){var o=p.layers;var n="";for(var m=0;m<o.length;m++){if((!o[m].isBaseLayer)&&(o[m].displayInLayerSwitcher)){var q=Object.toJSON(o[m].params);var l=Object.toJSON(o[m].options);var k=f(o[m].opacity,1);var j=o[m].name+g+o[m].url+g+q+g+l+g+k;if(n.length>0){n=n+b}n=n+j}}d(h,n)},stoteMapExtextState:function(l){var j=l.getExtent();var k=j.left+g+j.bottom+g+j.right+g+j.top;d(c,k)},loadMapState:function(){var j=i(h);if(j!=""){a=j}j=i(c);if(j!=""){e=j}},applyMapState:function(j){if(a!=""){var s=a.split(b);for(var o=0;o<s.length;o++){var r=s[o].split(g);if(r.length==5){var k=r[0];var l=r[1];var m=r[2].evalJSON(true);var u=r[3].evalJSON(true);var p=r[4];var n=new OpenLayers.Layer.WMS(k,l,m,u);if(!GeoNetwork.OGCUtil.layerExistsInMap(n,j)){if(p){n.setOpacity(parseFloat(p))}j.addLayer(n)}}}}if(e){var q=e.split(g);if(q.length==4){var t=new OpenLayers.Bounds(q[0],q[1],q[2],q[3]);j.zoomToExtent(t)}}}}};GeoNetwork.MapStateManager=new GeoNetwork.MapStateManager();