Ext.namespace("GeoNetwork");GeoNetwork.OpacitySlider=function(a){Ext.apply(this,a);GeoNetwork.OpacitySlider.superclass.constructor.call(this)};Ext.extend(GeoNetwork.OpacitySlider,Ext.Slider,{layer:null,initComponent:function(){GeoNetwork.OpacitySlider.superclass.initComponent.call(this);this.minValue=0;this.maxValue=100;this.value=this.getInitialValue();this.on("change",this.setOpacity,this);if(this.selModel){this.selModel.on("selectionchange",this.handleSelectionChange,this)}},onDestroy:function(){this.un("change",this.setOpacity,this);this.selModel.un("selectionchange",this.handleSelectionChange,this);GeoNetwork.OpacitySlider.superclass.onDestroy.call(this)},handleSelectionChange:function(b,a){if((a)&&(a.attributes.layer)){this.setLayer(a.attributes.layer)}},getInitialValue:function(){if(this.layer===null){return 100}var a=(typeof this.layer.opacity=="number")?this.layer.opacity*100:100;return a},setOpacity:function(b,c){var a=c/100;if(this.layer){this.layer.setOpacity(a)}},setLayer:function(a){this.layer=a;if(this.rendered){this.setValue(this.getInitialValue());this.syncThumb()}},afterRender:function(){if(this.layer){this.setValue(this.getInitialValue())}}});Ext.reg("gn_opacityslider",GeoNetwork.OpacitySlider);