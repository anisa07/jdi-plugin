import { commonFields } from '../data/settings';
import {saveAs} from 'file-saver';
import JSZip from '../../jszip/dist/jszip';

export let showCode = (mainObj)=>{
    let objCopy = Object.assign({},mainObj);
    objCopy.showCode = true;
    //objCopy.selectedElement = '';
    let page = objCopy.PageObjects.find((page)=>{
        if (page.pageId === objCopy.activeTabPageId){
            return page;
        }
    });
    let pack = objCopy.SiteInfo.domainName + '.sections';
    
    let el = objCopy.selectedElement;

    function c(){
    return 'package ' + pack + ';' +
        '\n\nimport com.epam.jdi.uitests.web.selenium.elements.common.*;'+
        '\nimport com.epam.jdi.uitests.web.selenium.elements.complex.*;'+
        '\nimport com.epam.jdi.uitests.web.selenium.elements.composite.*;'+
        '\nimport com.epam.jdi.uitests.web.selenium.elements.composite.WebPage;'+
        '\nimport com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.objects.*;'+
        '\nimport com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.simple.*;'+
        '\nimport org.openqa.selenium.support.FindBy;' + 
        '\n\npublic class ' + el.Name[0].toUpperCase() + el.Name.slice(1) + ' extends '+ el.Type +'{' +
        genCodeOfElements(el.elId, page.elements, objCopy) + '\n}'
    }
    //found code and regenerate it
    let code = page.compositeCode.find((section) => {
        if (section.elId === el.elId){
            return section;
        }
    });
    if (!code){
        page.compositeCode.push({elId: el.elId, sectionCode: c()}) 
    } else {
        code.sectionCode = c();
    }
    
    objCopy.sectionCode = c();

    return objCopy;
}

function genCodeOfElements (parentId, arrOfElements, objCopy) {
    let result = '';
    for (let i = 0; i < arrOfElements.length; i++ ){
        if (arrOfElements[i].parentId === parentId){
            if (objCopy.CompositeRules[arrOfElements[i].Type]){
                result += '\n\t@'+ (arrOfElements[i].Locator.indexOf('/') !== 0 ? 'Css("' : 'XPath("') + arrOfElements[i].Locator +'") public ' + 
                arrOfElements[i].Name + ' ' + arrOfElements[i].Name.toLowerCase() + ';'   
            }
            if (objCopy.ComplexRules[arrOfElements[i].Type]){
                let clone = Object.assign({}, objCopy.ElementFields.get(arrOfElements[i].Type));
                for (let field in commonFields){
                    delete clone[field];    
                }

                if (arrOfElements[i].hasOwnProperty('Root')){
                   result += '\n\t@J' + arrOfElements[i].Type + '(' +
                   '\n\t\troot = @FindBy(' +  (arrOfElements[i].Root.indexOf('/') !== 0 ? 'css' : 'xpath') + ' ="' + arrOfElements[i].Root + '")';    
                   delete clone.Root;  
                   for (let field in clone){
                       if (arrOfElements[i][field]){
                           result += ',\n\t\t'+ field.toLowerCase() +' = @FindBy(' +  (arrOfElements[i][field].indexOf('/') !== 0 ? 'css' : 'xpath') + ' = "' + arrOfElements[i][field] + '")'
                        }      
                    }
                }
                result += '\n\t) public ' + arrOfElements[i].Type + ' ' + arrOfElements[i].Name + ';'
            }
            if (objCopy.SimpleRules[arrOfElements[i].Type]){
                result += '\n\t@'+ (arrOfElements[i].Locator.indexOf('/') !== 0 ? 'Css("' : 'XPath("') + arrOfElements[i].Locator +'") public ' + 
                arrOfElements[i].Type + ' ' + arrOfElements[i].Name + ';'   
            }
        }
    }
    return result;
}

export let genCode = (mainObj) => {
    let objCopy = Object.assign({},mainObj);
    let page = objCopy.PageObjects.find((page)=>{
        if (page.pageId === objCopy.activeTabPageId){
            return page;
        }
    })
    page.POcode = "";
    objCopy.sectionCode = "";
    objCopy.showCode = true;
    objCopy.selectedElement = '';
    let pack = objCopy.SiteInfo.domainName + '.pages';
   
    let pageName = page.name.replace(/\s/g, '');

    page.POcode = 
        'package ' + pack + ';'+
        '\n\nimport ' + objCopy.SiteInfo.domainName + '.sections.*;' +
        '\n\nimport com.epam.jdi.uitests.web.selenium.elements.common.*;'+
        '\nimport com.epam.jdi.uitests.web.selenium.elements.complex.*;'+
        '\nimport com.epam.jdi.uitests.web.selenium.elements.composite.*;'+
        '\nimport com.epam.jdi.uitests.web.selenium.elements.composite.WebPage;'+
        '\nimport com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.objects.*;'+
        '\nimport com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.simple.*;'+
        '\nimport org.openqa.selenium.support.FindBy;'+
        '\n\npublic class '+ pageName[0].toUpperCase() + pageName.slice(1) + ' extends WebPage {'+
            genCodeOfElements(null, page.elements, objCopy) + '\n}'

    return objCopy;
} 

