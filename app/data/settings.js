let Elements = [
    "Button",
    "Checkbox", "Image", "Label", "Link", "Text", "TextField", "Input", "TextArea", "DataPicker", "FileInput",
    "Section",
    "Form",
    "Selector", "CheckList", "Menu", "RadioButtons", "Tabs", "TextList", "Chat",
    "ComboBox", "Dropdown", "DropList",
    "Table", "DynamicTable",
    // "Pagination",
    // "Popup",
    // "Yes/NoDialog",
    // "Alert",
    // "Search",
    // "ListOfElements"
];
let Locators = ["class", "css", "xpath", "id", "name", "tag", "text"];
let HeaderTypes = ["All", "Headers", "No Headers", "Columns Headers", "Rows Headers"];
let commonFields = {
    "Name": "TextField",
    "Type": "ComboBox",
    "parent": "internal",
    "parentId": "internal",
    "elId": "internal"
};
let ElementFields = new Map();
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
ElementFields.set("Section", { ...commonFields, "Locator": "TextField", "isSection": "internal", "expanded": "internal" });
ElementFields.set("Form", { ...commonFields, "Locator": "TextField", "isSection": "internal", "Entity": "TextField", "expanded": "internal" });
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
ElementFields.set("Dropdown", {
    ...commonFields, "Root": "TextField", "Value": "TextField",
    "List": "TextField", "Expand": "TextField", "Enum": "TextField"
});
ElementFields.set("Droplist", {
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
});
/*ElementFields.set("Pagination", {
    ...commonFields, "Next": "TextField", "Previous": "TextField",
    "First": "TextField", "Last": "TextField", "Page": "TextField"
});*/
//ElementFields.set("Popup", { ...commonFields, "Ok": "TextField", "Cancel": "TextField", "Close": "TextField" });
//ElementFields.set("Yes/NoDialog", { ...commonFields, "Yes": "TextField", "No": "TextField", "Close": "TextField" });
//ElementFields.set("Alert", { ...commonFields, "Ok": "TextField", "Close": "TextField" });
//ElementFields.set("Search", { ...commonFields, "Value": "TextField", "SearchButton": "TextField", "Suggestions": "TextField" });
//ElementFields.set("ListOfElements", { ...commonFields, "Locator": "TextField", "ListItems": "ComboBox", "Enum": "TextField" });

let SimpleRules = {
    "Button": [{ Locator: "input[type=submit]", id: 0 }, { Locator: "input[type=button]", id: 1 }, { Locator: "button[type=button]", id: 2 },
    { Locator: "button.btn", id: 3 }, { Locator: "a.btn", id: 4 }, { Locator: 'button[type=submit]', id: 5 }],
    "Checkbox": [{ Locator: "", id: 0 }],
    "Image": [{ Locator: "", id: 0 }],
    "Label": [{ Locator: "", id: 0 }],
    "Link": [{ Locator: "", id: 0 }],
    "Text": [{ Locator: "", id: 0 }],
    "TextField": [{ Locator: "", id: 0 }],
    "Input": [{ Locator: "", id: 0 }],
    "TextArea": [{ Locator: "", id: 0 }],
    "DataPicker": [{ Locator: "", id: 0 }],
    "FileInput": [{ Locator: "", id: 0 }],
    "Selector": [{ Locator: "", id: 0 }],
    "CheckList": [{ Locator: "", id: 0 }],
    "Menu": [{ Locator: "", id: 0 }],
    "RadioButtons": [{ Locator: "", id: 0 }],
    "Tabs": [{ Locator: "", id: 0 }],
    "TextList": [{ Locator: "", id: 0 }],
    "Chat": [{ Locator: "", id: 0 }]
};
let ComplexRules = {
    "ComboBox": [{ Root: "[data-toggle=dropdown]", Value: "", List: "li", Expand: ".caret", id: 0 }],
    "Dropdown": [{ Root: "select", Value: "", List: "", Expand: "", id: 0 }],
    "Droplist": [{ Root: "", Value: "", List: "", Expand: "", id: 0 }],
    "Table": [{
        Root: "table", Header: "", RowHeader: "", Cell: "",
        Column: "", Row: "", Footer: "", id: 0
    }],
    "DynamicTable": [{
        Root: "", Header: "", RowHeader: "", Cell: "",
        Column: "", Row: "", Footer: "", id: 0
    }]
    // "Pagination": [{
    //     Next: "", Previous: "", First: "", Last: "",
    //     Page: "", id: 0
    // }],
    // "Popup": [{ Ok: "", Cancel: "", Close: "", id: 0 }],
    // "Yes/NoDialog": [{ Yes: "", No: "", Close: "", id: 0 }],
    // "Alert": [{ Ok: "", Close: "", id: 0 }],
    // "Search": [{ Value: "", SearchButton: "", Suggestions: "", id: 0 }],
    // "ListOfElements": [{ Locator: "", ListItems: "", id: 0 }
};
let CompositeRules = {
    "Section": [{ Locator: ".section", id: 0 }, { Locator: "header", id: 1 }, { Locator: "//footer", id: 2 }, { Locator: "#sidebar", id: 3 }, { Locator: "#content", id: 4 }],
    "Form": [{ Locator: "form", id: 0 }]
}


// {
//   "themes": [
//     {
//       "theme": "cerulean",
//       "value": true
//     },
//     {
//       "theme": "cosmo",
//       "value": false
//     },
//     {
//       "theme": "darkly",
//       "value": false
//     },
//     {
//       "theme": "flatly",
//       "value": false
//     },
//     {
//       "theme": "slate",
//       "value": false
//     },
//     {
//       "theme": "superhero",
//       "value": false
//     }
//   ],
//     "programmingLanguages": [
//       {
//         "language": "java",
//         "selected": true
//       },
//       {
//         "language": "c#",
//         "selected": false
//       }
//     ],
//       "staticIds": true,
//         "customClassesTagsTypes": [
//           {
//             "element": "Button",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "Text",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "Label",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "Link",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "TextField",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "TextArea",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "Checkbox",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "DatePicker",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "FileInput",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "Image",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "DropDown",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "CheckList",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "DropList",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "Combobox",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "Table",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "Menu",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "Tabs",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "RadioButtonGroup",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "TextList",
//             "classes": [],
//             "tags": [],
//             "types": []
//           },
//           {
//             "element": "Section",
//             "classes": [],
//             "tags": [],
//             "types": []
//           }
//         ],
//           "angularDirectives": [
//             {
//               "directive": "ng-model",
//               "selected": false
//             },
//             {
//               "directive": "ng-option",
//               "selected": false
//             },
//             {
//               "directive": "ng-repeater",
//               "selected": false
//             },
//             {
//               "directive": "ng-binding",
//               "selected": false
//             }
//           ]
// }

export { Elements, Locators, ElementFields, HeaderTypes, SimpleRules, ComplexRules, CompositeRules, commonFields };