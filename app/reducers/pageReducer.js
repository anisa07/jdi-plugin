import { getChildren, drawMap, searchElement } from '../functional parts/tree';
import { findPage, findElement } from '../functional parts/common';
import { genEl } from './POgen/genPo';

let map = new Map();
let resTree = [];
export let genRand = (name) => {
    return (name + (Math.floor(Math.random() * (1000 - 1)) + 1) + (Math.floor(Math.random() * (1000 - 1)) + 1));
};

export let showPage = (mainObj, id) => {
    let pageElements = findPage(id, mainObj.PageObjects).elements;
    map = drawMap(pageElements, new Map());
    resTree = getChildren(map, null);
    return Object.assign({}, mainObj, {
        searchElement: "",
        activeTabPageId: id,
        settingsForSite: false,
        resultTree: resTree,
        pageMap: map,
        selectedElement: "",
        rulesSettings: false,
        mainSettings: false,
        selectedRule: '',
        showCode: false,
        ruleId: -1
    })
};

export let changeTree = (mainObj, treeData, droppedItem) => {
    let objCopy = Object.assign({}, mainObj);
    let pageId = objCopy.activeTabPageId;
    let copyPageObjectsArray = findPage(pageId, objCopy.PageObjects).elements;

    treeData.forEach((el) => {
        el.parent = null;
    });

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
                });
                m = result.concat(nodeArr[k].children);
                result = m;
            }
        }
        if (result.length) {
            check(result);
        }
    }

    check(treeData);

    if (droppedItem) {
        let element = copyPageObjectsArray.find((e) => e.elId === droppedItem.elId);
        let result = objCopy.sections.get(element.elId);
        if (!!result){
            result.parentId = element.parentId;
            result.parent = element.parent;
            objCopy.sections.set(element.elId, result);
            /*if (!!result.children){
                for (let i = 0; i < result.children.length; i++) {
                    let child = result.children[i];
                    if (child.elId === element.elId) {
                        child.parent = element.parent;
                        child.parentId = element.parentId;
                        break;
                    }
                }    
            }*/
        }
        objCopy.sections.forEach((section, key) => {
            if (!!section.children) {
                let children = section.children;
                for (let i = 0; i < children.length; i++) {
                    let child = children[i];
                    if (child.elId === element.elId) {
                        child.parent = element.parent;
                        child.parentId = element.parentId;
                        break;
                    }
                }
                objCopy.sections.set(key, section);
            }
        })
        /*let result = objCopy.sections.map((section) => {
            if (section.elId === element.elId) {
                section.parentId = element.parentId;
                section.parent = element.parent;
            }
            if (section.children) {
                for (let i = 0; i < section.children.length; i++) {
                    let child = section.children[i];
                    if (child.elId === element.elId) {
                        child.parent = element.parent;
                        child.parentId = element.parentId;
                        break;
                    }
                }
            }
            return section;
        })
        objCopy.sections = result;*/

        let pages = objCopy.PageObjects.map((p) => {
            console.log(p)
            if (p.elements) {
                for (let k = 0; k < p.elements.length; k++) {
                    let e = p.elements[k];
                    console.log(e)
                    if (e.elId === element.elId) {
                        e.parentId = element.parentId;
                        e.parent = element.parent;
                    }
                }
            }
            return p;
        })
        objCopy.PageObjects = pages;
    }

    map = drawMap(copyPageObjectsArray, new Map());

    objCopy.pageMap = map;
    objCopy.resultTree = treeData;

    return objCopy;
};

function updateSections(objCopy, element, option) {
    let sectionId = element.parentId;
    let section = objCopy.sections.get(sectionId);
    for (let i = 0; i < objCopy.PageObjects.length; i++) {
        let page = objCopy.PageObjects[i];
        for (let j = 0; j < page.elements.length; j++) {
            if (page.elements[j].elId === sectionId) {
                page.elements[j] = section;
                if (option === 'ADD') {
                    page.elements.push(element);
                }
                break;
            }
        }
    }
    return objCopy;
}

export let addElement = (mainObj, element) => {
    let objCopy = Object.assign({}, mainObj);
    let pageId = objCopy.activeTabPageId;
    let elementsArray = findPage(pageId, objCopy.PageObjects).elements;
    let parent = null;
    element.Name = genRand("Element");
    element.elId = genRand("El");

    if (element.parentId !== null) {
        parent = elementsArray.find((el) => el.elId === element.parentId);
        //parent.expanded = true;
        element.parent = parent.Name;

        let section = objCopy.sections.get(element.parentId);
        section.children.push(element);
        objCopy.sections.set(element.parentId, section);
        objCopy = updateSections(objCopy, element, "ADD");
    } else {
        element.parent = null;
        elementsArray.push(element);
    }

    map = drawMap(elementsArray, new Map());
    objCopy.pageMap = map;
    objCopy.resultTree = getChildren(map, null);
    return objCopy;
};

function delEl(arr, id) {
    return arr.filter((el) => el.elId !== id);
}

function removeChildrenFromElementsArr(objCopy, childrenArr) {
    for (let i = 0; i < objCopy.PageObjects.length; i++) {
        let page = objCopy.PageObjects[i];
        for (let j = 0; j < childrenArr.length; j++) {
            let newArr = page.elements.slice();
            page.elements = delEl(newArr, childrenArr[j].elId);
        }
    }
    return objCopy;
}

