Ext.namespace("GeoNetwork");GeoNetwork.TimeSelector=function(a){Ext.apply(this,a);GeoNetwork.TimeSelector.superclass.constructor.call(this)};Ext.extend(GeoNetwork.TimeSelector,Ext.form.FormPanel,{layer:null,numberOfSteps:12,border:false,originalFormat:null,initComponent:function(){this.buttons=[new Ext.Button({text:OpenLayers.i18n("wmsTimeUpdateButtonText"),handler:this.updateValue,scope:this})];GeoNetwork.TimeSelector.superclass.initComponent.call(this)},beforeDestroy:function(){this.updateValue();GeoNetwork.TimeSelector.superclass.beforeDestroy.call(this)},setLayer:function(a){this.layer=a;this.originalFormat=this.layer.params.FORMAT||this.layer.params.format;if(this.layer.dimensions&&this.layer.dimensions.time){this.add(new Ext.form.Label({text:OpenLayers.i18n("WMSTimePositionTitle")}));this.add(new Ext.BoxComponent({height:10}));this.add(this.createDateTimeField());if(this.layer.dimensions.time.multipleVal){this.add(new Ext.BoxComponent({height:25}));this.add(new Ext.form.Label({text:OpenLayers.i18n("WMSTimeMovieTitle")}));this.add(new Ext.BoxComponent({height:10}));this.add({xtype:"checkbox",listeners:{check:{fn:this.playMovie,scope:this}},hideLabel:true,boxLabel:OpenLayers.i18n("WMSTimeAnimationCheckbox",{steps:this.numberOfSteps})})}this.doLayout()}},getInterval:function(a){return parseInt(a.substring(a.indexOf("PT")+2,a.indexOf("M")))},playMovie:function(d,g){if(g){var c,f,b;if(this.layer.dimensions.time.values&&this.layer.dimensions.time.values.length>0){var e=this.layer.dimensions.time.values[0].split("/");c=e[1];f=this.getInterval(e[2]);var h=Date.parseDate(c,"c");h=h-(1000*60*f*this.numberOfSteps);h=new Date(h);b=this.formatTimeAsUTC(h)+"/"+c}this.layer.mergeNewParams({TIME:b,FORMAT:"image/gif"})}else{this.updateValue()}},formatTimeAsUTC:function(a){var b=a.dateFormat("c");var c=""+a.getUTCHours();if(c.length<2){c="0"+c}b=b.replace(b.substring(b.indexOf("T"),b.indexOf("T")+3),"T"+c);b=b.replace(b.substring(b.indexOf("+"),b.indexOf("+")+6),"Z");return b},updateValue:function(){this.layer.mergeNewParams({TIME:this.formatTimeAsUTC(this.getForm().findField("current").getValue()),FORMAT:this.originalFormat})},createDateTimeField:function(){var d,a,c;if(this.layer.dimensions.time.values&&this.layer.dimensions.time.values.length>0){var b=this.layer.dimensions.time.values[0].split("/");d=b[0];a=b[1];c=this.getInterval(b[2])}return new Ext.ux.form.DateTime({hiddenFormat:"c",dateFormat:null,hideLabel:true,name:"current",dateConfig:{minValue:Date.parseDate(d,"c"),maxValue:Date.parseDate(a,"c")},timeConfig:{increment:c},value:(this.layer.params.TIME)?this.layer.params.TIME:this.layer.dimensions.time["default"],width:340})}});Ext.reg("gn_timeselector",GeoNetwork.TimeSelector);