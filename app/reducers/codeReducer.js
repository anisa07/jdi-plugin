import { commonFields } from '../data/settings';
import { saveAs } from 'file-saver';
import JSZip from '../libs/jszip/dist/jszip';
import { PageObjectJSON, SiteInfoJSON } from '../data/pageObject';


function createUpCaseName(name) {
    let result = '';
    let nArr = name.split(/\W/);
    for (let i = 0; i < nArr.length; i++) {
        if (!!nArr[i]) {
            result += nArr[i][0].toUpperCase() + nArr[i].slice(1);
        }
    }
    return result;
}

export let showCode = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);
    objCopy.CodeDetails = true;
    let page = objCopy.PageObjects.find((page) => {
        if (page.pageId === objCopy.activeTabPageId) {
            return page;
        }
    });
    let pack = objCopy.SiteInfo.domainName.split(/\W/).reverse().join('.');

    let el = objCopy.selectedElement;

    function c() {
        return 'package ' + pack + ';\n' + commonImport() +
            '\n\npublic class ' + el.Name + ' extends ' + el.Type + '{' +
            genCodeOfElements(el.elId, page.elements, objCopy) + '\n}'
    }

    objCopy.code = c();

    return objCopy;
}

function commonImport() {
    return `
import com.epam.jdi.uitests.web.selenium.elements.common.*;
import com.epam.jdi.uitests.web.selenium.elements.complex.*;
import com.epam.jdi.uitests.web.selenium.elements.composite.*;
import com.epam.jdi.uitests.web.selenium.elements.composite.WebPage;
import com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.objects.*;
import com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.simple.*;
import org.openqa.selenium.support.FindBy;`
}

function genCodeOfElements(parentId, arrOfElements, objCopy) {
    let result = '';
    for (let i = 0; i < arrOfElements.length; i++) {
        if (arrOfElements[i].parentId === parentId && (!!arrOfElements[i].Locator || !!arrOfElements[i].Root) ) {
            if (objCopy.CompositeRules[arrOfElements[i].Type]) {
                result += '\n\t@' + (arrOfElements[i].Locator.indexOf('/') !== 1 ? 'Css("' : 'XPath("') + arrOfElements[i].Locator + '") public ' +
                    arrOfElements[i].Name + ' ' + arrOfElements[i].Name[0].toLowerCase() + arrOfElements[i].Name.slice(1) + ';'
            }
            if (objCopy.ComplexRules[arrOfElements[i].Type]) {
                let clone = Object.assign({}, objCopy.ElementFields[arrOfElements[i].Type]);
                for (let field in commonFields) {
                    delete clone[field];
                }

                if (arrOfElements[i].hasOwnProperty('Root')) {
                    result += '\n\t@J' + arrOfElements[i].Type + '(' +
                        '\n\t\troot = @FindBy(' + (arrOfElements[i].Root.indexOf('/') !== 1 ? 'css' : 'xpath') + ' ="' + arrOfElements[i].Root + '")';
                    delete clone.Root;
                    for (let field in clone) {
                        if (arrOfElements[i][field]) {
                            result += ',\n\t\t' + field.toLowerCase() + ' = @FindBy(' + (arrOfElements[i][field].indexOf('/') !== 0 ? 'css' : 'xpath') + ' = "' + arrOfElements[i][field] + '")'
                        }
                    }
                }
                result += '\n\t) public ' + arrOfElements[i].Type + ' ' + arrOfElements[i].Name[0].toLowerCase() + arrOfElements[i].Name.slice(1) + ';'
            }
            if (objCopy.SimpleRules[arrOfElements[i].Type]) {
                result += '\n\t@' + (arrOfElements[i].Locator.indexOf('/') !== 1 ? 'Css("' : 'XPath("') + arrOfElements[i].Locator + '") public ' +
                    arrOfElements[i].Type + ' ' + arrOfElements[i].Name[0].toLowerCase() + arrOfElements[i].Name.slice(1) + ';'
            }
        }
    }
    return result;
}

function genCodeOfWEBElements(arrOfElements) {
    let result = '';
    for (let i = 0; i < arrOfElements.length; i++) {
        if (arrOfElements[i].Locator){
            let locator = arrOfElements[i].Locator.indexOf('/') !== 1 ? 'css = "'+ arrOfElements[i].Locator +'"' 
                : 'xpath = "'+ arrOfElements[i].Locator + '"';
            result += '\n\t@FindBy(' + locator + ') public WebElement ' + arrOfElements[i].Name + ';'
        }
    }
    return result;
}

