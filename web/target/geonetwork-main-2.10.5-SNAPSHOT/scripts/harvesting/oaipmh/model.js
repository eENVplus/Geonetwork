oaipmh.Model=function(o){HarvesterModel.call(this);var l=o;var f=null;var h=null;this.retrieveImportXslts=j;this.retrieveGroups=i;this.retrieveCategories=n;this.retrieveIcons=c;this.getUpdateRequest=e;this.retrieveInfo=g;function i(p){new InfoService(l,"groupsIncludingSystemGroups",p)}function n(p){new InfoService(l,"categories",p)}function j(q){h=q;var p=ker.createRequest("type","importStylesheets");ker.send("xml.harvesting.info",p,ker.wrap(this,d))}function d(p){if(p.nodeName=="error"){ker.showError(l.getText("cannotRetrieve"),p)}else{var s=[];var r=xml.children(xml.children(p)[0]);for(var q=0;q<r.length;q++){s.push(xml.toObject(r[q]))}h(s)}}function c(q){f=q;var p=ker.createRequest("type","icons");ker.send("xml.harvesting.info",p,ker.wrap(this,k))}function k(p){if(p.nodeName=="error"){ker.showError(l.getText("cannotRetrieve"),p)}else{var s=[];var r=xml.children(xml.children(p)[0]);for(var q=0;q<r.length;q++){s.push(xml.textContent(r[q]))}f(s)}}function g(p,r){f=r;var q='<request>   <type url="'+p+'">oaiPmhServer</type></request>';ker.send("xml.harvesting.info",q,ker.wrap(this,b))}function b(z){if(z.nodeName=="error"){ker.showError(l.getText("cannotRetrieve"),z)}else{var p=xml.children(z)[0];var v=xml.children(p)[0];if(v.nodeName=="error"){ker.showError(l.getText("cannotQueryOai"),v);return}var q=xml.children(p,"formats")[0];var w=xml.children(p,"sets")[0];var x=[];var u=xml.children(q);for(var s=0;s<u.length;s++){x.push(xml.textContent(u[s]))}var t=[];var u=xml.children(w);for(var s=0;s<u.length;s++){var y=u[s];var r={NAME:xml.evalXPath(y,"name"),LABEL:xml.evalXPath(y,"label")};t.push(r)}var r={FORMATS:x,SETS:t};f(r)}}function e(s){var q=str.substitute(a,s);var r=s.SEARCH_LIST;var t="";for(var p=0;p<r.length;p++){t+=str.substitute(m,r[p])}q=str.replace(q,"{SEARCH_LIST}",t);return this.substituteCommon(s,q)}var a=' <node id="{ID}" type="{TYPE}"><ownerGroup><id>{OWNERGROUP}</id></ownerGroup>    <site>      <name>{NAME}</name>      <url>{URL}</url>      <icon>{ICON}</icon>      <account>        <use>{USE_ACCOUNT}</use>        <username>{USERNAME}</username>        <password>{PASSWORD}</password>      </account>    </site>    <options>      <oneRunOnly>{ONE_RUN_ONLY}</oneRunOnly>      <every>{EVERY}</every>      <validate>{VALIDATE}</validate>    </options>    <content>      <validate>{VALIDATE}</validate>      <importxslt>{IMPORTXSLT}</importxslt>    </content>    <searches>       {SEARCH_LIST}    </searches>    <privileges>       {PRIVIL_LIST}    </privileges>    <categories>       {CATEG_LIST}    </categories>  </node>';var m="    <search>      <from>{FROM}</from>      <until>{UNTIL}</until>      <set>{SET}</set>      <prefix>{PREFIX}</prefix>      <stylesheet>{STYLESHEET}</stylesheet>    </search>"};