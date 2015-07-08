Ext.namespace("Ext.ux.form");Ext.ux.form.TwinTriggerComboBox=function(a){Ext.ux.form.TwinTriggerComboBox.superclass.constructor.apply(this,arguments)};Ext.extend(Ext.ux.form.TwinTriggerComboBox,Ext.form.ComboBox,{trigger1Class:"x-form-clear-trigger",trigger2Class:"",trigger3Class:"x-form-trigger3-trigger",hideTrigger1:true,tooltipType:"qtip",initComponent:function(){Ext.ux.form.TwinTriggerComboBox.superclass.initComponent.call(this);this.addEvents({clear:true,trigger3:true});this.triggerConfig={tag:"span",cls:"x-form-twin-triggers",cn:[{tag:"img",src:Ext.BLANK_IMAGE_URL,cls:"x-form-trigger "+this.trigger1Class},{tag:"img",src:Ext.BLANK_IMAGE_URL,cls:"x-form-trigger "+this.trigger2Class},{tag:"img",src:Ext.BLANK_IMAGE_URL,cls:"x-form-trigger "+this.trigger3Class}]}},getTrigger:function(a){return this.triggers[a]},initTrigger:function(){var c=this.trigger.select(".x-form-trigger",true);var e=this;c.each(function(g,i,f){g.hide=function(){var j=e.wrap.getWidth();this.dom.style.display="none";e.el.setWidth(j-e.trigger.getWidth())};g.show=function(){var j=e.wrap.getWidth();this.dom.style.display="";e.el.setWidth(j-e.trigger.getWidth())};var h="Trigger"+(f+1);if(this["hide"+h]){g.dom.style.display="none"}g.on("click",this["on"+h+"Click"],this,{preventDefault:true});g.addClassOnOver("x-form-trigger-over");g.addClassOnClick("x-form-trigger-click")},this);this.triggers=c.elements;if(this.trigger3TipConfig){var a={target:this.getTrigger(2)};for(var b in this.helpTipConfig){a[b]=this.helpTipConfig[b]}var d=new Ext.ToolTip(a)}if(this.trigger3TipConfig){if(typeof this.trigger3TipConfig=="object"){Ext.QuickTips.register(Ext.apply({target:this.getTrigger(2)},this.trigger3TipConfig))}else{this.getTrigger(2).dom[this.tooltipType]=this.trigger3TipConfig}}},onTrigger1Click:function(){this.clearValue();this.triggerBlur.defer(50,this)},onTrigger2Click:function(){this.onTriggerClick()},onTrigger3Click:function(){this.fireEvent("trigger3Click",this)},onSelect:function(a,b){Ext.ux.form.TwinTriggerComboBox.superclass.onSelect.apply(this,[a,b]);this.triggers[0].show()},clearValue:function(){Ext.ux.form.TwinTriggerComboBox.superclass.clearValue.call(this);this.triggers[0].hide();this.fireEvent("clear",this)},insert:function(a,b){this.reset();var c=new this.store.recordType(b);c.id=c.data.id;this.store.insert(a,c);this.setValue(c.data.id);this.fireEvent("select",this,c,a)}});Ext.reg("twintriggercombo",Ext.ux.form.TwinTriggerComboBox);