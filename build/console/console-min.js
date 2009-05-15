YUI.add("console",function(D){var G=D.ClassNameManager.getClassName,B="checked",s="clear",r="click",T="collapsed",AE="console",d="contentBox",h="disabled",o="entry",H="entryTemplate",l="error",j="height",P="info",y="innerHTML",N="lastTime",F="pause",f="paused",x="reset",v="startTime",p="title",i="warn",Z=".",X=G(AE,"button"),b=G(AE,"checkbox"),AD=G(AE,s),w=G(AE,"collapse"),S=G(AE,T),E=G(AE,"controls"),e=G(AE,"hd"),c=G(AE,"bd"),C=G(AE,"ft"),k=G(AE,p),z=G(AE,o),t=G(AE,o,"cat"),a=G(AE,o,"content"),U=G(AE,o,"meta"),g=G(AE,o,"src"),A=G(AE,o,"time"),Q=G(AE,F),W=G(AE,F,"label"),n=/^(\S+)\s/,AA=/&/g,u=/>/g,K=/</g,I="&#38;",R="&#62;",m="&#60;",J=D.Lang,M=D.Node.create,AC=J.isNumber,O=J.isString,q=D.merge,AB=D.substitute;function V(){V.superclass.constructor.apply(this,arguments);}D.mix(V,{NAME:AE,LOG_LEVEL_INFO:P,LOG_LEVEL_WARN:i,LOG_LEVEL_ERROR:l,ENTRY_CLASSES:{entry_class:z,entry_meta_class:U,entry_cat_class:t,entry_src_class:g,entry_time_class:A,entry_content_class:a},CHROME_CLASSES:{console_hd_class:e,console_bd_class:c,console_ft_class:C,console_controls_class:E,console_checkbox_class:b,console_pause_class:Q,console_pause_label_class:W,console_button_class:X,console_clear_class:AD,console_collapse_class:w,console_title_class:k},HEADER_TEMPLATE:'<div class="{console_hd_class}">'+'<h4 class="{console_title_class}">{str_title}</h4>'+'<div class="{console_controls_class}">'+'<button type="button" class="'+'{console_button_class} {console_collapse_class}">{str_collapse}'+"</button>"+"</div>"+"</div>",BODY_TEMPLATE:'<div class="{console_bd_class}"></div>',FOOTER_TEMPLATE:'<div class="{console_ft_class}">'+'<div class="{console_controls_class}">'+'<input type="checkbox" class="{console_checkbox_class} '+'{console_pause_class}" value="1" id="{id_guid}"> '+'<label for="{id_guid}" class="{console_pause_label_class}">'+"{str_pause}</label>"+'<button type="button" class="'+'{console_button_class} {console_clear_class}">{str_clear}'+"</button>"+"</div>"+"</div>",ENTRY_TEMPLATE:'<pre class="{entry_class} {cat_class} {src_class}">'+'<div class="{entry_meta_class}">'+"<p>"+'<span class="{entry_cat_class}">'+"{label}</span>"+'<span class="{entry_time_class}">'+" {totalTime}ms (+{elapsedTime}) {localTime}:"+"</span>"+"</p>"+'<p class="{entry_src_class}">'+"{sourceAndDetail}"+"</p>"+"</div>"+'<p class="{entry_content_class}">{message}</p>'+"</pre>",ATTRS:{logEvent:{value:"yui:log",writeOnce:true,validator:O},logSource:{value:D,writeOnce:true,validator:function(L){return L&&D.Lang.isFunction(L.on);}},strings:{value:{title:"Log Console",pause:"Pause",clear:"Clear",collapse:"Collapse",expand:"Expand"}},paused:{value:false,validator:J.isBoolean},defaultCategory:{value:P,validator:O},defaultSource:{value:"global",validator:O},entryTemplate:{value:"",validator:O},logLevel:{value:D.config.logLevel||P,setter:function(L){return this._setLogLevel(L);}},printTimeout:{value:100,validator:AC},consoleLimit:{value:500,validator:AC},newestOnTop:{value:true},scrollIntoView:{value:true},startTime:{value:new Date()},lastTime:{value:new Date(),readOnly:true},collapsed:{value:false},height:{value:"300px"},width:{value:"300px"}}});D.extend(V,D.Widget,{_evtCat:null,_head:null,_body:null,_foot:null,_timeout:null,buffer:null,log:function(){return D.log.apply(D,arguments);},clearConsole:function(){this._body.set(y,"");this._clearTimeout();this.buffer=[];return this;},reset:function(){this.fire(x);return this;},collapse:function(){this.set(T,true);},expand:function(){this.set(T,false);},printBuffer:function(){var AG=this.buffer,Y=D.config.debug,AF,L;D.config.debug=false;if(!this.get(f)&&this.get("rendered")){this._clearTimeout();this.buffer=[];for(AF=0,L=AG.length;AF<L;++AF){this.printLogEntry(AG[AF]);}if(this.get("scrollIntoView")){this.scrollToLatest();}this._trimOldEntries();}D.config.debug=Y;return this;},printLogEntry:function(L){L=q(this._htmlEscapeMessage(L),V.ENTRY_CLASSES,{cat_class:this.getClassName(o,L.category),src_class:this.getClassName(o,L.source)});var Y=M(AB(this.get("entryTemplate"),L));this._addToConsole(Y);return this;},initializer:function(){this._evtCat=D.stamp(this)+"|";this.buffer=[];if(!this.get(H)){this.set(H,V.ENTRY_TEMPLATE);}this.get("logSource").on(this._evtCat+this.get("logEvent"),D.bind(this._onLogEvent,this));this.publish(o,{defaultFn:this._defEntryFn});this.publish(x,{defaultFn:this._defResetFn});},destructor:function(){var L=this.get("boundingBox");this.get("logSource").detach(this._evtCat);D.Event.purgeElement(L,true);L.set("innerHTML","");},renderUI:function(){this._initHead();this._initBody();this._initFoot();},syncUI:function(){this._uiUpdatePaused(this.get(f));this._uiUpdateCollapsed(this.get(T));this._uiSetHeight(this.get(j));},bindUI:function(){this.get(d).query("button."+w).on(r,this._onCollapseClick,this);this.get(d).query("input[type=checkbox]."+Q).on(r,this._onPauseClick,this);this.get(d).query("button."+AD).on(r,this._onClearClick,this);this.after(this._evtCat+"stringsChange",this._afterStringsChange);this.after(this._evtCat+"pausedChange",this._afterPausedChange);this.after(this._evtCat+"consoleLimitChange",this._afterConsoleLimitChange);this.after(this._evtCat+"collapsedChange",this._afterCollapsedChange);},_initHead:function(){var L=this.get(d),Y=q(V.CHROME_CLASSES,{str_collapse:this.get("strings.collapse"),str_title:this.get("strings.title")});this._head=M(AB(V.HEADER_TEMPLATE,Y));L.insertBefore(this._head,L.get("firstChild"));},_initBody:function(){this._body=M(AB(V.BODY_TEMPLATE,V.CHROME_CLASSES));this.get(d).appendChild(this._body);},_initFoot:function(){var L=q(V.CHROME_CLASSES,{id_guid:D.guid(),str_pause:this.get("strings.pause"),str_clear:this.get("strings.clear")});this._foot=M(AB(V.FOOTER_TEMPLATE,L));this.get(d).appendChild(this._foot);},_isInLogLevel:function(AF){var L=AF.cat,Y=this.get("logLevel");if(Y!==P){L=L||P;if(O(L)){L=L.toLowerCase();}if((L===i&&Y===l)||(L===P&&Y!==P)){return false;}}return true;},_normalizeMessage:function(AF){var AH=AF.msg,Y=AF.cat,AG=AF.src,L={time:new Date(),message:AH,category:Y||this.get("defaultCategory"),sourceAndDetail:AG||this.get("defaultSource"),source:null,label:null,localTime:null,elapsedTime:null,totalTime:null};
L.source=n.test(L.sourceAndDetail)?RegExp.$1:L.sourceAndDetail;L.label=L.category;L.localTime=L.time.toLocaleTimeString?L.time.toLocaleTimeString():(L.time+"");L.elapsedTime=L.time-this.get(N);L.totalTime=L.time-this.get(v);this._set(N,L.time);return L;},_schedulePrint:function(){if(!this.get(f)&&!this._timeout){this._timeout=D.later(this.get("printTimeout"),this,this.printBuffer);}},_addToConsole:function(Y){var L=this.get("newestOnTop")?this._body.get("firstChild"):null;this._body.insertBefore(Y,L);},scrollToLatest:function(){var L=this.get("newestOnTop")?0:this._body.get("scrollHeight");this._body.set("scrollTop",L);},_htmlEscapeMessage:function(L){L=D.clone(L);L.message=this._encodeHTML(L.message);L.label=this._encodeHTML(L.label);L.source=this._encodeHTML(L.source);L.sourceAndDetail=this._encodeHTML(L.sourceAndDetail);L.category=this._encodeHTML(L.category);return L;},_trimOldEntries:function(){var AI=this._body,AF=this.get("consoleLimit"),AG=D.config.debug,L,AJ,AH,Y;if(AI){D.config.debug=false;L=AI.queryAll(Z+z);Y=L?L.size()-AF:0;if(Y){if(this.get("newestOnTop")){AH=AF;Y=L.size();}else{AH=0;}for(;AH<Y;++AH){AJ=L.item(AH);if(AJ){AJ.get("parentNode").removeChild(AJ);}}}D.config.debug=AG;}},_encodeHTML:function(L){return O(L)?L.replace(AA,I).replace(K,m).replace(u,R):L;},_clearTimeout:function(){if(this._timeout){this._timeout.cancel();this._timeout=null;}},_onPauseClick:function(L){this.set(f,L.target.get(B));},_onClearClick:function(L){this.clearConsole();},_onCollapseClick:function(L){this.set(T,!this.get(T));},_setLogLevel:function(L){if(O(L)){L=L.toLowerCase();}return(L===i||L===l)?L:P;},_uiSetHeight:function(L){V.superclass._uiSetHeight.apply(this,arguments);if(this._head&&this._foot){var Y=this.get("boundingBox").get("offsetHeight")-this._head.get("offsetHeight")-this._foot.get("offsetHeight");this._body.setStyle(j,Y+"px");}},_afterStringsChange:function(AG){var AI=AG.subAttrName?AG.subAttrName.split(Z)[1]:null,L=this.get(d),AF=AG.prevVal,AH=AG.newVal,Y;if((!AI||AI===p)&&AF.title!==AH.title){Y=L.query(Z+k);if(Y){Y.set(y,AH.title);}}if((!AI||AI===F)&&AF.pause!==AH.pause){Y=L.query(Z+W);if(Y){Y.set(y,AH.pause);}}if((!AI||AI===s)&&AF.clear!==AH.clear){Y=L.query(Z+AD);if(Y){Y.set("value",AH.clear);}}},_afterPausedChange:function(Y){var L=Y.newVal;if(Y.src!==D.Widget.SRC_UI){this._uiUpdatePaused(L);}if(!L){this._schedulePrint();}else{if(this._timeout){this._clearTimeout();}}},_uiUpdatePaused:function(L){var Y=this._foot.queryAll("input[type=checkbox]."+Q);if(Y){Y.set(B,L);}},_afterConsoleLimitChange:function(){this._trimOldEntries();},_afterCollapsedChange:function(L){this._uiUpdateCollapsed(L.newVal);},_uiUpdateCollapsed:function(Y){var L=this.get(d),AF=L.queryAll("button."+w),AH=Y?"addClass":"removeClass",AG=this.get("strings."+(Y?"expand":"collapse"));L[AH](S);if(AF){AF.set("innerHTML",AG);}if(!Y){this._uiSetHeight(this.get(j));}},_afterVisibleChange:function(L){V.superclass._afterVisibleChange.apply(this,arguments);this._uiUpdateFromHideShow(L.newVal);},_uiUpdateFromHideShow:function(L){if(L){this._uiSetHeight(this.get(j));}},_onLogEvent:function(Y){if(!this.get(h)&&this._isInLogLevel(Y)){var L=D.config.debug;D.config.debug=false;this.fire(o,{message:this._normalizeMessage.call(this,Y)});D.config.debug=L;}},_defResetFn:function(){this.clearConsole();this.set(v,new Date());this.set(h,false);this.set(f,false);},_defEntryFn:function(L){if(L.message){this.buffer.push(L.message);this._schedulePrint();}}});D.Console=V;},"@VERSION@",{requires:["substitute","widget"]});