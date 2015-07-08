OpenLayers.Format.WMC.v1=OpenLayers.Class(OpenLayers.Format.XML,{namespaces:{ol:"http://openlayers.org/context",wmc:"http://www.opengis.net/context",sld:"http://www.opengis.net/sld",xlink:"http://www.w3.org/1999/xlink",xsi:"http://www.w3.org/2001/XMLSchema-instance"},schemaLocation:"",getNamespacePrefix:function(a){var b=null;if(a==null){b=this.namespaces[this.defaultPrefix]}else{for(b in this.namespaces){if(this.namespaces[b]==a){break}}}return b},defaultPrefix:"wmc",rootPrefix:null,defaultStyleName:"",defaultStyleTitle:"Default",initialize:function(a){OpenLayers.Format.XML.prototype.initialize.apply(this,[a])},read:function(c){if(typeof c=="string"){c=OpenLayers.Format.XML.prototype.read.apply(this,[c])}var a=c.documentElement;this.rootPrefix=a.prefix;var b={version:a.getAttribute("version")};this.runChildNodes(b,a);return b},runChildNodes:function(e,d){var b=d.childNodes;var a,c,g,j;for(var f=0,h=b.length;f<h;++f){a=b[f];if(a.nodeType==1){g=this.getNamespacePrefix(a.namespaceURI);j=a.nodeName.split(":").pop();c=this["read_"+g+"_"+j];if(c){c.apply(this,[e,a])}}}},read_wmc_General:function(a,b){this.runChildNodes(a,b)},read_wmc_BoundingBox:function(a,b){a.projection=b.getAttribute("SRS");a.bounds=new OpenLayers.Bounds(parseFloat(b.getAttribute("minx")),parseFloat(b.getAttribute("miny")),parseFloat(b.getAttribute("maxx")),parseFloat(b.getAttribute("maxy")))},read_wmc_LayerList:function(a,b){a.layersContext=[];this.runChildNodes(a,b)},read_wmc_Layer:function(a,b){var c={visibility:(b.getAttribute("hidden")!="1"),queryable:(b.getAttribute("queryable")=="1"),formats:[],styles:[]};this.runChildNodes(c,b);a.layersContext.push(c)},read_wmc_Extension:function(b,a){this.runChildNodes(b,a)},read_ol_units:function(b,a){b.units=this.getChildValue(a)},read_ol_maxExtent:function(c,b){var a=new OpenLayers.Bounds(b.getAttribute("minx"),b.getAttribute("miny"),b.getAttribute("maxx"),b.getAttribute("maxy"));c.maxExtent=a},read_ol_transparent:function(b,a){b.transparent=this.getChildValue(a)},read_ol_numZoomLevels:function(b,a){b.numZoomLevels=parseInt(this.getChildValue(a))},read_ol_opacity:function(b,a){b.opacity=parseFloat(this.getChildValue(a))},read_ol_singleTile:function(b,a){b.singleTile=(this.getChildValue(a)=="true")},read_ol_tileSize:function(b,a){var c={width:a.getAttribute("width"),height:a.getAttribute("height")};b.tileSize=c},read_ol_isBaseLayer:function(b,a){b.isBaseLayer=(this.getChildValue(a)=="true")},read_ol_displayInLayerSwitcher:function(b,a){b.displayInLayerSwitcher=(this.getChildValue(a)=="true")},read_wmc_Server:function(c,b){c.version=b.getAttribute("version");var d={};var a=b.getElementsByTagName("OnlineResource");if(a.length>0){this.read_wmc_OnlineResource(d,a[0])}c.url=d.href},read_wmc_FormatList:function(b,a){this.runChildNodes(b,a)},read_wmc_Format:function(b,a){var c={value:this.getChildValue(a)};if(a.getAttribute("current")=="1"){c.current=true}b.formats.push(c)},read_wmc_StyleList:function(b,a){this.runChildNodes(b,a)},read_wmc_Style:function(c,b){var a={};this.runChildNodes(a,b);if(b.getAttribute("current")=="1"){a.current=true}c.styles.push(a)},read_wmc_SLD:function(a,b){this.runChildNodes(a,b)},read_sld_StyledLayerDescriptor:function(c,b){var a=OpenLayers.Format.XML.prototype.write.apply(this,[b]);c.body=a},read_wmc_OnlineResource:function(b,a){b.href=this.getAttributeNS(a,this.namespaces.xlink,"href")},read_wmc_Name:function(c,b){var a=this.getChildValue(b);if(a){c.name=a}},read_wmc_Title:function(b,a){var c=this.getChildValue(a);if(c){b.title=c}},read_wmc_MetadataURL:function(c,b){var d={};var a=b.getElementsByTagName("OnlineResource");if(a.length>0){this.read_wmc_OnlineResource(d,a[0])}c.metadataURL=d.href},read_wmc_Abstract:function(c,b){var a=this.getChildValue(b);if(a){c["abstract"]=a}},read_wmc_LegendURL:function(c,d){var b={width:d.getAttribute("width"),height:d.getAttribute("height")};var a=d.getElementsByTagName("OnlineResource");if(a.length>0){this.read_wmc_OnlineResource(b,a[0])}c.legend=b},write:function(c,b){var a=this.createElementDefaultNS("ViewContext");this.setAttributes(a,{version:this.VERSION,id:(b&&typeof b.id=="string")?b.id:OpenLayers.Util.createUniqueID("OpenLayers_Context_")});this.setAttributeNS(a,this.namespaces.xsi,"xsi:schemaLocation",this.schemaLocation);a.appendChild(this.write_wmc_General(c));a.appendChild(this.write_wmc_LayerList(c));return OpenLayers.Format.XML.prototype.write.apply(this,[a])},createElementDefaultNS:function(c,b,a){var d=this.createElementNS(this.namespaces[this.defaultPrefix],c);if(b){d.appendChild(this.createTextNode(b))}if(a){this.setAttributes(d,a)}return d},setAttributes:function(b,d){var c;for(var a in d){c=d[a].toString();if(c.match(/[A-Z]/)){this.setAttributeNS(b,null,a,c)}else{b.setAttribute(a,c)}}},write_wmc_General:function(a){var c=this.createElementDefaultNS("General");if(a.size){c.appendChild(this.createElementDefaultNS("Window",null,{width:a.size.w,height:a.size.h}))}var b=a.bounds;c.appendChild(this.createElementDefaultNS("BoundingBox",null,{minx:b.left.toPrecision(18),miny:b.bottom.toPrecision(18),maxx:b.right.toPrecision(18),maxy:b.top.toPrecision(18),SRS:a.projection}));c.appendChild(this.createElementDefaultNS("Title",a.title));c.appendChild(this.write_ol_MapExtension(a));return c},write_ol_MapExtension:function(b){var d=this.createElementDefaultNS("Extension");var c=b.maxExtent;if(c){var a=this.createElementNS(this.namespaces.ol,"ol:maxExtent");this.setAttributes(a,{minx:c.left.toPrecision(18),miny:c.bottom.toPrecision(18),maxx:c.right.toPrecision(18),maxy:c.top.toPrecision(18)});d.appendChild(a)}return d},write_wmc_LayerList:function(c){var d=this.createElementDefaultNS("LayerList");for(var b=0,a=c.layersContext.length;b<a;++b){d.appendChild(this.write_wmc_Layer(c.layersContext[b]))}return d},write_wmc_Layer:function(a){var b=this.createElementDefaultNS("Layer",null,{queryable:a.queryable?"1":"0",hidden:a.visibility?"0":"1"});b.appendChild(this.write_wmc_Server(a));b.appendChild(this.createElementDefaultNS("Name",a.name));b.appendChild(this.createElementDefaultNS("Title",a.title));if(a.metadataURL){b.appendChild(this.write_wmc_MetadataURL(a.metadataURL))}return b},write_wmc_LayerExtension:function(b){var d=this.createElementDefaultNS("Extension");var a=b.maxExtent;var h=this.createElementNS(this.namespaces.ol,"ol:maxExtent");this.setAttributes(h,{minx:a.left.toPrecision(18),miny:a.bottom.toPrecision(18),maxx:a.right.toPrecision(18),maxy:a.top.toPrecision(18)});d.appendChild(h);if(b.tileSize&&!b.singleTile){var j=this.createElementNS(this.namespaces.ol,"ol:tileSize");this.setAttributes(j,b.tileSize);d.appendChild(j)}var g=["transparent","numZoomLevels","units","isBaseLayer","opacity","displayInLayerSwitcher","singleTile"];var c;for(var e=0,f=g.length;e<f;++e){c=this.createOLPropertyNode(b,g[e]);if(c){d.appendChild(c)}}return d},createOLPropertyNode:function(b,c){var a=null;if(b[c]!=null){a=this.createElementNS(this.namespaces.ol,"ol:"+c);a.appendChild(this.createTextNode(b[c].toString()))}return a},write_wmc_Server:function(a){var b=this.createElementDefaultNS("Server");this.setAttributes(b,{service:"OGC:WMS",version:a.version});b.appendChild(this.write_wmc_OnlineResource(a.url));return b},write_wmc_MetadataURL:function(b){var a=this.createElementDefaultNS("MetadataURL");a.appendChild(this.write_wmc_OnlineResource(b));return a},write_wmc_FormatList:function(c){var d=this.createElementDefaultNS("FormatList");for(var b=0,a=c.formats.length;b<a;b++){var e=c.formats[b];d.appendChild(this.createElementDefaultNS("Format",e.value,(e.current&&e.current==true)?{current:"1"}:null))}return d},write_wmc_StyleList:function(e){var c=this.createElementDefaultNS("StyleList");var k=e.styles;if(k&&k instanceof Array){var a;for(var d=0,f=k.length;d<f;d++){var l=k[d];var b=this.createElementDefaultNS("Style",null,(l.current&&l.current==true)?{current:"1"}:null);if(l.href){a=this.createElementDefaultNS("SLD");var g=this.write_wmc_OnlineResource(l.href);a.appendChild(g);a.appendChild(this.createElementDefaultNS("Name",l.name));if(l.title){a.appendChild(this.createElementDefaultNS("Title",l.title))}b.appendChild(a)}else{if(l.body){a=this.createElementDefaultNS("SLD");var h=OpenLayers.Format.XML.prototype.read.apply(this,[l.body]);var j=h.documentElement;if(a.ownerDocument&&a.ownerDocument.importNode){j=a.ownerDocument.importNode(j,true)}a.appendChild(j);a.appendChild(this.createElementDefaultNS("Name",l.name));if(l.title){a.appendChild(this.createElementDefaultNS("Title",l.title))}b.appendChild(a)}else{b.appendChild(this.createElementDefaultNS("Name",l.name));b.appendChild(this.createElementDefaultNS("Title",l.title));if(l["abstract"]){b.appendChild(this.createElementDefaultNS("Abstract",l["abstract"]))}}}c.appendChild(b)}}return c},write_wmc_OnlineResource:function(a){var b=this.createElementDefaultNS("OnlineResource");this.setAttributeNS(b,this.namespaces.xlink,"xlink:type","simple");this.setAttributeNS(b,this.namespaces.xlink,"xlink:href",a);return b},CLASS_NAME:"OpenLayers.Format.WMC.v1"});