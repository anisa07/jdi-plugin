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
    let pack = objCopy.SiteInfo.domainName.split(/\W/).reverse().join('.');
    
    let el = objCopy.selectedElement;

    function c(){
    return 'package ' + pack + ';' + commonImport() + 
        '\n\npublic class ' + el.Name + ' extends '+ el.Type +'{' +
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

function genCodeOfElements (parentId, arrOfElements, objCopy) {
    let result = '';
    for (let i = 0; i < arrOfElements.length; i++ ){
        if (arrOfElements[i].parentId === parentId){
            if (objCopy.CompositeRules[arrOfElements[i].Type]){
                result += '\n\t@'+ (arrOfElements[i].Locator.indexOf('/') !== 1 ? 'Css("' : 'XPath("') + arrOfElements[i].Locator +'") public ' + 
                arrOfElements[i].Name + ' ' + arrOfElements[i].Name[0].toLowerCase() + arrOfElements[i].Name.slice(1) + ';'   
            }
            if (objCopy.ComplexRules[arrOfElements[i].Type]){
                let clone = Object.assign({}, objCopy.ElementFields.get(arrOfElements[i].Type));
                for (let field in commonFields){
                    delete clone[field];    
                }

                if (arrOfElements[i].hasOwnProperty('Root')){
                   result += '\n\t@J' + arrOfElements[i].Type + '(' +
                   '\n\t\troot = @FindBy(' +  (arrOfElements[i].Root.indexOf('/') !== 1 ? 'css' : 'xpath') + ' ="' + arrOfElements[i].Root + '")';    
                   delete clone.Root;  
                   for (let field in clone){
                       if (arrOfElements[i][field]){
                           result += ',\n\t\t'+ field.toLowerCase() +' = @FindBy(' +  (arrOfElements[i][field].indexOf('/') !== 0 ? 'css' : 'xpath') + ' = "' + arrOfElements[i][field] + '")'
                        }      
                    }
                }
                result += '\n\t) public ' + arrOfElements[i].Type + ' ' + arrOfElements[i].Name[0].toLowerCase() + arrOfElements[i].Name.slice(1) + ';'
            }
            if (objCopy.SimpleRules[arrOfElements[i].Type]){
                result += '\n\t@'+ (arrOfElements[i].Locator.indexOf('/') !== 1 ? 'Css("' : 'XPath("') + arrOfElements[i].Locator +'") public ' + 
                arrOfElements[i].Type + ' ' + arrOfElements[i].Name[0].toLowerCase() + arrOfElements[i].Name.slice(1) + ';'   
            }
        }
    }
    return result;
}

let genPageCode = (page, domainName, objCopy) => {
    let pageName = page.name.replace(/\s/g, '');
    let p = domainName.split(/\W/).reverse().join('.');
    return 'package ' + p + '.pages;'+
    '\n\nimport ' + p + '.sections.*;' + commonImport() +
    '\n\npublic class '+ pageName[0].toUpperCase() + pageName.slice(1) + ' extends WebPage {'+
        genCodeOfElements(null, page.elements, objCopy) + '\n}'
}

export let genCode = (mainObj) => {
    let objCopy = Object.assign({},mainObj);
    let page = objCopy.PageObjects.find((page)=>{
        if (page.pageId === objCopy.activeTabPageId){
            return page;
        }
    })
    page.POcode = '';
    objCopy.sectionCode = '';
    objCopy.showCode = true;
    objCopy.selectedElement = '';
       
    page.POcode = genPageCode(page, objCopy.SiteInfo.domainName, objCopy);

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
    let siteHostName = objCopy.SiteInfo.hostName.split(/\W/);
    let gen = false;
    for (let i=0; i < objCopy.PageObjects.length; i++){
        if (objCopy.PageObjects[i].elements.length > 0 && siteHostName){
            gen = true;
        }
    }
    if (gen){
        let siteName = "";
        siteHostName[siteHostName.length-1] = siteHostName.length > 1 ? "Site" : siteHostName[siteHostName.length-1] + "Site";
        for (let i=0; i<siteHostName.length; i++){
            siteName += siteHostName[i][0].toUpperCase() + siteHostName[i].slice(1);
        }
        let pages = objCopy.PageObjects;
        let pageName = "";
       
        let site = "";
        
        let pack = objCopy.SiteInfo.domainName.split(/\W/).reverse().join('.');
    
        site = "package " + pack + ";" +
        "\n\nimport " + pack +".pages.*;" +
        "\nimport com.epam.jdi.uitests.web.selenium.elements.composite.WebSite;" +
        "\nimport com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.*;" +
        "\n\n@JSite(\"" + objCopy.SiteInfo.origin + "\")" +
        "\npublic class "+ siteName +" extends WebSite {";
        for (let i = 0; i < pages.length; i++){
            pageName = pages[i].name.replace(/\s/g, '');
            site += '\n\t@JPage(url = "' + pages[i].url + '", title = "'+ pages[i].title +'")' + 
            '\n\tpublic static ' + (pageName[0].toUpperCase() + pageName.slice(1)) + " " + (pageName[0].toLowerCase() + pageName.slice(1)) + ';' 
        }
        site += "\n}";
    
        for (let i = 0; i < pages.length; i++){
            pageName = pages[i].name.replace(/\s/g, '');
            zip.folder("pages").file(pageName + ".java", genPageCode(pages[i], objCopy.SiteInfo.domainName, objCopy));
        }
    
        objCopy.sections.forEach((section) => {
            let result = "package " + pack + ".sections;"+ commonImport();
            result += "\n\npublic class " + section.Name + " extends "+ section.Type +"{" +
            genCodeOfElements(section.elId, section.children, objCopy) + "\n}";
            zip.folder("sections").file(section.Name + ".java", result);
        })
    
        zip.file(siteName + '.java', site);
        zip.generateAsync({type: "blob"}).then(
            function(content){
                saveAs(content, "pageobject.zip");
            }
        )
    } 
    return objCopy;
}