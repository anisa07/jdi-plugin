import { Tabs } from './functional parts/tabs';
import { Site } from './functional parts/site';

import { store } from './store/store';

import * as pageActions from './actions/pageActions';
import * as siteActions from './actions/siteActions';

// import { Page } from './functional parts/page';

// let showPage = (id) => {
//     store.dispatch(pageActions.showPage(id))
// }
// let addPage = () => {
//     store.dispatch(siteActions.addPage());
// }
// let deletePage = (id) => {
//     store.dispatch(siteActions.deletePage(id));
//     $("#searchInput")[0].value = "";
// }
// let selectPage = (id) =>{
//     store.dispatch(siteActions.selectPage(id));
// }
// let searchPage = (page) =>{
//     store.dispatch(siteActions.searchPage(page));
// }
// let editValue = (element, value, id) =>{
//     store.dispatch(siteActions.editValue(element, value, id))
// }
// let closePage = () => {
//     store.dispatch(siteActions.closePage());
// }

export class Main extends React.Component {
    constructor() {
        super();
        this.state = store.getState();
    }
    componentDidMount(){
        store.subscribe(() => {
            this.state = store.getState();
            this.forceUpdate();
            console.log(this.state)
        })
    }

    render() {
        return (
            <div className="start">
                <Tabs state={this.state} store={store}/>
                <Site state={this.state} store={store}/>
            </div>
        )
    }
}



// export class Main extends React.Component {
//     constructor(props) {
//         super();
//         this.state = {
//             tabPages: PageObjectJSON.slice(),
//             siteInfo: SiteInfoJSON,
//             activeTabPageId: -1,
//             settingsForSite: true,
//             activePageObject: {},
//             resultTree: [],
//             pageMap: new Map(),
//             selectedElement: "",
//             elementsList: Elements.slice(),
//             locatorsList: Locators.slice(),
//             searchedPages: PageObjectJSON.slice()
//         };
//         this.addPage = this.addPage.bind(this);
//         this.addElement = this.addElement.bind(this);
//         this.searchPage = this.searchPage.bind(this);
//         this.selectPage = this.selectPage.bind(this);
//         this.debounce = this.debounce.bind(this);
//         this.editValue = this.editValue.bind(this);
//         this.closePage = this.closePage.bind(this);
//         this.removePage = this.removePage.bind(this);
//         this.showPage = this.showPage.bind(this);
//         this.onChangeTree = this.onChangeTree.bind(this);
//         //this.expandTreeNode = this.expandTreeNode.bind(this);
//         this.removeElement = this.removeElement.bind(this);
//         this.searchElement = this.searchElement.bind(this);
//         this.selectElement = this.selectElement.bind(this);
//         this.editElement = this.editElement.bind(this);
//     }

//     componentDidMount() {
//     }

//     editElement(e) {
//         let value = e.target.value;
//         let selectedEl = this.state.selectedElement;
//         let elementProp = e.target.dataset.attribute;

//         let pageElements = [];
//         let pages = this.state.tabPages.slice();
//         let activeTabPage = this.state.activeTabPageId;
//         let map = new Map();
//         let resTree = [];

//         if (elementProp === "name") {
//             pageElements = pages.find((page) => {
//                 return page.pageId === activeTabPage
//             }).elements.map((element) => {
//                 if (element.parent === selectedEl.name) {
//                     element.parent = value;
//                 } return element;
//             }).map((element) => {
//                 if (element.name === selectedEl.name) {
//                     element.name = value;
//                 } return element;
//             })

//             map = drawMap(pageElements, new Map());
//             resTree = getChildren(map, null);
//         }

//         if (e.target.dataset.sub) {
//             let sub = e.target.dataset.sub;
//             selectedEl[elementProp][sub] = value;
//         } else {
//             selectedEl[elementProp] = value
//         }

//         if (elementProp === "name") {
//             this.setState({
//                 resultTree: resTree,
//                 pageMap: map,
//                 selectedElement: selectedEl
//             })
//         } else {
//             this.setState({
//                 selectedElement: selectedEl
//             })
//         }
//         console.log(selectedEl)

//     }

//     selectElement(e) {
//         let el = findParentData(e.target, "title");
//         let name = el.dataset.title;
//         let pages = this.state.tabPages.slice();
//         let activeTabPage = this.state.activeTabPageId;
//         let pageElements = pages.find((page) => {
//             return page.pageId === activeTabPage
//         }).elements;
//         let element = pageElements.find((element) => {
//             return element.name === name
//         })
//         this.setState({
//             selectedElement: element
//         })
//     }

//     searchElement(e) {
//         let element = e.target.value.toLowerCase();
//         let pages = this.state.tabPages.slice();
//         let activeTabPage = this.state.activeTabPageId;
//         let pageElements = pages.find((page) => {
//             return page.pageId === activeTabPage
//         }).elements;
//         let map = new Map();
//         let resTree = [];
//         if (element === "" || element.replace(/\s/g, "") === "") {
//             map = drawMap(pageElements, new Map());
//             resTree = getChildren(map, null);
//         } else {
//             let res = searchElement(element, pageElements);
//             map = drawMap(res, new Map());
//             resTree = getChildren(map, null);
//         }
//         this.setState({
//             tabPages: pages,
//             resultTree: resTree,
//             pageMap: map
//         })
//     }

