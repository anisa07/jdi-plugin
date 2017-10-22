import { createStore, combineReducers } from 'redux';
import { mainReducer } from '../reducers/mainReducer';
import { PageObjectJSON, SiteInfoJSON } from '../data/pageObject';
import { Elements, Locators } from '../data/settings';


let initialState = {
    PageObjects: PageObjectJSON.slice(),
    SiteInfo: Object.assign({}, SiteInfoJSON),
    Elements: Elements.slice(),
    Locators: Locators.slice(),
    activeTabPageId: -1,
    settingsForSite: true,
    activePageObject: {},
    resultTree: [],
    pageMap: new Map(),
    selectedElement: "",
    searchedPages: PageObjectJSON.slice()
}

let store = createStore(mainReducer,initialState);

export { store };