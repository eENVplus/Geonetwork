var getGNServiceURL=function(a){if(a.indexOf("/")==0){return Env.locService+a}else{return Env.locService+"/"+a}};function setAll(c){var b=$(c).getElementsByTagName("input");for(var a=0;a<b.length;a++){b[a].checked=true}}function clearAll(c){var b=$(c).getElementsByTagName("input");for(var a=0;a<b.length;a++){b[a].checked=false}}function radioModalUpdate(h,a,g,f){var d="";var b=$(h).getElementsBySelector('input[type="hidden"],textarea,select');b.each(function(i){d+="&"+i.name+"="+i.value});var c=$(h).getElementsBySelector('input[type="radio"]');c.each(function(i){if(i.checked){d+="&"+i.name+"="+i.value}});if(g!=null&&g){a=getGNServiceURL(a)+"?"+d;Modalbox.show(a,{title:f,width:600})}else{var e=new Ajax.Request(getGNServiceURL(a),{method:"get",parameters:d,onSuccess:function(){},onFailure:function(i){alert(translate("error")+a+" / status "+i.status+" text: "+i.statusText+" - "+translate("tryAgain"))}});window.Modalbox.hide()}}function checkBoxModalUpdate(g,a,f,e){var c=$(g).getElementsBySelector('input[type="checkbox"]');var b="&id="+$("metadataid").value;c.each(function(h){if(h.checked){b+="&"+h.name+"=on"}});if(f!=null&&f){a=getGNServiceURL(a)+"?"+b;Modalbox.show(a,{title:e,width:600})}else{var d=new Ajax.Request(getGNServiceURL(a),{method:"get",parameters:b,onSuccess:function(){},onFailure:function(h){alert(translate("error")+a+" / status "+h.status+" text: "+h.statusText+" - "+translate("tryAgain"))}});window.Modalbox.hide()}}function checkCreate(a,b){descs=$("groups").getValue();if(descs.length==0){alert(translate("userAtLeastOneGroup"));return false}return true}function doConfirmDelete(a,c,d,f,e){if(confirm(c+" ("+d+")")){var b;if(opener){b=opener.$(f)}else{b=$(f)}if(b){b.hide()}Modalbox.show(a,{title:e,width:600,afterHide:function(){if($("simple_search_pnl")&&$("simple_search_pnl").visible()){runSimpleSearch()}else{if($("advanced_search_pnl")&&$("advanced_search_pnl").visible()){runAdvancedSearch()}else{if($("metadata_search_pnl")&&$("metadata_search_pnl").visible()){location.replace(getGNServiceURL("main.search")+"?hitsPerPage=10&editable=true")}else{location.replace(getGNServiceURL("home"))}}}runRssSearch()}});return true}return false}function doOtherButton(b,d,c,a){if(a===undefined){a=400}Modalbox.show(b,{title:d,width:c,height:a});return true}function doEdit(a,b){load(a)}function doAction(a){document.mainForm.action=a;goSubmit("mainForm")}function doTabAction(b,a){document.mainForm.currTab.value=a;doAction(b)}function setBunload(a){}function runFileDownload(a,b){if(a.include("resources.get")){location.replace(a)}else{Modalbox.show(a,{title:b,height:400,width:600})}}function runFileDownloadSummary(a,c){pars="&uuid="+a;var b=new Ajax.Request(getGNServiceURL("prepare.file.download"),{method:"get",parameters:pars,onSuccess:function(d){Modalbox.show(d.responseText,{title:c,height:400,width:600})},onFailure:function(d){alert(translate("error")+" "+getGNServiceURL("prepare.file.download")+" failed: status "+d.status+" text: "+d.statusText+" - "+translate("tryAgain"))}})}function batchUpdateChildren(a,d,c){var b=getGNServiceURL(a);Modalbox.show(b,{title:d,width:c})}function updateChildren(f,a,e){var c="&id="+$("id").value+"&parentUuid="+$("parentUuid").value+"&schema="+$("schema").value+"&childrenIds="+$("childrenIds").value;var b=$(f).getElementsBySelector('input[type="checkbox"]');b.each(function(g){if(g.checked){c+="&"+g.name+"=true"}});var d=$(f).getElementsBySelector('input[type="radio"]');d.each(function(g){if(g.checked){c+="&"+g.name+"="+g.value}});Ext.Ajax.request({url:Env.locService+"/"+a,method:"GET",params:c,success:function(g,j){var i=g.responseXML;if(i.childNodes.length!=0&&i.childNodes[0].localName=="response"){var h=i.childNodes[0].childNodes[0].nodeValue;alert(h);window.Modalbox.hide()}else{alert(e)}},failure:function(g,h){alert(e)}})};