export let deleteElement = (mainObj, elId) => {
    let objCopy = Object.assign({}, mainObj);
    let pageId = objCopy.activeTabPageId;
    let parent, element;
    let elementsArray = findPage(pageId, objCopy.PageObjects).elements;

    if (!!objCopy.sections.get(elId)) {
        element = objCopy.sections.get(elId)
        let children = element.children;
        objCopy = removeChildrenFromElementsArr(objCopy, children);
    } else {
        element = findElement(elId, elementsArray);
    }
    parent = element.parentId;

    if (!!parent) {
        let parentSection = objCopy.sections.get(parent);
        let parentChildren = parentSection.children.slice();
        parentSection.children = delEl(parentChildren, elId);
        objCopy.sections.set(parent, parentSection);
        objCopy = updateSections(objCopy, element);
    }

    objCopy = removeChildrenFromElementsArr(objCopy, [element]);
    elementsArray = findPage(pageId, objCopy.PageObjects).elements;

    map = drawMap(elementsArray, new Map());
    resTree = getChildren(map, null);

    objCopy.PageObjects.map((page) => {
        if (pageId === page.pageId) {
            page.elements = elementsArray;
        }
        return page
    });

    objCopy.pageMap = map;
    objCopy.resultTree = resTree;
    objCopy.selectedElement = "";

    return objCopy;
};

export let selectElement = (mainObj, elId) => {
    let objCopy = Object.assign({}, mainObj);
    let pageId = objCopy.activeTabPageId;
    let elementsArray = findPage(pageId, objCopy.PageObjects).elements;
    let element = findElement(elId, elementsArray);
    objCopy.selectedElement = element;
    objCopy.showCode = false;
    return objCopy;
};

export let searchEl = (mainObj, elName) => {
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
};

function updateParent(objCopy, element) {
    if (!!element.parentId) {
        let parent = objCopy.sections.get(element.parentId);
        for (let j = 0; j < parent.children.length; j++) {
            let child = parent.children[j];
            if (child === element.elId) {
                child = element;
                break;
            }
        }
        objCopy.sections.set(element.parentId, parent);
        objCopy = updateOtherPages(objCopy, parent);
    }
    return objCopy;
}

function updateOtherPages(objCopy, element) {
    for (let i = 0; i < objCopy.PageObjects.length; i++) {
        let elements = objCopy.PageObjects[i].elements;
        for (let j = 0; j < elements.length; j++) {
            if (elements[j].elId === element.elId) {
                elements[j] = element;
                break;
            }
        }
    }
    return objCopy;
}

function createNewElem(objCopy, oldElem){
    let newElem = {
        Name: oldElem.Name,
        parentId: oldElem.parentId,
        parent: oldElem.parent,
        elId: oldElem.elId,
        Type: oldElem.Type,
    }
    let fields = objCopy.ElementFields.get(newElem.Type);
    for (let f in fields) {
        if (!newElem.hasOwnProperty(f)) {
            newElem[f] = "";
        }
    }
    return newElem;
}

export let editElement = (mainObj, elField, value) => {
    let objCopy = Object.assign({}, mainObj);
    let composites = Object.keys(objCopy.CompositeRules);

    if (value.length || typeof value === "boolean") {
        let pageId = objCopy.activeTabPageId;
        let selectedElement = objCopy.selectedElement;

        if (composites.includes(selectedElement.Type)) {
            selectedElement[elField[0]] = value;
            let sec = objCopy.sections.get(selectedElement.elId);
            if (elField[0] === "Type") {
                objCopy = removeChildrenFromElementsArr(objCopy, selectedElement.children);
                if (composites.includes(value)) {
                    sec.children.length = 0;
                    selectedElement.children.length = 0;
                    sec[elField[0]] = value;
                    objCopy.sections.set(selectedElement.elId, sec);
                    objCopy = updateOtherPages(objCopy, sec);
                } else {
                    selectedElement = createNewElem(objCopy, selectedElement);
                    objCopy.sections.delete(selectedElement.elId);
                    for (let j = 0; j < objCopy.PageObjects.length; j++) {
                        if (objCopy.PageObjects[j].pageId !== pageId) {
                            let newArr = objCopy.PageObjects[j].elements.slice();
                            objCopy.PageObjects[j].elements = delEl(newArr, selectedElement.elId);
                        } else {
                            let elements = objCopy.PageObjects[j].elements;
                            for (let i = 0; i < elements.length; i++) {
                                if (elements[i].elId === selectedElement.elId) {
                                    elements[i] = selectedElement;
                                    break;
                                }
                            }
                        }
                    }
                }
            } else {
                sec[elField[0]] = value;
                objCopy.sections.set(selectedElement.elId, sec);
                objCopy = updateOtherPages(objCopy, sec);
            }
            //ordinary component    
        } else {
            selectedElement[elField[0]] = value;
            if (elField[0] === "Type") {
                selectedElement = createNewElem(objCopy, selectedElement);
                if (composites.includes(value)) {
                    selectedElement.children = [];
                    objCopy.sections.set(selectedElement.elId, selectedElement);
                    objCopy = updateOtherPages(objCopy, selectedElement);
                } else {
                    objCopy = updateOtherPages(objCopy, selectedElement);
                }
            } else {
                objCopy = updateOtherPages(objCopy, selectedElement);        
            }
        }
        objCopy = updateParent(objCopy, selectedElement);
        map = drawMap(findPage(pageId, objCopy.PageObjects).elements, new Map());
        resTree = getChildren(map, null);
        objCopy.resultTree = resTree;
        objCopy.pageMap = map;
    }
    return objCopy;
};


export let generateElements = (mainObj) => {
    return genEl(mainObj);
}