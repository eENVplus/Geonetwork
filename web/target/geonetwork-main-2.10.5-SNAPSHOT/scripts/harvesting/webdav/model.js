wd.Model=function(l){HarvesterModel.call(this);var j=l;var e=null;var f=null;this.retrieveImportXslts=h;this.retrieveGroups=g;this.retrieveCategories=k;this.retrieveIcons=b;this.getUpdateRequest=d;function g(m){new InfoService(j,"groupsIncludingSystemGroups",m)}function k(m){new InfoService(j,"categories",m)}function h(n){f=n;var m=ker.createRequest("type","importStylesheets");ker.send("xml.harvesting.info",m,ker.wrap(this,c))}function c(m){if(m.nodeName=="error"){ker.showError(j.getText("cannotRetrieve"),m)}else{var p=[];var o=xml.children(xml.children(m)[0]);for(var n=0;n<o.length;n++){p.push(xml.toObject(o[n]))}f(p)}}function b(n){e=n;var m=ker.createRequest("type","icons");ker.send("xml.harvesting.info",m,ker.wrap(this,i))}function i(m){if(m.nodeName=="error"){ker.showError(j.getText("cannotRetrieve"),m)}else{var p=[];var o=xml.children(xml.children(m)[0]);for(var n=0;n<o.length;n++){p.push(xml.textContent(o[n]))}e(p)}}function d(n){var m=str.substitute(a,n);return this.substituteCommon(n,m)}var a=' <node id="{ID}" type="{TYPE}">    <ownerGroup><id>{OWNERGROUP}</id></ownerGroup>    <site>      <name>{NAME}</name>      <url>{URL}</url>      <icon>{ICON}</icon>      <account>        <use>{USE_ACCOUNT}</use>        <username>{USERNAME}</username>        <password>{PASSWORD}</password>      </account>    </site>    <options>      <oneRunOnly>{ONE_RUN_ONLY}</oneRunOnly>      <every>{EVERY}</every>      <recurse>{RECURSE}</recurse>      <subtype>{SUBTYPE}</subtype>      <validate>{VALIDATE}</validate>    </options>    <content>      <validate>{VALIDATE}</validate>      <importxslt>{IMPORTXSLT}</importxslt>    </content>    <privileges>       {PRIVIL_LIST}    </privileges>    <categories>       {CATEG_LIST}    </categories>  </node>'};