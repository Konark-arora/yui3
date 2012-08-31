YUI.add("clickable-rail",function(c,a){function b(){this._initClickableRail();}c.ClickableRail=c.mix(b,{prototype:{_initClickableRail:function(){this._evtGuid=this._evtGuid||(c.guid()+"|");this.publish("railMouseDown",{defaultFn:this._defRailMouseDownFn});this.after("render",this._bindClickableRail);this.on("destroy",this._unbindClickableRail);},_bindClickableRail:function(){this._dd.addHandle(this.rail);this.rail.on(this._evtGuid+c.DD.Drag.START_EVENT,c.bind(this._onRailMouseDown,this));},_unbindClickableRail:function(){if(this.get("rendered")){var d=this.get("contentBox"),e=d.one("."+this.getClassName("rail"));e.detach(this.evtGuid+"*");}},_onRailMouseDown:function(d){if(this.get("clickableRail")&&!this.get("disabled")){this.fire("railMouseDown",{ev:d});this.thumb.focus();}},_defRailMouseDownFn:function(l){l=l.ev;var d=this._resolveThumb(l),h=this._key.xyIndex,j=parseFloat(this.get("length"),10),g,f,k;if(d){g=d.get("dragNode");f=parseFloat(g.getStyle(this._key.dim),10);k=this._getThumbDestination(l,g);k=k[h]-this.rail.getXY()[h];k=Math.min(Math.max(k,0),(j-f));this._uiMoveThumb(k,{source:"rail"});l.target=this.thumb.one("img")||this.thumb;d._handleMouseDownEvent(l);}},_resolveThumb:function(d){return this._dd;},_getThumbDestination:function(h,g){var f=g.get("offsetWidth"),d=g.get("offsetHeight");return[(h.pageX-Math.round((f/2))),(h.pageY-Math.round((d/2)))];}},ATTRS:{clickableRail:{value:true,validator:c.Lang.isBoolean}}},true);},"@VERSION@",{"requires":["slider-base"]});