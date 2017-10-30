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
            "enum": "",
            "parentId": parentId,
            "root":{
                "type": "",
                "path": ""
            },
            "locator": {
                "type": "",
                "path": ""
            },
            "value": {
                "type": "",
                "path": ""
            },
            "list": {
                "type": "",
                "path": ""
            },
            "expand": {
                "type": "",
                "path": ""
            },
            "headers": "",
            "rowHeaders": "",
            "header": {
                "type": "",
                "path": ""
            },
            "rowHeader": {
                "type": "",
                "path": ""
            },
            "cell": {
                "type": "",
                "path": ""
            },
            "column": {
                "type": "",
                "path": ""
            },
            "row": {
                "type": "",
                "path": ""
            },
            "footer": {
                "type": "",
                "path": ""
            },
            "height": "",
            "width": "",
            "rowStartIndex": "",
            "columnStartIndex": "",
            "headerType": "",
            "useCache": false,
            "entity": "",
            "isSection": false,
            "next": {
                "type": "",
                "path": ""
            },
            "previous": {
                "type": "",
                "path": ""
            },
            "first": {
                "type": "",
                "path": ""
            },
            "last": {
                "type": "",
                "path": ""
            },
            "page": {
                "type": "",
                "path": ""
            },
            "ok": {
                "type": "",
                "path": ""
            },
            "cancel": {
                "type": "",
                "path": ""
            },
            "close": {
                "type": "",
                "path": ""
            },
            "yes": {
                "type": "",
                "path": ""
            },
            "no": {
                "type": "",
                "path": ""
            },
            "search button": {
                "type": "",
                "path": ""
            },
            "suggestions": {
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

export function editElement(elField, value){
    return {
        type: 'EDIT_ELEMENT',
        elField: elField,
        value: value
    }
}