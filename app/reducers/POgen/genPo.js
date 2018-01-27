import { genRand } from '../pageReducer';
import { getChildren, drawMap, searchElement } from '../../functional parts/tree';
import { relative } from 'path';
import cssToXpath from '../../../cssToXpath/cssToXPath';

let map = new Map();
let resTree = [];

export let genEl = (objCopy) => {
    let results = [];
    let otherElements = [];
    let relatives = new Map();
    let domParent = [];
    let unique = ["classList", "id", "name", "value", "alt", "title", "text", "className"];
    let page = objCopy.PageObjects.find((page) => {
        if (page.pageId === objCopy.activeTabPageId) {
            return page
        }
    })
    let warningLog = "";

    let composites = Object.keys(objCopy.CompositeRules);
    let complex = Object.keys(objCopy.ComplexRules);
    let simple = Object.keys(objCopy.SimpleRules);

    page.elements = [];
    objCopy.sections.clear();

    chrome.devtools.inspectedWindow.eval('document.location', (r, err) => {
        page.url = r.pathname;
        objCopy.SiteInfo.hostName = r.hostname;
        page.title = r.pathname.split("/").pop().replace(/\.html|\.htm/, '');
        objCopy.SiteInfo.origin = r.origin;
    });

    chrome.devtools.inspectedWindow.eval('document.domain', (r, err) => {
        if (r !== objCopy.SiteInfo.domainName && r !== "") {
            objCopy.SiteInfo.domainName = r;
        }
    });

    chrome.devtools.inspectedWindow.eval('document.title', (r, err) => {
        if (r !== objCopy.SiteInfo.siteTitle && r !== "") {
            objCopy.SiteInfo.siteTitle = r;
            page.name = r;
        }
    });

    chrome.devtools.inspectedWindow.eval(
        'document.body.outerHTML', (r, err) => {
            if (err) {
                alert('Error, loading data from active page!');
            }

            let parser = new DOMParser();
            let observedDOM = parser.parseFromString(r, "text/html").body;
            let copyOfDom = parser.parseFromString(r, "text/html").body;

            let addToLog = (str) => {
                warningLog += str;
            }

            let getComposite = (dom, t) => {
                let rules = objCopy.Rules[t];
                rules.forEach((rule, i) => {
                    if (!!rule.Locator) {
                        defineElements(dom, rule.Locator, rule.uniqness, t, rule.id);
                    }
                })

                for (let k = 0; k < results.length; k++) {
                    let child = results[k];
                    for (let j = 0; j < results.length; j++) {
                        parent = results[j];
                        let r = getElements(parent.content, child.Locator).elements;
                        for (let i = 0; i < r.length; i++) {
                            if (r.results[i] === child.content) {
                                let v = relatives.get(child.elId);
                                relatives.set(child.elId, ++v);
                            }
                        }
                    }
                }

                for (let k = 0; k < results.length; k++) {
                    let child = results[k];
                    for (let j = 0; j < results.length; j++) {
                        parent = results[j];
                        let r = getElements(parent.content, child.Locator).elements;
                        for (let i = 0; i < r.length; i++) {
                            if (r.results[i] === child.content) {
                                let c = relatives.get(child.elId);
                                let p = relatives.get(parent.elId);
                                if (c - p === 1) {
                                    child.parent = parent.Type;
                                    child.parentId = parent.elId;
                                }
                            }
                        }
                    }
                }
            }

            let getComplex = (parent, t) => {
                let dom = parent.content;
                let rules = objCopy.Rules[t];
                rules.forEach((rule) => {
                    if (!!rule.Root) {
                        defineElements(dom, rule.Root, rule.uniqness, t, rule.id, parent)
                    }
                })
            }

            let getSimple = (parent, t) => {
                let dom = parent.content;
                let rules = objCopy.Rules[t];
                rules.forEach((rule, i) => {
                    if (!!rule.Locator) {
                        defineElements(dom, rule.Locator, rule.uniqness, t, rule.id, parent);
                    }
                });
            }

            function fillEl(e, t, parent, ruleId) {
                let result = { ...e, Type: t, elId: genRand('El') }
                if (composites.includes(t)) {
                    result.parent = null;
                    result.parentId = null;
                    results.push(result);
                } else {
                    result.parentId = parent.elId;
                    result.parent = parent.Name;
                    applyFoundResult(result, parent, ruleId);
                }
            }

            function defineElements(dom, Locator, uniq, t, ruleId, parent) {
                let splitUniqness = uniq.split("#");
                let uniqness = {
                    locator: splitUniqness.length == 2 ? splitUniqness[0] : "",
                    value: splitUniqness.length == 2 ? splitUniqness[1] : uniq
                }
                let firstSearch = searchByWithoutValue(dom, Locator, uniqness);
                let xpath = firstSearch.locatorType.xpath;
                let elements = firstSearch.elements;
                if (elements.length === 0) { return; };
                if (elements.length === 1) {
                    let e = {
                        Locator: firstSearch.locatorType.locator,
                        content: elements[0],
                        Name: nameElement(firstSearch.locatorType.locator, uniq, '', elements[0]),
                    }
                    fillEl(e, t, parent, ruleId);
                };
                if (elements.length > 1) {
                    if (uniqness.value === "tag" || uniqness.value === '[')
                        addToLog(`\nToo much elements found(${elements.length} for ${uniqness.value}. Locator (${firstSearch.locatorType.locator}))`);
                    for (let i = 0; i < elements.length; i++) {
                        let val = getValue(elements[i], uniqness, Locator);
                        let finalLocator = xpath
                            ? valueToXpath(firstSearch.locatorType.locator, uniqness, val)
                            : firstSearch.locatorType.locator + valueToCss(uniqness, val);
                        let s2 = getElements(dom, { locator: finalLocator, xpath: xpath });
                        if (s2.elements.length === 1) {
                            let e = {
                                Locator: finalLocator,
                                content: s2.elements[0],
                                Name: nameElement(finalLocator, uniq, val, s2.elements[0]),
                            }
                            fillEl(e, t, parent, ruleId);
                        } else {
                            addToLog(`\nToo much elements found(${s2.elements.length}. Locator (${finalLocator}))`);
                        }
                    }
                }
            }
            function isXpath(locator) { return locator[1] === '/'; }
            function generateLocator(xpath, locator) {
                return xpath === isXpath(locator) ? locator : cssToXpath(locator);
            }
            function getCorrectLocator(dom, locator, uniqness) {
                let results = {
                    xpath: isXpath(locator) || isXpath(uniqness.locator) || uniqness.value === "text",
                    locator: ""
                };
                results.locator = generateLocator(results.xpath, locator);
                results.locator = results.locator.indexOf('//') === 0 ? '.' + results.locator : results.locator;
                if (uniqness.locator) results.locator += generateLocator(results.xpath, uniqness.locator);
                return results;
            }
            function getElementsByXpath(dom, locator) {
                let results = [];
                let r = document.evaluate(locator, dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                for (let i = 0; i < r.snapshotLength; i++) {
                    results.push(r.snapshotItem(i));
                }
                return results;
            }
            function getElements(dom, locatorType) {
                return {
                    elements: locatorType.xpath ? getElementsByXpath(dom, locatorType.locator) : dom.querySelectorAll(locatorType.locator),
                    locatorType: locatorType
                };
            }

            function searchByWithoutValue(dom, locator, uniqness) {
                let locatorType = getCorrectLocator(dom, locator, uniqness);
                return getElements(dom, locatorType);
            }

            function getValue(content, uniqness, locator) {
                switch (uniqness.value) {
                    case "text": return content.innerText.trim().split(/\n/)[0];
                    case "class": return content.classList.value;
                    default: return content[uniqness];
                }
            }

            let findInParent = (element, parent) => {
                let loc = element.Locator ? "Locator" : "Root";
                //let found = objCopy.sections.find((section) => parent.Locator === section.Locator && parent.Type === section.Type);
                let found, find;
                    objCopy.sections.forEach((value,key) => {
                        if (value.Locator === parent.Locator && value.Type === parent.Type){
                            found = key;
                        }
                    });

                if (found) {
                    let children = objCopy.sections.get(found).children;
                    if (children) {
                        for (let i = 0; i < children; i++) {
                            if (children[i][loc] === element[loc]) {
                                element.elId = children[i].elId;
                                find = true;
                                break;
                            }
                        }
                        if (!find) {
                            children.push(element);
                        }
                    } 
                }
                page.elements.push(element);
            }

            function camelCase(n) {
                let name = "";
                if (n) {
                    let arrayName = n.split(/\W/);
                    for (let j = 0; j < arrayName.length; j++) {
                        if (arrayName[j]) {
                            name += arrayName[j][0].toUpperCase() + arrayName[j].slice(1);
                        }
                    }
                }
                return name;
            }


            function nameElement(locator, uniqness, value, content) {
                if (uniqness === "text" || uniqness.includes("#text")) {
                    return (camelCase(value) || camelCase(content.innerText));
                }
                if (uniqness.includes('tag')) {
                    return camelCase(content.tagName.toLowerCase());
                }
                if (uniqness.indexOf('[') === 0) {
                    return camelCase(locator.replace(/[\.\/\*\[\]@]/g, ''));
                }
                if (uniqness === "class") {
                    return camelCase(content.classList.value);
                }
                return camelCase(content[uniqness]);
            }

            let applyFoundResult = (e, parent, ruleId) => {
                let element = {
                    Name: e.Name || genRand(e.Type),
                    Type: e.Type,
                    parent: e.parent,
                    parentId: e.parentId,
                    elId: e.elId
                }
                if (simple.indexOf(e.Type) > -1) {
                    element.Locator = e.Locator;
                    findInParent(element, parent);
                    return;
                }
                if (complex.indexOf(e.Type) > -1) {
                    let fields = objCopy.ComplexRules[e.Type].find((r) => r.id === ruleId);
                    element.Root = e.Locator;
                    for (let f in fields) {
                        if (!element.hasOwnProperty(f) && f !== "Root") {
                            element[f] = fields[f];
                        }
                    }
                    findInParent(element, parent);
                    return;
                }
                let fields = objCopy.ElementFields.get(e.Type);
                if (composites.indexOf(e.Type) > -1) {
                    console.log('e', element) 
                    element.Locator = e.Locator;
                    element.isSection = true;
                    element.children = [];
                    //let found = objCopy.sections.find((section) => element.Locator === section.Locator && element.Type === section.Type);
                    let found;
                    objCopy.sections.forEach((value) => {
                        if (value.Locator === element.Locator && value.Type === element.Type){
                            found = value;
                        }
                    });
                    if (found) {
                        element = found;
                        page.elements.push(found);
                    } else {
                        for (let f in fields) {
                            if (!element.hasOwnProperty(f)) {
                                element[f] = "";
                            }
                        }
                        //objCopy.sections.push(element);
                        page.elements.push(element);
                        objCopy.sections.set(element.elId, element);
                    }
                    return;
                }
            }

            let valueToXpath = (originalLocator, uniqness, value) => {
                if (!!uniqness.locator) {
                    return createCorrectXpath(originalLocator, uniqness, value, uniqness.locator);
                }
                if (isXpath(uniqness.value)) {
                    return createCorrectXpath(originalLocator, uniqness, value);
                } else {
                    return createCorrectXpath(originalLocator, uniqness.value, value);
                }
            }

            let createCorrectXpath = (originalLocator, uniqness, value, locator) => {
                let result = uniqness === "text" ? `contains(.,'${value/*.split(/\n/)[0]*/}')` : `@${uniqness}='${value}')`;
                if (locator) {
                    return `${originalLocator}${locator}${result}`
                }
                if (originalLocator.indexOf(']') === originalLocator.length - 1) {
                    return `${originalLocator.slice(0, -1)} and ${result}]`
                } else {
                    return `${originalLocator}[${result}]`
                }
            }

            let valueToCss = (uniqness, value) => {
                switch (uniqness.value) {
                    case "class": return `.${value.replace(/\s/g, '.')}`;
                    case "id": return `#${value}`;
                    default: return `[${uniqness.value}='${value}']`
                }
            }

            let search = (dom, locator, xpath) => {
                if (xpath) {
                    return document.evaluate(locator, dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength === 1;
                } else {
                    return document.querySelectorAll(locator).length === 1;
                }
            }

            composites.forEach((rule) => {
                getComposite(observedDOM, rule);
            });

            for (let i = 0; i < results.length; i++) {
                let findParent = results.find(section => section.elId === results[i].parentId && results[i].parentId !== null);
                if (findParent) {
                    if (findParent.children) {
                        findParent.children.push(results[i]);
                    } else {
                        findParent.children = [];
                        findParent.children.push(results[i]);
                    }
                }
            }

            results.push({ Locator: "body", Type: null, content: observedDOM, elId: null, parentId: null });

            for (let i = 0; i < results.length - 1; i++) {
                console.log('results[i]', results[i]);
                applyFoundResult(results[i]);
            }

            for (let i = 0; i < results.length; i++) {
                results[i].content.parentNode.removeChild(results[i].content);
            }

            results.forEach((section) => {
                complex.forEach((rule) => {
                    getComplex(section, rule);
                });
            });

            console.log(page.elements);

            results.forEach((section) => {
                simple.forEach((rule) => {
                    getSimple(section, rule);
                });
            });

            console.log(warningLog)

            document.querySelector("[data-tabid='" + objCopy.activeTabPageId + "']").click();
        }
    );

    map = drawMap(page.elements, new Map());
    objCopy.pageMap = map;
    objCopy.resultTree = getChildren(map, null);

    return objCopy;
}