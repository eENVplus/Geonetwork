Ext.namespace("GeoExt.data");GeoExt.data.WMCReader=function(a,b){a=a||{};if(!a.format){a.format=new OpenLayers.Format.WMC()}if(!(typeof b==="function")){b=GeoExt.data.LayerRecord.create(b||a.fields||[{name:"abstract",type:"string"},{name:"metadataURL",type:"string"},{name:"queryable",type:"boolean"},{name:"formats"},{name:"styles"}])}GeoExt.data.WMCReader.superclass.constructor.call(this,a,b)};Ext.extend(GeoExt.data.WMCReader,Ext.data.DataReader,{read:function(a){var b=a.responseXML;if(!b||!b.documentElement){b=a.responseText}return this.readRecords(b)},readRecords:function(f){var m=this.meta.format;if(typeof f==="string"||f.nodeType){f=m.read(f)}var p=f?f.layersContext:undefined;var a=[];if(p){var c=this.recordType,h=c.prototype.fields;var g,d,e,b,l,o,k,n;for(g=0,d=p.length;g<d;g++){l=p[g];o={};for(e=0,b=h.length;e<b;e++){k=h.items[e];n=l[k.mapping||k.name]||k.defaultValue;n=k.convert(n);o[k.name]=n}o.layer=m.getLayerFromContext(l);a.push(new this.recordType(o,o.layer.id))}}return{totalRecords:a.length,success:true,records:a}}});