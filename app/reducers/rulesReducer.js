export let openRules = (mainObj) => {
    let objCopy = Object.assign({},mainObj);
    objCopy.activeTabPageId = -1;
    objCopy.selectedElement = "";
    objCopy.settingsForSite = false;
    objCopy.activePageObject = {};
    objCopy.activePageObject = {};
    objCopy.mainSettings = false;
    objCopy.rulesSettings = true;
    return objCopy;
}

export let selectRule = (mainObj, rule) => {
    let objCopy = Object.assign({},mainObj);
    objCopy.selectedRule = rule;
    objCopy.ruleId = objCopy.Rules[rule][0].id;
    
    return objCopy;
}