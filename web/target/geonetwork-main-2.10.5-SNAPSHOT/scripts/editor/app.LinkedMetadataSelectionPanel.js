Ext.namespace("app");app.Filter={SERVICE:[{name:"E_type",value:"service"}],DATASET:[{name:"[E_type",value:"dataset,series"}],FEATURE_CATALOGUE:[{name:"E__schema",value:"iso19110"}]};app.Utility={convertSubjectAsCommaSeparatedValues:function(b,a){if(a.subject){return app.Utility.convertSeparatedValues(a.subject," ,")}else{return""}},convertSeparatedValues:function(b,d){var a="";for(var c=0;c<b.length;c++){if(c!=0){a+=d}a+=b[c].value}return a},checkUriNullValues:function(b,a){if(a.URI){return a.URI[0].value}else{return""}}};app.linkedMetadata={};app.linkedMetadata.linkedMetadataStore=new Ext.data.JsonStore({fields:[{name:"title",mapping:"title[0].value",defaultValue:""},{name:"subject",convert:app.Utility.convertSubjectAsCommaSeparatedValues,defaultValue:""},{name:"uuid",mapping:"identifier[0].value",defaultValue:""},{name:"uri",convert:app.Utility.checkUriNullValues}]});app.LinkedMetadataSelectionPanel=Ext.extend(Ext.FormPanel,{border:false,layout:"fit",createIfNotExistURL:null,hiddenParameters:app.Filter.DATASET,singleSelect:true,loadingMask:null,ref:null,proxy:null,mode:null,serviceUrl:null,capabilitiesStore:null,initComponent:function(){this.addEvents("linkedmetadataselected");if(this.mode=="attachService"||this.mode=="coupledResource"){this.capabilitiesStore=new GeoExt.data.WMSCapabilitiesStore({proxy:new Ext.data.HttpProxy({method:"GET",prettyUrls:false,url:this.proxy}),baseParams:{url:this.serviceUrl},id:"capabilitiesStore",listeners:{exception:function(g,h,i,e,f,d){Ext.MessageBox.alert(translate("error"))},beforeload:function(){if(this.mode=="attachService"){var e=Ext.getCmp("linkedMetadataGrid").getSelectionModel().getSelections();if(e==undefined||e[0].data.uri==""){Ext.MessageBox.alert(translate("NoServiceURLError"))}var d;this.capabilitiesStore.baseParams.url=e[0].data.uri+"?&SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.1.1"}else{if(this.mode=="coupledResource"){this.capabilitiesStore.baseParams.url=this.serviceUrl}}},loadexception:function(){Ext.MessageBox.alert(translate("GetCapabilitiesDocumentError")+this.capabilitiesStore.baseParams.url)},scope:this}})}if(this.mode=="attachService"){this.hiddenParameters=app.Filter.SERVICE}else{if(this.mode=="iso19110"){this.hiddenParameters=app.Filter.FEATURE_CATALOGUE}}var b=new Ext.grid.CheckboxSelectionModel({singleSelect:this.singleSelect,header:"",listeners:{selectionchange:function(){Ext.getCmp("linkedMetadataValidateButton").setDisabled(this.getSelections().length<1)}}});var c=[this.getSearchInput(),"->",translate("maxResults"),this.getLimitInput()];this.addHiddenFormInput(c);var a=new Ext.grid.GridPanel({id:"linkedMetadataGrid",xtype:"grid",layout:"fit",height:280,bodyStyle:"padding: 0px;",border:true,loadMask:true,tbar:c,store:app.linkedMetadata.linkedMetadataStore,columns:[b,{id:"title",header:translate("mdTitle"),dataIndex:"title"},{id:"subject",header:translate("keywords"),dataIndex:"subject"},{id:"uri",header:translate("uri"),dataIndex:"uri"}],sm:b,autoExpandColumn:"title",listeners:{rowclick:function(d,g,f){if(this.capabilitiesStore!=null&&this.mode!="coupledResource"){this.serviceUrl=d.getStore().getAt(g).data.uri;if(this.serviceUrl==""){this.capabilitiesStore.removeAll()}else{this.capabilitiesStore.baseParams.url=this.serviceUrl;this.capabilitiesStore.reload()}}},scope:this}});if(this.mode=="attachService"||this.mode=="coupledResource"){this.items=this.getScopedNamePanel(a)}else{this.items=a}this.bbar=["->",{id:"linkedMetadataValidateButton",iconCls:"linkIcon",text:translate("createRelation"),disabled:true,handler:function(){var d=a.getSelectionModel().getSelections();this.fireEvent("linkedmetadataselected",this,d);this.ownerCt.close()},scope:this},this.getCreateIfNotExistButton()];app.linkedMetadata.linkedMetadataStore.on({load:function(){if(this.loadingMask!=null){this.loadingMask.hide()}},scope:this});app.LinkedMetadataSelectionPanel.superclass.initComponent.call(this)},getCreateIfNotExistButton:function(){if(this.createIfNotExistURL==null){return""}return{id:"createIfNotExistButton",iconCls:"addIcon",text:translate("createIfNotExistButton"),handler:function(){window.location.replace(this.createIfNotExistURL)},scope:this}},setRef:function(a){this.ref=a},addHiddenFormInput:function(a){for(var b=0;b<this.hiddenParameters.length;b++){a.push({xtype:"textfield",fieldLabel:this.hiddenParameters[b].name,name:this.hiddenParameters[b].name,value:this.hiddenParameters[b].value,hidden:true})}return a},getSearchInput:function(){return new Ext.app.SearchField({name:"E.8_AnyText",width:240,store:app.linkedMetadata.linkedMetadataStore,triggerAction:function(a){a.doSearch()},scope:this})},getLimitInput:function(){return{xtype:"textfield",name:"nbResultPerPage",id:"nbResultPerPage",value:20,width:40}},getScopedNamePanel:function(c){var d={xtype:"combo",id:"getCapabilitiesLayerNameCombo",fieldLabel:translate("getCapabilitiesLayer"),store:this.capabilitiesStore,valueField:"name",displayField:"title",triggerAction:"all",listeners:{select:function(g,e,f){Ext.getCmp("getCapabilitiesLayerName").setValue(g.getValue())}}};var b={xtype:"textfield",id:"getCapabilitiesLayerName",fieldLabel:translate("layerName"),valueField:"name",displayField:"title"};var a={xtype:"panel",layout:"form",bodyStyle:"padding: 2px;",border:true,items:[c,d,b]};return a},doSearch:function(){if(!this.loadingMask){this.loadingMask=new Ext.LoadMask(this.getEl(),{msg:translate("searching")})}this.loadingMask.show();var a=Env.locService+"/csw";app.nbResultPerPage=20;if(Ext.getCmp("nbResultPerPage")){app.nbResultPerPage=Ext.getCmp("nbResultPerPage").getValue()}CSWSearchTools.doCSWQueryFromForm(this.id,a,1,this.showResults,null,Ext.emptyFn)},showResults:function(b){var d=new OpenLayers.Format.CSWGetRecords();var c=d.read(b.responseText);var a=c.records;if(a!=undefined){app.linkedMetadata.linkedMetadataStore.loadData(a)}}});