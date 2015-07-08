Ext.namespace("app");app.CRS={};var CRS=Ext.data.Record.create([{name:"authority"},{name:"code"},{name:"version"},{name:"codeSpace"},{name:"description"}]);app.CRS.crsStore=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:"crs.search",method:"GET"}),baseParams:{name:"",type:"",maxResults:50},reader:new Ext.data.XmlReader({record:"crs",id:"code"},CRS),fields:["code","codeSpace","authority","description","version"],sortInfo:{field:"description"}});app.CRSSelectionPanel=Ext.extend(Ext.FormPanel,{border:false,first:null,itemSelector:null,loadingMask:null,crsCount:null,ref:null,crsSelected:"",initComponent:function(){this.items=[{xtype:"panel",layout:"fit",bodyStyle:"padding: 5px;",border:false,tbar:[this.getCRSTypeCombo()," ",this.getCRS(),"->",translate("maxResults"),this.getLimitInput()],items:[this.getCRSItemSelector()]}];app.CRS.crsStore.on({loadexception:function(){},beforeload:function(a,b){if(Ext.getCmp("maxResults")){a.baseParams.maxResults=Ext.getCmp("maxResults").getValue()}if(!this.loadingMask){this.loadingMask=new Ext.LoadMask(this.itemSelector.fromMultiselect.getEl(),{msg:translate("searching")})}this.loadingMask.show()},load:function(){this.loadingMask.hide()},scope:this});this.addEvents("crsSelected");this.bbar=["->",{id:"crsSearchValidateButton",iconCls:"addIcon",disabled:true,text:translate("add"),handler:function(){this.buildCRSXmlList()},scope:this}];app.CRSSelectionPanel.superclass.initComponent.call(this)},getCRS:function(){return new Ext.app.SearchField({id:"crsSearchField",width:240,store:app.CRS.crsStore,paramName:"name"})},getLimitInput:function(){return{xtype:"textfield",name:"maxResults",id:"maxResults",value:50,width:40}},getCRSTypeCombo:function(){var b=Ext.data.Record.create([{name:"id"}]);app.CRS.crsTypeStore=new Ext.data.Store({url:"crs.types",reader:new Ext.data.XmlReader({record:"type"},b),fields:["id"]});var a=new b({filename:translate("any")});a.set("id","");app.CRS.crsTypeStore.add(a);app.CRS.crsTypeStore.load({add:true});return{xtype:"combo",width:150,id:"search-crs",value:0,store:app.CRS.crsTypeStore,triggerAction:"all",mode:"local",displayField:"id",valueField:"id",listWidth:250,listeners:{select:function(f,c,d){app.CRS.crsStore.removeAll();app.CRS.crsStore.baseParams.type=f.getValue();var e=Ext.getCmp("crsSearchField").getValue();if(e.length<1){app.CRS.crsStore.baseParams.name=""}else{app.CRS.crsStore.baseParams.name=e}app.CRS.crsStore.reload()},clear:function(c){app.CRS.crsStore.load()},scope:this}}},getCRSItemSelector:function(){var a='<tpl for="."><div class="ux-mselect-item';if(Ext.isIE||Ext.isIE7){a+='" unselectable=on'}else{a+=' x-unselectable"'}a+=">{description}</div></tpl>";this.itemSelector=new Ext.ux.ItemSelector({name:"itemselector",fieldLabel:"ItemSelector",dataFields:["code","codeSpace","authority","description","version"],toData:[],msWidth:320,msHeight:230,valueField:"code",fromTpl:a,toTpl:a,toLegend:translate("selectedCRS"),fromLegend:translate("foundCRS"),fromStore:app.CRS.crsStore,fromAllowTrash:false,fromAllowDup:true,toAllowDup:false,drawUpIcon:false,drawDownIcon:false,drawTopIcon:false,drawBotIcon:false,imagePath:javascriptsLocation+"ext-ux/MultiselectItemSelector-3.0/icons",toTBar:[{text:translate("clear"),handler:function(){var b=this.getForm().findField("itemselector");b.reset.call(b)},scope:this}]});this.itemSelector.on({change:function(b){Ext.getCmp("crsSearchValidateButton").setDisabled(b.toStore.getCount()<1)}});return this.itemSelector},setRef:function(a){this.ref=a},buildCRSXmlList:function(){this.crsSelected="";var a=this.itemSelector.toMultiselect.store;this.first=true;a.each(function(b){var c="<gmd:referenceSystemInfo xmlns:gmd='http://www.isotc211.org/2005/gmd'  xmlns:gco='http://www.isotc211.org/2005/gco'><gmd:MD_ReferenceSystem><gmd:referenceSystemIdentifier><gmd:RS_Identifier><gmd:code><gco:CharacterString>"+b.data.description+"</gco:CharacterString></gmd:code><gmd:codeSpace><gco:CharacterString>"+b.data.codeSpace+"</gco:CharacterString></gmd:codeSpace><gmd:version><gco:CharacterString>"+b.data.version+"</gco:CharacterString></gmd:version></gmd:RS_Identifier></gmd:referenceSystemIdentifier></gmd:MD_ReferenceSystem></gmd:referenceSystemInfo>";this.crsSelected+=(this.first?"":"&amp;&amp;&amp;")+c;this.first=false},this);if(this.crsSelected!=""){this.fireEvent("crsSelected",this.crsSelected);this.ownerCt.hide()}}});