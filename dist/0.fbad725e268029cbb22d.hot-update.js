webpackHotUpdate(0,{

/***/ "./app/reducers/codeReducer.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.zipAllCode = exports.switchCodeMode = exports.downloadCode = exports.genCode = exports.showCode = undefined;

var _settings = __webpack_require__("./app/data/settings.js");

var _fileSaver = __webpack_require__("./node_modules/file-saver/FileSaver.js");

var _jszip = __webpack_require__("./app/libs/jszip/dist/jszip.js");

var _jszip2 = _interopRequireDefault(_jszip);

var _pageObject = __webpack_require__("./app/data/pageObject.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createUpCaseName(name) {
    var result = '';
    var nArr = name.split(/\W/);
    for (var i = 0; i < nArr.length; i++) {
        if (!!nArr[i]) {
            result += nArr[i][0].toUpperCase() + nArr[i].slice(1);
        }
    }
    return result;
}

var showCode = exports.showCode = function showCode(mainObj) {
    var objCopy = Object.assign({}, mainObj);
    objCopy.CodeDetails = true;
    var page = objCopy.PageObjects.find(function (page) {
        if (page.pageId === objCopy.activeTabPageId) {
            return page;
        }
    });
    var pack = objCopy.SiteInfo.domainName.split(/\W/).reverse().join('.');

    var el = objCopy.selectedElement;

    function c() {
        return 'package ' + pack + ';\n' + commonImport() + '\n\npublic class ' + el.Name + ' extends ' + el.Type + '{' + genCodeOfElements(el.elId, page.elements, objCopy) + '\n}';
    }

    objCopy.code = c();

    return objCopy;
};

function commonImport() {
    return '\nimport com.epam.jdi.uitests.web.selenium.elements.common.*;\nimport com.epam.jdi.uitests.web.selenium.elements.complex.*;\nimport com.epam.jdi.uitests.web.selenium.elements.composite.*;\nimport com.epam.jdi.uitests.web.selenium.elements.composite.WebPage;\nimport com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.objects.*;\nimport com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.simple.*;\nimport org.openqa.selenium.support.FindBy;';
}

function genCodeOfElements(parentId, arrOfElements, objCopy) {
    var result = '';
    for (var i = 0; i < arrOfElements.length; i++) {
        if (arrOfElements[i].parentId === parentId && (!!arrOfElements[i].Locator || !!arrOfElements[i].Root)) {
            if (objCopy.CompositeRules[arrOfElements[i].Type]) {
                result += '\n\t@' + (arrOfElements[i].Locator.indexOf('/') !== 1 ? 'Css("' : 'XPath("') + arrOfElements[i].Locator + '") public ' + arrOfElements[i].Name + ' ' + arrOfElements[i].Name[0].toLowerCase() + arrOfElements[i].Name.slice(1) + ';';
            }
            if (objCopy.ComplexRules[arrOfElements[i].Type]) {
                var clone = Object.assign({}, objCopy.ElementFields[arrOfElements[i].Type]);
                for (var field in _settings.commonFields) {
                    delete clone[field];
                }

                if (arrOfElements[i].hasOwnProperty('Root')) {
                    result += '\n\t@J' + arrOfElements[i].Type + '(' + '\n\t\troot = @FindBy(' + (arrOfElements[i].Root.indexOf('/') !== 1 ? 'css' : 'xpath') + ' ="' + arrOfElements[i].Root + '")';
                    delete clone.Root;
                    for (var _field in clone) {
                        if (arrOfElements[i][_field]) {
                            result += ',\n\t\t' + _field.toLowerCase() + ' = @FindBy(' + (arrOfElements[i][_field].indexOf('/') !== 0 ? 'css' : 'xpath') + ' = "' + arrOfElements[i][_field] + '")';
                        }
                    }
                }
                result += '\n\t) public ' + arrOfElements[i].Type + ' ' + arrOfElements[i].Name[0].toLowerCase() + arrOfElements[i].Name.slice(1) + ';';
            }
            if (objCopy.SimpleRules[arrOfElements[i].Type]) {
                result += '\n\t@' + (arrOfElements[i].Locator.indexOf('/') !== 1 ? 'Css("' : 'XPath("') + arrOfElements[i].Locator + '") public ' + arrOfElements[i].Type + ' ' + arrOfElements[i].Name[0].toLowerCase() + arrOfElements[i].Name.slice(1) + ';';
            }
        }
    }
    return result;
}

function genCodeOfWEBElements(arrOfElements) {
    var result = '';
    for (var i = 0; i < arrOfElements.length; i++) {
        if (arrOfElements[i].Locator) {
            var locator = arrOfElements[i].Locator.indexOf('/') !== 1 ? 'css = "' + arrOfElements[i].Locator + '"' : 'xpath = "' + arrOfElements[i].Locator + '"';
            result += '\n\t@FindBy(' + locator + ') public WebElement ' + arrOfElements[i].Name + ';';
        }
    }
    return result;
}

var genPageCode = function genPageCode(page, domainName, objCopy) {
    var pageName = createUpCaseName(page.name);

    var p = domainName.split(/\W/).reverse().join('.');

    if (objCopy.JDI) {
        return 'package ' + p + '.pages;' + '\n\nimport ' + p + '.sections.*;' + commonImport() + '\n\npublic class ' + pageName + ' extends WebPage {' + genCodeOfElements(null, page.elements, objCopy) + '\n}';
    } else {
        return 'package ' + p + '.pages;' + '\n\nimport com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.FindBy;' + '\nimport org.openqa.selenium.WebElement;' + '\n\npublic class ' + pageName + ' {' + genCodeOfWEBElements(page.elements) + '\n}';
    }
};

var genCode = exports.genCode = function genCode(mainObj) {
    var objCopy = Object.assign({}, mainObj);
    var page = objCopy.PageObjects.find(function (page) {
        if (page.pageId === objCopy.activeTabPageId) {
            return page;
        }
    });
    objCopy.code = '';
    objCopy.CodeDetails = true;
    objCopy.selectedElement = '';

    objCopy.code = genPageCode(page, objCopy.SiteInfo.domainName, objCopy);

    return objCopy;
};

var downloadCode = exports.downloadCode = function downloadCode(mainObj) {
    var objCopy = Object.assign({}, mainObj);

    var objToSave = {
        content: '',
        name: ''
    };

    if (!!objCopy.selectedElement) {
        objToSave.name = objCopy.selectedElement.Name + '.java';
    } else {
        var page = objCopy.PageObjects.find(function (page) {
            if (page.pageId === objCopy.activeTabPageId) {
                return page;
            }
        });
        objToSave.name = createUpCaseName(page.name) + '.java';
    }
    objToSave.content = objCopy.code;

    if (objToSave.content && objToSave.name) {
        var blob = new Blob([objToSave.content], { type: "text/plain;charset=utf-8" });
        (0, _fileSaver.saveAs)(blob, objToSave.name);
    }

    return objCopy;
};

var switchCodeMode = exports.switchCodeMode = function switchCodeMode(mainObj) {
    var objCopy = Object.assign({}, mainObj);
    objCopy.JDI = !objCopy.JDI;
    objCopy.selectedElement = '';
    objCopy.activeTabPageId = -1;
    objCopy.selectedPage = {};
    objCopy.resultTree = [];
    objCopy.pageMap = new Map();
    objCopy.ElementsDetails = false;
    objCopy.PagesDetails = false;
    objCopy.CodeDetails = false;
    objCopy.RuleDetails = false;
    objCopy.SiteDetails = true;
    objCopy.warningLog = [];
    objCopy.sections = new Map();
    objCopy.PageObjects = [];
    objCopy.SiteInfo = Object.assign({}, _pageObject.SiteInfoJSON);
    objCopy.searchedPages = [];
    return objCopy;
};

var zipAllCode = exports.zipAllCode = function zipAllCode(mainObj) {
    var objCopy = Object.assign({}, mainObj);
    var zip = new _jszip2.default();
    var siteHostName = objCopy.SiteInfo.hostName.split(/\W/);
    var gen = false;
    for (var i = 0; i < objCopy.PageObjects.length; i++) {
        if (objCopy.PageObjects[i].elements.length > 0 && siteHostName) {
            gen = true;
        }
    }
    if (gen) {
        var siteName = "";
        siteHostName[siteHostName.length - 1] = siteHostName.length > 1 ? "Site" : siteHostName[siteHostName.length - 1] + "Site";
        for (var _i = 0; _i < siteHostName.length; _i++) {
            siteName += siteHostName[_i][0].toUpperCase() + siteHostName[_i].slice(1);
        }
        var pages = objCopy.PageObjects;
        var pageName = "";

        var site = "";

        var pack = objCopy.SiteInfo.domainName.split(/\W/).reverse().join('.');

        site = "package " + pack + ";" + "\n\nimport " + pack + ".pages.*;" + "\nimport com.epam.jdi.uitests.web.selenium.elements.composite.WebSite;" + "\nimport com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.*;" + "\n\n@JSite(\"" + objCopy.SiteInfo.origin + "\")" + "\npublic class " + siteName + " extends WebSite {";
        for (var _i2 = 0; _i2 < pages.length; _i2++) {
            pageName = createUpCaseName(pages[_i2].name);
            site += '\n\t@JPage(url = "' + pages[_i2].url + '", title = "' + pages[_i2].title + '")' + '\n\tpublic static ' + pageName + " " + (pageName[0].toLowerCase() + pageName.slice(1)) + ';';
        }
        site += "\n}";

        for (var _i3 = 0; _i3 < pages.length; _i3++) {
            pageName = createUpCaseName(pages[_i3].name);
            zip.folder("pages").file(pageName + ".java", genPageCode(pages[_i3], objCopy.SiteInfo.domainName, objCopy));
        }

        objCopy.sections.forEach(function (section) {
            var result = "package " + pack + ".sections;" + commonImport();
            result += "\n\npublic class " + section.Name + " extends " + section.Type + "{" + genCodeOfElements(section.elId, section.children, objCopy) + "\n}";
            zip.folder("sections").file(section.Name + ".java", result);
        });

        zip.file(siteName + '.java', site);
        zip.generateAsync({ type: "blob" }).then(function (content) {
            (0, _fileSaver.saveAs)(content, "pageobject.zip");
        });
    }
    return objCopy;
};

/***/ })

})