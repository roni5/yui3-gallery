YUI.add("gallery-event-nav-keys",function(B){var A={enter:13,esc:27,backspace:8,tab:9,pageUp:33,pageDown:34,left:37,up:38,right:39,down:40};B.Object.each(A,function(D,C){B.Event.define(C,{publishConfig:{emitFacade:false},on:function(F,E,G){E._evtGuid=B.guid()+"|";F.on(E._evtGuid+"keydown",function(H){if(H.keyCode===D){H.type=C;G.fire(H);}});},detach:function(F,E,G){F.detach(E._evtGuid+"*");}});});B.Event.define("arrow",{publishConfig:{emitFacade:false},on:function(D,C,E){var F=this._directions;C._evtGuid=B.guid()+"|";D.on("keydown",function(G){if(G.keyCode>36&&G.keyCode<41){G.originalType=G.type;G.type="arrow";G.direction=F[G.keyCode];E.fire(G);}});},detach:function(D,C,E){D.detach(C._evtGuid+"*");},_directions:{37:"left",38:"up",39:"right",40:"down"}});},"@VERSION@",{requires:["event-synthetic"]});