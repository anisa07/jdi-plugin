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

export let changeTree = (mainObj, treeData) => {
    let objCopy = Object.assign({}, mainObj);
    let pageId = objCopy.activeTabPageId;
    let copyPageObjectsArray = objCopy.PageObjects.find((page) => {
        if (page.pageId === pageId) {
            return page
        }
    }).elements;
    
    treeData.forEach((el) => {
        el.parent = null;
    })
    function check(nodeArr) {
        let result = [];
        for (let k = 0; k < nodeArr.length; k++) {
            let m = [];
            let children = [];
            if (nodeArr[k].children.length) {
                //!!! no parent but parentId, id instead of name SOON
                let newParent = nodeArr[k].name;
                children = nodeArr[k].children;
                children.forEach((el) => {
                    el.parent = newParent;
                })
                //!!!
                m = result.concat(nodeArr[k].children);
                result = m;
            }
        }
        if (result.length) {
            check(result);
        }
    }
    check(treeData);

    map = drawMap(copyPageObjectsArray, new Map());

    objCopy.pageMap = map;
    objCopy.resultTree = treeData;
    
    return objCopy;
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