YUI.add("gallery-event-drag",function(F){var E=F.Env.evt.plugins,A=F.Node.DOM_EVENTS,C=["drag","drag:start","drag:drag","drag:end","drag:mouseDown","drag:afterMouseDown","drag:removeHandle","drag:addHandle","drag:removeInvalid","drag:addInvalid","drag:align"],D,B;D={on:function(M,L,K,J,G){var H=E.drag._getNodes(K),I=F.Array(arguments,4,true);I.unshift(L);M=M.indexOf(":")>-1?M:"drag:"+M;H.each(function(N){if(!N.dd){N.plug(F.Plugin.Drag);}E.drag._applyConfig(N.dd,J);I[1]=G||N;var O=F.rbind.apply(F,I);N.dd.on(M,function(P){P.currentTarget=N;O(P);});});return{detach:function(){H.each(function(N){N.unplug(F.Plugin.Drag);});}};},_getNodes:function(G){G=G||[];if(G instanceof F.NodeList){return G;}else{if(F.Lang.isString(G)||F.Event._isValidCollection(G)){return F.all(G);}else{return F.all(F.Array(F.Node.getDOMNode(G)||[]));}}},_applyConfig:function(G,I){var H,L,K,J;if(I){for(H in I){if(I.hasOwnProperty(H)){K=H;if(H.indexOf("DD")!==0){K="DD"+H.charAt(0).toUpperCase()+H.slice(1);}J=F.Lang.isObject(I[H])?I[H]:{};L=F.Plugin[K];if(L){G.plug(L,J);}else{G.set(H,I[H]);}}}}}};for(B=C.length-1;B>=0;--B){E[C[B]]=A[C[B]]=D;}},"@VERSION@",{optional:["dd-proxy","dd-constrain"],requires:["dd-plugin"]});