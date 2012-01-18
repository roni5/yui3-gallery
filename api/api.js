YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {"classes":["DataSchema","DataTable","DataTable.Base","DataTable.BodyView","DataTable.ColumnWidths","DataTable.Core","DataTable.HeaderView","DataTable.Mutable","DataTable.Scrollable","JSONPRequest","Plugin","YUI~event-drag","YUI~event-konami","YUI~toRelativeTime"],"modules":["@datatable-scroll","dataschema","datatable-base","datatable-body","datatable-column-widths","datatable-core","datatable-head","datatable-mutable","event-drag","event-konami","gallery-jsonp","gallery-pluginattr","gallery-torelativetime"],"allModules":[{"displayName":"@datatable-scroll","name":"@datatable-scroll","description":"Adds the ability to make the table rows scrollable while preserving the header\nplacement.\n\nThere are two types of scrolling, horizontal (x) and vertical (y).  Horizontal\nscrolling is achieved by wrapping the entire table in a scrollable container.\nVertical scrolling is achieved by splitting the table headers and data into two\nseparate tables, the latter of which is wrapped in a vertically scrolling\ncontainer.  In this case, column widths of header cells and data cells are kept\nin sync programmatically.\n\nSince the split table synchronization can be costly at runtime, the split is only done if the data in the table stretches beyond the configured `height` value.\n\nTo activate or deactivate scrolling, set the `scrollable` attribute to one of\nthe following values:\n\n * `false` - (default) Scrolling is disabled.\n * `true` or 'xy' - If `height` is set, vertical scrolling will be activated, if\n            `width` is set, horizontal scrolling will be activated.\n * 'x' - Activate horizontal scrolling only. Requires the `width` attribute is\n         also set.\n * 'y' - Activate vertical scrolling only. Requires the `height` attribute is\n         also set."},{"displayName":"dataschema","name":"dataschema","description":"Abstract class encapsulation for any DataSchema implementation.  Pass the\nconstructor configuration an object containing these keys:\n\n<ul>\n  <li><code>type</code> - \"json\", \"JSON\", Y.DataSchema.JSON, a custom\n      implementation object (must provide an apply method), or a custom\n      function used as the apply method.</li>\n  <li><code>schema</code> - the object containing the appropriate schema\n      key:values for the specified type of schema parser.  What you would\n      pass as the first argument to\n      Y.DataSchema.JSON.apply( SCHEMA, data );</li>\n</ul>\n\nThis class constructor replaces the Y.DataSchema object namespace.  All\nloaded schema parser implementations are preserved."},{"displayName":"dataschema-class","name":"dataschema-class","description":"Abstract class encapsulation for any DataSchema implementation.  Pass the\nconstructor configuration an object containing these keys:\n\n<ul>\n  <li><code>type</code> - \"json\", \"JSON\", Y.DataSchema.JSON, a custom\n      implementation object (must provide an apply method), or a custom\n      function used as the apply method.</li>\n  <li><code>schema</code> - the object containing the appropriate schema\n      key:values for the specified type of schema parser.  What you would\n      pass as the first argument to\n      Y.DataSchema.JSON.apply( SCHEMA, data );</li>\n</ul>\n\nThis class constructor replaces the Y.DataSchema object namespace.  All\nloaded schema parser implementations are preserved."},{"displayName":"datatable-base","name":"datatable-base","description":"A Widget for displaying tabular data.  The base implementation of DataTable\nprovides the ability to dynamically generate an HTML table from a set of column\nconfigurations and row data.\n\nTwo classes are included in the `datatable-base` module:\n\n1. `Y.DataTable` - Main instantiable class, has all loaded features available\n2. `Y.DataTable.Base` - Featureless version for use primarily as a superclass.\n\nExample usage might look like this:\n\n<pre><code>\n// Featureless table, usually used as a subclass, but can be instantiated\nvar table = new Y.DataTable.Base({\n    columns: ['firstName', 'lastName', 'age'],\n    data: [\n        { firstName: 'Frank', lastName: 'Zappa', age: 71 },\n        { firstName: 'Frank', lastName: 'Lloyd Wright', age: 144 },\n        { firstName: 'Albert', lastName: 'Einstein', age: 132 },\n        ...\n    ]\n});\n\ntable.render('#in-here');\n\n// Table with all loaded features available (not .Base)\n// The functionality of this table would require additional modules be use()d,\n// but the feature APIs are aggregated onto Y.DataTable.\n// (Snippet is for illustration. Not all features are available today.)\nvar table = new Y.DataTable({\n    columns: [\n        { type: 'checkbox', defaultChecked: true },\n        { key: 'firstName', sortable: true, resizable: true },\n        { key: 'lastName', sortable: true },\n        { key: 'role', formatter: toRoleName }\n    ],\n    data: {\n        source: 'http://myserver.com/service/json',\n        type: 'json',\n        schema: {\n            resultListLocator: 'results.users',\n            fields: [\n                'username',\n                'firstName',\n                'lastName',\n                { key: 'role', type: 'number' }\n            ]\n        }\n    },\n    recordType: UserModel,\n    pagedData: {\n        location: 'footer',\n        pageSizes: [20, 50, 'all'],\n        rowsPerPage: 20,\n        pageLinks: 5\n    },\n    editable: true,\n    filterable: true\n});\n</code></pre>\n\n### Column Configuration\n\nThe column configurations are set in the form of an array of objects, where\neach object corresponds to a column.  For columns populated directly from the\nrow data, a 'key' property is required to bind the column to that property or\nattribute in the row data.\n\nNot all columns need to relate to row data, nor do all properties or attributes\nof the row data need to have a corresponding column.  However, only those\ncolumns included in the `columns` configuration attribute will be rendered.\n\nOther column configuration properties are supported by the configured\n`headerView`, `bodyView`, `footerView` classes as well as any features added by\nplugins or class extensions.  See the description of DataTable.HeaderView,\nDataTable.BodyView, and other DataTable feature classes to see what column\nproperties they support.\n\nSome examples of column configurations would be:\n\n<pre><code>\n// Basic\nvar columns = [{ key: 'firstName' }, { key: 'lastName' }, { key: 'age' }];\n\n// For columns without any additional configuration, strings can be used\nvar columns = ['firstName', 'lastName', 'age'];\n\n// Multi-row column headers (see DataTable.HeaderView for details)\nvar columns = [\n    {\n        label: 'Name',\n        children: [\n            { key: 'firstName' },\n            { key: 'lastName' }\n        ]\n    },\n    'age' // mixing and matching objects and strings is ok\n];\n\n// Including columns that are not related 1:1 to row data fields/attributes\n// (See DataTable.BodyView for details)\nvar columns = [\n    {\n        label: 'Name', // Needed for the column header\n        formatter: function (o) {\n            // Fill the column cells with data from firstName and lastName\n            if (o.data.age > 55) {\n                o.classnames += ' senior';\n            }\n            return o.data.lastName + ', ' + o.data.firstName;\n        }\n    },\n    'age'\n];\n\n// Columns that include feature configurations (for illustration; not all\n// features are available today).\nvar columns = [\n    { type: 'checkbox', defaultChecked: true },\n    { key: 'firstName', sortable: true, resizable: true, min-width: '300px' },\n    { key: 'lastName', sortable: true, resizable: true, min-width: '300px' },\n    { key: 'age', emptyCellValue: '<em>unknown</em>' }\n];\n</code></pre>\n\n### Row Data Configuration\n\nThe `data` configuration attribute is responsible for housing the data objects that will be rendered as rows.  You can provide this information in two ways by default:\n\n1. An array of simple objects with key:value pairs\n2. A ModelList of Base-based class instances (presumably Model subclass\n   instances)\n\nIf an array of objects is passed, it will be translated into a ModelList filled\nwith instances of the class provided to the `recordType` attribute.  This\nattribute can also create a custom Model subclass from an array of field names\nor an object of attribute configurations.  If no `recordType` is provided, one\nwill be created for you from available information (see `_initRecordType`).\nProviding either your own ModelList instance for `data`, or at least Model\nclass for `recordType`, is the best way to control client-server\nsynchronization when modifying data on the client side.\n\nThe ModelList instance that manages the table's data is available in the `data`\nproperty on the DataTable instance.\n\n\n### Rendering\n\nTable rendering is a collaborative process between the DataTable and its\nconfigured `headerView`, `bodyView`, and `footerView`.  The DataTable renders\nthe `<table>` and `<caption>`, but the contents of the table are delegated to\ninstances of the classes provided to the `headerView`, `bodyView`, and\n`footerView` attributes. If any of these attributes is unset, that portion of\nthe table won't be rendered.\n\nDataTable.Base assigns the default `headerView` to `Y.DataTable.HeaderView` and\nthe default `bodyView` to `Y.DataTable.BodyView`, though either can be\noverridden for custom rendering.  No default `footerView` is assigned. See\nthose classes for more details about how they operate."},{"displayName":"datatable-body","name":"datatable-body","description":"View class responsible for rendering the `<tbody>` section of a table. Used as\nthe default `bodyView` for `Y.DataTable.Base` and `Y.DataTable` classes.\n\nTranslates the provided `modelList` into a rendered `<tbody>` based on the data\nin the constituent Models, altered or ammended by any special column\nconfigurations.\n\nThe `columns` configuration, passed to the constructor, determines which\ncolumns will be rendered.\n\nThe rendering process involves constructing an HTML template for a complete row\nof data, built by concatenating a customized copy of the instance's\n`CELL_TEMPLATE` into the `ROW_TEMPLATE` once for each column.  This template is\nthen populated with values from each Model in the `modelList`, aggregating a\ncomplete HTML string of all row and column data.  A `<tbody>` Node is then created from the markup and any column `nodeFormatter`s are applied.\n\nSupported properties of the column objects include:\n\n  * `key` - Used to link a column to an attribute in a Model.\n  * `name` - Used for columns that don't relate to an attribute in the Model\n    (`formatter` or `nodeFormatter` only) if the implementer wants a\n    predictable name to refer to in their CSS.\n  * `formatter` - Used to customize or override the content value from the\n    Model.  These do not have access to the cell or row Nodes and should\n    return string (HTML) content.\n  * `nodeFormatter` - Used to provide content for a cell as well as perform any\n    custom modifications on the cell or row Node that could not be performed by\n    `formatter`s.  Should be used sparingly for better performance.\n  * `emptyCellValue` - String (HTML) value to use if the Model data for a\n    column, or the content generated by a `formatter`, is the empty string or\n    `undefined`.\n\nColumn `formatter`s are passed an object (`o`) with the following properties:\n\n  * `value` - The current value of the column's associated attribute, if any.\n  * `data` - An object map of Model keys to their current values.\n  * `record` - The Model instance.\n  * `column` - The column configuration object for the current column.\n  * `classnames` - Initially empty string to allow `formatter`s to add CSS \n    classes to the cell's `<td>`.\n  * `rowindex` - The zero-based row number.\n\nThey may return a value or update `o.value` to assign specific HTML content.  A\nreturned value has higher precedence.\n\nColumn `nodeFormatter`s are passed an object (`o`) with the following\nproperties:\n\n  * `value` - The current value of the column's associated attribute, if any.\n  * `td` - The `<td>` Node instance.\n  * `cell` - The `<div>` liner Node instance if present, otherwise, the `<td>`.\n    When adding content to the cell, prefer appending into this property.\n  * `data` - An object map of Model keys to their current values.\n  * `record` - The Model instance.\n  * `column` - The column configuration object for the current column.\n  * `rowindex` - The zero-based row number.\n\nThey are expected to inject content into the cell's Node directly, including\nany \"empty\" cell content.  Each `nodeFormatter` will have access through the\nNode API to all cells and rows in the `<tbody>`, but not to the `<table>`, as\nit will not be attached yet.\n\nIf a `nodeFormatter` returns `false`, the `o.td` and `o.cell` Nodes will be\n`destroy()`ed to remove them from the Node cache and free up memory.  The DOM\nelements will remain as will any content added to them.  _It is highly\nadvisable to always return `false` from your `nodeFormatter`s_."},{"displayName":"datatable-column-widths","name":"datatable-column-widths","description":"Adds basic, programmatic column width support to DataTable. Note, this does not\nadd support for truncated columns.  Due to the way HTML tables render, column\nwidth is more like `min-width`.  Column content wider than the assigned width\nwill cause the column to expand, though if a table width is set, the overall\nwidth will be respected by reducing the width of other columns if possible.\n\nTo set a column width, either add a `width` value to the column configuration\nor call the `setColumnWidth(id, width)` method.\n\nNote, assigning column widths is possible without this module, as each cell is\ndecorated with a class appropriate for that column which you can statically\ntarget in your site's CSS.  To achieve forced column widths with truncation,\neither add a column `formatter` or update the table's `bodyView`'s\n`CELL_TEMPLATE` to include a `<div>` liner (by convention, assigned a classname\n\"yui3-datatable-liner\"), then set the width and overflow for those `<div>`s in\nyour CSS.  For example, to give the column \"foo\" an absolute width, add this to\nyour site CSS:\n\n```\n.yui3-datatable .yui3-datatable-foo .yui3-datatable-liner {\n    overflow: hidden;\n    width: 125px;\n}\n```\n\nand assign a `formatter` for the \"foo\" column in your JavaScript:\n\n```\nvar table = new Y.DataTable({\n    columns: [\n        {\n            key: 'foo',\n            formatter: '<div class=\"yui3-datatable-liner\">{value}</div>',\n            allowHTML: true\n        },\n        ...\n    ],\n    ...\n});\n```\n\nTo add a liner to all columns, either provide a custom `bodyView` to the\nDataTable constructor or update the default `bodyView`'s `CELL_TEMPLATE` like\nso:\n\n```\ntable.on('renderBody', function (e) {\n    e.view.CELL_TEMPLATE = e.view.CELL_TEMPLATE.replace(/\\{content\\}/,\n            '<div class=\"yui3-datatable-liner\">{content}</div>');\n});\n```\n\nKeep in mind that DataTable skins apply cell `padding`, so assign your CSS\n`width`s accordingly or override the `padding` style for that column's `<td>`s\nto 0, and add `padding` to the liner `<div>`'s styles."},{"displayName":"datatable-core","name":"datatable-core","description":"The core implementation of the `DataTable` and `DataTable.Base` Widgets.\n\nUse this class extension with Widget or another Base-based superclass to create\nthe basic DataTable API and composing class structure.\n\nNotable about this architecture is that rendering and UI event management for\nthe header, body, and footer of the table are deferred to configurable classes\nin the `headerView`, `bodyView`, and `footerView` attributes.  In this extension\nthey have no default values, requiring implementers to supply their own classes\nto render the table content."},{"displayName":"datatable-head","name":"datatable-head","description":"View class responsible for rendering the `<thead>` section of a table. Used as\nthe default `headerView` for `Y.DataTable.Base` and `Y.DataTable` classes.\n\nTranslates the provided array of column configuration objects into a rendered\n`<thead>` based on the data in those objects.\n    \n\nThe structure of the column data is expected to be a single array of objects,\nwhere each object corresponds to a `<th>`.  Those objects may contain a\n`children` property containing a similarly structured array to indicate the\nnested cells should be grouped under the parent column's colspan in a separate\nrow of header cells. E.g.\n\n<pre><code>\nnew Y.DataTable.HeaderView({\n  container: tableNode,\n  columns: [\n    { key: 'id' }, // no nesting\n    { key: 'name', children: [\n      { key: 'firstName', label: 'First' },\n      { key: 'lastName',  label: 'Last' } ] }\n  ]\n}).render();\n</code></pre>\n\nThis would translate to the following visualization:\n\n<pre>\n---------------------\n|    |     name     |\n|    |---------------\n| id | First | Last |\n---------------------\n</pre>\n\nSupported properties of the column objects include:\n\n  * `label`    - The HTML content of the header cell.\n  * `key`      - If `label` is not specified, the `key` is used for content.\n  * `children` - Array of columns to appear below this column in the next\n                 row.\n  * `abbr`     - The content of the 'abbr' attribute of the `<th>`\n\nThrough the life of instantiation and rendering, the column objects will have\nthe following properties added to them:\n\n  * `colspan` - To supply the `<th>` attribute\n  * `rowspan` - To supply the `<th>` attribute\n  * `parent`  - If the column is a child of another column, this points to\n    its parent column\n  * `_yuid`   - A unique YUI generated id used as the `<th>`'s 'id' for\n    reference in the data `<td>`'s 'headers' attribute.\n\nThe column object is also used to provide values for {placeholder} tokens in the\ninstance's `CELL_TEMPLATE`, so you can modify the template and include other\ncolumn object properties to populate them."},{"displayName":"datatable-mutable","name":"datatable-mutable","description":"Adds mutation convenience methods to `Y.DataTable` (or other built class).\n\nColumn mutation methods are paired with new custom events:\n\n * addColumn\n * removeColumn\n * modifyColumn\n * moveColumn\n\nRow mutation events are bubbled from the DataTable's `data` ModelList through\nthe DataTable instance."},{"displayName":"event-drag","name":"event-drag","description":"<p>Provides subscribable drag events from Node or NodeLists.  Subscribing\nto any of the events causes the node to be plugged with Y.Plugin.Drag.  The\nconfig object passed can be used to set Drag instance attributes or add\nadditional Plugins to the Drag instance such as Y.Plugin.DDProxy.</p>\n\nConfig properties are formatted and tested for a corresponding Y.Plugin.* as\n'somePlugin' => Y.Plugin.DDSomePlugin if the property name doesn't already\nstart with \"DD\".  So { proxy: true } and { DDProxy: true } are functionally\nequivalent.  Both add Y.Plugin.DDProxy to the Drag instance.</p>\n\n<pre><code>node.on('drag:start', fn, { proxy: true, data: 123 });</code></pre>\n\n<p>This adds Y.Plugin.DDProxy to the Drag instance and also set's the Drag instance's data attribute.</p>\n\n<p>Passing any value will result in the Plugin being added, but if you pass\nan object literal as the value, it will be sent to the Plugin's\nconstructor.</p>\n\n<pre><code>node.on('drag:end', fn, {\n    constrained: { constrain2node: '#container' }\n});</code></pre>\n\n<p>This adds Y.Plugin.DDConstrained to the Drag instance using the specified\nconfiguration.</p>\n\n<p>A custom detach handle is returned, whose detach method unplugs the\nY.Plugin.Drag from the node(s).</p>\n\n<p>Supported events are:</p>\n<ul>\n  <li>drag or drag:drag</li>\n  <li>drag:start</li>\n  <li>drag:end</li>\n  <li>drag:mouseDown</li>\n  <li>drag:afterMouseDown</li>\n  <li>drag:removeHandle</li>\n  <li>drag:addHandle</li>\n  <li>drag:removeInvalid</li>\n  <li>drag:addInvalid</li>\n  <li>drag:align</li>\n</ul>\n\n<p>Additionally, the default callback context is overridden to the\nsubscribing Node unless otherwise specified during the subscription.\nSo &quot;this&quot; in the callback will refer to the node.  On the\nevent object passed to subscribers, <code>e.currentTarget</code> is also the\nNode regardless of context override.  The Drag instance is available from\nthe Node as <code>node.dd</code>.</p>"},{"displayName":"event-konami","name":"event-konami","description":"Based on the Konami code (http://en.wikipedia.org/wiki/Konami_Code).\nSubscribers to this event should do something special.  The event will be\nfired only once for each subscriber.  With great power comes great\nresponsibility, after all."},{"displayName":"gallery-jsonp","name":"gallery-jsonp","description":"<p>Provides a JSONPRequest class for repeated JSONP calls, and a convenience\nmethod Y.jsonp(url, callback) to instantiate and send a JSONP request.</p>\n\n<p>The callback for the response can be named in the url explicitly or\nprovided in the configuration (second parameter to the constructor).\n\n<p>By default, the query parameter string &quot;callback=???&quot; will be\nsearched for in the url (??? can be anything).  If it's not found, it will\nbe added on.  If the JSONP service uses a different parameter name or url\nformat, you can override this behavior with the <code>format</code> property\nin the callback config.</p>\n\n<p>The second parameter can be a callback function that accepts the JSON\npayload as its argument, or a configuration object supporting the keys:</p>\n<ul>\n  <li>on - map of callback subscribers\n     <ul>\n        <li>success - function handler for successful transmission</li>\n        <li>failure - function handler for failed transmission</li>\n        <li>timeout - function handler for transactions that timeout</li>\n     </ul>\n </li>\n <li>format  - override function for inserting the proxy name in the url</li>\n <li>timeout - the number of milliseconds to wait before giving up</li>\n <li>context - becomes <code>this</code> in the callbacks</li>\n <li>args    - array of subsequent parameters to pass to the callbacks</li>\n</ul>"},{"displayName":"gallery-pluginattr","name":"gallery-pluginattr","description":"Adds a static method `Y.Plugin.addHostAttr(...)` to allow plugging and\nunplugging to happen via host attribute configuration."},{"displayName":"gallery-torelativetime","name":"gallery-torelativetime","description":"Provides a method Y.toRelativeTime(Date, refDate) to translate a Date\ninstance to a string like \"2 days ago\".  If the second parameter is\nprovided, the time delta is in reference to this date."}]} };
});