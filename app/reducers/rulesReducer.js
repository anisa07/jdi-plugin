import { saveAs } from 'file-saver';
import JSZip from '../../jszip/dist/jszip';

export let openRules = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);
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
    let objCopy = Object.assign({}, mainObj);
    objCopy.selectedRule = rule;
    //change here

    objCopy.ruleId = !!objCopy.Rules[rule][0] ? objCopy.Rules[rule][0].id : '';

    return objCopy;
}

export let addRule = (mainObj, ruleType) => {
    let objCopy = Object.assign({}, mainObj);
    let allFields = objCopy.ElementFields.get(ruleType);
    let res = {};
    //change here
    let lastItemNum = objCopy.Rules[ruleType].length - 1
    let id = objCopy.Rules[ruleType][lastItemNum].id + 1;
    let ruleFields = Object.assign({}, objCopy.Rules[ruleType][0]);
    for (let f in ruleFields) {
        res[f] = "";
    }
    res.id = id;
    objCopy.Rules[ruleType].push(res);
    return objCopy;
}

export let showRule = (mainObj, ruleId) => {
    let objCopy = Object.assign({}, mainObj);
    objCopy.ruleId = ruleId;

    return objCopy;
}

export let editRule = (mainObj, field, value) => {
    let objCopy = Object.assign({}, mainObj);
    let selectedRule = objCopy.selectedRule;
    let id = objCopy.ruleId;

    let allRules = objCopy.Rules[selectedRule];
    allRules.map((rule) => {
        if (rule.id === id) {
            rule[field] = value;
            //rule[field[0]][field[1]] = value;
        }
        return rule;
    })

    return objCopy;
}

export let deleteRule = (mainObj, id) => {
    let objCopy = Object.assign({}, mainObj);
    let selectedRule = objCopy.selectedRule;
    let allRulesOfSelectedtype = objCopy.Rules[selectedRule];
    let newArr = [];
    if (allRulesOfSelectedtype.length === 1) {
        newArr.push({});
        for (let f in allRulesOfSelectedtype[0]) {
            newArr[0][f] = "";
        }
        newArr[0].id = 0;
    } else {
        newArr = allRulesOfSelectedtype.filter(rule => rule.id !== id);
    }
    if (id === objCopy.ruleId) {
        objCopy.ruleId = newArr[0].id;
    }
    objCopy.Rules[selectedRule] = newArr;
    return objCopy;
}

export let exportRules = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);
    let zip = new JSZip();

    zip.file('Rules.json', JSON.stringify(objCopy.Rules));
    zip.generateAsync({ type: "blob" }).then(
        function (content) {
            saveAs(content, "JDIrules.zip");
        })

    //console.log('objCopy.Rules', JSON.stringify(objCopy.Rules))

    return objCopy;
}

function getFileds(Rules, SubRules, objCopy) {
    for (let f in SubRules){
        if (!!Rules[f]){
            SubRules[f] = Rules[f];
        } else {
            try {
                throw new Error(`${f} rule is missing in Rules`);
              } catch (e) {
                objCopy.warningLog += `${e}.\n`;
                return;
              }
        }
    }
    return SubRules;
}

export let importRules = (mainObj, files) => {
    let objCopy = Object.assign({}, mainObj);
    //let RulesBackUp = JSON.parse(JSON.stringify(mainObj.Rules));
    let SimpleRulesBackUp = JSON.parse(JSON.stringify(mainObj.SimpleRules));
    let ComplexRulesBackUp = JSON.parse(JSON.stringify(mainObj.ComplexRules));
    let CompositeRulesBackUp = JSON.parse(JSON.stringify(mainObj.CompositeRules));
    function saveBackUp(){
        objCopy.Rules = Object.assign({}, SimpleRulesBackUp, ComplexRulesBackUp, ComplexRulesBackUp);
        objCopy.SimpleRules = SimpleRulesBackUp;
        objCopy.ComplexRules = ComplexRulesBackUp;
        objCopy.CompositeRules = CompositeRulesBackUp;
    }
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        try {
            let file = files[0];
            if (!file) {
                return;
            }
            let reader = new FileReader();
            objCopy.PageObjects.map(page => page.elements.length = 0);
            objCopy.sections.clear();
            reader.onload = (e) => {
                let contents = e.target.result;
                try {
                     objCopy.Rules = JSON.parse(contents);
                     objCopy.SimpleRules = getFileds(objCopy.Rules, objCopy.SimpleRules, objCopy);
                     objCopy.ComplexRules = getFileds(objCopy.Rules, objCopy.ComplexRules, objCopy);
                     objCopy.CompositeRules = getFileds(objCopy.Rules, objCopy.CompositeRules, objCopy);
                     if (!objCopy.SimpleRules || !objCopy.ComplexRules || !objCopy.CompositeRules){
                         saveBackUp();
                     }
                } catch (e){
                    objCopy.warningLog += `Error occurs reading local json file: ${e} \n`;
                }
            };
            reader.readAsText(file)
        } catch (e) {
            objCopy.warningLog += `Error occurs with FileReader: ${e}.\n`;
            saveBackUp();
        }
    } else {
        objCopy.warningLog += `Warning! The File APIs are not fully supported in this browser.\n`;
    }
    return objCopy;
}