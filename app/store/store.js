import { createStore } from 'redux';
import { siteReducer } from '../reducers/siteReducers';
import {addPage} from '../actions/siteActions';

let store = createStore(siteReducer, {a: "t1"});

//store.dispatch(addPage({m: "1"}));

export {store};