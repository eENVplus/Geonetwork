Ext.namespace("GeoExt");GeoExt.LegendWMS=Ext.extend(Ext.Panel,{imageFormat:"image/gif",defaultStyleIsFirst:true,layer:null,record:null,bodyBorder:false,initComponent:function(){GeoExt.LegendWMS.superclass.initComponent.call(this);if(!this.layer){this.layer=this.record.get("layer")}this.updateLegend()},getLegendUrl:function(d,g){var c;var f=this.record&&this.record.get("styles");g=g||(this.layer.params.LAYERS instanceof Array)?this.layer.params.LAYERS:this.layer.params.LAYERS.split(",");var b=this.layer.params.STYLES&&this.layer.params.STYLES.split(",");var a=g.indexOf(d);var e=b&&b[a];if(f&&f.length>0){if(e){Ext.each(f,function(h){c=(h.name==e&&h.legend)&&h.legend.href;return !c})}else{if(this.defaultStyleIsFirst===true&&!b&&!this.layer.params.SLD&&!this.layer.params.SLD_BODY){c=f[0].legend&&f[0].legend.href}}}return c||this.layer.getFullRequestString({REQUEST:"GetLegendGraphic",WIDTH:null,HEIGHT:null,EXCEPTIONS:"application/vnd.ogc.se_xml",LAYER:d,LAYERS:null,STYLE:(e!=="")?e:null,STYLES:null,SRS:null,FORMAT:this.imageFormat})},updateLegend:function(c){var h,b,d,a;h=(this.layer.params.LAYERS instanceof Array)?this.layer.params.LAYERS:this.layer.params.LAYERS.split(",");if(this.items){var e=[];this.items.each(function(i){d=h.indexOf(i.itemId);if(d<0){e.push(i)}else{b=h[d];var j=c||this.getLegendUrl(b,h);if(!OpenLayers.Util.isEquivalentUrl(j,i.url)){i.updateLegend(j)}}},this);for(d=0,a=e.length;d<a;d++){var g=e[d];this.remove(g);g.destroy()}}var f=false;for(d=0,a=h.length;d<a;d++){b=h[d];if(!this.items||!this.getComponent(b)){this.add({xtype:"gx_legendimage",url:c||this.getLegendUrl(b,h),itemId:b});f=true}}if(f){this.doLayout()}}});