export let showCode = (mainObj)=>{
    let objCopy = Object.assign({},mainObj);
    objCopy.showCode = true;
    objCopy.selectedElement = '';
    return objCopy;
}

export let genCode = (mainObj) => {
    let objCopy = Object.assign({},mainObj);
    let page = objCopy.PageObjects.find((page)=>{
        if (page.pageId === objCopy.activeTabPageId){
            return page;
        }
    })
    page.POcode = "";
    let pack = objCopy.SiteInfo.domainName + '.package.pages';
    let pageName = page.name.replace(/\s/g, '');

    page.POcode = 
        'package ' + pack + 
        '\n\nimport com.epam.jdi.uitests.web.selenium.elements.common.*;'+
        '\nimport com.epam.jdi.uitests.web.selenium.elements.complex.*;'+
        '\nimport com.epam.jdi.uitests.web.selenium.elements.composite.*;'+
        '\nimport com.epam.jdi.uitests.web.selenium.elements.composite.WebPage;'+
        '\nimport com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.objects.*;'+
        '\nimport com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.simple.*;'+
        '\nimport org.openqa.selenium.support.FindBy;'+
        '\n\npublic class '+ pageName[0].toUpperCase() + pageName.slice(1) + ' extends WebPage {'+
        
        '\n}'

    //generate page 

    return objCopy;
} 