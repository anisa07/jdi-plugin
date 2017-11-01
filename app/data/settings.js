let Elements = [
    "Button", "Checkbox", "Image", "Label", "Link", "Text", "TextField", "Input", "TextArea", "DataPicker", "FileInput",
    "Section",
    "Form",
    "Selector", "CheckList", "Menu", "RadioButtons", "Tabs", "TextList", "Chat",
    "Combobox", "Dropdown", "DropList",
    "Table", "DynamicTable",
    "Pagination",
    "Popup",
    "Yes/NoDialog",
    "Alert",
    "Search",
    "ListOfElements"
];
let Locators = ["class","css","xpath","id","name","tag","text"];
let HeaderTypes = ["All", "Headers" , "No Headers", "Columns", "Headers", "Rows Headers"];
let ElementFields = new Map();
let commonFields = {
    "Name": "",
    "Type": [],
    "parent": "",
    "parentId": ""
};
ElementFields.set("Button", {"LocatorType": [],"LocatorPath": "", ...commonFields});
ElementFields.set("Image", {"LocatorType": [],"LocatorPath": "", ...commonFields});
ElementFields.set("Checkbox", {"LocatorType": [],"LocatorPath": "", ...commonFields});
ElementFields.set("Label", {"LocatorType": [],"LocatorPath": "", ...commonFields});
ElementFields.set("Link", {"LocatorType": [],"LocatorPath": "", ...commonFields});
ElementFields.set("Text", {"LocatorType": [],"LocatorPath": "", ...commonFields});
ElementFields.set("TextField",{"LocatorType": [],"LocatorPath": "", ...commonFields});
ElementFields.set("Input", {"LocatorType": [],"LocatorPath": "", ...commonFields});
ElementFields.set("TextArea", {"LocatorType": [],"LocatorPath": "", ...commonFields});
ElementFields.set("DataPicker", {"LocatorType": [],"LocatorPath": "", ...commonFields});
ElementFields.set("FileInput", {"LocatorType": [],"LocatorPath": "", ...commonFields});
ElementFields.set("Section", {"LocatorType": [],"LocatorPath": "", ...commonFields, "isSection": true, "expanded": false});
ElementFields.set("Form", {"LocatorType": [],"LocatorPath": "", ...commonFields, "isSection": true, "Entity": "", "expanded": false});
ElementFields.set("Selector", {"LocatorType": [],"LocatorPath": "", ...commonFields, "Enum": ""});
ElementFields.set("CheckList", {"LocatorType": [],"LocatorPath": "", ...commonFields, "Enum": ""});
ElementFields.set("Menu", {"LocatorType": [],"LocatorPath": "", ...commonFields, "Enum": ""});
ElementFields.set("RadioButtons", {"LocatorType": [],"LocatorPath": "", ...commonFields, "Enum": ""});
ElementFields.set("Tabs", {"LocatorType": [],"LocatorPath": "", ...commonFields, "Enum": ""});
ElementFields.set("TextList", {"LocatorType": [],"LocatorPath": "", ...commonFields, "Enum": ""});
ElementFields.set("Chat", {"LocatorType": [],"LocatorPath": "", ...commonFields, "Enum": ""});
ElementFields.set("ComboBox", {"RootType": [],"RootPath": "","ValueType": [],"ValuePath": "",
    "ListType": [],"ListPath": "", "ExpandType": [],"ExpandPath": "", ...commonFields, "Enum": "", });
ElementFields.set("Dropdown", {"RootType": [],"RootPath": "","ValueType": [],"ValuePath": "",
    "ListType": [],"ListPath": "", "ExpandType": [],"ExpandPath": "", ...commonFields, "Enum": "", });
ElementFields.set("Droplist", {"RootType": [],"RootPath": "","ValueType": [],"ValuePath": "",
    "listType": [],"listPath": "", "ExpandType": [],"ExpandPath": "", ...commonFields, "Enum": "", });
ElementFields.set("Table", {"RootType": [],"RootPath": "","Headers": "","RowHeaders": "", "HeaderType": [],"HeaderPath": "",
    "RowHeaderType": [],"RowHeaderPath": "", "CellType": [],"CellPath": "", "ColumnType": [],"ColumnPath": "", "RowType": [],"RowPath": "",
    "FooterType": [],"FooterPath": "",  ...commonFields, "Height": "","Width": "","RowStartIndex": "", "UseCache": true,
    "HeaderType" : []
});
ElementFields.set("DynamicTable", {"RootType": [],"RootPath": "","Headers": "","RowHeaders": "", "HeaderType": [],"HeaderPath": "",
    "RowHeaderType": [],"RowHeaderPath": "", "CellType": [],"CellPath": "", "ColumnType": [],"ColumnPath": "", "RowType": [],"RowPath": "",
    "FooterType": [],"FooterPath": "",  ...commonFields, "Height": "","Width": "","RowStartIndex": "", "UseCache": true,
    "HeaderType" : []
});
ElementFields.set("Pagination", {"NextType": [],"NextPath": "", "PreviousType": [],"PreviousPath": "",
    "FirstType": [],"FirstPath": "", "LastType": [],"LastPath": "", "PageType": [],"PagePath": "", ...commonFields});
ElementFields.set("Popup", {"OkType": [],"OkPath": "", "CancelType": [],"CancelPath": "", "CloseType": [],"ClosePath": "", ...commonFields});
ElementFields.set("Yes/NoDialog", {"YesType": [],"YesPath": "", "NoType": [],"NoPath": "", "CloseType": [],"ClosePath": "", ...commonFields});
ElementFields.set("Alert", {"OkType": [],"OkPath": "", "CloseType": [],"ClosePath": "", ...commonFields});
ElementFields.set("Search", {"ValueType": [],"ValuePath": "", "SearchButtonType": [], "SearchButtonPath": "", "SuggestionsType": [],"SuggestionsPath": "", ...commonFields});
ElementFields.set("ListOfElements", {"LocatorType": [],"LocatorPath": "", "ListItemsTypes": [], "Enum": "", ...commonFields});


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