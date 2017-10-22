
import { getChildren, drawMap, searchElement } from '../functional parts/tree';
let map = new Map();
let resTree = [];


export let showPage = (mainObj, id) => {
    let pageElements = mainObj.PageObjects.find((page) => {
        return page.pageId === id
    }).elements;
    map = drawMap(pageElements, new Map());
    resTree = getChildren(map, null);
    return Object.assign({}, mainObj, {
        searchElement: "",
        activeTabPageId: id,
        settingsForSite: false,
        resultTree: resTree,
        pageMap: map
    })
}

    /*
     PageObjects: PageObjectJSON.slice(),
    SiteInfo: Object.assign({}, SiteInfoJSON),
    Elements: Elements.slice(),
    Locators: Locators.slice(),
    activeTabPageId: -1,
    settingsForSite: true,
    activePageObject: {},
    resultTree: [],
    pageMap: new Map(),
    selectedElement: "",
    searchedPages: PageObjectJSON.slice()
    */