webpackHotUpdate(0,{

/***/ "./app/data/settings.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Elements = ["Button", "Checkbox", "Image", "Label", "Link", "Text", "TextField", "Input", "TextArea", "DataPicker", "FileInput", "Section", "Form", "Selector", "CheckList", "Menu", "RadioButtons", "Tabs", "TextList", "Chat", "ComboBox", "Dropdown", "DropList", "Table", "DynamicTable"];
var Locators = ["class", "css", "xpath", "id", "name", "tag", "text"];

var commonFields = {
	"Name": "TextField",
	"Type": "ComboBox",
	"parent": "internal",
	"parentId": "internal",
	"elId": "internal"
};

var ElementFields = {
	"Button": _extends({}, commonFields, { "Locator": "TextField" }),
	"CheckBox": _extends({}, commonFields, { "Locator": "TextField" }),
	"Image": _extends({}, commonFields, { "Locator": "TextField" }),
	"Label": _extends({}, commonFields, { "Locator": "TextField" }),
	"Text": _extends({}, commonFields, { "Locator": "TextField" }),
	"Link": _extends({}, commonFields, { "Locator": "TextField" }),
	"TextField": _extends({}, commonFields, { "Locator": "TextField" }),
	"TextArea": _extends({}, commonFields, { "Locator": "TextField" }),
	"DataPicker": _extends({}, commonFields, { "Locator": "TextField" }),
	"FileInput": _extends({}, commonFields, { "Locator": "TextField" }),
	"Selector": _extends({}, commonFields, { "Locator": "TextField" }),
	"CheckList": _extends({}, commonFields, { "Locator": "TextField" }),
	"Menu": _extends({}, commonFields, { "Locator": "TextField" }),
	"RadioButtons": _extends({}, commonFields, { "Locator": "TextField" }),
	"Tabs": _extends({}, commonFields, { "Locator": "TextField" }),
	"Section": _extends({}, commonFields, { "Locator": "TextField", "isSection": "internal", "expanded": "internal", "children": "internal" }),
	"Form": _extends({}, commonFields, { "Locator": "TextField", "isSection": "internal", "Entity": "TextField", "expanded": "internal", "children": "internal" }),
	"ComboBox": _extends({}, commonFields, { "Root": "TextField", "Value": "TextField",
		"List": "TextField", "Expand": "TextField", "Enum": "TextField"
	}),
	"Dropdown": _extends({}, commonFields, { "Root": "TextField", "Value": "TextField",
		"List": "TextField", "Expand": "TextField", "Enum": "TextField"
	}),
	"DropList": _extends({}, commonFields, { "Root": "TextField", "Value": "TextField",
		"List": "TextField", "Expand": "TextField", "Enum": "TextField"
	}),
	"Table": _extends({}, commonFields, { "Root": "TextField", "Headers": "TextField", "RowHeaders": "TextField", "Header": "TextField",
		"RowHeader": "TextField", "Cell": "TextField", "Column": "TextField", "Row": "TextField",
		"Footer": "TextField", "Height": "TextField", "Width": "TextField", "RowStartIndex": "TextField", "UseCache": "Checkbox",
		"HeaderTypes": "ComboBox", "HeaderTypesValues": ["All", "Headers", "No Headers", "Columns Headers", "Rows Headers"]
	}),
	"DynamicTable": _extends({}, commonFields, { "Root": "TextField", "Headers": "TextField", "RowHeaders": "TextField", "Header": "TextField",
		"RowHeader": "TextField", "Cell": "TextField", "Column": "TextField", "Row": "TextField",
		"Footer": "TextField", "Height": "TextField", "Width": "TextField", "RowStartIndex": "TextField", "UseCache": "Checkbox",
		"HeaderTypes": "ComboBox", "HeaderTypesValues": ["All", "Headers", "No Headers", "Columns Headers", "Rows Headers"]
	})
	//let HeaderTypes = ["All", "Headers", "No Headers", "Columns Headers", "Rows Headers"];

	/*let ElementFields = new Map();
 ElementFields.set("Button", { ...commonFields, "Locator": "TextField" });
 ElementFields.set("Image", { ...commonFields, "Locator": "TextField" });
 ElementFields.set("Checkbox", { ...commonFields, "Locator": "TextField" });
 ElementFields.set("Label", { ...commonFields, "Locator": "TextField" });
 ElementFields.set("Link", { ...commonFields, "Locator": "TextField" });
 ElementFields.set("Text", { ...commonFields, "Locator": "TextField" });
 ElementFields.set("TextField", { ...commonFields, "Locator": "TextField" });
 ElementFields.set("Input", { ...commonFields, "Locator": "TextField" });
 ElementFields.set("TextArea", { ...commonFields, "Locator": "TextField" });
 ElementFields.set("DataPicker", { ...commonFields, "Locator": "TextField" });
 ElementFields.set("FileInput", { ...commonFields, "Locator": "TextField" });
 ElementFields.set("Section", { ...commonFields, "Locator": "TextField", "isSection": "internal", "expanded": "internal", "children": "internal" });
 ElementFields.set("Form", { ...commonFields, "Locator": "TextField", "isSection": "internal", "Entity": "TextField", "expanded": "internal", "children": "internal" });
 ElementFields.set("Selector", { ...commonFields, "Locator": "TextField", "Enum": "TextField" });
 ElementFields.set("CheckList", { ...commonFields, "Locator": "TextField", "Enum": "TextField" });
 ElementFields.set("Menu", { ...commonFields, "Locator": "TextField", "Enum": "TextField" });
 ElementFields.set("RadioButtons", { ...commonFields, "Locator": "TextField", "Enum": "TextField" });
 ElementFields.set("Tabs", { ...commonFields, "Locator": "TextField", "Enum": "TextField" });
 ElementFields.set("TextList", { ...commonFields, "Locator": "TextField", "Enum": "TextField" });
 ElementFields.set("Chat", { ...commonFields, "Locator": "TextField", "Enum": "TextField" });
 ElementFields.set("ComboBox", {
     ...commonFields, "Root": "TextField", "Value": "TextField",
     "List": "TextField", "Expand": "TextField", "Enum": "TextField"
 });
 ElementFields.set("Logout", {
     ...commonFields, "Root": "TextField", "Value": "TextField",
     "List": "TextField", "Expand": "TextField", "Enum": "TextField"
 });
 ElementFields.set("Dropdown", {
     ...commonFields, "Root": "TextField", "Value": "TextField",
     "List": "TextField", "Expand": "TextField", "Enum": "TextField"
 });
 ElementFields.set("DropList", {
     ...commonFields, "Root": "TextField", "Value": "TextField",
     "List": "TextField", "Expand": "TextField", "Enum": "TextField"
 });
 ElementFields.set("Table", {
     ...commonFields, "Root": "TextField", "Headers": "TextField", "RowHeaders": "TextField", "Header": "TextField",
     "RowHeader": "TextField", "Cell": "TextField", "Column": "TextField", "Row": "TextField",
     "Footer": "TextField", "Height": "TextField", "Width": "TextField", "RowStartIndex": "TextField", "UseCache": "Checkbox",
     "HeaderTypes": "ComboBox"
 });
 ElementFields.set("DynamicTable", {
     ...commonFields, "Root": "TextField", "Headers": "TextField", "RowHeaders": "TextField", "Header": "TextField",
     "RowHeader": "TextField", "Cell": "TextField", "Column": "TextField", "Row": "TextField",
     "Footer": "TextField", "Height": "TextField", "Width": "TextField", "RowStartIndex": "TextField", "UseCache": "Checkbox",
     "HeaderTypes": "ComboBox"
 });*/

};var SimpleRules = {
	"Button": [{
		"Locator": "button[type=submit]",
		"uniqness": "text",
		"id": 0
	}],
	"CheckBox": [{
		"Locator": "input[type=checkbox]",
		"id": 0,
		"uniqness": "id"
	}],
	"Image": [{
		"Locator": "img",
		"id": 0,
		"uniqness": "id"
	}],
	"Label": [{
		"Locator": "h1",
		"id": 0,
		"uniqness": "name"
	}, {
		"Locator": "h2",
		"id": 1,
		"uniqness": "name"
	}, {
		"Locator": "h3",
		"id": 2,
		"uniqness": "name"
	}, {
		"Locator": "[ui=label]",
		"id": 3,
		"uniqness": "text"
	}],
	"Link": [{ Locator: "", uniqness: "", id: 0 }],
	"Text": [{
		"Locator": ".main-txt",
		"id": 0,
		"uniqness": "name"
	}],
	"TextField": [{
		"Locator": "input[type=text]",
		"id": 0,
		"uniqness": "id"
	}, {
		"Locator": "input[type=password]",
		"id": 1,
		"uniqness": "id"
	}],
	"TextArea": [{
		"Locator": "textarea",
		"id": 0,
		"uniqness": "id"
	}],
	"DataPicker": [{
		"Locator": "",
		"id": 0,
		"uniqness": ""
	}],
	"FileInput": [{
		"Locator": "",
		"id": 0,
		"uniqness": ""
	}],
	"Selector": [{
		"Locator": "",
		"id": 0,
		"uniqness": ""
	}],
	"CheckList": [{
		"Locator": "",
		"id": 0,
		"uniqness": ""
	}],
	"Menu": [{
		"Locator": "",
		"id": 0,
		"uniqness": ""
	}],
	"RadioButtons": [{
		"Locator": "",
		"id": 0,
		"uniqness": ""
	}],
	"Tabs": [{
		"Locator": "",
		"id": 0,
		"uniqness": ""
	}]
};
var ComplexRules = {
	"Dropdown": [{ Root: "[jtype=dropdown] button", uniqness: ".filter-option#text", Value: "", List: "li", Expand: ".caret", id: 0 }],
	"ComboBox": [{ Root: "[jtype=combobox] button", uniqness: ".filter-option#text", Value: "", List: "li", Expand: ".caret", id: 0 }],
	"DropList": [{ Root: "[jtype=droplist] button", uniqness: ".filter-option#text", Value: "", List: "li", Expand: ".caret", id: 0 }],
	"Table": [{
		Root: "table", Header: "", RowHeader: "", Cell: "",
		Column: "", Row: "", Footer: "", id: 0, uniqness: 'class'
	}],
	"DynamicTable": [{
		Root: "", Header: "", RowHeader: "", Cell: "",
		Column: "", Row: "", Footer: "", id: 0, uniqness: "class"
	}]
};
var CompositeRules = {
	"Section": [{
		"Locator": ".section",
		"id": 0,
		"uniqness": "class"
	}, {
		"Locator": "header",
		"id": 1,
		"uniqness": "tag"
	}, {
		"Locator": "footer",
		"id": 2,
		"uniqness": "tag"
	}, {
		"Locator": ".uui-side-bar",
		"id": 3,
		"uniqness": "name"
	}, {
		"Locator": ".main-form",
		"id": 4,
		"uniqness": "tag"
	}],
	"Form": [{
		"Locator": "form",
		"id": 0,
		"uniqness": "id"
	}]
};

exports.Elements = Elements;
exports.Locators = Locators;
exports.ElementFields = ElementFields;
exports.SimpleRules = SimpleRules;
exports.ComplexRules = ComplexRules;
exports.CompositeRules = CompositeRules;
exports.commonFields = commonFields;

/***/ })

})