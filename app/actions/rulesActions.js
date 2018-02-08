export function openRules(){
    return{
        type: "OPEN_RULES"
    }
}

export function selectRule(rule){
    return{
        type: "SELECT_RULE",
        rule
    }
}

export function addRule(ruleType){
    return{
        type: "ADD_RULE",
        ruleType
    }
}

export function showRule(ruleId){
    return{
        type: "SHOW_RULE",
        ruleId
    }
}

export function editRule(field, value){
    return{
        type: "EDIT_RULE",
        field,
        value
    }
}

export function deleteRule(ruleId){
    return{
        type: "DELETE_RULE",
        ruleId
    }
}

export function exportRules(){
    return{
        type: "EXPORT_RULE",
    }
}

export function importRules(){
    return{
        type: "IMPORT_RULE",
    }
}