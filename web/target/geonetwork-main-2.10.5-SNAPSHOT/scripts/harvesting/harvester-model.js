function HarvesterModel(){this.substituteCommon=function(g,e){var f=g.PRIVILEGES;var h="";if(f!=null){for(var c=0;c<f.length;c++){var b=f[c].GROUP;var d=f[c].OPERATIONS;h+='<group id="'+b+'">';for(var a=0;a<d.length;a++){h+='<operation name="'+d[a]+'"/>'}h+="</group>"}e=str.replace(e,"{PRIVIL_LIST}",h)}h="";f=g.CATEGORIES;if(f!=null){for(var c=0;c<f.length;c++){h+='<category id="'+f[c].ID+'"/>'}e=str.replace(e,"{CATEG_LIST}",h)}return e}};