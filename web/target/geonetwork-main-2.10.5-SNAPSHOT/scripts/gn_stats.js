var serviceUrlPrefix=Env.locService+"/";function initStat(){updateDiv("stat.tagCloud","stat.tagCloudDiv");initCalendar()}function injectServiceResponse(a,c,d){var b=new Ajax.Request(serviceUrlPrefix+a,{method:"get",parameters:d,evalScripts:true,onSuccess:function(e){$(c).innerHTML=e.responseText;$(c).show()},onFailure:function(e){$("serviceFailureDiv").innerHTML=e.responseText;$("serviceFailureDiv").show()}})}function updateDiv(a,c,d){var b=new Ajax.Request(serviceUrlPrefix+a,{method:"get",parameters:d,onSuccess:function(f){var e=f.responseText;generateCloud(e,"stat.tagCloudDiv")},onFailure:function(e){$("serviceFailureDiv").innerHTML=e.responseText;$("serviceFailureDiv").show()}})}function collapseSearch(a){if(!a){return}for(var b=0;b<a.length;b++){$(a[b]).hide()}}function displayGraphic(){var e=$("f_date_from").value;var c=$("f_date_to").value;if(!e){alert("Please choose a date from");return}if(!c){alert("Please choose a date to");return}var a;for(var b=0;b<document.statForm.elements.length;b++){if(document.statForm.elements[b].type=="radio"&&document.statForm.elements[b].checked){a=document.statForm.elements[b].value}}var d="dateFrom="+e+"T00:00:00&dateTo="+c+"T23:59:59&graphicType="+a;injectServiceResponse("stat.graphByDate","stat.graphicDiv",d)}function dateChanged(c){var a=c.date;var b=a.getTime()}function getFontSize(b,a,c){return Math.round((150*(1+(1.5*c-a/2)/a)))}function generateCloud(g,j){var l=g.split(/;\r?\n/);var d=10000000000;var k=0;for(var f=0;f<l.length;f++){var m=l[f];var e=m.split(/,/);if(e.length!=2){l.splice(f,1);continue}e[0]=parseFloat(e[0]);l[f]=e;if(e[0]>k){k=e[0]}if(e[0]<d){d=e[0]}}l.sort(function(o,n){var i=o[1].toLowerCase();var p=n[1].toLowerCase();return i>p?1:(i<p?-1:0)});var h="<style type='text/css'>#jscloud a:hover { text-decoration: underline; }</style> <div id='jscloud'>";for(var f=0;f<l.length;f++){var b=l[f][0];var a=getFontSize(d,k,b);h+=" <a style='font-size:"+a+"%;'>"+l[f][1]+"</a> "}h+="</div>";var c=document.getElementById(j);c.innerHTML=h}function setClass(b,a){b.setAttribute("class",a);b.setAttribute("className",a)};