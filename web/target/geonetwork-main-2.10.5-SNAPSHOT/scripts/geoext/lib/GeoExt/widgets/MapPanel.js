Ext.namespace("GeoExt");GeoExt.MapPanel=Ext.extend(Ext.Panel,{map:null,layers:null,center:null,zoom:null,extent:null,initComponent:function(){if(!(this.map instanceof OpenLayers.Map)){this.map=new OpenLayers.Map(Ext.applyIf(this.map||{},{allOverlays:true}))}var a=this.layers;if(!a||a instanceof Array){this.layers=new GeoExt.data.LayerStore({layers:a,map:this.map})}if(typeof this.center=="string"){this.center=OpenLayers.LonLat.fromString(this.center)}else{if(this.center instanceof Array){this.center=new OpenLayers.LonLat(this.center[0],this.center[1])}}if(typeof this.extent=="string"){this.extent=OpenLayers.Bounds.fromString(this.extent)}else{if(this.extent instanceof Array){this.extent=OpenLayers.Bounds.fromArray(this.extent)}}GeoExt.MapPanel.superclass.initComponent.call(this)},updateMapSize:function(){if(this.map){this.map.updateSize()}},renderMap:function(){var a=this.map;a.render(this.body.dom);if(a.layers.length>0){if(this.center||this.zoom!=null){a.setCenter(this.center,this.zoom)}else{if(this.extent){a.zoomToExtent(this.extent)}else{a.zoomToMaxExtent()}}}},afterRender:function(){GeoExt.MapPanel.superclass.afterRender.apply(this,arguments);if(!this.ownerCt){this.renderMap()}else{this.ownerCt.on("move",this.updateMapSize,this);this.ownerCt.on({afterlayout:{fn:this.renderMap,scope:this,single:true}})}},onResize:function(){GeoExt.MapPanel.superclass.onResize.apply(this,arguments);this.updateMapSize()},onBeforeAdd:function(a){if(typeof a.addToMapPanel==="function"){a.addToMapPanel(this)}GeoExt.MapPanel.superclass.onBeforeAdd.apply(this,arguments)},remove:function(b,a){if(typeof b.removeFromMapPanel==="function"){b.removeFromMapPanel(this)}GeoExt.MapPanel.superclass.remove.apply(this,arguments)},beforeDestroy:function(){if(this.ownerCt){this.ownerCt.un("move",this.updateMapSize,this)}if(!this.initialConfig.map||!(this.initialConfig.map instanceof OpenLayers.Map)){if(this.map&&this.map.destroy){this.map.destroy()}}delete this.map;GeoExt.MapPanel.superclass.beforeDestroy.apply(this,arguments)}});GeoExt.MapPanel.guess=function(){return Ext.ComponentMgr.all.find(function(a){return a instanceof GeoExt.MapPanel})};Ext.reg("gx_mappanel",GeoExt.MapPanel);