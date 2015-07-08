OpenLayers.Format.ArcXML=OpenLayers.Class(OpenLayers.Format.XML,{fontStyleKeys:["antialiasing","blockout","font","fontcolor","fontsize","fontstyle","glowing","interval","outline","printmode","shadow","transparency"],request:null,response:null,initialize:function(a){this.request=new OpenLayers.Format.ArcXML.Request();this.response=new OpenLayers.Format.ArcXML.Response();if(a){if(a.requesttype=="feature"){this.request.get_image=null;var c=this.request.get_feature.query;this.addCoordSys(c.featurecoordsys,a.featureCoordSys);this.addCoordSys(c.filtercoordsys,a.filterCoordSys);if(a.polygon){c.isspatial=true;c.spatialfilter.polygon=a.polygon}else{if(a.envelope){c.isspatial=true;c.spatialfilter.envelope={minx:0,miny:0,maxx:0,maxy:0};this.parseEnvelope(c.spatialfilter.envelope,a.envelope)}}}else{if(a.requesttype=="image"){this.request.get_feature=null;var b=this.request.get_image.properties;this.parseEnvelope(b.envelope,a.envelope);this.addLayers(b.layerlist,a.layers);this.addImageSize(b.imagesize,a.tileSize);this.addCoordSys(b.featurecoordsys,a.featureCoordSys);this.addCoordSys(b.filtercoordsys,a.filterCoordSys)}else{this.request=null}}}OpenLayers.Format.XML.prototype.initialize.apply(this,[a])},parseEnvelope:function(b,a){if(a&&a.length==4){b.minx=a[0];b.miny=a[1];b.maxx=a[2];b.maxy=a[3]}},addLayers:function(d,c){for(var b=0,a=c.length;b<a;b++){d.push(c[b])}},addImageSize:function(b,a){if(a!==null){b.width=a.w;b.height=a.h;b.printwidth=a.w;b.printheight=a.h}},addCoordSys:function(a,b){if(typeof b=="string"){a.id=parseInt(b);a.string=b}else{if(typeof b=="object"&&b.proj!==null){a.id=b.proj.srsProjNumber;a.string=b.proj.srsCode}else{a=b}}},iserror:function(c){var a=null;if(!c){a=(this.response.error!=="")}else{c=OpenLayers.Format.XML.prototype.read.apply(this,[c]);var b=c.documentElement.getElementsByTagName("ERROR");a=(b!==null&&b.length>0)}return a},read:function(f){if(typeof f=="string"){f=OpenLayers.Format.XML.prototype.read.apply(this,[f])}var a=null;if(f&&f.documentElement){if(f.documentElement.nodeName=="ARCXML"){a=f.documentElement}else{a=f.documentElement.getElementsByTagName("ARCXML")[0]}}if(!a||a.firstChild.nodeName==="parsererror"){var c,e;try{c=f.firstChild.nodeValue;e=f.firstChild.childNodes[1].firstChild.nodeValue}catch(d){}throw {message:"Error parsing the ArcXML request",error:c,source:e}}var b=this.parseResponse(a);return b},write:function(c){if(!c){c=this.request}var q=this.createElementNS("","ARCXML");q.setAttribute("version","1.1");var h=this.createElementNS("","REQUEST");if(c.get_image!=null){var k=this.createElementNS("","GET_IMAGE");h.appendChild(k);var j=this.createElementNS("","PROPERTIES");k.appendChild(j);var b=c.get_image.properties;if(b.featurecoordsys!=null){var o=this.createElementNS("","FEATURECOORDSYS");j.appendChild(o);if(b.featurecoordsys.id===0){o.setAttribute("string",b.featurecoordsys.string)}else{o.setAttribute("id",b.featurecoordsys.id)}}if(b.filtercoordsys!=null){var m=this.createElementNS("","FILTERCOORDSYS");j.appendChild(m);if(b.filtercoordsys.id===0){m.setAttribute("string",b.filtercoordsys.string)}else{m.setAttribute("id",b.filtercoordsys.id)}}if(b.envelope!=null){var u=this.createElementNS("","ENVELOPE");j.appendChild(u);u.setAttribute("minx",b.envelope.minx);u.setAttribute("miny",b.envelope.miny);u.setAttribute("maxx",b.envelope.maxx);u.setAttribute("maxy",b.envelope.maxy)}var s=this.createElementNS("","IMAGESIZE");j.appendChild(s);s.setAttribute("height",b.imagesize.height);s.setAttribute("width",b.imagesize.width);if(b.imagesize.height!=b.imagesize.printheight||b.imagesize.width!=b.imagesize.printwidth){s.setAttribute("printheight",b.imagesize.printheight);s.setArrtibute("printwidth",b.imagesize.printwidth)}if(b.background!=null){var a=this.createElementNS("","BACKGROUND");j.appendChild(a);a.setAttribute("color",b.background.color.r+","+b.background.color.g+","+b.background.color.b);if(b.background.transcolor!==null){a.setAttribute("transcolor",b.background.transcolor.r+","+b.background.transcolor.g+","+b.background.transcolor.b)}}if(b.layerlist!=null&&b.layerlist.length>0){var g=this.createElementNS("","LAYERLIST");j.appendChild(g);for(var p=0;p<b.layerlist.length;p++){var n=this.createElementNS("","LAYERDEF");g.appendChild(n);n.setAttribute("id",b.layerlist[p].id);n.setAttribute("visible",b.layerlist[p].visible);if(typeof b.layerlist[p].query=="object"){var f=b.layerlist[p].query;if(f.where.length<0){continue}var x=null;if(typeof f.spatialfilter=="boolean"&&f.spatialfilter){x=this.createElementNS("","SPATIALQUERY")}else{x=this.createElementNS("","QUERY")}x.setAttribute("where",f.where);if(typeof f.accuracy=="number"&&f.accuracy>0){x.setAttribute("accuracy",f.accuracy)}if(typeof f.featurelimit=="number"&&f.featurelimit<2000){x.setAttribute("featurelimit",f.featurelimit)}if(typeof f.subfields=="string"&&f.subfields!="#ALL#"){x.setAttribute("subfields",f.subfields)}if(typeof f.joinexpression=="string"&&f.joinexpression.length>0){x.setAttribute("joinexpression",f.joinexpression)}if(typeof f.jointables=="string"&&f.jointables.length>0){x.setAttribute("jointables",f.jointables)}n.appendChild(x)}if(typeof b.layerlist[p].renderer=="object"){this.addRenderer(n,b.layerlist[p].renderer)}}}}else{if(c.get_feature!=null){var k=this.createElementNS("","GET_FEATURES");k.setAttribute("outputmode","newxml");k.setAttribute("checkesc","true");if(c.get_feature.geometry){k.setAttribute("geometry",c.get_feature.geometry)}else{k.setAttribute("geometry","false")}if(c.get_feature.compact){k.setAttribute("compact",c.get_feature.compact)}if(c.get_feature.featurelimit=="number"){k.setAttribute("featurelimit",c.get_feature.featurelimit)}k.setAttribute("globalenvelope","true");h.appendChild(k);if(c.get_feature.layer!=null&&c.get_feature.layer.length>0){var v=this.createElementNS("","LAYER");v.setAttribute("id",c.get_feature.layer);k.appendChild(v)}var r=c.get_feature.query;if(r!=null){var t=null;if(r.isspatial){t=this.createElementNS("","SPATIALQUERY")}else{t=this.createElementNS("","QUERY")}k.appendChild(t);if(typeof r.accuracy=="number"){t.setAttribute("accuracy",r.accuracy)}if(r.featurecoordsys!=null){var e=this.createElementNS("","FEATURECOORDSYS");if(r.featurecoordsys.id==0){e.setAttribute("string",r.featurecoordsys.string)}else{e.setAttribute("id",r.featurecoordsys.id)}t.appendChild(e)}if(r.filtercoordsys!=null){var d=this.createElementNS("","FILTERCOORDSYS");if(r.filtercoordsys.id===0){d.setAttribute("string",r.filtercoordsys.string)}else{d.setAttribute("id",r.filtercoordsys.id)}t.appendChild(d)}if(r.buffer>0){var l=this.createElementNS("","BUFFER");l.setAttribute("distance",r.buffer);t.appendChild(l)}if(r.isspatial){var i=this.createElementNS("","SPATIALFILTER");i.setAttribute("relation",r.spatialfilter.relation);t.appendChild(i);if(r.spatialfilter.envelope){var w=this.createElementNS("","ENVELOPE");w.setAttribute("minx",r.spatialfilter.envelope.minx);w.setAttribute("miny",r.spatialfilter.envelope.miny);w.setAttribute("maxx",r.spatialfilter.envelope.maxx);w.setAttribute("maxy",r.spatialfilter.envelope.maxy);i.appendChild(w)}else{if(typeof r.spatialfilter.polygon=="object"){i.appendChild(this.writePolygonGeometry(r.spatialfilter.polygon))}}}if(r.where!=null&&r.where.length>0){t.setAttribute("where",r.where)}}}}q.appendChild(h);return OpenLayers.Format.XML.prototype.write.apply(this,[q])},addGroupRenderer:function(b,a){var e=this.createElementNS("","GROUPRENDERER");b.appendChild(e);for(var c=0;c<a.length;c++){var d=a[c];this.addRenderer(e,d)}},addRenderer:function(c,b){if(b instanceof Array){this.addGroupRenderer(c,b)}else{var a=this.createElementNS("",b.type.toUpperCase()+"RENDERER");c.appendChild(a);if(a.tagName=="VALUEMAPRENDERER"){this.addValueMapRenderer(a,b)}else{if(a.tagName=="VALUEMAPLABELRENDERER"){this.addValueMapLabelRenderer(a,b)}else{if(a.tagName=="SIMPLELABELRENDERER"){this.addSimpleLabelRenderer(a,b)}else{if(a.tagName=="SCALEDEPENDENTRENDERER"){this.addScaleDependentRenderer(a,b)}}}}}},addScaleDependentRenderer:function(a,b){if(typeof b.lower=="string"||typeof b.lower=="number"){a.setAttribute("lower",b.lower)}if(typeof b.upper=="string"||typeof b.upper=="number"){a.setAttribute("upper",b.upper)}this.addRenderer(a,b.renderer)},addValueMapLabelRenderer:function(h,g){h.setAttribute("lookupfield",g.lookupfield);h.setAttribute("labelfield",g.labelfield);if(typeof g.exacts=="object"){for(var a=0,k=g.exacts.length;a<k;a++){var e=g.exacts[a];var d=this.createElementNS("","EXACT");if(typeof e.value=="string"){d.setAttribute("value",e.value)}if(typeof e.label=="string"){d.setAttribute("label",e.label)}if(typeof e.method=="string"){d.setAttribute("method",e.method)}h.appendChild(d);if(typeof e.symbol=="object"){var b=null;if(e.symbol.type=="text"){b=this.createElementNS("","TEXTSYMBOL")}if(b!=null){var l=this.fontStyleKeys;for(var c=0,f=l.length;c<f;c++){var j=l[c];if(e.symbol[j]){b.setAttribute(j,e.symbol[j])}}d.appendChild(b)}}}}},addValueMapRenderer:function(j,i){j.setAttribute("lookupfield",i.lookupfield);if(typeof i.ranges=="object"){for(var a=0,b=i.ranges.length;a<b;a++){var g=i.ranges[a];var e=this.createElementNS("","RANGE");e.setAttribute("lower",g.lower);e.setAttribute("upper",g.upper);j.appendChild(e);if(typeof g.symbol=="object"){var d=null;if(g.symbol.type=="simplepolygon"){d=this.createElementNS("","SIMPLEPOLYGONSYMBOL")}if(d!=null){if(typeof g.symbol.boundarycolor=="string"){d.setAttribute("boundarycolor",g.symbol.boundarycolor)}if(typeof g.symbol.fillcolor=="string"){d.setAttribute("fillcolor",g.symbol.fillcolor)}if(typeof g.symbol.filltransparency=="number"){d.setAttribute("filltransparency",g.symbol.filltransparency)}e.appendChild(d)}}}}else{if(typeof i.exacts=="object"){for(var c=0,k=i.exacts.length;c<k;c++){var h=i.exacts[c];var f=this.createElementNS("","EXACT");if(typeof h.value=="string"){f.setAttribute("value",h.value)}if(typeof h.label=="string"){f.setAttribute("label",h.label)}if(typeof h.method=="string"){f.setAttribute("method",h.method)}j.appendChild(f);if(typeof h.symbol=="object"){var d=null;if(h.symbol.type=="simplemarker"){d=this.createElementNS("","SIMPLEMARKERSYMBOL")}if(d!=null){if(typeof h.symbol.antialiasing=="string"){d.setAttribute("antialiasing",h.symbol.antialiasing)}if(typeof h.symbol.color=="string"){d.setAttribute("color",h.symbol.color)}if(typeof h.symbol.outline=="string"){d.setAttribute("outline",h.symbol.outline)}if(typeof h.symbol.overlap=="string"){d.setAttribute("overlap",h.symbol.overlap)}if(typeof h.symbol.shadow=="string"){d.setAttribute("shadow",h.symbol.shadow)}if(typeof h.symbol.transparency=="number"){d.setAttribute("transparency",h.symbol.transparency)}if(typeof h.symbol.usecentroid=="string"){d.setAttribute("usecentroid",h.symbol.usecentroid)}if(typeof h.symbol.width=="number"){d.setAttribute("width",h.symbol.width)}f.appendChild(d)}}}}}},addSimpleLabelRenderer:function(f,h){f.setAttribute("field",h.field);var e=["featureweight","howmanylabels","labelbufferratio","labelpriorities","labelweight","linelabelposition","rotationalangles"];for(var d=0,a=e.length;d<a;d++){var c=e[d];if(h[c]){f.setAttribute(c,h[c])}}if(h.symbol.type=="text"){var g=h.symbol;var b=this.createElementNS("","TEXTSYMBOL");f.appendChild(b);var e=this.fontStyleKeys;for(var d=0,a=e.length;d<a;d++){var c=e[d];if(g[c]){b.setAttribute(c,h[c])}}}},writePolygonGeometry:function(g){if(!(g instanceof OpenLayers.Geometry.Polygon)){throw {message:"Cannot write polygon geometry to ArcXML with an "+g.CLASS_NAME+" object.",geometry:g}}var b=this.createElementNS("","POLYGON");for(var e=0,c=g.components.length;e<c;e++){var a=g.components[e];var i=this.createElementNS("","RING");for(var d=0,j=a.components.length;d<j;d++){var h=a.components[d];var f=this.createElementNS("","POINT");f.setAttribute("x",h.x);f.setAttribute("y",h.y);i.appendChild(f)}b.appendChild(i)}return b},parseResponse:function(z){if(typeof z=="string"){var n=new OpenLayers.Format.XML();z=n.read(z)}var a=new OpenLayers.Format.ArcXML.Response();var A=z.getElementsByTagName("ERROR");if(A!=null&&A.length>0){a.error=this.getChildValue(A,"Unknown error.")}else{var r=z.getElementsByTagName("RESPONSE");if(r==null||r.length==0){a.error="No RESPONSE tag found in ArcXML response.";return a}var q=r[0].firstChild.nodeName;if(q=="#text"){q=r[0].firstChild.nextSibling.nodeName}if(q=="IMAGE"){var c=z.getElementsByTagName("ENVELOPE");var w=z.getElementsByTagName("OUTPUT");if(c==null||c.length==0){a.error="No ENVELOPE tag found in ArcXML response."}else{if(w==null||w.length==0){a.error="No OUTPUT tag found in ArcXML response."}else{var u=this.parseAttributes(c[0]);var v=this.parseAttributes(w[0]);if(typeof v.type=="string"){a.image={envelope:u,output:{type:v.type,data:this.getChildValue(w[0])}}}else{a.image={envelope:u,output:v}}}}}else{if(q=="FEATURES"){var i=r[0].getElementsByTagName("FEATURES");var p=i[0].getElementsByTagName("FEATURECOUNT");a.features.featurecount=p[0].getAttribute("count");if(a.features.featurecount>0){var d=i[0].getElementsByTagName("ENVELOPE");a.features.envelope=this.parseAttributes(d[0],typeof(0));var x=i[0].getElementsByTagName("FEATURE");for(var m=0;m<x.length;m++){var h=new OpenLayers.Feature.Vector();var s=x[m].getElementsByTagName("FIELD");for(var f=0;f<s.length;f++){var g=s[f].getAttribute("name");var k=s[f].getAttribute("value");h.attributes[g]=k}var t=x[m].getElementsByTagName("POLYGON");if(t.length>0){var j=t[0].getElementsByTagName("RING");var e=[];for(var o=0;o<j.length;o++){var y=[];y.push(this.parsePointGeometry(j[o]));var l=j[o].getElementsByTagName("HOLE");for(var b=0;b<l.length;b++){y.push(this.parsePointGeometry(l[b]))}l=null;e.push(new OpenLayers.Geometry.Polygon(y));y=null}j=null;if(e.length==1){h.geometry=e[0]}else{h.geometry=new OpenLayers.Geometry.MultiPolygon(e)}}a.features.feature.push(h)}}}else{a.error="Unidentified response type."}}}return a},parseAttributes:function(d,c){var b={};for(var a=0;a<d.attributes.length;a++){if(c=="number"){b[d.attributes[a].nodeName]=parseFloat(d.attributes[a].nodeValue)}else{b[d.attributes[a].nodeName]=d.attributes[a].nodeValue}}return b},parsePointGeometry:function(d){var b=[];var e=d.getElementsByTagName("COORDS");if(e.length>0){var f=this.getChildValue(e[0]);f=f.split(/;/);for(var h=0;h<f.length;h++){var g=f[h].split(/ /);b.push(new OpenLayers.Geometry.Point(parseFloat(g[0]),parseFloat(g[1])))}e=null}else{var a=d.getElementsByTagName("POINT");if(a.length>0){for(var c=0;c<a.length;c++){b.push(new OpenLayers.Geometry.Point(parseFloat(a[c].getAttribute("x")),parseFloat(a[c].getAttribute("y"))))}}a=null}return new OpenLayers.Geometry.LinearRing(b)},CLASS_NAME:"OpenLayers.Format.ArcXML"});OpenLayers.Format.ArcXML.Request=OpenLayers.Class({initialize:function(b){var a={get_image:{properties:{background:null,draw:true,envelope:{minx:0,miny:0,maxx:0,maxy:0},featurecoordsys:{id:0,string:"",datumtransformid:0,datumtransformstring:""},filtercoordsys:{id:0,string:"",datumtransformid:0,datumtransformstring:""},imagesize:{height:0,width:0,dpi:96,printheight:0,printwidth:0,scalesymbols:false},layerlist:[],output:{baseurl:"",legendbaseurl:"",legendname:"",legendpath:"",legendurl:"",name:"",path:"",type:"jpg",url:""}}},get_feature:{layer:"",query:{isspatial:false,featurecoordsys:{id:0,string:"",datumtransformid:0,datumtransformstring:""},filtercoordsys:{id:0,string:"",datumtransformid:0,datumtransformstring:""},buffer:0,where:"",spatialfilter:{relation:"envelope_intersection",envelope:null}}},environment:{separators:{cs:" ",ts:";"}},layer:[],workspaces:[]};return OpenLayers.Util.extend(this,a)},CLASS_NAME:"OpenLayers.Format.ArcXML.Request"});OpenLayers.Format.ArcXML.Response=OpenLayers.Class({initialize:function(b){var a={image:{envelope:null,output:""},features:{featurecount:0,envelope:null,feature:[]},error:""};return OpenLayers.Util.extend(this,a)},CLASS_NAME:"OpenLayers.Format.ArcXML.Response"});