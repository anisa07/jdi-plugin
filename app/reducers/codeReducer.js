import { commonFields } from '../data/settings';
import { saveAs } from 'file-saver';
import JSZip from '../libs/jszip/dist/jszip';
import { PageObjectJSON, SiteInfoJSON } from '../data/pageObject';

export let showCode = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);
    objCopy.CodeDetails = true;
    let page = objCopy.PageObjects.find((page) => {
        if (page.pageId === objCopy.activeTabPageId) {
            return page;
        }
    });
    let el = objCopy.selectedElement;
	let pack = objCopy.SiteInfo.pack;
	switch (el.Type) {
		case "Section": 
			objCopy.code = sectionCode(pack, el, objCopy);
			break;
		case "Form": 
			objCopy.code = formCode(pack, el, objCopy, el.Name.slice(0,-4) + "s");
			break;
		default: objCopy.code = "Unknown section type. Only Forms and Sections are supported";
	}
    return objCopy;
}

function varName(name) {
	return name[0].toLowerCase() + name.slice(1);
}
function className(name) {
	let words = name.split(/\W/);
	return words.map(word => word[0].toUpperCase() + word.slice(1)).join('');
}
function poName(name, poName) {
	let result = className(name);
	if (result.length > 4 && result.substr(-4).toLowerCase() !== poName.toLowerCase())
		result += poName;
	return result;
}
function getSiteName(name) {
	return poName(name, "Site");
}
function getPageName(name) {
	return poName(name, "Page");
}
function locatorType(locator) {
	return locator.indexOf('/') !== 1 ? "Css" : "XPath";
}
function simpleCode(locatorType, locator, elType, name) {
	return elementCode(locatorType, `"${locator}"`, elType, name)
}
function elementCode(locatorType, locator, elType, name) {
	return `	@${locatorType}(${locator}) public ${elType} ${varName(name)};
`;
}
function pageElementCode(page, pageName) {
	return `	@JPage(url = "${page.url}", title = "${page.title}") 
	public static ${getPageName(pageName)} ${varName(pageName)};
`;
};
function findByCode(el) {
	let locator = el.Locator;
	let name = el.Name;
	return elementCode("FindBy", `${locatorType(locator).toLowerCase()} ="${locator}"`, "WebElement", name);
}
function complexLocators(el, fields) {
	let locators = [];
	for (let field in fields) {
		let locator = el[field];
		if (locator !== "") {
			locators.push(`${field.toLowerCase()} = @FindBy(${locatorType(locator).toLowerCase()} ="${locator}")`);
		}
	}
	return locators.join(",\n\t\t\t") + "\n\t";
}

function getFields(obj) {
	let clone = Object.assign({}, obj);
	for (let field in commonFields) {
		delete clone[field];
	}
	return clone;
}

function isSimple(el, fields) {
	let count = 0;;
	for (let field in fields) {
		if (el[field] !== "") count ++;
	}
	return count === 1;
}

function genEntities(parentId, arrOfElements, objCopy) {
	return arrOfElements
		.filter(el => el.parentId === parentId && objCopy.SimpleRules[el.Type] && el.Type != "Button")
		.map(el => `public String ${varName(el.Name)};`).join('\n\t');
}
function getElement(el, objCopy) {
	return typeof el === 'string' ? objCopy.sections.get(el) : el;
}

function genCodeOfElements(parentId, arrOfElements, objCopy) {
    let result = '';
    for (let i = 0; i < arrOfElements.length; i++) {
		let el = getElement(arrOfElements[i], objCopy);
        if (el.parentId === parentId && (!!el.Locator || !!el.Root)) {
            if (!!objCopy.CompositeRules[el.Type]) {
                result += simpleCode(locatorType(el.Locator), el.Locator, className(el.Name), el.Name);				
            }
            if (!!objCopy.ComplexRules[el.Type]) {				
				let fields = getFields(objCopy.ElementFields[el.Type]);
				result += isSimple(el, fields)
					 ? simpleCode(locatorType(el.Root), el.Root, el.Type, el.Name)
					 : elementCode("J" + el.Type, complexLocators(el, fields), el.Type, el.Name);
            }
            if (!!objCopy.SimpleRules[el.Type]) {
                result += simpleCode(locatorType(el.Locator), el.Locator, el.Type, el.Name);
            }
        }
    }
    return result;
}

