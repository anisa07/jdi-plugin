import { Tabs } from './functional parts/tabs';
import { Site } from './functional parts/site';
import { Page } from './functional parts/page';

import { store } from './store/store';

import * as pageActions from './actions/pageActions';
import * as siteActions from './actions/siteActions';

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
                <Page state={this.state} store={store}/>
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






//     render() {
//        return (
//             <div className="start">
//                 {/* <Tabs tabPages={this.state.tabPages}
//                     activeTabPage={this.state.activeTabPageId}
//                     settingsForSite={this.state.settingsForSite}
//                     showPage={this.showPage} />
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