let genPageCode = (page, domainName, objCopy) => {
    let pageName = createUpCaseName(page.name);

    let p = domainName.split(/\W/).reverse().join('.');

    if (objCopy.JDI) {
        return 'package ' + p + '.pages;' +
            '\n\nimport ' + p + '.sections.*;' + commonImport() +
            '\n\npublic class ' + pageName + ' extends WebPage {' +
            genCodeOfElements(null, page.elements, objCopy) + '\n}'
    } else {
        return 'package ' + p + '.pages;' +
            '\n\nimport com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.FindBy;' +
            '\nimport org.openqa.selenium.WebElement;' +
            '\n\npublic class ' + pageName + ' {' +
            genCodeOfWEBElements(page.elements) + '\n}'
    }
}

export let genCode = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);
    let page = objCopy.PageObjects.find((page) => {
        if (page.pageId === objCopy.activeTabPageId) {
            return page;
        }
    })
    objCopy.code = '';
    objCopy.CodeDetails = true;
    objCopy.selectedElement = '';

    objCopy.code = genPageCode(page, objCopy.SiteInfo.domainName, objCopy);

    return objCopy;
}

export let downloadCode = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);

    let objToSave = {
        content: '',
        name: ''
    }

    if (!!objCopy.selectedElement) {
        objToSave.name = objCopy.selectedElement.Name + '.java';
    } else {
        let page = objCopy.PageObjects.find((page) => {
            if (page.pageId === objCopy.activeTabPageId) {
                return page;
            }
        });
        objToSave.name = createUpCaseName(page.name) + '.java'
    }
    objToSave.content = objCopy.code;

    if (objToSave.content && objToSave.name) {
        let blob = new Blob([objToSave.content], { type: "text/plain;charset=utf-8" });
        saveAs(blob, objToSave.name);
    }

    return objCopy;
}

export let switchCodeMode = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);
    objCopy.JDI = !objCopy.JDI;
    objCopy.selectedElement = '';
    objCopy.activeTabPageId = -1;
    objCopy.selectedPage = {};
    objCopy.resultTree = [];
    objCopy.pageMap = new Map();
    objCopy.ElementsDetails = false;
    objCopy.PagesDetails = false;
    objCopy.CodeDetails = false;
    objCopy.RulesDetails = false;
    objCopy.SiteDetails = true;
    objCopy.warningLog = [];
    objCopy.sections = new Map();
    objCopy.PageObjects = [];
    objCopy.SiteInfo = Object.assign({}, SiteInfoJSON);
    objCopy.searchedPages = [];
    return objCopy;
}

export let zipAllCode = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);
    let zip = new JSZip();
    let siteHostName = objCopy.SiteInfo.hostName.split(/\W/);
    let gen = false;
    for (let i = 0; i < objCopy.PageObjects.length; i++) {
        if (objCopy.PageObjects[i].elements.length > 0 && siteHostName) {
            gen = true;
        }
    }
    if (gen) {
        let siteName = "";
        siteHostName[siteHostName.length - 1] = siteHostName.length > 1 ? "Site" : siteHostName[siteHostName.length - 1] + "Site";
        for (let i = 0; i < siteHostName.length; i++) {
            siteName += siteHostName[i][0].toUpperCase() + siteHostName[i].slice(1);
        }
        let pages = objCopy.PageObjects;
        let pageName = "";

        let site = "";

        let pack = objCopy.SiteInfo.domainName.split(/\W/).reverse().join('.');

        site = "package " + pack + ";" +
            "\n\nimport " + pack + ".pages.*;" +
            "\nimport com.epam.jdi.uitests.web.selenium.elements.composite.WebSite;" +
            "\nimport com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.*;" +
            "\n\n@JSite(\"" + objCopy.SiteInfo.origin + "\")" +
            "\npublic class " + siteName + " extends WebSite {";
        for (let i = 0; i < pages.length; i++) {
            pageName = createUpCaseName(pages[i].name);
            site += '\n\t@JPage(url = "' + pages[i].url + '", title = "' + pages[i].title + '")' +
                '\n\tpublic static ' + pageName + " " + (pageName[0].toLowerCase() + pageName.slice(1)) + ';'
        }
        site += "\n}";

        for (let i = 0; i < pages.length; i++) {
            pageName = createUpCaseName(pages[i].name);
            zip.folder("pages").file(pageName + ".java", genPageCode(pages[i], objCopy.SiteInfo.domainName, objCopy));
        }

        objCopy.sections.forEach((section) => {
            let result = "package " + pack + ".sections;" + commonImport();
            result += "\n\npublic class " + section.Name + " extends " + section.Type + "{" +
                genCodeOfElements(section.elId, section.children, objCopy) + "\n}";
            zip.folder("sections").file(section.Name + ".java", result);
        })

        zip.file(siteName + '.java', site);
        zip.generateAsync({ type: "blob" }).then(
            function (content) {
                saveAs(content, "pageobject.zip");
            }
        )
    } 
    return objCopy;
}