//     addElement(e) {
//         let el = findParentData(e.target, "pageid");
//         let pages = this.state.tabPages.slice();
//         let page = findPage(e.target, pages);
//         let parent = (el.dataset.name === "null") ? null : el.dataset.name;
//         let resTree = [];
//         let map = new Map();
//         page.elements.map((element) => {
//             if (element.name === parent) {
//                 return element.expanded = true;
//             }
//         })
//         page.elements.push({
//             "expanded": false,
//             "name": "Element" + (Math.floor(Math.random() * (100 - 1)) + 1) + (Math.floor(Math.random() * (100 - 1)) + 1),
//             "type": "button",
//             "parent": parent,
//             "locator": {
//                 "type": "",
//                 "path": ""
//             }
//         })
//         map = drawMap(page.elements, new Map());
//         resTree = getChildren(map, null);
//         this.setState({
//             tabPages: pages,
//             resultTree: resTree,
//             pageMap: map
//         })
//     }

//     removeElement(e) {
//         function del(arr, name) {
//             return arr.filter((el) => {
//                 return el.name !== name
//             })
//         }
//         let children = [];
//         let resTree = [];
//         let map = new Map();
//         let pages = this.state.tabPages.slice();
//         let page = findPage(e.target, pages);
//         let element = findElement(e.target, pages);
//         if (element.children.length) {
//             children = element.children[0];
//         }
//         //let children = element.children[0];
//         let name = element.name;
//         let newArr = del(page.elements, name);
//         if (children.length) {
//             children.forEach((child) => {
//                 newArr = del(newArr, child.name);
//             });
//         }
//         page.elements = newArr;
//         map = drawMap(page.elements, new Map());
//         resTree = getChildren(map, null);

//         this.setState({
//             tabPages: pages,
//             resultTree: resTree,
//             pageMap: map
//         })
//     }

//     // expandTreeNode(e) {
//     //     let el = e.target;
//     //     let pagesArray = this.state.tabPages.slice();
//     //     let page = findPage(el, pagesArray);
//     //     let element = findElement(el, pagesArray);
//     //     let resTree = [];
//     //     element.expanded = !element.expanded;
//     //     resTree = getChildren(this.state.pageMap, null);
//     //     this.setState({
//     //         tabPages: pagesArray,
//     //         resultTree: resTree
//     //     })
//     // }

//     onChangeTree(treeData) {
//         return this.setState({ resultTree: treeData })
//     }


//     closePage() {
//         this.setState(function () {
//             return {
//                 activeTabPageId: -1
//             }
//         })
//     }

//     editValue(e) {
//         let field = e.target.dataset.attribute;
//         let value = e.target.value;
//         if (e.target.dataset.site === "siteInfo") {
//             let updateObj = this.state.siteInfo;
//             updateObj[field] = value;
//             this.setState(function () {
//                 return {
//                     siteInfo: updateObj
//                 }
//             })
//         } else {
//             let updateObj = this.state.activePageObject;
//             updateObj[field] = value;
//             this.setState(function () {
//                 return {
//                     activePageObject: updateObj
//                 }
//             })
//         }
//     }


//     render() {
//        return (
//             <div className="start">
//                 {/* <Tabs tabPages={this.state.tabPages}
//                     activeTabPage={this.state.activeTabPageId}
//                     settingsForSite={this.state.settingsForSite}
//                     showPage={this.showPage} />
//                 {
//                     (this.state.settingsForSite) ?
//                         <div id="manage-site">
//                             <PanelLeftSite searchPage={this.searchPage}
//                                 searchedPages={this.state.searchedPages}
//                                 selectPage={this.selectPage}
//                                 addPage={this.addPage}
//                                 selectPageId={this.state.activeTabPageId}
//                                 removePage={this.removePage}
//                                 focus={this.focusE}
//                                 blur={this.blurE}
//                                 setClass={this.state.setClass} />
//                             <PanelRightSite siteInfo={this.state.siteInfo}
//                                 activePageObject={this.state.activePageObject}
//                                 editValue={this.editValue}
//                                 activeTabPageId={this.state.activeTabPageId}
//                                 closePage={this.closePage} />
//                         </div>
//                         : null
//                 }
//                 {
//                     (!this.state.settingsForSite && this.state.activeTabPageId > -1) ?
//                         <div id="manage-site">
//                             <PanelLeftPage tabPages={this.state.tabPages}
//                                 activeTabPage={this.state.activeTabPageId}
//                                 //expandTreeNode={this.expandTreeNode}
//                                 removeElement={this.removeElement}
//                                 addElement={this.addElement}
//                                 resultTree={this.state.resultTree}
//                                 searchElement={this.searchElement}
//                                 onChangeTree={this.onChangeTree}
//                                 selectElement={this.selectElement} />
//                             <PanelRightPage
//                                 selectedElement={this.state.selectedElement}
//                                 editElement={this.editElement}
//                                 elementsList={this.state.elementsList}
//                                 locatorsList={this.state.locatorsList}
//                             />
//                         </div>
//                         : null
//                 } */}
//             </div>
//         )
//     }
// }