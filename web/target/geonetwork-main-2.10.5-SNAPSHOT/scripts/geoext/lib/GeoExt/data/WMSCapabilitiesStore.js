Ext.namespace("GeoExt.data");GeoExt.data.WMSCapabilitiesStore=function(a){a=a||{};GeoExt.data.WMSCapabilitiesStore.superclass.constructor.call(this,Ext.apply(a,{proxy:a.proxy||(!a.data?new Ext.data.HttpProxy({url:a.url,disableCaching:false,method:"GET"}):undefined),reader:new GeoExt.data.WMSCapabilitiesReader(a,a.fields)}))};Ext.extend(GeoExt.data.WMSCapabilitiesStore,Ext.data.Store);