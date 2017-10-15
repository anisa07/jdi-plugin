import {addPage} from '../actions/siteActions';

export const siteReducer = (state, action)=>{
    switch (action.type){
        case 'ADD_PAGE':
            return Object.assign({} , state, {page: action.page})
        default: return state
    }
}

