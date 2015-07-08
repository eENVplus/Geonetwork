OpenLayers.Protocol.WFS.v1=OpenLayers.Class(OpenLayers.Protocol,{version:null,srsName:"EPSG:4326",featureType:null,featureNS:null,geometryName:"the_geom",schema:null,featurePrefix:"feature",formatOptions:null,readFormat:null,initialize:function(b){OpenLayers.Protocol.prototype.initialize.apply(this,[b]);if(!b.format){this.format=OpenLayers.Format.WFST(OpenLayers.Util.extend({version:this.version,featureType:this.featureType,featureNS:this.featureNS,featurePrefix:this.featurePrefix,geometryName:this.geometryName,srsName:this.srsName,schema:this.schema},this.formatOptions))}if(!this.featureNS&&this.featurePrefix){var a=this.format.readNode;this.format.readNode=function(c,d){if(!this.featureNS&&c.prefix==this.featurePrefix){this.featureNS=c.namespaceURI;this.setNamespace("feature",this.featureNS)}return a.apply(this,arguments)}}},destroy:function(){if(this.options&&!this.options.format){this.format.destroy()}this.format=null;OpenLayers.Protocol.prototype.destroy.apply(this)},read:function(b){OpenLayers.Protocol.prototype.read.apply(this,arguments);b=OpenLayers.Util.extend({},b);OpenLayers.Util.applyDefaults(b,this.options||{});var a=new OpenLayers.Protocol.Response({requestType:"read"});var c=OpenLayers.Format.XML.prototype.write.apply(this.format,[this.format.writeNode("wfs:GetFeature",b)]);a.priv=OpenLayers.Request.POST({url:b.url,callback:this.createCallback(this.handleRead,a,b),params:b.params,headers:b.headers,data:c});return a},handleRead:function(a,b){if(b.callback){var c=a.priv;if(c.status>=200&&c.status<300){a.features=this.parseFeatures(c);a.code=OpenLayers.Protocol.Response.SUCCESS}else{a.code=OpenLayers.Protocol.Response.FAILURE}b.callback.call(b.scope,a)}},parseFeatures:function(a){var b=a.responseXML;if(!b||!b.documentElement){b=a.responseText}if(!b||b.length<=0){return null}return(this.readFormat!==null)?this.readFormat.read(b):this.format.read(b)},commit:function(c,b){b=OpenLayers.Util.extend({},b);OpenLayers.Util.applyDefaults(b,this.options);var a=new OpenLayers.Protocol.Response({requestType:"commit",reqFeatures:c});a.priv=OpenLayers.Request.POST({url:b.url,data:this.format.write(c,b),callback:this.createCallback(this.handleCommit,a,b)});return a},handleCommit:function(a,b){if(b.callback){var c=a.priv;var d=c.responseXML;if(!d||!d.documentElement){d=c.responseText}var e=this.format.read(d)||{};a.insertIds=e.insertIds||[];a.code=(e.success)?OpenLayers.Protocol.Response.SUCCESS:OpenLayers.Protocol.Response.FAILURE;b.callback.call(b.scope,a)}},filterDelete:function(e,c){c=OpenLayers.Util.extend({},c);OpenLayers.Util.applyDefaults(c,this.options);var b=new OpenLayers.Protocol.Response({requestType:"commit"});var a=this.format.createElementNSPlus("wfs:Transaction",{attributes:{service:"WFS",version:this.version}});var d=this.format.createElementNSPlus("wfs:Delete",{attributes:{typeName:(c.featureNS?this.featurePrefix+":":"")+c.featureType}});if(c.featureNS){d.setAttribute("xmlns:"+this.featurePrefix,c.featureNS)}var g=this.format.writeNode("ogc:Filter",e);d.appendChild(g);a.appendChild(d);var f=OpenLayers.Format.XML.prototype.write.apply(this.format,[a]);return OpenLayers.Request.POST({url:this.url,callback:c.callback||function(){},data:f})},abort:function(a){if(a){a.priv.abort()}},CLASS_NAME:"OpenLayers.Protocol.WFS.v1"});