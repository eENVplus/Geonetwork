Ext.namespace("GeoNetwork","GeoNetwork.tree");GeoNetwork.tree.WMSListGenerator=function(a){Ext.apply(this,a);if(this.node&&this.wmsStore){this.createWMSList()}};GeoNetwork.tree.WMSListGenerator.prototype={node:null,wmsStore:null,click:null,scope:null,createWMSList:function(){this.wmsStore.each(this.appendRecord,this)},appendRecord:function(a){var b=new Ext.tree.TreeNode({url:a.get("url"),text:a.get("title"),cls:"folder",leaf:false});b.appendChild(new Ext.tree.TreeNode({text:"",dummy:true}));b.addListener("beforeexpand",this.addNodesFromWMS,this);this.node.appendChild(b)},replaceNode:function(a){this.currentNode.parentNode.replaceChild(a,this.currentNode);a.ui.afterLoad();a.expand()},addNodesFromWMS:function(b){if(b.firstChild&&b.firstChild.attributes.dummy){b.removeChild(b.firstChild);b.ui.beforeLoad();this.scope.currentNode=b;var a=new GeoNetwork.tree.WMSTreeGenerator({click:this.click,callback:this.replaceNode,scope:this.scope});a.loadWMS(b.attributes.url)}}};