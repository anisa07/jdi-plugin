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