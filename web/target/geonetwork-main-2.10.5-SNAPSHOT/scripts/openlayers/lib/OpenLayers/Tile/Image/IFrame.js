OpenLayers.Tile.Image.IFrame=OpenLayers.Class(OpenLayers.Tile.Image,{initialize:function(d,a,e,b,c){OpenLayers.Tile.Image.prototype.initialize.apply(this,arguments);this.layerAlphaHack=false},destroy:function(){if(this.imgDiv!=null){OpenLayers.Event.stopObservingElement(this.imgDiv.firstChild)}OpenLayers.Tile.Image.prototype.destroy.apply(this,arguments)},clear:function(){if(this.imgDiv){var a=this.imgDiv.firstChild;OpenLayers.Event.stopObservingElement(a);this.imgDiv.removeChild(a)}},clone:function(a){if(a==null){a=new OpenLayers.Tile.Image.IFrame(this.layer,this.position,this.bounds,this.url,this.size)}a=OpenLayers.Tile.Image.prototype.clone.apply(this,[a]);return a},renderTile:function(){if(OpenLayers.Tile.Image.prototype.renderTile.apply(this,arguments)){var a=this.createRequestForm();this.imgDiv.appendChild(a);a.submit();this.imgDiv.removeChild(a)}},initImgDiv:function(){this.imgDiv=this.createImgDiv();OpenLayers.Util.modifyDOMElement(this.imgDiv,this.id,null,this.layer.getImageSize(),"relative");this.imgDiv.className="olTileImage";this.frame.appendChild(this.imgDiv);this.layer.div.appendChild(this.frame);if(this.layer.opacity!=null){OpenLayers.Util.modifyDOMElement(this.imgDiv,null,null,null,null,null,null,this.layer.opacity)}this.imgDiv.map=this.layer.map},createImgDiv:function(){var b=document.createElement("div");if(OpenLayers.Util.getBrowserName()=="msie"){b.style.backgroundColor="#FFFFFF";b.style.filter="chroma(color=#FFFFFF)"}OpenLayers.Util.modifyDOMElement(b,null,new OpenLayers.Pixel(0,0),this.layer.getImageSize(),"absolute");var a=document.createElement("div");a.appendChild(b);return a},createIFrame:function(){var c=this.id+"_iFrame";var a;if(OpenLayers.Util.getBrowserName()=="msie"){a=document.createElement('<iframe name="'+c+'">');a.style.backgroundColor="#FFFFFF";a.style.filter="chroma(color=#FFFFFF)"}else{a=document.createElement("iframe");a.style.backgroundColor="transparent";a.name=c}a.id=c;a.scrolling="no";a.marginWidth="0px";a.marginHeight="0px";a.frameBorder="0";OpenLayers.Util.modifyDOMElement(a,c,new OpenLayers.Pixel(0,0),this.layer.getImageSize(),"absolute");var b=function(){this.show();if(this.isLoading){this.isLoading=false;this.events.triggerEvent("loadend")}};OpenLayers.Event.observe(a,"load",OpenLayers.Function.bind(b,this));return a},createRequestForm:function(){var b=document.createElement("form");b.method="POST";var f=this.layer.params._OLSALT;f=(f?f+"_":"")+this.bounds.toBBOX();b.action=OpenLayers.Util.urlAppend(this.layer.url,f);this.imgDiv.insertBefore(this.createIFrame(),this.imgDiv.firstChild);b.target=this.id+"_iFrame";var c=this.layer.getImageSize();var e=OpenLayers.Util.extend({BBOX:this.encodeBBOX?this.bounds.toBBOX():this.bounds.toArray(),WIDTH:c.w,HEIGHT:c.h},this.layer.params);for(var a in e){var d=document.createElement("input");d.type="hidden";d.name=a;d.value=e[a];b.appendChild(d)}return b},CLASS_NAME:"OpenLayers.Tile.Image.IFrame"});