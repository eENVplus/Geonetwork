Ext.namespace("GeoNetwork");GeoNetwork.ProjectionSelector=function(a){Ext.apply(this,a);GeoNetwork.ProjectionSelector.superclass.constructor.call(this)};Ext.extend(GeoNetwork.ProjectionSelector,Ext.form.ComboBox,{projections:null,initComponent:function(){GeoNetwork.ProjectionSelector.superclass.initComponent.call(this);this.on("select",this.reproject,this);this.valueField="value";this.autoWidth=true;this.autoHeight=true;this.displayField="text";this.triggerAction="all";this.mode="local";this.store=new Ext.data.Store({reader:new Ext.data.ArrayReader({},[{name:"value"},{name:"text"}]),data:this.projections});this.value=this.map.getProjection()},reproject:function(b,a){GeoNetwork.OGCUtil.reprojectMap(this.map,new OpenLayers.Projection(a.get("value")),false)}});Ext.reg("gn_projectionselector",GeoNetwork.ProjectionSelector);