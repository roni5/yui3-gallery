YUI.add("gallery-bidi-textinput",function(B){function A(){A.superclass.constructor.apply(this,arguments);}A.NS="bidi";A.NAME="bidiTextInput";B.extend(A,B.Plugin.Base,{initializer:function(){this.afterHostEvent("valueChange",function(){var D=this.get("host"),C=D.get("value"),E=B.Intl.bidiDirection(C);D.setDirection(E);});}});B.namespace("Plugin");B.Plugin.BidiTextInput=A;},"gallery-2010.08.18-17-12",{requires:["plugin","event-valuechange","gallery-intl-bidi","gallery-node-setdir"]});