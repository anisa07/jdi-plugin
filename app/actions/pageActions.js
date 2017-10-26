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
