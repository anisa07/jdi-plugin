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
        let result = objCopy.sections.map((section) => {
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
        objCopy.sections = result;

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
                if (option === 'ADD'){
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

function sectionIsUsed(arr, elId, pageId) {
    let found = false;
    for (let i = 0; i < arr.length; i++) {
        found = arr[i].elements.find((element) => element.elId === elId && pageId !== arr[i].pageId)
        if (!!found) {
            return !!found;
        }
    }
    return found;
}

function removeFromSection(arr, elId) {
    let index = arr.findIndex((section) => section.elId === elId);
    if (index > -1) {
        let result = arr.slice();
        result.splice(index, 1);
        return result;
    } else {
        return arr;
    }
}

function delEl(arr, id) {
    return arr.filter((el) => el.elId !== id);
}

function removeChildrenFromElementsArr (objCopy, childrenArr) {
    for (let i = 0; i < objCopy.PageObjects.length; i++) {
        let page = objCopy.PageObjects[i];
        let newArr = page.elements.slice();
        for (let j = 0; j < childrenArr.length; j++) {
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

    if(!!objCopy.sections.get(elId)){
        element = objCopy.sections.get(elId)
        let children = element.children;
        objCopy = removeChildrenFromElementsArr(objCopy, children); 
    } else {
        element = findElement(elId, elementsArray);
    }
    parent = element.parentId;

    if (!!parent){
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


export let editElement = (mainObj, elField, value) => {
    let objCopy = Object.assign({}, mainObj);
    let composites = Object.keys(objCopy.CompositeRules);

    if (value.length || typeof value === "boolean") {
        let pageId = objCopy.activeTabPageId;
        let elementsArray = findPage(pageId, objCopy.PageObjects).elements;
        let selectedElement = objCopy.selectedElement;
        let typesMap = objCopy.ElementFields;

        if (elField[0] === "Type") {
            if (!composites.includes(value)) {
                let item = -1;
                for (let i = 0; i < objCopy.sections.length; i++) {
                    if (objCopy.sections[i].elId === selectedElement.elId) {
                        item = i;
                    }
                }
                if (item > -1) {
                    let r = objCopy.sections.slice();
                    r.splice(item, 1);
                    objCopy.sections = r;
                }
            }

            // if (composites.includes(value)) {
            //     let found = sectionIsUsed(objCopy.PageObjects, selectedElement.elI, pageId);
            //     if (!found) {
            //         objCopy.sections = removeFromSection(objCopy.sections, selectedElement.elId);
            //     }
            // }

            if (selectedElement.children) {
                let l = selectedElement.children.length;
                for (let k = 0; k < l; k++) {
                    elementsArray = elementsArray.filter((el) => {
                        if (el.elId !== selectedElement.children[k].elId) {
                            return el;
                        }
                    })
                }
            }
            let commonFields = {
                "Name": selectedElement.Name,
                "Type": selectedElement.Type,
                "parent": selectedElement.parent,
                "parentId": selectedElement.parentId,
                "elId": selectedElement.elId
            };
            selectedElement = {};
            let fields = typesMap.get(value);
            for (let field in fields) {
                if (fields[field] === "ComboBoxTextField") {
                    let n = {
                        "path": "",
                        "type": ""
                    }
                    selectedElement[field] = n;
                }
                if (fields[field] === "Checkbox") {
                    selectedElement[field] = false;
                }
                if (fields[field] === "TextField") {
                    selectedElement[field] = "";
                }
                if (fields[field] === "ComboBox") {
                    selectedElement[field] = "";
                }
                if (fields[field] === "internal") {
                    selectedElement[field] = false;
                    if (field === "isSection") {
                        selectedElement[field] = true;
                    }
                }
                if (field === "Name") {
                    selectedElement.Name = commonFields.Name
                }
                if (field === "parent") {
                    selectedElement.parent = commonFields.parent
                }
                if (field === "parentId") {
                    selectedElement.parentId = commonFields.parentId
                }
                if (field === "elId") {
                    selectedElement.elId = commonFields.elId
                }
            }
            selectedElement.children = [];
        }

        if (elField.length > 1) {
            selectedElement[elField[0]][elField[1]] = value;
        } else {
            selectedElement[elField[0]] = value;
        }

        elementsArray = elementsArray.map((element) => {
            if (element.elId === selectedElement.elId) {
                //section changes type
                if (composites.includes(value) && elField[0] === "Type") {
                    console.log("1")
                    let newId = genRand("El");
                    let result = objCopy.sections.map((section) => {
                        if (section.elId === selectedElement.parentId) {
                            for (let i = 0; i < section.children.length; i++) {
                                let child = section.children[i];
                                if (child.elId === selectedElement.elId) {
                                    child = selectedElement;
                                    child.elId = newId;
                                }
                            }
                        }
                        return section;
                    })
                    objCopy.sections = result;
                    for (let i = 0; i < objCopy.PageObjects.length; i++) {
                        let page = objCopy.PageObjects[i];
                        let r = page.elements.map((e) => {
                            if (e.elId === selectedElement.elId) {
                                e = selectedElement;
                                e.elId = newId;
                            }
                            return e;
                        });
                        page.elements = r;
                    }
                    selectedElement.elId = newId;
                    element = selectedElement;
                    objCopy.sections.push(selectedElement);
                }
                //section changes some property
                if (composites.includes(selectedElement.Type) && elField[0] !== "Type") {
                    let result = objCopy.sections.map((section) => {
                        if (section.elId === selectedElement.parentId) {
                            for (let i = 0; i < section.children.length; i++) {
                                let child = section.children[i];
                                if (child.elId === selectedElement.elId) {
                                    child = selectedElement;
                                }
                            }
                        }
                        if (section.elId === selectedElement.elId) {
                            return section = element;
                        } else {
                            return section;
                        }
                    })
                    objCopy.sections = result;
                    let r;
                    for (let i = 0; i < objCopy.PageObjects.length; i++) {
                        r = objCopy.PageObjects[i].elements.map((e) => {
                            if (e.elId === selectedElement.elId) {
                                return e = element;
                            }
                        })
                    }
                }
                //any element changes any property 
                if (!composites.includes(selectedElement.Type)) {
                    element = selectedElement;
                    if (selectedElement.parentId !== null) {
                        let result = objCopy.sections.map((section) => {
                            if (section.elId === selectedElement.parentId) {
                                for (let i = 0; i < section.children.length; i++) {
                                    let child = section.children[i];
                                    if (child.elId === selectedElement.elId) {
                                        child = selectedElement;
                                    }
                                }
                            }
                            return section;
                        });
                        objCopy.sections = result;
                    }

                    for (let i = 0; i < objCopy.PageObjects.length; i++) {
                        let page = objCopy.PageObjects[i];
                        let r = page.elements.map((e) => {
                            if (e.elId === selectedElement.elId) {
                                e = selectedElement;
                            }
                            return e;
                        });
                        page.elements = r;
                    }
                }
            }
            return element;
        });


        objCopy.PageObjects.map((page) => {
            if (pageId === page.pageId) {
                page.elements = elementsArray;
            }
            return page
        });


        map = drawMap(elementsArray, new Map());
        resTree = getChildren(map, null);
        objCopy.resultTree = resTree;
        objCopy.pageMap = map;
        objCopy.selectedElement = selectedElement;
    }
    return objCopy;
};


export let generateElements = (mainObj) => {
    return genEl(mainObj);
}