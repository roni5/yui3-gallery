YUI.add("gallery-user-patch-2532141",function(a){a.Plugin.ResizeConstrained.ATTRS.constrain={setter:function(b){if(b&&(b instanceof a.Node||b.nodeType||(a.Lang.isString(b)&&b!=="view"))){b=a.one(b);}return b;}};},"gallery-2012.04.18-20-14",{requires:["resize"]});