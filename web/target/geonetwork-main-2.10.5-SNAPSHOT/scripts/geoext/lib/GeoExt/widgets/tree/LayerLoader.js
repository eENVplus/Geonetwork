Ext.namespace("GeoExt.tree");GeoExt.tree.LayerLoader=function(a){Ext.apply(this,a);this.addEvents("beforeload","load");GeoExt.tree.LayerLoader.superclass.constructor.call(this)};Ext.extend(GeoExt.tree.LayerLoader,Ext.util.Observable,{store:null,filter:function(a){return a.get("layer").displayInLayerSwitcher==true},uiProviders:null,load:function(a,b){if(this.fireEvent("beforeload",this,a)){this.removeStoreHandlers();while(a.firstChild){a.removeChild(a.firstChild)}if(!this.uiProviders){this.uiProviders=a.getOwnerTree().getLoader().uiProviders}if(!this.store){this.store=GeoExt.MapPanel.guess().layers}this.store.each(function(c){this.addLayerNode(a,c)},this);this.addStoreHandlers(a);if(typeof b=="function"){b()}this.fireEvent("load",this,a)}},onStoreAdd:function(b,a,c,e){if(!this._reordering){var f=e.recordIndexToNodeIndex(c+a.length-1);for(var d=0;d<a.length;++d){this.addLayerNode(e,a[d],f)}}},onStoreRemove:function(b,a,c,d){if(!this._reordering){this.removeLayerNode(d,a)}},addLayerNode:function(d,a,b){b=b||0;if(this.filter(a)===true){var e=this.createNode({nodeType:"gx_layer",layer:a.get("layer"),layerStore:this.store});var c=d.item(b);if(c){d.insertBefore(e,c)}else{d.appendChild(e)}e.on("move",this.onChildMove,this)}},removeLayerNode:function(b,a){if(this.filter(a)===true){var c=b.findChildBy(function(d){return d.layer==a.get("layer")});if(c){c.un("move",this.onChildMove,this);c.remove();b.reload()}}},onChildMove:function(k,c,i,j,g){this._reordering=true;var b=this.store.findBy(function(l){return l.get("layer")===c.layer});var f=this.store.getAt(b);if(j instanceof GeoExt.tree.LayerContainer&&this.store===j.loader.store){j.loader._reordering=true;this.store.remove(f);var a;if(j.childNodes.length>1){var h=(g===0)?g+1:g-1;a=this.store.findBy(function(l){return j.childNodes[h].layer===l.get("layer")});g===0&&a++}else{if(i.parentNode===j.parentNode){var d=j;do{d=d.previousSibling}while(d&&!(d instanceof GeoExt.tree.LayerContainer&&d.lastChild));if(d){a=this.store.findBy(function(l){return d.lastChild.layer===l.get("layer")})}else{var e=j;do{e=e.nextSibling}while(e&&!(e instanceof GeoExt.tree.LayerContainer&&e.firstChild));if(e){a=this.store.findBy(function(l){return e.firstChild.layer===l.get("layer")})}a++}}}if(a!==undefined){this.store.insert(a,[f]);window.setTimeout(function(){j.reload();i.reload()})}else{this.store.insert(b,[f])}delete j.loader._reordering}delete this._reordering},addStoreHandlers:function(b){if(!this._storeHandlers){this._storeHandlers={add:this.onStoreAdd.createDelegate(this,[b],true),remove:this.onStoreRemove.createDelegate(this,[b],true)};for(var a in this._storeHandlers){this.store.on(a,this._storeHandlers[a],this)}}},removeStoreHandlers:function(){if(this._storeHandlers){for(var a in this._storeHandlers){this.store.un(a,this._storeHandlers[a],this)}delete this._storeHandlers}},createNode:function(attr){if(this.baseAttrs){Ext.apply(attr,this.baseAttrs)}if(typeof attr.uiProvider=="string"){attr.uiProvider=this.uiProviders[attr.uiProvider]||eval(attr.uiProvider)}attr.nodeType=attr.nodeType||"gx_layer";return new Ext.tree.TreePanel.nodeTypes[attr.nodeType](attr)},destroy:function(){this.removeStoreHandlers()}});