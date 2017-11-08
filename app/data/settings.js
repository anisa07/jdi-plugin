let Elements = [
    "Button",
    "Checkbox", "Image", "Label", "Link", "Text", "TextField", "Input", "TextArea", "DataPicker", "FileInput",
    "Section",
    "Form",
    "Selector", "CheckList", "Menu", "RadioButtons", "Tabs", "TextList", "Chat",
    "ComboBox", "Dropdown", "DropList",
    "Table", "DynamicTable",
    "Pagination",
    "Popup",
    "Yes/NoDialog",
    "Alert",
    "Search",
    "ListOfElements"
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
ElementFields.set("Button", { ...commonFields, "Locator": "ComboBoxTextField" });
ElementFields.set("Image", { ...commonFields, "Locator": "ComboBoxTextField" });
ElementFields.set("Checkbox", { ...commonFields, "Locator": "ComboBoxTextField" });
ElementFields.set("Label", { ...commonFields, "Locator": "ComboBoxTextField" });
ElementFields.set("Link", { ...commonFields, "Locator": "ComboBoxTextField" });
ElementFields.set("Text", { ...commonFields, "Locator": "ComboBoxTextField" });
ElementFields.set("TextField", { ...commonFields, "Locator": "ComboBoxTextField" });
ElementFields.set("Input", { ...commonFields, "Locator": "ComboBoxTextField" });
ElementFields.set("TextArea", { ...commonFields, "Locator": "ComboBoxTextField" });
ElementFields.set("DataPicker", { ...commonFields, "Locator": "ComboBoxTextField" });
ElementFields.set("FileInput", { ...commonFields, "Locator": "ComboBoxTextField" });
ElementFields.set("Section", { ...commonFields, "Locator": "ComboBoxTextField", "isSection": "internal", "expanded": "internal" });
ElementFields.set("Form", { ...commonFields, "Locator": "ComboBoxTextField", "isSection": "internal", "Entity": "TextField", "expanded": "internal" });
ElementFields.set("Selector", { ...commonFields, "Locator": "ComboBoxTextField", "Enum": "TextField" });
ElementFields.set("CheckList", { ...commonFields, "Locator": "ComboBoxTextField", "Enum": "TextField" });
ElementFields.set("Menu", { ...commonFields, "Locator": "ComboBoxTextField", "Enum": "TextField" });
ElementFields.set("RadioButtons", { ...commonFields, "Locator": "ComboBoxTextField", "Enum": "TextField" });
ElementFields.set("Tabs", { ...commonFields, "Locator": "ComboBoxTextField", "Enum": "TextField" });
ElementFields.set("TextList", { ...commonFields, "Locator": "ComboBoxTextField", "Enum": "TextField" });
ElementFields.set("Chat", { ...commonFields, "Locator": "ComboBoxTextField", "Enum": "TextField" });
ElementFields.set("ComboBox", {
    ...commonFields, "Root": "ComboBoxTextField", "Value": "ComboBoxTextField",
    "List": "ComboBoxTextField", "Expand": "ComboBoxTextField", "Enum": "TextField"
});
ElementFields.set("Dropdown", {
    ...commonFields, "Root": "ComboBoxTextField", "Value": "ComboBoxTextField",
    "List": "ComboBoxTextField", "Expand": "ComboBoxTextField", "Enum": "TextField"
});
ElementFields.set("Droplist", {
    ...commonFields, "Root": "ComboBoxTextField", "Value": "ComboBoxTextField",
    "List": "ComboBoxTextField", "Expand": "ComboBoxTextField", "Enum": "TextField"
});
ElementFields.set("Table", {
    ...commonFields, "Root": "ComboBoxTextField", "Headers": "TextField", "RowHeaders": "TextField", "Header": "ComboBoxTextField",
    "RowHeader": "ComboBoxTextField", "Cell": "ComboBoxTextField", "Column": "ComboBoxTextField", "Row": "ComboBoxTextField",
    "Footer": "ComboBoxTextField", "Height": "TextField", "Width": "TextField", "RowStartIndex": "TextField", "UseCache": "Checkbox",
    "HeaderTypes": "ComboBox"
});
ElementFields.set("DynamicTable", {
    ...commonFields, "Root": "ComboBoxTextField", "Headers": "TextField", "RowHeaders": "TextField", "Header": "ComboBoxTextField",
    "RowHeader": "ComboBoxTextField", "Cell": "ComboBoxTextField", "Column": "ComboBoxTextField", "Row": "ComboBoxTextField",
    "Footer": "ComboBoxTextField", "Height": "TextField", "Width": "TextField", "RowStartIndex": "TextField", "UseCache": "Checkbox",
    "HeaderTypes": "ComboBox"
});
ElementFields.set("Pagination", {
    ...commonFields, "Next": "ComboBoxTextField", "Previous": "ComboBoxTextField",
    "First": "ComboBoxTextField", "Last": "ComboBoxTextField", "Page": "ComboBoxTextField"
});
ElementFields.set("Popup", { ...commonFields, "Ok": "ComboBoxTextField", "Cancel": "ComboBoxTextField", "Close": "ComboBoxTextField" });
ElementFields.set("Yes/NoDialog", { ...commonFields, "Yes": "ComboBoxTextField", "No": "ComboBoxTextField", "Close": "ComboBoxTextField" });
ElementFields.set("Alert", { ...commonFields, "Ok": "ComboBoxTextField", "Close": "ComboBoxTextField" });
ElementFields.set("Search", { ...commonFields, "Value": "ComboBoxTextField", "SearchButton": "ComboBoxTextField", "Suggestions": "ComboBoxTextField" });
ElementFields.set("ListOfElements", { ...commonFields, "Locator": "ComboBoxTextField", "ListItems": "ComboBox", "Enum": "TextField" });

let Rules = {
    "Button": [{ Locator: { path: "", type: "", uniqness: "" } }],
    "Checkbox": [{ Locator: { path: "", type: "", uniqness: "" } }],
    "Image": [{ Locator: { path: "", type: "", uniqness: "" } }],
    "Label": [{ Locator: { path: "", type: "", uniqness: "" } }],
    "Link": [{ Locator: { path: "", type: "", uniqness: "" } }],
    "Text": [{ Locator: { path: "", type: "", uniqness: "" } }],
    "TextField": [{ Locator: { path: "", type: "", uniqness: "" } }],
    "Input": [{ Locator: { path: "", type: "", uniqness: "" } }],
    "TextArea": [{ Locator: { path: "", type: "", uniqness: "" } }],
    "DataPicker": [{ Locator: { path: "", type: "", uniqness: "" } }],
    "FileInput": [{ Locator: { path: "", type: "", uniqness: "" } }],
    "Section": [{ Locator: { path: "", type: "", uniqness: ""}}],
    "Form": [{ Locator: { path: "", type: "", uniqness: ""}}],
    "Selector": [{ Locator: { path: "", type: "", uniqness: ""}}], 
    "CheckList": [{ Locator: { path: "", type: "", uniqness: ""}}], 
    "Menu": [{ Locator: { path: "", type: "", uniqness: ""}}], 
    "RadioButtons": [{ Locator: { path: "", type: "", uniqness: ""}}], 
    "Tabs": [{ Locator: { path: "", type: "", uniqness: ""}}], 
    "TextList": [{ Locator: { path: "", type: "", uniqness: ""}}], 
    "Chat": [{ Locator: { path: "", type: "", uniqness: ""}}],
    "ComboBox": [{ Root: { path: "", type: "", uniqness: ""}, Value: { path: "", type: "", uniqness: ""},List: { path: "", type: "", uniqness: ""}, Expand: { path: "", type: "", uniqness: ""}}],
    "Dropdown": [{ Root: { path: "", type: "", uniqness: ""}, Value: { path: "", type: "", uniqness: ""},List: { path: "", type: "", uniqness: ""}, Expand: { path: "", type: "", uniqness: ""}}],
    "Droplist": [{ Root: { path: "", type: "", uniqness: ""}, Value: { path: "", type: "", uniqness: ""},List: { path: "", type: "", uniqness: ""}, Expand: { path: "", type: "", uniqness: ""}}],
    "Table": [{ Root: { path: "", type: "", uniqness: ""}, Header: { path: "", type: "", uniqness: ""},RowHeader: { path: "", type: "", uniqness: ""}, Cell: { path: "", type: "", uniqness: ""},
    Column: { path: "", type: "", uniqness: ""}, Row: { path: "", type: "", uniqness: ""}, Footer: { path: "", type: "", uniqness: ""}}],
    "DynamicTable": [{ Root: { path: "", type: "", uniqness: ""}, Header: { path: "", type: "", uniqness: ""},RowHeader: { path: "", type: "", uniqness: ""}, Cell: { path: "", type: "", uniqness: ""},
    Column: { path: "", type: "", uniqness: ""}, Row: { path: "", type: "", uniqness: ""}, Footer: { path: "", type: "", uniqness: ""}}],
    "Pagination": [{ Next: { path: "", type: "", uniqness: ""}, Previous: { path: "", type: "", uniqness: ""},First: { path: "", type: "", uniqness: ""}, Last: { path: "", type: "", uniqness: ""},
    Page: { path: "", type: "", uniqness: ""}}],
    "Popup": [{ Ok: { path: "", type: "", uniqness: ""}, Cancel: { path: "", type: "", uniqness: ""},Close: { path: "", type: "", uniqness: ""}}],
    "Yes/NoDialog": [{ Yes: { path: "", type: "", uniqness: ""}, No: { path: "", type: "", uniqness: ""},Close: { path: "", type: "", uniqness: ""}}],
    "Alert": [{ Ok: { path: "", type: "", uniqness: ""}, Close: { path: "", type: "", uniqness: ""}}],
    "Search": [{ Value: { path: "", type: "", uniqness: ""}, SearchButton: { path: "", type: "", uniqness: ""}, Suggestions: { path: "", type: "", uniqness: ""}}],
    "ListOfElements": [{ Locator: { path: "", type: "", uniqness: ""}, ListItems: { path: "", type: "", uniqness: ""}}]
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

export { Elements, Locators, ElementFields, HeaderTypes, Rules};