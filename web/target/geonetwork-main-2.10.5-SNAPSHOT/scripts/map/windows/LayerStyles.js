Ext.namespace("GeoNetwork");GeoNetwork.LayerStylesWindow=function(a){Ext.apply(this,a);GeoNetwork.LayerStylesWindow.superclass.constructor.call(this)};Ext.extend(GeoNetwork.LayerStylesWindow,GeoNetwork.BaseWindow,{initComponent:function(){GeoNetwork.LayerStylesWindow.superclass.initComponent.call(this);this.title=this.title||OpenLayers.i18n("layerStylesWindowTitle");this.width=575;this.height=300;this.layerStylesPanel=new GeoNetwork.wms.LayerStylesPanel({map:this.map});this.add(this.layerStylesPanel);this.addButton(OpenLayers.i18n("selectStyleButton"),this._selectStyle,this);this.doLayout()},showLayerStyles:function(a){this.layer=a;this.layerStylesPanel.showLayerStyles(a)},_selectStyle:function(){this.layer.mergeNewParams({styles:this.layerStylesPanel.selectedStyle});this.layer.legendURL=this.layerStylesPanel.selectedStyleLegendUrl}});