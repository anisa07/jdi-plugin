import * as site from './siteReducer'; 
import * as page from './pageReducer';

export const mainReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_PAGE': {
            return page.showPage(state, action.pageId)
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
        default: {
            return state
        }
    }
} 