function commonImport() {
    return `import com.epam.jdi.uitests.web.selenium.elements.common.*;
import com.epam.jdi.uitests.web.selenium.elements.complex.*;
import com.epam.jdi.uitests.web.selenium.elements.composite.*;
import com.epam.jdi.uitests.web.selenium.elements.composite.WebPage;
import com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.objects.*;
import com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.simple.*;
import com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.FindBy;`;
}

function sectionCode(pack, el, objCopy) {
	let name = el.Name;
	let code = genCodeOfElements(el.elId, el.children, objCopy);
	return `package ${pack}.sections;

${commonImport()}

public class ${name} extends Section {
${code}
}`;
}

function formCode(pack, el, objCopy, entityName) {	
	let name = el.Name;
	let code = genCodeOfElements(el.elId, el.children, objCopy);
	return `package ${pack}.sections;

${commonImport()}
import ${pack}.entities.*;

public class ${name} extends Form<${entityName}> {
${code}
}`;
}

function entityCode(pack, section, objCopy, entityName) {
	return `package ${pack}.entities;

import com.epam.jdi.tools.DataClass;

public class ${entityName} extends DataClass<${entityName}> {
	${genEntities(section.elId, section.children, objCopy)}
}`;
}

function siteCode(pack, domain, name, code) {
	return `package ${pack};
import ${pack}.pages.*;
import com.epam.jdi.uitests.web.selenium.elements.composite.WebSite;
import com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.*;

@JSite("${domain}")
public class ${name} extends WebSite {
${code}
}`;
}

function genCodeOfWEBElements(arrOfElements) {
    return arrOfElements.join(el => `{findByCode(el);`);
}

function pageCode(pack, page, objCopy) {
    let pageName = getPageName(page.name);
	return `package ${pack}.pages;

${commonImport()}
import ${pack}.sections.*;

public class ${pageName} extends WebPage {
${genCodeOfElements(null, page.elements, objCopy)}
}`;
}
function seleniumPageCode(pack, page) {
    let pageName = getPageName(page.name);
	return `package ${pack}.pages;' +
import com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.FindBy;
import org.openqa.selenium.WebElement;

public class ${pageName} {
${genCodeOfWEBElements(page.elements)}
}`;
}

function genPageCode(page, pack, objCopy) {
    let pageName = getPageName(page.name);
    return objCopy.JDI ? pageCode(pack, page, objCopy) : seleniumPageCode(pack, page);
}

function getActivePage(objCopy) {
	return objCopy.PageObjects.find((page) => {
            if (page.pageId === objCopy.activeTabPageId) {
                return page;
            }
        });
}

export let genCode = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);
    objCopy.CodeDetails = true;
    objCopy.selectedElement = '';
    objCopy.code = genPageCode(getActivePage(objCopy), objCopy.SiteInfo.pack, objCopy);
    return objCopy;
}

export let downloadCode = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);

    let objToSave = {
        content: objCopy.code,
        name: !!objCopy.selectedElement
			? objCopy.selectedElement.Name + '.java'
			: getPageName(getActivePage(objCopy).name) + '.java'
    }
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
function hasPages(objCopy) {	
    let siteHostName = objCopy.SiteInfo.hostName.split(/\W/);
	return objCopy.PageObjects.some(el => el.elements.length > 0 && siteHostName);
}

export let zipAllCode = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);
    let zip = new JSZip();	
	let pack = objCopy.SiteInfo.pack;
	let siteName = getSiteName(objCopy.SiteInfo.siteTitle);
	let sitePagesCode = "";	
    if (hasPages(objCopy)) {
        let pages = objCopy.PageObjects;
        pages.forEach(page=> {
            let pageName = getPageName(page.name);
			sitePagesCode += pageElementCode(page, pageName);
            zip.folder("pages").file(pageName + ".java", genPageCode(page, pack, objCopy));
        });
	
        objCopy.sections.forEach(section => {
			switch (section.Type) {
				case "Section": 
					zip.folder("sections").file(className(section.Name) + ".java", 
						sectionCode(pack, section, objCopy));
					break;
				case "Form": 
					let entityName = section.Name.slice(0,-4) + "s";
					zip.folder("sections").file(className(section.Name) + ".java", 
						formCode(pack, section, objCopy, entityName));	
					zip.folder("entities").file(entityName + ".java", 
						entityCode(pack, section, objCopy, entityName));
					break;
			};
        });
    };
	zip.file(siteName + '.java', 
		siteCode(pack, objCopy.SiteInfo.origin, siteName, sitePagesCode)); 
	zip.generateAsync({ type: "blob" }).then(
		function (content) {
			saveAs(content, "pageobject.zip");
		}
	);
    return objCopy;
}

