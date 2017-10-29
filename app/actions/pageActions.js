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
            "expanded": false,
            "name": "",
            "type": "button",
            "parent": "",
            "parentId": parentId,
            "locator": {
                "type": "",
                "path": ""
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