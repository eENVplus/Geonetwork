var getGNServiceURL=function(a){if(a.indexOf("/")==0){return Env.locService+a}else{return Env.locService+"/"+a}};function findPos(c){var b=0;if(c){var a=c.cumulativeOffset();b=a[1]}return b}var Checks={message:translate("loseYourChange"),_setMessage:function(a){this.message=a},_onbeforeunload:function(a){if(opener){editRed=opener.$$(".editing");if(editRed&&editRed.length>0){editRed.invoke("removeClassName","editing")}a.returnValue=this.message}}};function unloadMess(){mess=translate("loseYourChange");return mess}var bfu=Checks._onbeforeunload.bindAsEventListener(Checks);function setBunload(a){if(a){Event.observe(window,"beforeunload",bfu);Checks._setMessage(unloadMess())}else{Event.stopObserving(window,"beforeunload",bfu);Checks._setMessage(null)}}function doEditorLoadActions(){setBunload(true);var a=new Ext.KeyMap(document,[{key:"s",ctrl:true,shift:true,fn:function(){$("btnSave").onclick()}},{key:"q",ctrl:true,shift:true,fn:function(){$("btnSaveAndClose").onclick()}},{key:"v",ctrl:true,shift:true,fn:function(){$("btnValidate").onclick()}},{key:"t",ctrl:true,shift:true,fn:function(){$("btnThumbnails").onclick()}},{key:"r",ctrl:true,shift:true,fn:function(){$("btnReset").onclick()}},{key:"c",ctrl:true,shift:true,fn:function(){$("btnCancel").onclick()}},{key:112,fn:function(){displayBox(null,"shortcutHelp",true)}}]);a.enable()}Event.observe(window,"load",doEditorLoadActions);Ajax.Responders.register({onCreate:function(){if(Ajax.activeRequestCount===1){var a=$("editorBusy");if(a){a.show()}}},onComplete:function(){if(Ajax.activeRequestCount===0){var a=$("editorBusy");if(a){a.hide()}}}});function doAction(a){setBunload(false);document.mainForm.action=a;goSubmit("mainForm")}function doTabAction(b,a){disableEditForm();document.mainForm.currTab.value=a;doAction(b)}function getControlsFromElement(a){var b=a.getAttribute("id");elButtons=$("buttons_"+b);return elButtons.immediateDescendants()}function topElement(a){if(a.previous()==undefined){return true}else{return(!isSameElement(a.previous(),a))}}function bottomElement(a){if(a.next()==undefined){return true}else{return(!isSameElement(a.next(),a))}}function getIdSplit(a){var b=a.getAttribute("id");if(b==null){return null}return b.split("_")}function orElement(b){if(b.next()==undefined){return false}else{var a=getIdSplit(b.next());var c=getIdSplit(b);if(a==null||c==null){return false}if(a[0]=="child"&&a[1]==c[0]){return true}else{return false}}}function isSameElement(b,a){var d=getIdSplit(b);var c=getIdSplit(a);if(d==null||c==null){return false}if(d[0]==c[0]){return true}else{return false}}function topControls(c,b){var d=getControlsFromElement(c);var a=0;if(d.length==5){a=1}if(bottomElement(c)&&!orElement(c)){d[0].show()}else{d[0].hide()}if(a==1){if(bottomElement(c)&&!orElement(c)){d[a].show()}else{d[a].hide()}}if(bottomElement(c)){if(b==0){d[1+a].show()}else{d[1+a].hide()}}else{d[1+a].show()}d[2+a].hide();if(bottomElement(c)){d[3+a].hide()}else{d[3+a].show()}}function doRemoveAttributeAction(d,c,e){var f=document.mainForm.id.value;var b=$(c+"_block");var a=Ext.Ajax.request({url:getGNServiceURL(d),method:"GET",params:{id:f,ref:c},success:function(g,j){var h=g.responseText;doSaveAction("metadata.update");setBunload(true)},failure:function(g,h){Ext.MessageBox.alert(translate("errorDeleteAttribute")+name+" "+translate("errorFromDoc")+" / status "+g.status+" text: "+g.statusText+" - "+translate("tryAgain"));setBunload(true)}})}function doRemoveElementAction(f,e,c,b,g){var h=document.mainForm.id.value;var d=$(b);var j=d.next();var k=d.previous();var a=Ext.Ajax.request({url:getGNServiceURL(f),method:"GET",params:{id:h,ref:e,parent:c},success:function(l,n){var m=l.responseText;if(m.blank()){if(bottomElement(d)&&document.mainForm.currTab.value!="simple"){swapControls(d,k);d.remove();d=k}else{d.remove();d=j}if(topElement(d)){topControls(d,g)}}else{if(orElement(d)){d.remove()}else{d.replace(m)}}setBunload(true)},failure:function(l,m){Ext.MessageBox.alert(translate("errorDeleteElement")+name+" "+translate("errorFromDoc")+" / status "+l.status+" text: "+l.statusText+" - "+translate("tryAgain"));setBunload(true)}})}function swapControls(e,d){var b=getControlsFromElement(e);var a=getControlsFromElement(d);for(var c=0;c<b.length;++c){var g=b[c].visible();var f=a[c].visible();if(g){a[c].show()}else{a[c].hide()}if(f){b[c].show()}else{b[c].hide()}}}function doMoveElementAction(e,c,g){var f=document.mainForm.id.value;var a="&id="+f+"&ref="+c;var b=$(g);var d=new Ajax.Request(getGNServiceURL(e),{method:"get",parameters:a,onSuccess:function(k){if(k.status==0){alert("Browser returned status 0 - Element has been moved but we didn't get the right response - please 'Save' record")}if(e.include("elem.up")){var h=b.previous();h=h.remove();b.insert({after:h});swapControls(b,h)}else{var j=b.next();j=j.remove();b.insert({before:j});swapControls(b,j)}setBunload(true)},onFailure:function(h){alert(translate("errorMoveElement")+c+" / status "+h.status+" text: "+h.statusText+" - "+translate("tryAgain"));setBunload(true)}});setBunload(true)}function doNewElementAction(e,d,b,h,f,a){var g=null;var c=false;doNewElementAjax(e,d,b,g,h,f,a,c)}function doNewAttributeAction(e,d,b,h,f){var g="geonet:attribute";var a=null;var c=false;doNewElementAjax(e,d,b,g,h,f,a,c)}function doNewORElementAction(e,d,b,h,g,f,a){var c=true;doNewElementAjax(e,d,b,h,g,f,a,c)}function setAddControls(e,d){elDescs=getControlsFromElement(e);var a=0;if(elDescs.length==5){a=1}if(d){elDescs[0].hide()}else{elDescs[0].show()}if(a==1){if(d){elDescs[a].hide()}else{elDescs[a].show()}}elDescs[1+a].show();elDescs[2+a].show();elDescs[3+a].hide();if(topElement(e)){elDescs[2+a].hide()}else{var c=e.previous();var f=getControlsFromElement(c);var b=0;if(f.length==5){b=1}f[0].hide();if(b==1){f[b].hide()}f[1+b].show();if(topElement(c)){f[2+b].hide()}else{f[2+b].show()}f[3+b].show()}}function doNewElementAjax(h,g,b,e,c,m,l,k){var j=document.mainForm.id.value;var f="&id="+j+"&ref="+g+"&name="+b;if(e!=null){f+="&child="+e}var d=$(c);var a=new Ajax.Request(getGNServiceURL(h),{method:"get",parameters:f,onSuccess:function(o){if(o.status==0){alert("Got back status 0 - element has been added but we didn't receive the response - 'Save' record now")}var n=o.responseText;if(e=="geonet:attribute"){doSaveAction("metadata.update");return}if(m=="replace"){d.replace(n)}else{if(m=="add"||m=="after"){d.insert({after:n});setAddControls(d.next(),k)}else{if(m=="before"){d.insert({before:n});setAddControls(d.previous(),k)}else{alert("doNewElementAjax: invalid what: "+m+" should be one of replace, after or before.")}}}if(b=="gmd:geographicElement"||b=="gmd:polygon"){extentMap.initMapDiv()}initCalendar();validateMetadataFields();setBunload(true)},onFailure:function(n){alert(translate("errorAddElement")+b+translate("errorFromDoc")+" / status "+n.status+" text: "+n.statusText+" - "+translate("tryAgain"));setBunload(true)}})}function disableEditForm(){if(!$("editFormTable")){return}var a=new Element("div",{id:"editorOverlay"});$("editFormTable").insert({top:a});$("editorOverlay").setStyle({opacity:"0.65"})}function doSaveAction(e,c){disableEditForm();if(typeof c!="undefined"){document.mainForm.showvalidationerrors.value="true"}else{document.mainForm.showvalidationerrors.value="false"}var f=document.mainForm.id.value;var b=null;if(e.include("finish")){var d=new Ajax.Request(getGNServiceURL(e),{method:"post",parameters:$("editForm").serialize(true),onSuccess:function(h){if(h.status==0){alert("Save succeeded but browser returned status 0")}var g=h.responseText;if(b){b.removeClassName("editing")}if(g.startsWith("<?xml")<0){alert(translate("errorSaveFailed")+g)}setBunload(false);location.replace(getGNServiceURL("metadata.show?id="+f+"&skipPopularity=y"))},onFailure:function(g){alert(translate("errorSaveFailed")+"/ status "+g.status+" text: "+g.statusText+" - "+translate("tryAgain"));Element.remove($("editorOverlay"));setBunload(true)}})}else{var a=Ext.getCmp("validationReportBox");if(a){a.destroy()}var d=new Ajax.Updater({success:document.body},getGNServiceURL(e),{method:"post",parameters:$("editForm").serialize(true),evalScripts:true,onComplete:function(g){if(g.status==200){if(document.mainForm.showvalidationerrors.value=="true"){getValidationReport()}setBunload(true);initCalendar();validateMetadataFields()}else{alert("Status returned was "+g.status+" this could be a problem")}},onFailure:function(g){alert(translate("errorSaveFailed")+"/ status "+g.status+" text: "+g.statusText+" - "+translate("tryAgain"));Element.remove($("editorOverlay"));setBunload(true)}})}}function doCancelAction(b,a){if(confirm(a)){doSaveAction(b);return true}return false}function cancelCreation(b,a){if(confirm(a)){window.location=b;return true}}function doConfirm(b,a){if(confirm(a)){doAction(b);return true}return false}function doEditorAlert(a,b){$(a).style.display="block";setBunload(true)}function checkForFileUpload(f,l){var k=$("s_"+l);var g=$("_"+l);var d=k.value;var c=g.value;var h=new RegExp("^WWW:DOWNLOAD-.*-http--download.*");var b=(h.test(d));var e=(h.test(c));var j=$("_"+f);var a=(j!=null&&j.value.length>0);if(a){if(e&&!b){alert(translate("errorChangeProtocol"));k.value=g.value}else{g.value=k.value}return}finput=$("di_"+f);fbuttn=$("db_"+f);if(b){if(finput!=null){finput.hide()}if(fbuttn!=null){fbuttn.show()}}else{if(finput!=null){finput.show()}if(fbuttn!=null){fbuttn.hide()}}g.value=k.value}function startFileUpload(b,a){Modalbox.show(getGNServiceURL("resources.prepare.upload")+"?ref="+a+"&id="+b,{title:translate("insertFileMode"),height:200,width:600})}function doFileUploadSubmit(b){setBunload(false);var d=$("fileUploadForm");var a=d.ref;var c=d["f_"+$F(a)];var e=$F(c);if(e==""){alert(translate("selectOneFileUpload"));return false}AIM.submit(b,{onComplete:function(g){if(g.body==null){alert(translate("uploadFailed")+g)}else{$("uploadresponse").innerHTML=g.body.innerHTML}var h=$("filename_uploaded");if(h!=null){var f=$("_"+$F(a));if(f!=null){f.value=h.getAttribute("title");$("di_"+$F(a)).show();$("db_"+$F(a)).hide();Modalbox.show(g.body.innerHTML,{width:600,afterHide:function(){doSaveAction("metadata.update")}})}else{alert(translate("uploadSetFileNameFailed"))}}}})}function doFileRemoveAction(c,b,a,e){var d=findPos($(e));setBunload(false);document.mainForm.access.value=a;document.mainForm.ref.value=b;document.mainForm.position.value=d;document.mainForm.action=c;goSubmit("mainForm")}function handleCheckboxAsBoolean(a,b){if(a.checked){$(b).value="true"}else{$(b).value="false"}}function setRegion(m,j,h,a,k,g,r){var c=k.value;var p="";var f="";var q="";var b="";if(c!=undefined&&c!=""){coords=c.split(",");p=coords[0];f=coords[1];q=coords[2];b=coords[3];$("_"+m).value=p;$("_"+j).value=f;$("_"+h).value=q;$("_"+a).value=b;if($("_"+r)!=null){$("_"+r).value=k.text}}else{$("_"+m).value="";$("_"+j).value="";$("_"+h).value="";$("_"+a).value=""}var l=Ext.DomQuery.select(".extentViewer");for(var o=0;o<l.length;++o){var d=l[o];if(g==d.getAttribute("elt_ref")){extentMap.updateBboxForRegion(extentMap.maps[g],m+","+h+","+j+","+a,g,true)}}}function clearRef(b){setBunload(false);var a="_"+b+"_cal";$(a).clear();setBunload(true)}var lastclick=0;function noDoubleClick(){var a=(new Date()).valueOf();if((a-lastclick)>500){setBunload(false);lastclick=a;return true}else{return false}}function buildDuration(a){if($("Y"+a).value==""){$("Y"+a).value=0}if($("M"+a).value==""){$("M"+a).value=0}if($("D"+a).value==""){$("D"+a).value=0}if($("H"+a).value==""){$("H"+a).value=0}if($("MI"+a).value==""){$("MI"+a).value=0}if($("S"+a).value==""){$("S"+a).value=0}$("_"+a).value=($("N"+a).checked?"-":"")+"P"+$("Y"+a).value+"Y"+$("M"+a).value+"M"+$("D"+a).value+"DT"+$("H"+a).value+"H"+$("MI"+a).value+"M"+$("S"+a).value+"S"}function validateNumber(d,f,b){var g=d.value;var a="0123456789";if(!f){if(!validateNonEmpty(d)){return false}}if(b){a+="."}var e=true;var h;for(i=0;i<g.length&&e;i++){h=g.charAt(i);if(h=="-"||h=="+"){if(i<0){e=false}}else{if(a.indexOf(h)==-1){e=false}}}if(!e){d.addClassName("error");return false}else{d.removeClassName("error");return true}}function validateNonEmpty(a){if(a.value.length<1){a.addClassName("error");return false}else{a.removeClassName("error");return true}}function validateEmail(a){if(!isEmail(a.value)){a.addClassName("error");return false}else{a.removeClassName("error");return true}}function validateMetadataFields(){$$("select.lang_selector").each(function(a){for(i=0;i<a.options.length;i++){if(a.options[i].getAttribute("code").toLowerCase()==Env.lang){a.options[i].selected=true}}enableLocalInput(a,false)});$$("input,textarea,select").each(function(a){validateMetadataField(a)})}function initCalendar(){var e=Ext.DomQuery.select("div.cal");for(var c=0;c<e.length;c++){var a=e[c];var b=a.id;a.id=b+"Id";if(a.firstChild==null||a.childNodes.length==1){var f="Y-m-d";var d=Ext.getDom(b+"_format");if(d){f=d.value}var h=Ext.getDom(b+"_cal");var g="";if(h){g=Ext.getDom(b+"_cal").value}var j=(f.indexOf("T")==-1?false:true);if(j){new Ext.ux.form.DateTime({renderTo:a.id,name:b,id:b,value:g,dateFormat:"Y-m-d",timeFormat:"H:i",dateAltFormats:null,timeAltFormats:null,hiddenFormat:"Y-m-d\\TH:i:s",dtSeparator:"T"})}else{new Ext.form.DateField({renderTo:a,name:b,id:b,width:160,value:g,format:"Y-m-d",altFormats:null,beforeBlur:function(){},setValue:function(k){if(!(k instanceof Date)&&this.formatDate(this.parseDate(k))!==k){Ext.form.DateField.superclass.setValue.call(this,k)}else{Ext.form.DateField.superclass.setValue.call(this,this.formatDate(this.parseDate(k)))}}})}}}}var logoSelectionWindow;function showLogoSelectionPanel(a){if(!logoSelectionWindow){var b=new GeoNetwork.editor.LogoSelectionPanel({ref:a,serviceUrl:"xml.harvesting.info?type=icons",logoUrl:Env.host+Env.url+"/images/harvesting/",listeners:{logoselected:function(e,c){var d=e.store.getAt(c);Ext.getDom(e.ref).value=e.logoUrl+d.get("name")}}});logoSelectionWindow=new Ext.Window({title:translate("logoSelectionWindow"),width:300,height:300,layout:"fit",items:b,closeAction:"hide",constrain:true,iconCls:"attached"})}logoSelectionWindow.items.get(0).setRef(a);logoSelectionWindow.show()}var keywordSelectionWindow;function showKeywordSelectionPanel(c,a){if(!keywordSelectionWindow){var b=new app.KeywordSelectionPanel({listeners:{keywordselected:function(d,g){var k="_X"+this.ref+"_"+a.replace(":","COLON");var f;var j=true;Ext.each(g,function(m,l){g[l]=m.replace('<?xml version="1.0" encoding="UTF-8"?>',"").replace(/\"/g,"&quot;").replace(/\r\n/g,"");if(j){f=g[l];j=false}else{f+="&amp;&amp;&amp;"+g[l]}});var e={tag:"input",type:"hidden",id:k,name:k,value:f};var h=Ext.DomHelper;h.append(Ext.get("hiddenFormElements"),e);doAction("metadata.update")}}});keywordSelectionWindow=new Ext.Window({title:translate("keywordSelectionWindowTitle"),width:620,height:300,layout:"fit",items:b,closeAction:"hide",constrain:true,iconCls:"searchIcon"})}keywordSelectionWindow.items.get(0).setRef(c);keywordSelectionWindow.show()}var searchKeywordSelectionWindow;function showSearchKeywordSelectionPanel(){if(!searchKeywordSelectionWindow){var a=new app.KeywordSelectionPanel({listeners:{keywordselected:function(b,d){var c;var e=true;Ext.each(d,function(j,f){c=d[f];var k;if(window.ActiveXObject){var k=new ActiveXObject("Microsoft.XMLDOM");k.async="false";k.loadXML(c)}else{var k=new DOMParser().parseFromString(c,"text/xml")}var h=k.getElementsByTagName("gmd:keyword");var g;Ext.each(h,function(n,l){var m=h[l].childNodes[1].childNodes[0].nodeValue;addKeyword(m,e);e=false})})}}});searchKeywordSelectionWindow=new Ext.Window({width:620,height:300,title:translate("keywordSelectionWindowTitle"),layout:"fit",items:a,closeAction:"hide",constrain:true,iconCls:"searchIcon"})}searchKeywordSelectionWindow.show()}function addKeyword(a,b){a='"'+a+'"';if(b){$("themekey").value=""}if($("themekey").value!=""){$("themekey").value+=" or "+a}else{$("themekey").value=a}}function doSaveThen(a){new Ajax.Request(getGNServiceURL("metadata.update"),{method:"post",parameters:$("editForm").serialize(true),onSuccess:function(b){location.replace(getGNServiceURL(a))},onFailure:function(b){alert(translate("errorSaveFailed")+"/ status "+b.status+" text: "+b.statusText+" - "+translate("tryAgain"));Element.remove($("editorOverlay"));setBunload(true)}})}function showLinkedMetadataSelectionPanel(d,c){var e=((c=="uuidref"||c=="iso19110"||c=="")?true:false);var a=new app.LinkedMetadataSelectionPanel({ref:d,singleSelect:e,mode:c,listeners:{linkedmetadataselected:function(h,l){if(e){if(this.ref!=null){$("_"+this.ref+(c!=""?"_"+c:"")).value=l[0].data.uuid}else{if(this.mode=="iso19110"){var j="xml.relation.insert?parentId="+document.mainForm.id.value+"&childUuid="+l[0].data.uuid;var k=$("editorBusy");if(k){k.show()}disableEditForm();var g=Ext.Ajax.request({url:j,method:"GET",success:function(o,q){var p=o.responseText;doSaveThen("metadata.processing?uuidref="+l[0].data.uuid+"&id="+document.mainForm.id.value+"&process=update-attachFeatureCatalogue")},failure:function(o,p){Ext.MessageBox.alert(translate("error")+" / status "+o.status+" text: "+o.statusText+" - "+translate("tryAgain"));Element.remove($("editorOverlay"));if(k){k.hide()}setBunload(true)}})}}}else{var f=[];var n=l.length>1?true:false;Ext.each(l,function(p,o){if(n){c=c+"_"+o}f.push({tag:"input",type:"hidden",id:c,name:c,value:p.data.uuid})});var m=Ext.DomHelper;m.append(Ext.get("hiddenFormElements"),f)}}}});var b=new Ext.Window({title:translate("linkedMetadataSelectionWindowTitle"),width:620,height:300,layout:"fit",items:a,closeAction:"hide",constrain:true,iconCls:"linkIcon",modal:true});b.show()}function detachFeatureCatalogueMd(e,c,d){var b="xml.relation.delete?parentUuid="+e+"&childUuid="+c;var a=Ext.Ajax.request({url:b,method:"GET",success:function(f,h){var g=f.responseText;window.location.replace("metadata.processing?uuidref="+c+"&id="+d+"&process=update-detachFeatureCatalogue")},failure:function(f,g){Ext.MessageBox.alert(translate("error")+" / status "+f.status+" text: "+f.statusText+" - "+translate("tryAgain"));setBunload(true)}})}var geoPublisherWindow;function showGeoPublisherPanel(g,a,d,f,e,b){Ext.QuickTips.init();if(geoPublisherWindow&&geoPublisherWindow.getEl().dom.parentNode==null){geoPublisherWindow.close();geoPublisherWindow=undefined}if(!geoPublisherWindow){var c=new GeoNetwork.GeoPublisherPanel({width:650,height:300,layers:backgroundLayers,extent:b,listeners:{addOnLineSource:function(h,l,k,m){var p="_X"+e+"_"+f.replace(":","COLON");var o="<gmd:CI_OnlineResource xmlns:gmd=&quot;http://www.isotc211.org/2005/gmd&quot; xmlns:gco=&quot;http://www.isotc211.org/2005/gco&quot;><gmd:linkage><gmd:URL>"+l+"</gmd:URL></gmd:linkage><gmd:protocol><gco:CharacterString>OGC:WMS-1.1.1-http-get-map</gco:CharacterString></gmd:protocol><gmd:name gco:nilReason=&quot;missing&quot;><gco:CharacterString>"+k+"</gco:CharacterString></gmd:name><gmd:description><gco:CharacterString>"+k+"</gco:CharacterString></gmd:description></gmd:CI_OnlineResource>";var j={tag:"input",type:"hidden",id:p,name:p,value:o};var n=Ext.DomHelper;n.append(Ext.get("hiddenFormElements"),j);doAction("metadata.update")}}});geoPublisherWindow=new Ext.Window({title:translate("geoPublisherWindowTitle"),layout:"fit",modal:true,items:c,closeAction:"hide",constrain:true,iconCls:"repository"})}geoPublisherWindow.items.get(0).setRef(g,a,d);geoPublisherWindow.setTitle(translate("geoPublisherWindowTitle")+" "+a);geoPublisherWindow.show()}function showLinkedServiceMetadataSelectionPanel(c,e,d){var a=new app.LinkedMetadataSelectionPanel({mode:c,autoWidth:true,ref:null,proxy:Env.proxy,serviceUrl:e,region:"north",uuid:d,createIfNotExistURL:"metadata.create.form?type="+(c=="attachService"?"service":"dataset"),singleSelect:true,listeners:{linkedmetadataselected:function(h,l){var j=Ext.getCmp("getCapabilitiesLayerName").getValue();if(c=="attachService"){var g="xml.metadata.processing?uuid="+l[0].data.uuid+"&process=update-srv-attachDataset&uuidref="+d+"&scopedName="+j;var k=$("editorBusy");if(k){k.show()}disableEditForm();Ext.Ajax.request({url:g,method:"GET",success:function(m,o){var n=m.responseText;if(n.indexOf("Not owner")!=-1){alert(translate("NotOwnerError"))}else{if(n.indexOf("error")!=-1){alert(translate("error")+n)}}doSaveThen("metadata.processing?uuid="+d+"&process=update-onlineSrc&desc="+j+"&url="+escape(l[0].data.uri)+"&scopedName="+j)},failure:function(m,n){if(k){k.hide()}Element.remove($("editorOverlay"));Ext.MessageBox.alert(translate("ServiceUpdateError"));setBunload(true)}})}else{var f="xml.metadata.processing?uuid="+l[0].data.uuid+"&process=update-onlineSrc&desc="+j+"&url="+e+"&scopedName="+j;Ext.Ajax.request({url:f,method:"GET",success:function(m,o){var n=m.responseText;if(n.indexOf("Not owner")!=-1){alert(translate("NotOwnerError"))}else{if(n.indexOf("error")!=-1){alert(translate("error")+n)}}window.location.replace("metadata.processing?uuid="+d+"&process=update-srv-attachDataset&uuidref="+l[0].data.uuid+"&scopedName="+j)},failure:function(m,n){Ext.MessageBox.alert(translate("ServiceUpdateError"));setBunload(true)}})}},scope:this}});var b=new Ext.Window({title:(c=="attachService"?translate("associateService"):translate("associateDataset")),layout:"fit",width:620,height:400,items:a,closeAction:"hide",constrain:true,iconCls:"linkIcon",modal:true});b.show()}var crsSelectionWindow;function showCRSSelectionPanel(c,a){if(!crsSelectionWindow){var b=new app.CRSSelectionPanel({listeners:{crsSelected:function(e){var g="_X"+c+"_"+a.replace(":","COLON");var d={tag:"input",type:"hidden",id:g,name:g,value:e};var f=Ext.DomHelper;f.append(Ext.get("hiddenFormElements"),d);doAction("metadata.update")}}});crsSelectionWindow=new Ext.Window({title:translate("crsSelectionWindowTitle"),layout:"fit",width:620,height:300,items:b,closeAction:"hide",constrain:true,iconCls:"searchIcon"})}crsSelectionWindow.items.get(0).setRef(c);crsSelectionWindow.show()}function validateMetadataField(a){var b=a.getAttribute("onchange");var c=a.getAttribute("onkeyup");if(typeof(b)=="function"){b=b.toString()}if(typeof(c)=="function"){c=c.toString()}if(!a||(b!=null&&b.indexOf("validate")==-1)||(c!=null&&c.indexOf("validate")==-1)){return}if(a.onkeyup){a.onkeyup()}if(a.onchange){a.onchange()}}function enableLocalInput(f,b){var e=f.value;var d=f.parentNode.parentNode;var c=d.getElementsByTagName("input");var a=d.getElementsByTagName("textarea");show(c,e,b);show(a,e,b)}function clearSuggestion(a){if($(a)!=null){$(a).innerHTML=""}}function show(c,d,a){for(index in c){var b=c[index];if(b.style!=null&&b.style.display!="none"){b.style.display="none"}}for(index in c){var b=c[index];if(b.name==d){b.style.display="block";if(a){b.focus()}}}}function googleTranslate(b,a,e,f,d){var c={GE:"de",SP:"es",CH:"zh"};if(c[f]){f=c[f]}if(c[d]){d=c[d]}if($(b).value==""){alert(translate("translateWithGoogle.emptyInput"));return}if($(b).value.length>5000){alert(translate("translateWithGoogle.maxSize"));return}if($(a)!=null){$(a).innerHTML=""}google.language.translate($(b).value,f,d,function(g){if(!g.error){var h=g.translation.replace(/&#39;/g,"'").replace(/&quot;/g,'"');if($(e)!=null){$(e).value=h}if($(a)!=null){$(a).innerHTML=h;$(a).style.display="block"}}else{alert(g.error.message+" ("+g.error.code+")")}validateMetadataField($(e))})}function updateUpperCardinality(b,c){var a=b+"_isInfinite";if(c=="0"||c=="1"){$(b).value=c;$(a).value="false"}else{if(c=="n"){$(b).value="";$(a).value="true"}else{$(b).value="";$(a).value="false"}}}function updateValidationReportVisibilityRules(a){$("validationReport").descendants().each(function(b){if(b.nodeName=="SPAN"){errors=$(b).next().descendants().filter(function(c){return(c.nodeName=="LI"&&c.getAttribute("name")=="error")});if(errors.length==0&&a){b.style.display="none"}else{b.style.display="block"}}else{if(b.nodeName=="LI"){if(b.getAttribute("name")=="pass"&&a){b.style.display="none"}else{b.style.display="block"}}}})}function getValidationReport(){var d=document.mainForm.id.value;var a="&id="+d;var c="metadata.validate";var b=new Ajax.Request(getGNServiceURL(c),{method:"get",parameters:a,onSuccess:function(f){if(f.status==0){alert("Browser returned status 0 and validation report has been lost - try again?");getValidationReport()}var e=f.responseText;displayBox(e,"validationReport",false);updateValidationReportVisibilityRules($("checkError").checked);setBunload(true)},onFailure:function(e){alert(translate("errorOnAction")+c+" / status "+e.status+" text: "+e.statusText+" - "+translate("tryAgain"));$("editorBusy").hide();setBunload(true)}})}function computeExtentFromKeywords(a){window.location.replace("metadata.processing?id="+document.mainForm.id.value+"&process=add-extent-from-geokeywords&url="+Env.host+Env.locService+"&gurl="+Env.host+Env.url+"&lang="+Env.lang+"&replace="+a)};