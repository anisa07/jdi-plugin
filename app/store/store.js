import { createStore, combineReducers } from 'redux';
import { mainReducer } from '../reducers/mainReducer';
import { PageObjectJSON, SiteInfoJSON } from '../data/pageObject';
import { Elements, Locators, ElementFields, HeaderTypes, Rules} from '../data/settings';


let initialState = {
    PageObjects: PageObjectJSON.slice(),
    SiteInfo: Object.assign({}, SiteInfoJSON),
    Elements: Elements.slice(),
    Locators: Locators.slice(),
    Rules: Object.assign({}, Rules),
    ElementFields: ElementFields,
    activeTabPageId: -1,
    settingsForSite: true,
    activePageObject: {},
    resultTree: [],
    pageMap: new Map(),
    selectedElement: "",
    searchedPages: PageObjectJSON.slice(),
    HeaderTypes: HeaderTypes,
    mainSettings: false,
    rulesSettings: false,
    selectedRule: '' 
};

let store = createStore(mainReducer,initialState);

export { store };