ker.include("localization/model.js");ker.include("localization/view.js");var localiz=null;Event.observe(window,"load",function(){localiz=new Localiz();ker.loadMan.wait(localiz)});function Localiz(){try{Event.observe("btn.save","click",ker.wrap(this,this.save));Event.observe("btn.refresh","click",ker.wrap(this,this.refresh));Event.observe("entity.type","change",ker.wrap(this,this.entityTypeChange));Event.observe("entity.list","change",ker.wrap(this,this.entityListChange));Event.observe("lang.destin","change",ker.wrap(this,this.saveIfDirty));this.strLoader=new XMLLoader(Env.locUrl+"/xml/localization.xml");this.view=new View(this.strLoader);this.model=new Model(this.strLoader);this.cache={}}catch(a){alert(a)}}Localiz.prototype.init=function(){this.view.init();this.refresh()};Localiz.prototype.refresh=function(){var a=this.view.getEntityType();this.view.clearEntityList();this.model.getEntityList(a,ker.wrap(this,this.refresh_OK))};Localiz.prototype.refresh_OK=function(c){var b=this.view.getEntityType();this.cache[b]=c;for(var a=0;a<c.length;a++){this.view.addEntityToList(c[a])}};Localiz.prototype.saveIfDirty=function(){if(!this.view.dirty){return}if(this.view.getSelectedIndex()==-1){return}if(!this.view.isDataValid()){return}var a={ID:this.view.getSelectedID(),LANG:this.view.getPrevLang(),TEXT:this.view.getTargetText(),TYPE:this.view.getEntityType()};this.view.updateTargetText();this.model.update(a,ker.wrap(this,function(){}))};Localiz.prototype.save=function(){if(this.view.getSelectedIndex()==-1){return}if(!this.view.isDataValid()){return}var a={ID:this.view.getSelectedID(),LANG:this.view.getTargetLanguage(),TEXT:this.view.getTargetText(),TYPE:this.view.getEntityType()};this.model.update(a,ker.wrap(this,this.save_OK))};Localiz.prototype.save_OK=function(){var b=this.view.getEntityType();var c=this.cache[b];var a=this.view.getSelectedIndex();var e=this.view.getTargetLanguage();var d=this.view.getTargetText();c[a].label[e]=d;var a=this.view.advanceOnList();this.view.setEntity(a==-1?null:c[a])};Localiz.prototype.entityTypeChange=function(d){this.saveIfDirty();var b=this.view.getEntityType();var c=this.cache[b];if(c==null){this.refresh()}else{this.view.clearEntityList();for(var a=0;a<c.length;a++){this.view.addEntityToList(c[a])}}};Localiz.prototype.entityListChange=function(d){this.saveIfDirty();var b=this.view.getEntityType();var c=this.cache[b];var a=this.view.getSelectedIndex();this.view.setEntity(c[a])};