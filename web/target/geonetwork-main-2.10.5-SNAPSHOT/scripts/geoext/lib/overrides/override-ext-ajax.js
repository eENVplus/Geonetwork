(function(){var a=function(c,b){return function(d){if(b&&b[c]){b[c].call(b.scope||window,{responseText:d.responseText,responseXML:d.responseXML,argument:b.argument})}}};Ext.apply(Ext.lib.Ajax,{request:function(g,e,b,f,c){c=c||{};var d=c.headers;if(c.xmlData){if(!d||!d["Content-Type"]){d=d||{};d["Content-Type"]="text/xml"}g=(g?g:(c.method?c.method:"POST"));f=c.xmlData}else{if(c.jsonData){if(!d||!d["Content-Type"]){d=d||{};d["Content-Type"]="application/json"}g=(g?g:(c.method?c.method:"POST"));f=typeof c.jsonData=="object"?Ext.encode(c.jsonData):c.jsonData}}return OpenLayers.Request.issue({success:a("success",b),failure:a("failure",b),headers:c.headers,method:g,headers:d,data:f,url:e})},isCallInProgress:function(b){return true},abort:function(b){b.abort()}})})();