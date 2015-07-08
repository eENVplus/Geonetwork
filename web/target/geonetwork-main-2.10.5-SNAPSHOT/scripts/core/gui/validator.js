function Validator(a){this.xmlLoader=a;this.rules=[]}Validator.prototype.add=function(c,d){for(var a=0;a<c.length;a++){var b=c[a];if(!d){b.ctrl=$(b.id)}else{b.parentId=d;b.ctrl=xml.getElementById($(d),b.id)}if(b.type=="length"){b.validator=ker.wrap(this,this.lengthVal)}else{if(b.type=="alphanum"){b.validator=ker.wrap(this,this.alphanumVal)}else{if(b.type=="integer"){b.validator=ker.wrap(this,this.integerVal)}else{if(b.type=="hostname"){b.validator=ker.wrap(this,this.hostnameVal)}else{if(b.type=="url"){b.validator=ker.wrap(this,this.urlVal)}else{if(b.type=="ipaddress"){b.validator=ker.wrap(this,this.ipaddressVal)}else{if(b.type=="oneof"){b.validator=ker.wrap(this,this.oneofVal)}else{throw"Unknown validator type : "+b.type}}}}}}}this.rules.push(b)}};Validator.prototype.removeByParent=function(c){var b=this.rules;this.rules=[];for(var a=0;a<b.length;a++){if((!b[a].parentId)||(b[a].parentId!=c&&c)){this.rules.push(b[a])}}};Validator.prototype.validate=function(){for(var b=0;b<this.rules.length;b++){var c=this.rules[b];if(!this.checkPrecond(c)){continue}var a=c.validator(c);if(a!=null){this.showError(c.ctrl,a);return false}}return true};Validator.prototype.lengthVal=function(c){var d=c.ctrl.value;var b=d.length;var a=null;if(c.minSize&&b==0&&c.minSize!=0){a=["cannotBeEmpty"]}else{if(c.minSize&&b<c.minSize){a=["invalidMinSize",c.minSize]}else{if(c.maxSize&&b>c.maxSize){a=["invalidMaxSize",c.maxSize]}}}return a};Validator.prototype.checkPrecond=function(c){if(!c.precond){return true}for(var b=0;b<c.precond.length;b++){var a=c.precond[b];if("value" in a&&$(a.id).value!=a.value){return false}if("checked" in a&&$(a.id).checked!=a.checked){return false}}return true};Validator.prototype.alphanumVal=function(b){var c=b.ctrl.value;var a=null;if(!this.isAlphaNumeric(c)){a=["notAlphaNumeric"]}return a};Validator.prototype.hostnameVal=function(b){var c=b.ctrl.value;var a=null;if(!this.isHostName(c)){a=["notHostName"]}return a};Validator.prototype.urlVal=function(b){var c=b.ctrl.value;var a=null;if(!this.isURL(c)){a=["notURL"]}return a};Validator.prototype.integerVal=function(d){var e=d.ctrl.value;var b=e.length;var c=parseInt(e);var a=null;if(e==""&&d.empty){return null}if(!this.isInteger(e)){a=["notInt"]}else{if(d.minValue&&c<d.minValue){a=["invalidMinValue",d.minValue]}else{if(d.maxValue&&c>d.maxValue){a=["invalidMaxValue",d.maxValue]}}}return a};Validator.prototype.ipaddressVal=function(b){var c=b.ctrl.value;var a=null;if(c==""&&b.empty){return null}if(!this.isIPAddress(c)){a=["notIP"]}return a};Validator.prototype.showError=function(d,a){var e=this.xmlLoader.getText(a[0]);var b=d.getAttribute("id");var c=(a.length==1)?"":""+a[1];var f=b.lastIndexOf(".");if(f!=-1){b=b.substring(f+1)}b=this.xmlLoader.getText(b).toLowerCase();e=str.replace(e,"{NAME}",b);e=str.replace(e,"{VALUE}",c);alert(e);d.focus()};Validator.prototype.isInteger=function(b){for(var a=0;a<b.length;a++){var d=b.charAt(a);if(this.isDigit(d)){continue}if(d=="-"&&a==0){continue}return false}return(b.length!=0)};Validator.prototype.isAlphaNumeric=function(b){for(var a=0;a<b.length;a++){var d=b.charAt(a);if(this.isLetter(d)){continue}if(a!=0&&this.isDigit(d)){continue}return false}return true};Validator.prototype.isHostName=function(b){for(var a=0;a<b.length;a++){var d=b.charAt(a);if(this.isLetter(d)||this.isDigit(d)){continue}if(d=="."||d=="-"){continue}return false}return true};Validator.prototype.isURL=function(g){var a=(g.indexOf("http://")==0);var e=(g.indexOf("https://")==0);var d=(g.indexOf("ftp://")==0);var f=(g.indexOf("ftps://")==0);if(!(a||e||d||f)){return false}for(var b=0;b<g.length;b++){var h=g.charAt(b);if(this.isLetter(h)||this.isDigit(h)){continue}if(".-:/_%?&=$#[]@()*+,;".indexOf(h)!=-1){continue}return false}return true};Validator.prototype.isIPAddress=function(d){if(d.length<7||d.length>15){return false}var c=d.split(".");if(c.length!=4){return false}for(var a=0;a<c.length;a++){if(!this.isInteger(c[a])){return false}var b=parseInt(c[a]);if(b<0||b>255){return false}}return true};Validator.prototype.isLetter=function(a){return(((a>="a")&&(a<="z"))||((a>="A")&&(a<="Z")))};Validator.prototype.isDigit=function(a){return((a>="0")&&(a<="9"))};Validator.prototype.isLetterOrDigit=function(a){return(isLetter(a)||isDigit(a))};Validator.prototype.oneofVal=function(e){var d=e.ctrl.value&&e.ctrl.value.replace(/^\s+|\s+$/g,"").length!==0;var b,c;for(b=0;!d&&b<e.items.length;b++){c=$(e.items[b]);d=d||c.value&&c.value.replace(/^\s+|\s+$/g,"").length!==0}var a=null;if(!d){a=["oneof"]}return a};