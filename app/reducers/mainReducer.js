import * as site from './siteReducer'; 
import * as page from './pageReducer';

export const mainReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_PAGE': {
            return page.showPage(state, action.pageId)
        }
        case 'CHANGE_TREE':{
            return page.changeTree(state, action.treeData)
        }
        case 'ADD_ELEMENT':{
            return page.addElement(state, action.element)
        }
        case 'DELETE_ELEMENT':{
            return page.deleteElement(state, action.elId)
        }
        case 'SELECT_ELEMENT':{
            return page.selectElement(state, action.elId)
        }
        case 'SEARCH_ELEMENT':{
            return page.searchEl(state, action.elName)
        }
        case 'ADD_PAGE': {
            return site.addPage(state, action.page);
        }
        case 'DELETE_PAGE':{
            return site.deletePage(state, action.pageId)
        }
        case 'SELECT_PAGE':{
            return site.selectPage(state, action.pageId)
        }
        case 'SEARCH_PAGE':{
            return site.searchPage(state, action.page)
        }
        case 'EDIT_VALUE':{
            return site.editValue(state, action.element, action.value, action.pageId)
        }
        case 'CLOSE_PAGE':{
            return site.closePage(state)
        }
        default: {
            return state
        }
    }
} 