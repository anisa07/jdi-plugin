let Elements = [
    "Button",
    //"Checkbox", "Image", "Label", "Link", "Text", "TextField", "Input", "TextArea", "DataPicker", "FileInput",
    // "Section",
     "Form",
    // "Selector", "CheckList", "Menu", "RadioButtons", "Tabs", "TextList", "Chat",
    // "ComboBox", "Dropdown", "DropList",
    // "Table", "DynamicTable",
    // "Pagination",
    // "Popup",
    // "Yes/NoDialog",
    // "Alert",
    // "Search",
    // "ListOfElements"
];
let Locators = ["class","css","xpath","id","name","tag","text"];
let HeaderTypes = ["All", "Headers" , "No Headers", "Columns Headers", "Rows Headers"];
let commonFields = {
    "Name": "TextField",
    "Type": "ComboBox",
    "parent": "internal",
    "parentId": "internal",
    "elId": "internal"
};
let ElementFields = new Map();
ElementFields.set("Button", {...commonFields, "Locator":"ComboBoxTextField"});
ElementFields.set("Image", {"LocatorType": [],"LocatorPath": ""});
ElementFields.set("Checkbox", {"LocatorType": [],"LocatorPath": ""});
ElementFields.set("Label", {"LocatorType": [],"LocatorPath": ""});
ElementFields.set("Link", {"LocatorType": [],"LocatorPath": ""});
ElementFields.set("Text", {"LocatorType": [],"LocatorPath": ""});
ElementFields.set("TextField",{"LocatorType": [],"LocatorPath": ""});
ElementFields.set("Input", {"LocatorType": [],"LocatorPath": ""});
ElementFields.set("TextArea", {"LocatorType": [],"LocatorPath": ""});
ElementFields.set("DataPicker", {"LocatorType": [],"LocatorPath": ""});
ElementFields.set("FileInput", {"LocatorType": [],"LocatorPath": ""});
ElementFields.set("Section", {...commonFields, "Locator":"ComboBoxTextField","isSection":"internal","expanded":"internal"});
ElementFields.set("Form", {...commonFields, "Locator":"ComboBoxTextField","isSection":"internal","Entity":"TextField","expanded":"internal"});

ElementFields.set("Selector", {"LocatorType": [],"LocatorPath": "", "Enum": ""});
ElementFields.set("CheckList", {"LocatorType": [],"LocatorPath": "", "Enum": ""});
ElementFields.set("Menu", {"LocatorType": [],"LocatorPath": "", "Enum": ""});
ElementFields.set("RadioButtons", {"LocatorType": [],"LocatorPath": "", "Enum": ""});
ElementFields.set("Tabs", {"LocatorType": [],"LocatorPath": "", "Enum": ""});
ElementFields.set("TextList", {"LocatorType": [],"LocatorPath": "", "Enum": ""});
ElementFields.set("Chat", {"LocatorType": [],"LocatorPath": "", "Enum": ""});
ElementFields.set("ComboBox", {"RootType": [],"RootPath": "","ValueType": [],"ValuePath": "",
    "ListType": [],"ListPath": "", "ExpandType": [],"ExpandPath": "", "Enum": "", });
ElementFields.set("Dropdown", {"RootType": [],"RootPath": "","ValueType": [],"ValuePath": "",
    "ListType": [],"ListPath": "", "ExpandType": [],"ExpandPath": "", "Enum": "", });
ElementFields.set("Droplist", {"RootType": [],"RootPath": "","ValueType": [],"ValuePath": "",
    "listType": [],"listPath": "", "ExpandType": [],"ExpandPath": "", "Enum": "", });
ElementFields.set("Table", {"RootType": [],"RootPath": "","Headers": "","RowHeaders": "", "HeaderType": [],"HeaderPath": "",
    "RowHeaderType": [],"RowHeaderPath": "", "CellType": [],"CellPath": "", "ColumnType": [],"ColumnPath": "", "RowType": [],"RowPath": "",
    "FooterType": [],"FooterPath": "", "Height": "","Width": "","RowStartIndex": "", "UseCache": true,
    "HeaderTypes" : []
});
ElementFields.set("DynamicTable", {"RootType": [],"RootPath": "","Headers": "","RowHeaders": "", "HeaderType": [],"HeaderPath": "",
    "RowHeaderType": [],"RowHeaderPath": "", "CellType": [],"CellPath": "", "ColumnType": [],"ColumnPath": "", "RowType": [],"RowPath": "",
    "FooterType": [],"FooterPath": "", "Height": "","Width": "","RowStartIndex": "", "UseCache": true,
    "HeaderTypes" : []
});
ElementFields.set("Pagination", {"NextType": [],"NextPath": "", "PreviousType": [],"PreviousPath": "",
    "FirstType": [],"FirstPath": "", "LastType": [],"LastPath": "", "PageType": [],"PagePath": ""});
ElementFields.set("Popup", {"OkType": [],"OkPath": "", "CancelType": [],"CancelPath": "", "CloseType": [],"ClosePath": ""});
ElementFields.set("Yes/NoDialog", {"YesType": [],"YesPath": "", "NoType": [],"NoPath": "", "CloseType": [],"ClosePath": ""});
ElementFields.set("Alert", {"OkType": [],"OkPath": "", "CloseType": [],"ClosePath": ""});
ElementFields.set("Search", {"ValueType": [],"ValuePath": "", "SearchButtonType": [], "SearchButtonPath": "", "SuggestionsType": [],"SuggestionsPath": ""});
ElementFields.set("ListOfElements", {"LocatorType": [],"LocatorPath": "", "ListItemsTypes": [], "Enum": ""});


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

export {Elements, Locators, ElementFields, HeaderTypes};