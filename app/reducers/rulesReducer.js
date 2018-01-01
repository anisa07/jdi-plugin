export let openRules = (mainObj) => {
    let objCopy = Object.assign({},mainObj);
    objCopy.activeTabPageId = -1;
    objCopy.selectedElement = "";
    objCopy.settingsForSite = false;
    objCopy.activePageObject = {};
    objCopy.activePageObject = {};
    objCopy.mainSettings = false;
    objCopy.rulesSettings = true;
    objCopy.showCode = false;
    return objCopy;
}

export let selectRule = (mainObj, rule) => {
    let objCopy = Object.assign({},mainObj);
    objCopy.selectedRule = rule;
    objCopy.ruleId = objCopy.Rules[rule][0].id;
   
    return objCopy;
}

export let addRule = (mainObj, ruleType) =>{
    let objCopy = Object.assign({},mainObj);
    let allFields = objCopy.ElementFields.get(ruleType);
    let res = {};
    let lastItemNum = objCopy.Rules[ruleType].length-1
    let id  = objCopy.Rules[ruleType][lastItemNum].id + 1;
    let ruleFields =Object.assign({}, objCopy.Rules[ruleType][0]);    
    for (let f in ruleFields){
        res[f] = "";
    }
    res.id = id;  
    objCopy.Rules[ruleType].push(res);
    return objCopy;
}

export let showRule = (mainObj, ruleId) =>{
    let objCopy = Object.assign({},mainObj);
    objCopy.ruleId = ruleId;

    return objCopy;
}

export let editRule = (mainObj, field, value) =>{
    let objCopy = Object.assign({}, mainObj);
    let selectedRule = objCopy.selectedRule; 
    let id  = objCopy.ruleId;
  
    let allRules = objCopy.Rules[selectedRule];
    allRules.map((rule)=>{
        if (rule.id === id){
            rule[field] = value;
            //rule[field[0]][field[1]] = value;
        }
        return rule;
    })
  
    return objCopy;
}