import { Elements, Locators, ElementFields, HeaderTypes } from '../app/data/settings';

let fakeTabPages = [{
    "url": "",
    "urlHost": "",
    "urlTemplate": "",
    "urlMatch": "Equals",
    "title": "",
    "titleMatch": "Equals",
    "name": "Default Page 1",
    "pageId": 0,
    "package": "",
    "elements": [
        {
            "expanded": false,
            "Name": "",
            "Type": "Button",
            "parent": "",
            "elId": "el123457",
            "parentId": "el123456",
            "Locator": {
                "type": "",
                "path": ""
            }
        }
    ]
},
{
    "url": "",
    "urlHost": "",
    "urlTemplate": "",
    "urlMatch": "Equals",
    "title": "",
    "titleMatch": "Equals",
    "name": "Default Page 2",
    "pageId": 1,
    "package": "",
    "elements": []
}]


let fakeState = {
    PageObjects: fakeTabPages.slice(),
    SiteInfo: {},
    Elements: [],
    Locators: [],
    activeTabPageId: -1,
    settingsForSite: true,
    activePageObject: {},
    resultTree: [],
    pageMap: new Map(),
    selectedElement: "",
    searchedPages: fakeTabPages.slice(),
    ElementFields: ElementFields,
    selectedRule: ''
}


export {fakeTabPages,fakeState}