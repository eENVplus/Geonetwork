Ext.namespace("GeoNetwork");GeoNetwork.WmsLayerMetadataWindow=function(a){Ext.apply(this,a);GeoNetwork.WmsLayerMetadataWindow.superclass.constructor.call(this)};Ext.extend(GeoNetwork.WmsLayerMetadataWindow,GeoNetwork.BaseWindow,{layer:null,initComponent:function(){GeoNetwork.WmsLayerMetadataWindow.superclass.initComponent.call(this);this.title=this.title||OpenLayers.i18n("layerInfoPanel.windowTitle");this.width=575;this.height=300;this.infoLayerPanel=new GeoNetwork.wms.LayerInfoPanel({map:this.map});this.add(this.infoLayerPanel);this.doLayout()},showLayerInfo:function(a){this.infoLayerPanel.layer=a;this.infoLayerPanel.onlineresource=a.url;this.infoLayerPanel.showLayerInfo()}});