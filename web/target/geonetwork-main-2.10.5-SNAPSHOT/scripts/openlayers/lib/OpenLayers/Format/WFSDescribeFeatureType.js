OpenLayers.Format.WFSDescribeFeatureType=OpenLayers.Class(OpenLayers.Format.XML,{namespaces:{xsd:"http://www.w3.org/2001/XMLSchema"},initialize:function(a){OpenLayers.Format.XML.prototype.initialize.apply(this,[a])},readers:{xsd:{schema:function(d,j){var e=[];var b={};var f={complexTypes:e,customTypes:b};this.readChildNodes(d,f);var g=d.attributes;var l,a;for(var h=0,k=g.length;h<k;++h){l=g[h];a=l.name;if(a.indexOf("xmlns")==0){this.setNamespace(a.split(":")[1]||"",l.value)}else{j[a]=l.value}}j.featureTypes=e;j.targetPrefix=this.namespaceAlias[j.targetNamespace];var m,c;for(var h=0,k=e.length;h<k;++h){m=e[h];c=b[m.typeName];if(b[m.typeName]){m.typeName=c.name}}},complexType:function(b,c){var a={typeName:b.getAttribute("name")};this.readChildNodes(b,a);c.complexTypes.push(a)},complexContent:function(a,b){this.readChildNodes(a,b)},extension:function(a,b){this.readChildNodes(a,b)},sequence:function(a,b){var c={elements:[]};this.readChildNodes(a,c);b.properties=c.elements},element:function(a,c){if(c.elements){var d={};var b=a.attributes;var g;for(var e=0,f=b.length;e<f;++e){g=b[e];d[g.name]=g.value}var h=d.type;if(!h){h={};this.readChildNodes(a,h);d.restriction=h;d.type=h.base}var k=h.base||h;d.localType=k.split(":").pop();c.elements.push(d)}if(c.complexTypes){var h=a.getAttribute("type");var j=h.split(":").pop();c.customTypes[j]={name:a.getAttribute("name"),type:h}}},simpleType:function(a,b){this.readChildNodes(a,b)},restriction:function(a,b){b.base=a.getAttribute("base");this.readRestriction(a,b)}}},readRestriction:function(d,f){var c=d.childNodes;var h,g,e;for(var b=0,a=c.length;b<a;++b){h=c[b];if(h.nodeType==1){g=h.nodeName.split(":").pop();e=h.getAttribute("value");if(!f[g]){f[g]=e}else{if(typeof f[g]=="string"){f[g]=[f[g]]}f[g].push(e)}}}},read:function(b){if(typeof b=="string"){b=OpenLayers.Format.XML.prototype.read.apply(this,[b])}if(b&&b.nodeType==9){b=b.documentElement}var a={};this.readNode(b,a);return a},CLASS_NAME:"OpenLayers.Format.WFSDescribeFeatureType"});