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
    "elements": []
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
    searchedPages: fakeTabPages.slice()
}


export {fakeTabPages,fakeState}