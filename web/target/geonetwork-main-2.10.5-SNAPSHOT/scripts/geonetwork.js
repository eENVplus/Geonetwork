var getGNServiceURL=function(a){if(a.indexOf("/")==0){return Env.locService+a}else{return Env.locService+"/"+a}};function init(){}function translate(a){return translations[a]||a}var Browser={Version:function(){var a=1000;if(navigator.appVersion.indexOf("MSIE")!=-1){a=parseFloat(navigator.appVersion.split("MSIE")[1])}return a}};if(Browser.Version()>=9){if(typeof Range.prototype.createContextualFragment=="undefined"){Range.prototype.createContextualFragment=function(b){var c=window.document;var a=c.createElement("div");a.innerHTML=b;var e=c.createDocumentFragment(),d;while((d=a.firstChild)){e.appendChild(d)}return e}}}function replaceStringParams(d,c){var b=d;for(var a=0;a<c.length;a++){b=b.replace("$"+(a+1),c[a])}return b}function get_cookie(b){var a=document.cookie.match(b+"=(.*?)(;|$)");if(a){return(unescape(a[1]))}else{return null}}function popNew(b){msgWindow=window.open(b,"displayWindow","location=no, toolbar=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=800, height=600");msgWindow.focus()}function openPage(b,a){msgWindow=window.open(b,a,"location=yes, toolbar=yes, directories=yes, status=yes, menubar=yes, scrollbars=yes, resizable=yes, width=800, height=600");msgWindow.focus()}function popFeedback(b){msgWindow=window.open(b,"feedbackWindow","location=no, toolbar=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=800, height=600");msgWindow.focus()}function popWindow(b){msgWindow=window.open(b,"popWindow","location=no, toolbar=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=800, height=600");msgWindow.focus()}function popInterMap(b){msgWindow=window.open(b,"InterMap","location=no, toolbar=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=800, height=600");msgWindow.focus()}var ViewEditWindow=Class.create({initialize:function(b,a){this.pane=b;this.id=a},editing:function(){if(this.pane&&this.pane.closed){return false}if(this.pane.$("editForm")){return true}else{return false}},focus:function(){this.pane.focus()},close:function(){this.pane.close()}});var viewEditWindows=[];function findWindow(d){for(var b=0,a=viewEditWindows.length;b<a;++b){var c=viewEditWindows[b];if(c.id==d){return c}}return null}function popEditorViewer(c,e){var b=findWindow(e);if(b&&b.editing()){b.focus();alert(translate("editorInUse"));return}var d=false;if(b==null){d=true}b=new ViewEditWindow(window.open(c,"MetadataEditorViewer"+e,"location=no, toolbar=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=900, height=700"),e);b.focus();if(d){viewEditWindows.push(b)}}function checkEditorAndClose(){for(var b=0,a=viewEditWindows.length;b<a;++b){var c=viewEditWindows[b];if(c.editing()){c.focus();alert(translate("editorInUse"));return false}c.close()}return true}function doCreateCheck(a,c,b){var d=$(c).serialize();if(b=="1"){Modalbox.hide()}location.replace(getGNServiceURL(a)+"?"+d)}function popCreateWindow(b){createWindow=window.open(b,"CreateMetadataWindow","location=no, toolbar=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=800, height=600");createWindow.focus()}function popAdminWindow(b){adminWindow=window.open(b,"AdminWindow","location=no, toolbar=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=800, height=600");adminWindow.focus()}function goSubmit(a){document.forms[a].submit()}function goReset(a){document.forms[a].reset()}function entSub(a){if(window.event&&window.event.keyCode==13){goSubmit(a)}else{return true}}function goBack(){history.back()}function processCancel(){document.close()}function load(a){document.location.href=a}function doConfirm(a,b){if(confirm(b)){load(a);return true}return false}function doLogout(){var b=Ext.state.Manager.getProvider();var a=b.clear("params");goSubmit("logout")}function feedbackSubmit(){var a=$("feedbackf");if(isWhitespace(a.comments.value)){a.comments.value=translate("noComment")}if(isWhitespace(a.name.value)||isWhitespace(a.org.value)){alert(translate("addName"));return}else{if(!isEmail(a.email.value)){alert(translate("checkEmail"));return}}Modalbox.show(getGNServiceURL("file.download"),{height:400,width:600,params:a.serialize(true)})}function doDownload(g,e){var f=$("downloadlist").getElementsByTagName("INPUT");var c="&id="+g+"&access=private";var d=false;for(var b=0;b<f.length;b++){if(f[b].checked||e!=null){d=true;var a=f[b].getAttribute("name");c+="&fname="+a}}if(!d){alert(translate("selectOneFileDownload"));return}Modalbox.show(getGNServiceURL("file.disclaimer")+"?"+c,{height:400,width:600})}function batchOperation(b,f,d,e,a){if(e!=null){if(!confirm(e)){return}}var c=Env.locService+"/"+b;if(a===undefined){Modalbox.show(c,{title:f,width:d,afterHide:function(){var g=Env.locService+"/"+b;if($("simple_search_pnl").visible()){runSimpleSearch()}else{if($("advanced_search_pnl").visible()){runAdvancedSearch()}else{$("search-results-content").hide()}}runRssSearch()}})}else{Modalbox.show(c,{title:f,width:d,height:a,afterHide:function(){var g=Env.locService+"/"+b;if($("simple_search_pnl").visible()){runSimpleSearch()}else{if($("advanced_search_pnl").visible()){runAdvancedSearch()}else{$("search-results-content").hide()}}runRssSearch()}})}}function oActionsInit(a,b){if(b===undefined){b=""}$(a+"Ele"+b).style.width=$(a+b).getWidth();$(a+"Ele"+b).style.top=$(a+b).positionedOffset().top+$(a+b).getHeight()+"px";$(a+"Ele"+b).style.left=$(a+b).positionedOffset().left+"px"}function oActions(b,d){var a="../../images/plus.gif";var c="../../images/minus.png";if(d===undefined){d=""}oActionsInit(b,d);if($(b+"Ele"+d).style.display=="none"){$(b+"Ele"+d).style.display="block";$(b+"Img"+d).src=c}else{$(b+"Ele"+d).style.display="none";$(b+"Img"+d).src=a}}function actionOnSelect(a){if($("nbselected").innerHTML==0&&$("oAcOsEle").style.display=="none"){alert(a)}else{oActions("oAcOs")}}function checkBatchExtractSubtemplates(a,b){if($("xpath").value==""){alert(translate("selectXPath"));return false}if($("xpathTitle").value==""){alert(translate("selectExtractTitle"));return false}Modalbox.show(getGNServiceURL(a),{title:b,params:$("extractSubtemplatesForm").serialize(true),height:400})}function checkBatchNewOwner(a,b){if($("user").value==""){alert(translate("selectNewOwner"));return false}if($("group").value==""){alert(translate("selectOwnerGroup"));return false}Modalbox.show(getGNServiceURL(a),{title:b,params:$("batchnewowner").serialize(true),afterHide:function(){if($("simple_search_pnl").visible()){runSimpleSearch()}else{if($("advanced_search_pnl").visible()){runAdvancedSearch()}else{$("search-results-content").hide()}}runRssSearch()}})}function addGroups(b){var e=xml.children(b,"group");$("group").options.length=0;for(var d=0;d<e.length;d++){var f=xml.evalXPath(e[d],"id");var a=xml.evalXPath(e[d],"name");var c=document.createElement("option");c.text=a;c.value=f;if(e.length==1){c.selected=true}$("group").options.add(c)}}function addGroupsCallback_OK(b){if(b.nodeName=="error"){ker.showError(translate("cannotRetrieveGroup"),b);$("group").options.length=0;$("group").value="";var a=$("user");for(i=0;i<a.options.length;i++){a.options[i].selected=false}}else{addGroups(b)}}function doGroups(a){var b=ker.createRequest("id",a);ker.send("xml.usergroups.list",b,addGroupsCallback_OK)}function processRegSub(b){var d=" ";var a=6;if(document.userregisterform.name.value.length==0){alert(translate("firstNameMandatory"));return}if(isWhitespace(document.userregisterform.name.value)){alert(translate("firstNameMandatory"));return}if(document.userregisterform.name.value.indexOf(d)>-1){alert(translate("spacesNot"));return}if(document.userregisterform.surname.value.length==0){alert(translate("lastNameMandatory"));return}if(isWhitespace(document.userregisterform.surname.value)){alert(translate("lastNameMandatory"));return}if(document.userregisterform.surname.value.indexOf(d)>-1){alert(translate("spacesNot"));return}if(!isEmail(document.userregisterform.email.value)){alert(translate("emailAddressInvalid"));return}var c=new Ajax.Request(getGNServiceURL(b),{method:"post",parameters:$("userregisterform").serialize(true),onSuccess:function(f){var e=f.responseText;var g=translate("yourRegistration");Modalbox.show(e,{title:g,width:300})},onFailure:function(f){var e=f.responseText;var g=translate("registrationFailed");Modalbox.show(e,{title:g,width:300})}})}function processForgottenPwdSubmit(a){var c=$("forgottenpwd");if(isWhitespace(c.username.value)){alert(translate("usernameMandatory"));return false}var b=new Ajax.Request(getGNServiceURL(a),{method:"post",parameters:c.serialize(true),onSuccess:function(e){var d=e.responseText;var f=translate("changePassword");Modalbox.show(d,{title:f,width:300})},onFailure:function(e){var d=e.responseText;var f=translate("changePasswordFailed");Modalbox.show(d,{title:f,width:300})}})}var adminWindow;function doBannerButton(b,e,d,c,a){if(d=="1"){if(a!=null&&a>0){Modalbox.show(b,{params:{modal:""},title:e,height:a,width:c})}else{Modalbox.show(b,{params:{modal:""},title:e,width:c})}}else{location.replace(b)}return true}function doAdminBannerButton(b,e,d,c,a){if(d=="1"){Modalbox.show(b,{params:{modal:""},title:e,height:a,width:c,evalScripts:true,afterHide:function(){if(adminWindow){adminWindow.close()}}})}else{location.replace(b)}return true}var ViewEditWindow=Class.create({initialize:function(b,a){this.pane=b;this.id=a},editing:function(){if(this.pane&&this.pane.closed){return false}if(this.pane.$("editForm")){return true}else{return false}},focus:function(){this.pane.focus()},close:function(){this.pane.close()}});function displayBox(c,d,b){var e=d+"Box";var a=Ext.getCmp(e);if(a==undefined){a=new Ext.Window({title:translate(d),id:e,layout:"fit",modal:b,constrain:true,width:400,collapsible:(b?false:true),autoScroll:true,iconCls:d+"Icon",closeAction:"hide",onEsc:"hide",listeners:{hide:function(){this.hide()}},contentEl:d})}if(a){if(c!=null){$(d).innerHTML="";$(d).innerHTML=c;$(d).style.display="block"}a.show();a.setHeight(345);a.anchorTo(Ext.getBody(),(b?"c-c":"tr-tr"))}}function toggleFieldset(a,b){if(a.hasClassName("downBt")){a.removeClassName("downBt");b.style.display="none";a.addClassName("rightBt")}else{a.removeClassName("rightBt");b.style.display="block";a.addClassName("downBt")}}function addTemplate(h,a){var c="metadata.templates.add.default?schema=";var g=$("metadata.schemas.select");var f="";for(i=0;i<g.length;i++){if(g.options[i].selected){if(f!=""){f+=","}f+=g.options[i].value}}if(f==""){alert(h);return}else{c=c+f}var e="waitLoadingTemplatesSamples";var d="addTemplatesSamplesButtons";$(e).style.display="block";$(d).style.display="none";var b=new Ajax.Request(c,{method:"get",parameters:null,onComplete:function(j){},onLoaded:function(j){},onSuccess:function(k){var j=k.responseXML.documentElement;var l=j.getAttribute("status");$(e).style.display="none";$(d).style.display="block";if(l=="true"){alert(a)}else{alert(translate("error"))}var m=$("metadata.schemas.select");for(i=0;i<m.length;i++){m.options[i].selected=false}},onFailure:function(j){$(e).style.display="none";$(d).style.display="block";alert("Failed")}})}function addSampleData(j,f,a){var b="metadata.samples.add?file_type=mef&uuidAction=overwrite&schema=";var g=$("metadata.schemas.select");var d="";for(i=0;i<g.length;i++){if(g.options[i].selected){if(d!=""){d+=","}d+=g.options[i].value}}if(d==""){alert(j);return}else{b=b+d}var e="waitLoadingTemplatesSamples";var c="addTemplatesSamplesButtons";$(e).style.display="block";$(c).style.display="none";var h=new Ajax.Request(b,{method:"get",parameters:null,onComplete:function(k){},onLoaded:function(k){},onSuccess:function(l){var k=l.responseXML.documentElement;var n=k.getAttribute("status");var m=k.getAttribute("error");$(e).style.display="none";$(c).style.display="block";if(n=="true"){alert(a)}else{alert(translate("error")+": "+m)}var o=$("metadata.schemas.select");for(i=0;i<o.length;i++){o.options[i].selected=false}},onFailure:function(k){$(e).style.display="none";$(c).style.display="block";alert(f)}})}function idxOperation(a,f,d,e){if(e&&!confirm(translate("doYouReallyWantToDoThis"))){return}var c=Env.locService+"/"+a;$(f).style.display="block";$(d).style.display="none";var b=new Ajax.Request(c,{method:"get",parameters:null,onComplete:function(g){},onLoaded:function(g){},onSuccess:function(h){var g=h.responseXML.documentElement;var j=g.getElementsByTagName("status")[0].firstChild.nodeValue;$(f).style.display="none";$(d).style.display="block";if(j=="true"){alert(translate("metadata.admin.index.success"))}else{alert(translate("metadata.admin.index.wait"))}},onFailure:function(g){$(f).style.display="none";$(d).style.display="block";alert(translate("metadata.admin.index.failed"))}})};