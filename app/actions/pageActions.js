export function showPage(pageId){
    return {
        type: 'SHOW_PAGE',
        pageId
    }
}

export function changeTree(treeData){
    return {
        type: 'CHANGE_TREE',
        treeData
    }
}

export function addElement(parentId){
    return {
        type: 'ADD_ELEMENT',
        element: {
            "Name": "",
            "Type": "Button",
            "parent": "",
            "parentId": parentId,
            "Locator":{
                "path": "",
                "type": ""
            }
        }
    }
}

export function deleteElement(elId){
    return {
        type: 'DELETE_ELEMENT',
        elId
    }
}

export function selectElement(elId){
    return {
        type: 'SELECT_ELEMENT',
        elId
    }
}

export function searchElement(elName){
    return {
        type: 'SEARCH_ELEMENT',
        elName
    }
}

export function editElement(elField, value){
    return {
        type: 'EDIT_ELEMENT',
        elField: elField,
        value: value
    }
}