import { getChildren, drawMap, searchElement } from '../functional parts/tree';
import { findPage, findElement } from '../functional parts/common';

let map = new Map();
let resTree = [];
let genRand = (name) => {
    return (name + (Math.floor(Math.random() * (1000 - 1)) + 1) + (Math.floor(Math.random() * (1000 - 1)) + 1));
}

export let showPage = (mainObj, id) => {
    let pageElements = findPage(id, mainObj.PageObjects).elements;
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
    let copyPageObjectsArray = findPage(pageId, objCopy.PageObjects).elements;
    
    treeData.forEach((el) => {
        el.parent = null;
    })
   
    function check(nodeArr) {
        let result = [];
        for (let k = 0; k < nodeArr.length; k++) {
            let m = [];
            let children = [];
            if (nodeArr[k].children.length) {
                let newParentId = nodeArr[k].elId;
                let newParent = nodeArr[k].name;
                children = nodeArr[k].children;
                children.forEach((el) => {
                    el.parentId = newParentId;
                    el.parent = newParent;
                })
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

export let addElement = (mainObj, element) => {
    let objCopy = Object.assign({}, mainObj);
    let pageId = objCopy.activeTabPageId;
    let elementsArray = findPage(pageId, objCopy.PageObjects).elements;
    let parent = null;
    if (element.parentId !== null){
        parent  = elementsArray.find((el)=>{
            if (el.elId === element.parentId){
                return el;
            }
        });
        elementsArray.map((el) => {
            if (el.elId === parent.elId) {
                return el.expanded = true;
            }
        });
    } 
      
    element.parent = parent;  
    element.name = genRand("Element");
    element.elId = genRand("El");
    
    elementsArray.push(element);
    map = drawMap(elementsArray, new Map());
    objCopy.pageMap = map
    objCopy.resultTree = getChildren(map, null);
    return objCopy;
}

export let deleteElement = (mainObj, elId) => {
    function del(arr, id) {
        return arr.filter((el) => {
            if (el.elId !== id){
                return el;
            } 
        })
    }
    let objCopy = Object.assign({}, mainObj);
    let pageId = objCopy.activeTabPageId;
    let elementsArray = findPage(pageId, objCopy.PageObjects).elements;
    let element = findElement(elId, elementsArray);
    let newArr = del(elementsArray, elId);
   
    if (element.children && element.children.length){
       let children = element.children;
       children.forEach((child) => {
           newArr = del(newArr, child.elId);
       });
    }

    map = drawMap(newArr, new Map());
    resTree = getChildren(map, null);

    objCopy.PageObjects.map((page)=>{
        if (pageId === page.pageId){
            page.elements = newArr;
        }
        return page
    })
    
    objCopy.pageMap = map;
    objCopy.resultTree = resTree;

    return objCopy;
}

export let selectElement = (mainObj, elId) => {
    let objCopy = Object.assign({}, mainObj);
    let pageId = objCopy.activeTabPageId;
    let elementsArray = findPage(pageId, objCopy.PageObjects).elements;
    let element = findElement(elId, elementsArray);
    objCopy.selectedElement = element;
    return objCopy;
}

export let searchEl = (mainObj,elName) => {
    console.log(elName)
    let objCopy = Object.assign({}, mainObj);
    let pageId = objCopy.activeTabPageId;
    let elementsArray = findPage(pageId, objCopy.PageObjects).elements;

    if (elName === "" || elName.replace(/\s/g, "") === "") {
        map = drawMap(elementsArray, new Map());
        resTree = getChildren(map, null);
    } else {
        let res = searchElement(elName, elementsArray);
        console.log(res)
        map = drawMap(res, new Map());
        resTree = getChildren(map, null);
    }

    

    objCopy.resultTree = resTree;
    objCopy.pageMap = map;

    return objCopy;
}




//     searchElement(e) {
//         let element = e.target.value.toLowerCase();
//         let pages = this.state.tabPages.slice();
//         let activeTabPage = this.state.activeTabPageId;
//         let pageElements = pages.find((page) => {
//             return page.pageId === activeTabPage
//         }).elements;
//         let map = new Map();
//         let resTree = [];
//         if (element === "" || element.replace(/\s/g, "") === "") {
//             map = drawMap(pageElements, new Map());
//             resTree = getChildren(map, null);
//         } else {
//             let res = searchElement(element, pageElements);
//             map = drawMap(res, new Map());
//             resTree = getChildren(map, null);
//         }
//         this.setState({
//             tabPages: pages,
//             resultTree: resTree,
//             pageMap: map
//         })
//     }


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