thredds.Model=function(p){HarvesterModel.call(this);var k=p;var a=null;var c=null;var e=null;var h=null;this.retrieveGroups=g;this.retrieveCategories=l;this.retrieveIcons=d;this.getUpdateRequest=f;this.retrieveSchemasDIF=n;this.retrieveSchemasFragments=i;function n(r){e=r;var q=ker.createRequest("type","threddsDIFSchemas");ker.send("xml.harvesting.info",q,ker.wrap(this,o))}function i(r){h=r;var q=ker.createRequest("type","threddsFragmentSchemas");ker.send("xml.harvesting.info",q,ker.wrap(this,m))}function o(q){if(q.nodeName=="error"){ker.showError(k.getText("cannotRetrieve"),q)}else{var t=[];var s=xml.children(xml.children(q)[0]);for(var r=0;r<s.length;r++){t.push(xml.toObject(s[r]))}e(t)}}function m(q){if(q.nodeName=="error"){ker.showError(k.getText("cannotRetrieve"),q)}else{var t=[];var s=xml.children(xml.children(q)[0]);for(var r=0;r<s.length;r++){t.push(xml.toObject(s[r]))}h(t)}}function g(q){new InfoService(k,"groupsIncludingSystemGroups",q)}function l(q){new InfoService(k,"categories",q)}function d(r){a=r;var q=ker.createRequest("type","icons");ker.send("xml.harvesting.info",q,ker.wrap(this,j))}function j(q){if(q.nodeName=="error"){ker.showError(k.getText("cannotRetrieve"),q)}else{var t=[];var s=xml.children(xml.children(q)[0]);for(var r=0;r<s.length;r++){t.push(xml.textContent(s[r]))}a(t)}}function f(r){var q=str.substitute(b,r);return this.substituteCommon(r,q)}var b=' <node id="{ID}" type="{TYPE}">    <ownerGroup><id>{OWNERGROUP}</id></ownerGroup>    <site>      <name>{NAME}</name>      <url>{CATA_URL}</url>      <icon>{ICON}</icon>      <account>        <use>{USE_ACCOUNT}</use>        <username>{USERNAME}</username>        <password>{PASSWORD}</password>      </account>    </site>    <options>      <oneRunOnly>{ONE_RUN_ONLY}</oneRunOnly>      <every>{EVERY}</every>      <lang>{LANG}</lang>      <topic>{TOPIC}</topic>      <createServiceMd>{CREATESERVICEMD}</createServiceMd>      <createThumbnails>{CREATETHUMBNAILS}</createThumbnails>      <createCollectionDatasetMd>{CREATECOLLECTIONDATASETMD}</createCollectionDatasetMd>      <createAtomicDatasetMd>{CREATEATOMICDATASETMD}</createAtomicDatasetMd>      <ignoreHarvestOnCollections>{IGNOREHARVESTONCOLLECTIONS}</ignoreHarvestOnCollections>      <collectionGeneration>{COLLECTIONGENERATION}</collectionGeneration>      <collectionFragmentStylesheet>{COLLECTIONFRAGMENTSTYLESHEET}</collectionFragmentStylesheet>      <createCollectionSubtemplates>{CREATECOLLECTIONSUBTEMPLATES}</createCollectionSubtemplates>      <collectionMetadataTemplate>{COLLECTIONMETADATATEMPLATE}</collectionMetadataTemplate>      <outputSchemaOnCollectionsDIF>{OUTPUTSCHEMAONCOLLECTIONSDIF}</outputSchemaOnCollectionsDIF>      <outputSchemaOnCollectionsFragments>{OUTPUTSCHEMAONCOLLECTIONSFRAGMENTS}</outputSchemaOnCollectionsFragments>      <ignoreHarvestOnAtomics>{IGNOREHARVESTONATOMICS}</ignoreHarvestOnAtomics>      <modifiedOnly>{MODIFIEDONLY}</modifiedOnly>      <atomicGeneration>{ATOMICGENERATION}</atomicGeneration>      <atomicFragmentStylesheet>{ATOMICFRAGMENTSTYLESHEET}</atomicFragmentStylesheet>      <createAtomicSubtemplates>{CREATEATOMICSUBTEMPLATES}</createAtomicSubtemplates>      <atomicMetadataTemplate>{ATOMICMETADATATEMPLATE}</atomicMetadataTemplate>      <outputSchemaOnAtomicsDIF>{OUTPUTSCHEMAONATOMICSDIF}</outputSchemaOnAtomicsDIF>      <outputSchemaOnAtomicsFragments>{OUTPUTSCHEMAONATOMICSFRAGMENTS}</outputSchemaOnAtomicsFragments>      <datasetCategory>{DATASETCATEGORY}</datasetCategory>    </options>    <content>      <validate>{VALIDATE}</validate>      <importxslt>{IMPORTXSLT}</importxslt>    </content>    <privileges>       {PRIVIL_LIST}    </privileges>    <categories>       {CATEG_LIST}    </categories>  </node>'};