let Elements = [
    "Button",
    "Checkbox", "Image", "Label", "Link", "Text", "TextField", "Input", "TextArea", "DataPicker", "FileInput",
    "Section",
    "Form",
    "Selector", "CheckList", "Menu", "RadioButtons", "Tabs", "TextList", "Chat",
    "ComboBox", "Dropdown", "DropList",
    "Table", "DynamicTable",
];
let Locators = ["class", "css", "xpath", "id", "name", "tag", "text"];

let commonFields = {
    "Name": "TextField",
    "Type": "ComboBox",
    "parent": "internal",
    "parentId": "internal",
    "elId": "internal"
};

let ElementFields = {
    "Button": { ...commonFields, "Locator": "TextField" },
	"CheckBox": { ...commonFields, "Locator": "TextField" },
	"Image": { ...commonFields, "Locator": "TextField" },
	"Label": { ...commonFields, "Locator": "TextField" },
	"Text": { ...commonFields, "Locator": "TextField" },
    "Link": { ...commonFields, "Locator": "TextField" },
	"TextField": { ...commonFields, "Locator": "TextField" },
	"TextArea": { ...commonFields, "Locator": "TextField" },
	"DataPicker": { ...commonFields, "Locator": "TextField" },
	"FileInput": { ...commonFields, "Locator": "TextField" },
	"Selector": { ...commonFields, "Locator": "TextField" },
	"CheckList": { ...commonFields, "Locator": "TextField" },
	"Menu": { ...commonFields, "Locator": "TextField" },
	"RadioButtons": { ...commonFields, "Locator": "TextField" },
	"Tabs": { ...commonFields, "Locator": "TextField" },
    "Section": { ...commonFields, "Locator": "TextField", "isSection": "internal", "expanded": "internal", "children": "internal" },
    "Form": { ...commonFields, "Locator": "TextField", "isSection": "internal", "Entity": "TextField", "expanded": "internal", "children": "internal" },
    "ComboBox": {
        ...commonFields, "Root": "TextField", "Value": "TextField",
        "List": "TextField", "Expand": "TextField"
    },
    "Dropdown": {
        ...commonFields, "Root": "TextField", "Value": "TextField",
        "List": "TextField", "Expand": "TextField"
    },
    "DropList": {
        ...commonFields, "Root": "TextField", "Value": "TextField",
        "List": "TextField", "Expand": "TextField"
    },
    "Table": {
        ...commonFields, "Root": "TextField", "Headers": "TextField", "RowHeaders": "TextField", "Header": "TextField",
        "RowHeader": "TextField", "Cell": "TextField", "Column": "TextField", "Row": "TextField",
        "Footer": "TextField", "Height": "TextField", "Width": "TextField", "RowStartIndex": "TextField", "UseCache": "Checkbox",
        "HeaderTypes": "ComboBox", "HeaderTypesValues": ["All", "Headers", "No Headers", "Columns Headers", "Rows Headers"]
    },
    "DynamicTable": {
        ...commonFields, "Root": "TextField", "Headers": "TextField", "RowHeaders": "TextField", "Header": "TextField",
        "RowHeader": "TextField", "Cell": "TextField", "Column": "TextField", "Row": "TextField",
        "Footer": "TextField", "Height": "TextField", "Width": "TextField", "RowStartIndex": "TextField", "UseCache": "Checkbox",
        "HeaderTypes": "ComboBox", "HeaderTypesValues": ["All", "Headers", "No Headers", "Columns Headers", "Rows Headers"]
    }
}

let SimpleRules = {
    "Button": [{ "Locator": "button[type=submit]", "uniqness": "text", "id": 0}],
	"CheckBox": [{"Locator": "input[type=checkbox]", "id": 0, "uniqness": "id"}],
	"Image": [{"Locator": "img", "id": 0, "uniqness": "id"}],
	"Label": [{"Locator": "h1", "id": 0, "uniqness": "name"},
		{"Locator": "h2", "id": 1, "uniqness": "name"},
		{"Locator": "h3", "id": 2, "uniqness": "name"},
		{"Locator": "[ui=label]", "id": 3, "uniqness": "text"}
	],
    "Link": [{"Locator": "", "uniqness": "", id: 0 }],
	"Text": [{"Locator": ".main-txt", "id": 0, "uniqness": "name"}],
	"TextField": [{"Locator": "input[type=text]", "id": 0, "uniqness": "id"},
		{"Locator": "input[type=password]", "id": 1, "uniqness": "id"}
	],
	"TextArea": [{"Locator": "textarea", "id": 0, "uniqness": "id"}],
	"DataPicker": [{"Locator": "", "id": 0, "uniqness": ""}],
	"FileInput": [{"Locator": "", "id": 0, "uniqness": ""}],
	"Selector": [{"Locator": "", "id": 0, "uniqness": ""}],
	"CheckList": [{"Locator": "", "id": 0, "uniqness": ""}],
	"Menu": [{"Locator": "", "id": 0, "uniqness": ""}],
	"RadioButtons": [{"Locator": "", "id": 0, "uniqness": ""}],
	"Tabs": [{"Locator": "", "id": 0, "uniqness": ""}]
};
let ComplexRules = {
    "Dropdown": [{ Root: "[ui=dropdown]", uniqness: "id", Value: "", List: "li", Expand: ".caret", id: 0 }],
    "ComboBox": [{ Root: "[ui=combobox]", uniqness: "id", Value: "", List: "li", Expand: ".caret", id: 0 }],
    "DropList": [{ Root: "[ui=droplist]", uniqness: "id", Value: "", List: "li", Expand: ".caret", id: 0 }],	
    "Table": [{
        Root: "table", Header: "", RowHeader: "", Cell: "",
        Column: "", Row: "", Footer: "", id: 0, uniqness: 'class'
    }],
    "DynamicTable": [{
        Root: "", Header: "", RowHeader: "", Cell: "",
        Column: "", Row: "", Footer: "", id: 0, uniqness: "class"
    }]
};
let CompositeRules = {
	"Section": [{ "Locator": ".section", "id": 0, "uniqness": "class" },
		{"Locator": "header", "id": 1, "uniqness": "tag"},
		{"Locator": "footer", "id": 2, "uniqness": "tag"},
		{"Locator": ".uui-side-bar", "id": 3, "uniqness": "name"},
		{"Locator": ".main-form", "id": 4, "uniqness": "tag"}
	],
	"Form": [{"Locator": "form", "id": 0, "uniqness": "id"}]
}

export { Elements, Locators, ElementFields, SimpleRules, ComplexRules, CompositeRules, commonFields };