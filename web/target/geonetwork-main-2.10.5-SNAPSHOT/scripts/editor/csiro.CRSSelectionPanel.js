Ext.namespace("csiro");csiro.CRS={};var CRS=Ext.data.Record.create([{name:"authority"},{name:"code"},{name:"version"},{name:"codeSpace"},{name:"description"}]);csiro.CRS.crsStore=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:"crs.search",method:"GET"}),baseParams:{name:"",type:"",maxResults:50},reader:new Ext.data.XmlReader({record:"crs",id:"code"},CRS),fields:["code","codeSpace","authority","description","version"],sortInfo:{field:"description"}});csiro.CRSSelectionPanel=Ext.extend(Ext.FormPanel,{border:false,itemSelector:null,loadingMask:null,crsCount:null,minSelected:0,maxSelected:Number.MAX_VALUE,crsSelected:[],initComponent:function(){this.items=[{xtype:"panel",layout:"fit",bodyStyle:"padding: 5px;",border:false,tbar:[this.getCRSTypeCombo()," ",this.getCRS(),"->",translate("maxResults"),this.getLimitInput()],items:[this.getCRSItemSelector()]}];csiro.CRS.crsStore.on({loadexception:function(){},beforeload:function(a,b){if(Ext.getCmp("maxResults")){a.baseParams.maxResults=Ext.getCmp("maxResults").getValue()}if(!this.loadingMask){this.loadingMask=new Ext.LoadMask(this.itemSelector.getEl(),{msg:translate("searching")})}this.loadingMask.show()},load:function(){if(!this.loadingMask){this.loadingMask=new Ext.LoadMask(this.itemSelector.getEl(),{msg:translate("searching")})}this.loadingMask.hide()},scope:this});this.addEvents("crsSelected");this.bbar=["->",{id:"crsSearchValidateButton",iconCls:"addIcon",disabled:true,text:translate("add"),handler:function(){this.buildCRSList()},scope:this}];csiro.CRSSelectionPanel.superclass.initComponent.call(this)},getCRS:function(){return new Ext.app.SearchField({id:"crsSearchField",width:240,store:csiro.CRS.crsStore,paramName:"name"})},getLimitInput:function(){return{xtype:"textfield",name:"maxResults",id:"maxResults",value:50,width:40}},getCRSTypeCombo:function(){var b=Ext.data.Record.create([{name:"id"}]);csiro.CRS.crsTypeStore=new Ext.data.Store({url:"crs.types",reader:new Ext.data.XmlReader({record:"type"},b),fields:["id"]});var a=new b({filename:translate("any")});a.set("id","");csiro.CRS.crsTypeStore.add(a);csiro.CRS.crsTypeStore.load({add:true});return{xtype:"combo",width:150,id:"search-crs",value:0,store:csiro.CRS.crsTypeStore,triggerAction:"all",mode:"local",displayField:"id",valueField:"id",listWidth:250,listeners:{select:function(f,c,d){csiro.CRS.crsStore.removeAll();csiro.CRS.crsStore.baseParams.type=f.getValue();var e=Ext.getCmp("crsSearchField").getValue();if(e.length<1){csiro.CRS.crsStore.baseParams.name=""}else{csiro.CRS.crsStore.baseParams.name=e}csiro.CRS.crsStore.reload()},clear:function(c){csiro.CRS.crsStore.load()},scope:this}}},getCRSItemSelector:function(){var a='<tpl for="."><div class="ux-mselect-item';if(Ext.isIE||Ext.isIE7){a+='" unselectable=on'}else{a+=' x-unselectable"'}a+=">{description}</div></tpl>";this.itemSelector=new Ext.ux.Multiselect({store:csiro.CRS.crsStore,dataFields:["code","codeSpace","authority","description","version"],data:[],width:640,height:230,allowBlank:false,minLength:this.minSelected,maxLength:this.maxSelected,minLengthText:"Minimum {0} CRS(s) required",maxLengthText:"Maximum {0} CRS(s) allowed",displayField:"description",valueField:"code",name:"itemselector",fieldLabel:"ItemSelector",tpl:a,legend:translate("foundCRS"),});this.itemSelector.on({change:function(b){var c=b.view.getSelectedIndexes().length;Ext.getCmp("crsSearchValidateButton").setDisabled(c<this.minSelected&&c>this.maxSelected)},scope:this});return this.itemSelector},buildCRSList:function(){this.crsSelected={descriptions:[],codes:[]};var a=this.itemSelector.store;var c=this.itemSelector.view.getSelectedIndexes();for(var b=0;b<c.length;b++){var d=a.getAt(c[b]);this.crsSelected.descriptions.push(d.get("description"));this.crsSelected.codes.push(d.get("code"))}this.fireEvent("crsSelected",this,this.crsSelected);this.ownerCt.hide()}});