export let downloadCode = (mainObj) => {
    let objCopy = Object.assign({},mainObj);

    let objToSave = {
        content: '',
        name: ''
    }

    if (objCopy.sectionCode){
        objToSave.content = objCopy.sectionCode;
        objToSave.name = objCopy.selectedElement.Name + '.java';
    }else{
        let page = objCopy.PageObjects.find((page)=>{
            if (page.pageId === objCopy.activeTabPageId){
                return page;
            }
        });
        let n = page.name.replace(/\s/g, '');
        objToSave.name = n[0].toUpperCase() + n.slice(1) + '.java'
        objToSave.content = page.POcode;
    }

    if (objToSave.content && objToSave.name){
        let blob = new Blob([objToSave.content], {type: "text/plain;charset=utf-8"});
        saveAs(blob,  objToSave.name);
    }

    return objCopy;
}

export let zipAllCode = (mainObj) => {
    let objCopy = Object.assign({},mainObj);
    let zip = new JSZip();
    //let title = objCopy.SiteInfo.siteTitle.replace(/\s/g, '');
    let siteHostName = objCopy.SiteInfo.hostName.replace(/\./g, '');
    let siteName = siteHostName[0].toUpperCase() + siteHostName.slice(1);
    let pages = objCopy.PageObjects;
    let pageName = "";
    let sectionName = "";

    let site = "";
    site = "package " + objCopy.SiteInfo.domainName + ".pageobject;" +
    "\n\nimport com.epam.jdi.site.example.pages.*;" +
    "\nimport com.epam.jdi.uitests.web.selenium.elements.composite.WebSite;" +
    "\nimport com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.*;" +
    "\n\n@JSite(\"" + objCopy.SiteInfo.origin + "\")" +
    "\npublic class "+ siteName +" extends WebSite {";
    for (let i = 0; i < pages.length; i++){
        pageName = pages[i].name.replace(/\s/g, '');
        site += '\n\t@JPage(url = "' + pages[i].url + '", title = "'+ pages[i].title +'")' + 
        '\n\tpublic static ' + (pageName[0].toUpperCase() + pageName.slice(1)) + (pageName[0].toLowerCase() + pageName.slice(1)) + ';' 
    }
    site += "}";

    for (let i = 0; i < pages.length; i++){
        pageName = pages[i].name.replace(/\s/g, '');
        zip.folder("pages").file(pageName + ".java", pages[i].POcode);
    }

    let pack = objCopy.SiteInfo.domainName + '.sections';
    
    for (let i = 0; i < objCopy.sections.length; i++){
        console.log("test")
        let section = "package " + pack + ";"+
        "\n\nimport com.epam.jdi.uitests.web.selenium.elements.common.*;" +
        "\nimport com.epam.jdi.uitests.web.selenium.elements.complex.*;" +
        "\nimport com.epam.jdi.uitests.web.selenium.elements.composite.*;" +
        "\nimport com.epam.jdi.uitests.web.selenium.elements.composite.WebPage;" +
        "\nimport com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.objects.*;" +
        "\nimport com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.simple.*;" +
        "\nimport org.openqa.selenium.support.FindBy;" 
        sectionName = objCopy.sections[i].Name.replace(/\s/g, '');
        section += "\n\npublic class " + sectionName[0].toUpperCase() + sectionName.slice(1) + " extends "+ objCopy.sections[i].Type +"{" +
        genCodeOfElements(objCopy.sections[i].elId, objCopy.sections[i].children, objCopy) + "\n}";
        zip.folder("sections").file(sectionName + ".java", section);
    }

    zip.file(siteName + '.java', site);
    zip.generateAsync({type: "blob"}).then(
        function(content){
            saveAs(content, "pageobject.zip");
        }
    )

    return objCopy;
}

/*

    let name = document.getElementById("saveFile").innerText.replace(/(Save )/, "");
    let content = document.getElementById("code").value;

    zip.file(name, content);

    zip.generateAsync({type: "blob"}).then(
        function(content){
            saveAs(content, name.replace(/\w+\./,"")+".zip");
        }
    )*/