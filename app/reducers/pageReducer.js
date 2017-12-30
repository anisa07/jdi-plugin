import { getChildren, drawMap, searchElement } from '../functional parts/tree';
import { findPage, findElement } from '../functional parts/common';

let map = new Map();
let resTree = [];
let genRand = (name) => {
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
        ruleId: -1
    })
};

export let changeTree = (mainObj, treeData) => {
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

    map = drawMap(copyPageObjectsArray, new Map());

    objCopy.pageMap = map;
    objCopy.resultTree = treeData;

    return objCopy;
};

export let addElement = (mainObj, element) => {
    let objCopy = Object.assign({}, mainObj);
    let pageId = objCopy.activeTabPageId;
    let elementsArray = findPage(pageId, objCopy.PageObjects).elements;
    let parent = null;
    if (element.parentId !== null) {
        parent = elementsArray.find((el) => {
            if (el.elId === element.parentId) {
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
    objCopy.pageMap = map;
    objCopy.resultTree = getChildren(map, null);
    return objCopy;
};

export let deleteElement = (mainObj, elId) => {
    function del(arr, id) {
        return arr.filter((el) => {
            if (el.elId !== id) {
                return el;
            }
        })
    }

    let objCopy = Object.assign({}, mainObj);
    let pageId = objCopy.activeTabPageId;
    let elementsArray = findPage(pageId, objCopy.PageObjects).elements;
    let element = findElement(elId, elementsArray);
    let newArr = del(elementsArray, elId);

    if (element.children && element.children.length) {
        let children = element.children;
        children.forEach((child) => {
            newArr = del(newArr, child.elId);
        });
    }

    map = drawMap(newArr, new Map());
    resTree = getChildren(map, null);

    objCopy.PageObjects.map((page) => {
        if (pageId === page.pageId) {
            page.elements = newArr;
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

    if (value.length || typeof value === "boolean") {
        let pageId = objCopy.activeTabPageId;
        let elementsArray = findPage(pageId, objCopy.PageObjects).elements;
        let selectedElement = objCopy.selectedElement;
        let typesMap = objCopy.ElementFields;

        if (elField[0] === "Type") {
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
                element = selectedElement
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

//".section", "header", "footer", "#sidebar", "#content"
export let generateElements = (mainObj) => {
    let objCopy = mainObj;
    let result = [];
    //text for xpath
    // //*[@class='test'] -> //*[@class='test' and @id='unique-id']
    // .test -> .test[id=unique]
    let unique = ["className", "id", "name", "value", "alt", "title"];
    let page = objCopy.PageObjects.find((page) => {
        if (page.pageId === objCopy.activeTabPageId) {
            return page
        }
    })

    let composites = ["Section"/*, "Form", "ListOfElements"*/];
    let complex = ["ComboBox", "Dropdown", "Table"];
    let simple = ["Button"];

    chrome.devtools.inspectedWindow.eval(
        'document.body.outerHTML', (r, err) => {
            if (err) {
                alert('Error, loading data from active page!');
            }

            let parser = new DOMParser();
            let observedDOM = parser.parseFromString(r, "text/html").body;

            //let test = document.getElementById("test");
            //test.appendChild(observedDOM)

            //alert (test.outerHTML)

            //alert(observedDOM.body.innerHTML)

            let getComposite = (dom, t) => {
                let rules = objCopy.Rules[t];

                rules.forEach((rule, i) => {
                    observedDOM = search(rule.Locator, t, dom);
                })

            }

            let getComplex = (dom, t, parentLocator) => {
                let rules = objCopy.Rules[t];

                observedDOM = dom;
                rules.forEach((rule, i) => {
                    if (rule.Root) {
                        observedDOM = search(rule.Root, t, observedDOM, parentLocator, rule.id);
                    }
                });
            }

            let getSimple= (dom, t, parentLocator) => {
                let rules = objCopy.Rules[t];
                
                observedDOM = dom;
                rules.forEach((rule, i) => {
                    observedDOM = search(rule.Locator, t, observedDOM, parentLocator, rule.id);
                });
            }

            

            function getElementByXpath(path, dom) {
                return document.evaluate(path, dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            }

            let searchBySelector = (dom, locator) => {
                let e = dom.querySelectorAll(locator);
                if (e != null) {
                    if (e.length == 1) {
                        return 1;
                    }
                    if (e.length > 0) {
                        return 0;
                    }
                }
                return -1;
            }

            let applyResult = (locator, type, content, parentLocator, ruleId) => {
                let fields;
                if (type !== "") {
                    fields = objCopy.ElementFields.get(type);
                }
                if (composites.indexOf(type) > -1) {
                    result.push({ Locator: locator, type: type, content: content });
                    page.elements.push({
                        "expanded": false,
                        "Name": genRand(type),
                        "parent": null,
                        "elId": genRand("El"),
                        "parentId": null,
                        "Locator": locator,
                        "Type": type
                    })
                    for (let f in fields) {
                        if (!page.elements[page.elements.length - 1].hasOwnProperty(f)) {
                            page.elements[page.elements.length - 1][f] = "";
                            if (f === 'isSection') {
                                page.elements[page.elements.length - 1].isSection = true;
                            }
                        }
                    }
                }
                if (complex.indexOf(type) > -1) {
                    page.elements.push({
                        "Name": genRand(type),
                        "elId": genRand("El"),
                        "Root": locator,
                        "Type": type
                    })
                    let rules = objCopy.Rules[type];
                    let r = rules.find((rule) => {
                        if (rule.id === ruleId) {
                            return rule;
                        }
                    })
                    
                    for (let f in r) {
                       if (!page.elements[page.elements.length - 1].hasOwnProperty(f) && f !== 'Root') {
                            page.elements[page.elements.length - 1][f] = r[f];
                        }
                    }

                }
                if (simple.indexOf(type) > -1){
                    page.elements.push({
                        "Name": genRand(type),
                        "elId": genRand("El"),
                        "Locator": locator,
                        "Type": type
                    })
                }
                if ("body" === parentLocator) {
                    page.elements[page.elements.length - 1].parent = null;
                    page.elements[page.elements.length - 1].parentId = null;
                } else {
                    page.elements.find((pElement) => {
                        if (pElement.Locator === parentLocator) {
                            page.elements[page.elements.length - 1].parent = pElement.Name;
                            page.elements[page.elements.length - 1].parentId = pElement.elId;
                        }
                    })
                }

            }

            let createCorrectXpath = (locator, addPart, value) => {
                let i = locator.indexOf(']');
                return locator.slice(0, i) + ' and @' + addPart + '=' + value + locator.slice(i);
            }

            let search = (locator, type, dom, parentLocator, ruleId, locUp) => {
                if (locator.indexOf('/') !== 0) {
                    let res = searchBySelector(dom, locator);
                    let l = "";
                    let locUp = "";
                    if (res === 1) {
                        applyResult(locator, type, dom.querySelector(locator), parentLocator, ruleId);
                        dom = dom.querySelector(locator).parentNode.removeChild(dom.querySelector(locator));
                    }
                    if (res === 0) {
                        let els = dom.querySelectorAll(locator);
                        for (let j = 0; j < els.length; j++) {
                            for (let i = 0; i < unique.length; i++) { 
                                if (els[j][unique[i]]){
                                    if (unique[i] === "className"){
                                        l = locator + '[class="' + els[j][unique[i]] + '"]';
                                    } else {
                                        l = locator + '['+ unique[i] + '="' + els[j][unique[i]] + '"]';
                                    }
                                    res = searchBySelector(dom, l);
                                    if (res === 1) {
                                        applyResult(l, type, dom.querySelector(l), parentLocator, ruleId);
                                        dom = dom.querySelector(locator).parentNode.removeChild(dom.querySelector(locator));
                                        break;
                                    }
                                }    
                            }
                            locUp = dom.querySelectorAll(locator)[j].parentNode; 
                            while (locUp !== dom.parentNode && res === 0) {
                                l = locUp.tagName.toLowerCase() + " " + locator;
                                res = searchBySelector(dom, l);
                                if (res === 1) {
                                    applyResult(l, type, dom.querySelector(l), parentLocator, ruleId);
                                    break;
                                }
                                for (let i = 0; i < unique.length; i++) {
                                    if (locUp[unique[i]]){
                                        if (unique[i] === "className"){
                                            l =  locUp.tagName.toLowerCase() + '[class="' + locUp[unique[i]] + '"] ' + locator;
                                        } else {
                                            l =  locUp.tagName.toLowerCase() + '['+ unique[i] + '="' + locUp[unique[i]] + '"] ' + locator;
                                        }                    
                                        res = searchBySelector(dom, l);
                                        if (res === 1) {
                                            applyResult(l, type, dom.querySelector(l), parentLocator, ruleId);
                                            break;
                                        }
                                        if (res === 0) {
                                            locUp = locUp.parentNode; 
                                        }
                                    }    
                                }
                            }
                        }
                    }
                      //  }
                    //}
                } else {
                    alert("TEST5")
                    let elements = getElementByXpath(locator, dom);
                    let len = elements.snapshotLength;
                    let locUp = "";
                    if (len === 1) {
                        applyResult(locator, type, elements.snapshotItem(0), parentLocator, ruleId);
                        dom = elements.snapshotItem(0).parentNode.removeChild(elements.snapshotItem(0));
                    }
                    if (len > 1) {
                        let e = {};
                        let l = "";
                        for (let i = 0; i < len; i++) {
                            for (let j = 0; j < unique.length; j++) {
                                if (elements.snapshotItem(i)[unique[j]]){
                                    if (unique[j] === "className"){
                                       l = locator + '[@class' + '="' + elements.snapshotItem(i)[unique[j]]+ '"]';     
                                    }else {
                                        l = locator + '[@'+ unique[j] + '="' + elements.snapshotItem(i)[unique[j]]+ '"]';
                                    }
                                    e = getElementByXpath(l, dom);
                                    if (e.snapshotLength === 1) {
                                        applyResult(l, type, e, parentLocator, ruleId);
                                        dom = e.snapshotItem(0).parentNode.removeChild(e.snapshotItem(0));
                                        break;
                                    }        
                                }
                            }
                            locUp = elements.snapshotItem(i).parentNode; 
                            while (locUp !== dom.parentNode && len !== 1) {
                                let l = '//' + locUp.tagName.toLowerCase() + locator.slice(1);
                                let elems = getElementByXpath(l, dom);
                                if (elems.snapshotLength === 1){
                                    len = 1;
                                    applyResult(l, type, elems.snapshotItem(0), parentLocator, ruleId);
                                    break;
                                };
                                for (let i = 0; i < unique.length; i++) {
                                     if (locUp[unique[i]]){
                                        if (unique[i] === "className"){
                                            l = '//' + locUp.tagName.toLowerCase() + '[@class="' + locUp[unique[i]] + '"]/' + locator;
                                        } else {
                                            l = '//' + locUp.tagName.toLowerCase() + '[@'+ unique[i] + '="' + locUp[unique[i]] + '"]/' + locator;
                                        }                    
                                        len = getElementByXpath(l, dom).snapshotLength;
                                        if (len === 1) {
                                            applyResult(l, type, getElementByXpath(l, dom).snapshotItem(0), parentLocator, ruleId);
                                        }
                                        if (len > 0) {
                                            locator = '//' + locUp.tagName.toLowerCase() + '/' + locator;
                                            locUp = locUp.parentNode; 
                                        }
                                    }    
                                }
                            }
                            len = 2;
                        }
                    }
                }
                return dom;
            }
            //}

            composites.forEach((rule) => {
                getComposite(observedDOM, rule);
            })

            result.push({ Locator: "body", type: "", content: observedDOM });

            //alert("COMPLEX")
            result.forEach((res) => {
                complex.forEach((element) => {
                    getComplex(res.content, element, res.Locator)
                })
                
                simple.forEach((element) => {
                    getSimple(res.content, element, res.Locator)
                })
            })


            alert("TEST LAST")
        }
    );

    return objCopy;
}




/*console.log( getElementByXpath("//html[1]/body[1]/div[1]") );*/