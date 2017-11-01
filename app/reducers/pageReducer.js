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
                let newParent = nodeArr[k].Name;
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
    element.Name = genRand("Element");
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
    objCopy.selectedElement = "";

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
    let objCopy = Object.assign({}, mainObj);
    let pageId = objCopy.activeTabPageId;
    let elementsArray = findPage(pageId, objCopy.PageObjects).elements;

    if (elName === "" || elName.replace(/\s/g, "") === "") {
        map = drawMap(elementsArray, new Map());
        resTree = getChildren(map, null);
    } else {
        let res = searchElement(elName, elementsArray);
        map = drawMap(res, new Map());
        resTree = getChildren(map, null);
    }

    objCopy.resultTree = resTree;
    objCopy.pageMap = map;
    objCopy.selectedElement = "";

    return objCopy;
}

export let editElement = (mainObj, elField, value) =>{
    let objCopy = Object.assign({}, mainObj);
    if (value.length){
        let pageId = objCopy.activeTabPageId;
        let elementsArray = findPage(pageId, objCopy.PageObjects).elements;
        let selectedElement = objCopy.selectedElement;
        let typesMap = objCopy.ElementFields;

        // if (elField.length > 1){
        //     selectedElement[elField[0]][elField[1]] = value;
             elementsArray.map((element)=>{
                if (element.elId === selectedElement.elId){
                    if (Array.isArray(element[elField])){
                        element[elField].pop();
                        element[elField].push(value);
                    } else {
                        element[elField] = value;
                    }
                }
                return element;
            });
        // } else {
        //     selectedElement[elField[0]] = value;
        //     elementsArray.map((element)=>{
        //         if (element.elId === selectedElement.elId){
        //             if (Array.isArray(element[elField[0]])){
        //                 element[elField[0]].push(value);
        //             }
        //             element[elField[0]] = value;
        //         }
        //         return element;
        //     })
        // }

        if (elField === "Type" && (value !== "Section" && value !== "Form")){
            let fields = typesMap.get(value);

            let l = selectedElement.children.length;
            for (let k=0; k<l; k++){
                elementsArray = elementsArray.filter((el)=>{
                    if (el.elId !== selectedElement.children[k].elId){
                        return el;
                    }
                })
            }

            let parent = selectedElement.parent;
            let parentId = selectedElement.parentId;
            let elId = selectedElement.elId;
            let name = selectedElement.Name;
            selectedElement = {};
            selectedElement = {...fields};
            selectedElement.parent = parent;
            selectedElement.parentId = parentId;
            selectedElement.elId = elId;
            selectedElement.Name = name;

        }

        objCopy.PageObjects.map((page)=>{
            if (pageId === page.pageId){
                page.elements = elementsArray;
            }
            return page
        });

        map = drawMap(elementsArray, new Map());
        resTree = getChildren(map, null);
        objCopy.resultTree = resTree;
        objCopy.pageMap = map;
    }
    return objCopy;
}