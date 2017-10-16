import { addPage } from '../actions/siteActions';

let addPageF = (arr, obj)=>{
    let arrCopy = arr.slice();
    arrCopy.push(obj);
    return arrCopy; 
}

let deletePageF = (arr, id)=>{
    if (arr.length > 1){
        let arrCopy = arr.slice();
        return arrCopy.filter((page)=>{
            if (page.pageId !== id){
                return page;
            } 
        })
    }
    return arr;
}


export const siteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_PAGE': {
            return addPageF(state, action.page);
        }
        case 'DELETE_PAGE':{
            return deletePageF(state, action.pageId)
        }
        default: return state
    }
}
