Ext.namespace("GeoExt.data");GeoExt.data.CSWRecordsReader=function(a,b){a=a||{};if(!a.format){a.format=new OpenLayers.Format.CSWGetRecords()}if(!a.root){a.root="records"}GeoExt.data.CSWRecordsReader.superclass.constructor.call(this,a,b)};Ext.extend(GeoExt.data.CSWRecordsReader,Ext.data.JsonReader,{read:function(a){var b=a.responseXML;if(!b||!b.documentElement){b=a.responseText}return this.readRecords(b)},readRecords:function(a){if(typeof a==="string"||a.nodeType){a=this.meta.format.read(a)}return GeoExt.data.CSWRecordsReader.superclass.readRecords.call(this,a)}});