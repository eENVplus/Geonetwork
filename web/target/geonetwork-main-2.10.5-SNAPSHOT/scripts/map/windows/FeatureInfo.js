Ext.namespace("GeoNetwork");GeoNetwork.FeatureInfoWindow=function(a){Ext.apply(this,a);GeoNetwork.FeatureInfoWindow.superclass.constructor.call(this)};Ext.extend(GeoNetwork.FeatureInfoWindow,GeoNetwork.BaseWindow,{control:null,initComponent:function(){GeoNetwork.FeatureInfoWindow.superclass.initComponent.call(this);this.title=this.title||OpenLayers.i18n("featureInfoWindow.windowTitle");this.width=600;this.height=250;this.cls="popup-variant1";var a=new GeoNetwork.FeatureInfoPanel();this.add(a);this.doLayout()},setFeatures:function(a){this.items.items[0].showFeatures(a)},setMap:function(a){this.items.items[0].setMap(a)}});