function InfoService(m,g,a,l,d,j){var i=m;var b=a;if(l==null){var c=ker.createRequest("type",g);ker.send("xml.info",c,ker.wrap(this,h))}else{var f="<account>   <username>{USER}</username>   <password>{PASS}</password></account>";var e="";if(d!=null){e=str.substitute(f,{USER:d,PASS:j})}var k="<request>   <site>      <url>{URL}</url>      <type>geonetwork</type>"+e+"   </site>   <params>      <request>         <type>{TYPE}</type>      </request>   </params></request>";var c=str.substitute(k,{URL:l,TYPE:g});ker.send("xml.forward",c,ker.wrap(this,h))}function h(n){if(n.nodeName=="error"){ker.showError(i.getText("cannotRetrieve"),n)}else{var q=[];var p=xml.children(xml.children(n)[0]);for(var o=0;o<p.length;o++){q.push(xml.toObject(p[o]))}b(q)}}};