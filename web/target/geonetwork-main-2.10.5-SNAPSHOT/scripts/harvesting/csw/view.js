csw.View=function(d){HarvesterView.call(this);var h=new XSLTransformer("harvesting/csw/client-search-row.xsl",d);var r=new XSLTransformer("harvesting/csw/client-search-capability.xsl",d);var o=new XSLTransformer("harvesting/csw/client-search-temp.xsl",d);var a=new XSLTransformer("harvesting/csw/client-edit-capability.xsl",d);var z=new XSLTransformer("harvesting/csw/elem-capability.xsl",d);var b=new XSLTransformer("harvesting/csw/client-privil-row.xsl",d);var q=new XSLTransformer("harvesting/csw/client-result-tip.xsl",d);var m=d;var s=new Validator(m);var t=null;var B;var C;var D=0;this.setPrefix("csw");this.setPrivilTransf(b);this.setResultTransf(q);this.init=y;this.setEmpty=A;this.setData=i;this.getData=n;this.isDataValid=f;this.clearIcons=l;this.addIcon=x;this.addEmptySearch=v;this.removeSearch=j;Event.observe("csw.icon","change",ker.wrap(this,e));function y(){s.add([{id:"csw.name",type:"length",minSize:1,maxSize:200},{id:"csw.capabUrl",type:"length",minSize:1,maxSize:200},{id:"csw.capabUrl",type:"url"},{id:"csw.username",type:"length",minSize:0,maxSize:200},{id:"csw.password",type:"length",minSize:0,maxSize:200}]);t=new Shower("csw.useAccount","csw.account")}function A(){this.setEmptyCommon();$("csw.rejectDuplicateResource").checked=false;w();$("csw.capabUrl").value="";var F=$("csw.icon").options;for(var E=0;E<F.length;E++){if(F[E].value=="default.gif"){F[E].selected=true;break}}t.update();e()}function i(H){this.setDataCommon(H);var E=H.getElementsByTagName("site")[0];var G=H.getElementsByTagName("searches")[0];hvutil.setOption(E,"capabilitiesUrl","csw.capabUrl");hvutil.setOption(E,"icon","csw.icon");hvutil.setOption(E,"rejectDuplicateResource","csw.rejectDuplicateResource");var I=G.getElementsByTagName("search");w();for(var F=0;F<I.length;F++){u(I[F])}this.removeAllGroupRows();this.addGroupRows(H);this.unselectCategories();this.selectCategories(H);t.update();e()}function n(){var I=this.getDataCommon();I.CAPAB_URL=$F("csw.capabUrl");I.ICON=$F("csw.icon");I.REJECTDUPLICATERESOURCE=$("csw.rejectDuplicateResource").checked;var J=[];var L=xml.children($("csw.searches"));if(typeof(C)=="undefined"){C=z.transform(Sarissa.getDomDocument().createElement("search"))}var N=C.getElementsByTagName("capability");var H={};for(var K=0;K<L.length;K++){var M=L[K];var H={};for(var G=0;G<N.length;G++){var F=N[G].getAttribute("name");var E=xml.getElementById(M,N[G].textContent);if(E!=null){H[F]=E.value}}J.push(H)}if(typeof(B)=="undefined"){var P=Sarissa.getDomDocument();var O=P.createElement("search");for(var G=0;G<N.length;G++){var Q=P.createTextNode("{"+N[G].getAttribute("name")+"}");var R=P.createElement(N[G].getAttribute("name"));R.appendChild(Q);O.appendChild(R)}g(O)}I.SEARCH_LIST=J;I.SEARCH_TEMP=B;I.PRIVILEGES=this.getPrivileges();I.CATEGORIES=this.getSelectedCategories();return I}function f(){if(!s.validate()){return false}return this.isDataValidCommon()}function l(){$("csw.icon").options.length=0}function x(E){gui.addToSelect("csw.icon",E,E)}function e(){var E=$F("csw.icon");var F=$("csw.icon.image");F.setAttribute("src",Env.url+"/images/harvesting/"+E)}function p(){var F=Sarissa.getDomDocument();var E=F.createElement("search");c(E)}function v(){var E=$("csw.capabUrl").value;if(E==""){return}if(E.indexOf("GetCapabilities")===-1){E+=(E.indexOf("?")===-1?"?":"&")+"request=GetCapabilities&version=2.0.2&service=CSW"}var F="../../proxy?url="+encodeURIComponent(E);OpenLayers.Request.GET({url:F,success:function(J){var M=Sarissa.getDomDocument();var T=M.createElement("search");var O=M.createElement("search");var N=new OpenLayers.Format.XML();var R=N.read(J.responseText);var H=N.getElementsByTagNameNS(R,"*","Constraint");var I=[];for(var L=0;L<H.length;L++){if(H[L].attributes[0].value=="SupportedISOQueryables"||H[L].attributes[0].value=="AdditionalQueryables"){for(var K=0;K<H[L].childNodes.length;K++){if(H[L].childNodes[K].nodeName=="ows:Value"){I.push(H[L].childNodes[K].firstChild.nodeValue)}}}}I.sort();for(var L=0;L<I.length;L++){var P=I[L].replace(":","__");var G=M.createElement(P);T.appendChild(G);var Q=M.createTextNode("{"+P+"}");var S=M.createElement(P);S.appendChild(Q);O.appendChild(S)}g(O);k(T)},failure:function(G){alert("failure")}})}function k(F){var G=""+D++;F.setAttribute("id",G);F.setAttribute("xmlns:apiso","http://www.opengis.net/cat/csw/apiso/1.0");C=z.transform(F);var E=r.transformToText(F);new Insertion.Bottom("csw.searches",E);Element.hide("csw.addSearch")}function u(F){if(F.childElementCount==0){return}var G=""+D++;F.setAttribute("id",G);C=z.transform(F);var E=a.transformToText(F);new Insertion.Bottom("csw.searches",E);Element.hide("csw.addSearch")}function g(E){B=xml.toString(E)}function c(F){var G=""+D++;F.setAttribute("id",G);var E=h.transformToText(F);new Insertion.Bottom("csw.searches",E);s.add([{id:"csw.anytext",type:"length",minSize:0,maxSize:200},{id:"csw.title",type:"length",minSize:0,maxSize:200},{id:"csw.abstract",type:"length",minSize:0,maxSize:200},{id:"csw.subject",type:"length",minSize:0,maxSize:200},{id:"csw.minscale",type:"length",minSize:0,maxSize:200},{id:"csw.maxscale",type:"length",minSize:0,maxSize:200}],G)}function j(E){s.removeByParent(E);Element.remove(E);Element.show("csw.addSearch")}function w(){$("csw.searches").innerHTML="";s.removeByParent();Element.show("csw.addSearch")}};