Ext.namespace("GeoExt.data");GeoExt.data.WMSDescribeLayerStore=function(a){a=a||{};GeoExt.data.WMSDescribeLayerStore.superclass.constructor.call(this,Ext.apply(a,{proxy:a.proxy||(!a.data?new Ext.data.HttpProxy({url:a.url,disableCaching:false,method:"GET"}):undefined),reader:new GeoExt.data.WMSDescribeLayerReader(a,a.fields)}))};Ext.extend(GeoExt.data.WMSDescribeLayerStore,Ext.data.Store);