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
    "Link": _extends({}, commonFields, { "Locator": "TextField" }),
    "Section": _extends({}, commonFields, { "Locator": "TextField", "isSection": "internal", "expanded": "internal", "children": "internal" }),
    "Form": _extends({}, commonFields, { "Locator": "TextField", "isSection": "internal", "Entity": "TextField", "expanded": "internal", "children": "internal" }),
    "ComboBox": _extends({}, commonFields, { "Root": "TextField", "Value": "TextField",
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
    // "Checkbox": [{ Locator: "", id: 0, uniqness: "" }],
    // "Image": [{ Locator: "", id: 0, uniqness: "" }],
    // "Label": [{ Locator: "", id: 0, uniqness: "" }],
    "Link": [{ Locator: "a[href]", uniqness: "text", id: 0 }]
    // "Text": [{ Locator: "", id: 0, uniqness: "" }],
    // "TextField": [{ Locator: "", id: 0, uniqness: "" }],
    // "Input": [{ Locator: "", id: 0, uniqness: "" }],
    // "TextArea": [{ Locator: "", id: 0, uniqness: "" }],
    // "DataPicker": [{ Locator: "", id: 0, uniqness: "" }],
    // "FileInput": [{ Locator: "", id: 0, uniqness: "" }],
    // "Selector": [{ Locator: "", id: 0, uniqness: "" }],
    // "CheckList": [{ Locator: "", id: 0, uniqness: "" }],
    // "Menu": [{ Locator: "", id: 0, uniqness: "" }],
    // "RadioButtons": [{ Locator: "", id: 0, uniqness: "" }],
    // "Tabs": [{ Locator: "", id: 0, uniqness: "" }],
    // "TextList": [{ Locator: "", id: 0, uniqness: "" }],
    // "Chat": [{ Locator: "", id: 0, uniqness: "" }]
};
var ComplexRules = {
    "ComboBox": [{ Root: "[jtype=dropdown] button", uniqness: ".filter-option#text", Value: "", List: "li", Expand: ".caret", id: 0 }],
    // "Dropdown": [{ Root: "[jtype=combobox] button", uniqness: ".filter-option#text", Value: "", List: "", Expand: "", id: 0 }],
    // "DropList": [{ Root: "[jtype=droplist] button", uniqness: "text", Value: "", List: "", Expand: "", id: 0 }],
    // "MenuDropdown": [{ Root: ".open [data-toggle]", uniqness: "text", Value: "", List: "", Expand: "", id: 0 }],
    // "Logout": [{ Root: ".uui-profile-menu", uniqness: ".profile-photo span#text", Value: "", List: "", Expand: "", id: 0 }],
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
    "Section": [{ Locator: ".section", id: 0, uniqness: 'class' }, { Locator: "header", id: 1, uniqness: 'tag' }, { Locator: "//footer", id: 2, uniqness: '[footer]' }, { Locator: "#sidebar", id: 3, uniqness: 'id' }, { Locator: "#content", id: 4, uniqness: 'id' }],
    "Form": [{ Locator: "form", id: 0, uniqness: 'class' }]
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