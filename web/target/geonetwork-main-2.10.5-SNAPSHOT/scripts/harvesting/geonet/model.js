gn.Model=function(m){HarvesterModel.call(this);var j=m;var e=null;this.retrieveImportXslts=h;this.retrieveSources=c;this.retrieveGroups=g;this.retrieveLocalGroups=f;this.retrieveCategories=l;this.getUpdateRequest=d;function f(n){new InfoService(j,"groupsIncludingSystemGroups",n)}function c(p,o){this.retrieveSourcesCB=o;var n=p.HOST;n+="/srv/"+Env.lang+"/xml.info";new InfoService(j,"sources",o,n)}function g(q,p,r,o){this.retrieveGroupsCB=p;var n=q.HOST;n+="/srv/"+Env.lang+"/xml.info";OpenLayers.Request.GET({url:n+"?type=groupsIncludingSystemGroups",success:function(s){if(s.responseXML){new InfoService(j,"groupsIncludingSystemGroups",p,n,r,o)}else{new InfoService(j,"groups",p,n,r,o)}},failure:function(s){new InfoService(j,"groups",p,n,r,o)}})}function h(o){e=o;var n=ker.createRequest("type","importStylesheets");ker.send("xml.harvesting.info",n,ker.wrap(this,b))}function b(n){if(n.nodeName=="error"){ker.showError(j.getText("cannotRetrieve"),n)}else{var q=[];var p=xml.children(xml.children(n)[0]);for(var o=0;o<p.length;o++){q.push(xml.toObject(p[o]))}e(q)}}function l(n){new InfoService(j,"categories",n)}function d(q){var o=str.substitute(a,q);var p=q.SEARCH_LIST;var r="";for(var n=0;n<p.length;n++){r+=str.substitute(k,p[n])}o=str.replace(o,"{SEARCH_LIST}",r);p=q.GROUP_LIST;r="";for(var n=0;n<p.length;n++){r+=str.substitute(i,p[n])}o=str.replace(o,"{GROUP_LIST}",r);return this.substituteCommon(q,o)}var a=' <node id="{ID}" type="{TYPE}">    <ownerGroup><id>{OWNERGROUP}</id></ownerGroup>    <site>      <name>{NAME}</name>      <host>{HOST}</host>      <createRemoteCategory>{CREATE_REMOTE_CATEGORY}</createRemoteCategory>      <mefFormatFull>{MEF_FULL}</mefFormatFull>      <xslfilter>{XSLFILTER}</xslfilter>      <account>        <use>{USE_ACCOUNT}</use>        <username>{USERNAME}</username>        <password>{PASSWORD}</password>      </account>    </site>    <options>      <oneRunOnly>{ONE_RUN_ONLY}</oneRunOnly>      <every>{EVERY}</every>    </options>    <content>      <validate>{VALIDATE}</validate>      <importxslt>{IMPORTXSLT}</importxslt>    </content>    <searches>       {SEARCH_LIST}    </searches>    <groupsCopyPolicy>       {GROUP_LIST}    </groupsCopyPolicy>    <categories>       {CATEG_LIST}    </categories>  </node>';var k="    <search>      <freeText>{TEXT}</freeText>      <title>{TITLE}</title>      <abstract>{ABSTRACT}</abstract>      <keywords>{KEYWORDS}</keywords>      <digital>{DIGITAL}</digital>      <hardcopy>{HARDCOPY}</hardcopy>      <anyField>{ANYFIELD}</anyField>      <anyValue>{ANYVALUE}</anyValue>      <source>         <uuid>{SOURCE_UUID}</uuid>         <name>{SOURCE_NAME}</name>      </source>    </search>";var i='<group name="{NAME}" policy="{POLICY}"/>'};