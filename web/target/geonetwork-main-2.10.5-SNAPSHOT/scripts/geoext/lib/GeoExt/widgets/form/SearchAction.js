Ext.namespace("GeoExt.form");GeoExt.form.SearchAction=Ext.extend(Ext.form.Action,{type:"search",response:null,constructor:function(b,a){GeoExt.form.SearchAction.superclass.constructor.call(this,b,a)},run:function(){var b=this.options;var a=GeoExt.form.toFilter(this.form);if(b.clientValidation===false||this.form.isValid()){if(b.abortPrevious&&this.form.prevResponse){b.protocol.abort(this.form.prevResponse)}this.form.prevResponse=b.protocol.read(Ext.applyIf({filter:a,callback:this.handleResponse,scope:this},b))}else{if(b.clientValidation!==false){this.failureType=Ext.form.Action.CLIENT_INVALID;this.form.afterAction(this,false)}}},handleResponse:function(a){this.form.prevResponse=null;this.response=a;if(a.success()){this.form.afterAction(this,true)}else{this.form.afterAction(this,false)}var b=this.options;if(b.callback){b.callback.call(b.scope,a)}}});