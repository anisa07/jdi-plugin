import { PageObjectJSON, SiteInfoJSON } from './data/pageObject';

import { Tabs } from './functional parts/tabs';
import { PanelLeftSite, PanelRightSite } from './functional parts/manageSite';
import { PanelLeftPage, PanelRightPage } from './functional parts/managePage';
import { findElement, findPage, findParentData } from './functional parts/common';
import { drawMap, searchElement, getChildren } from './functional parts/tree';
// if (!window.indexedDB) {
//     window.alert("Ваш браузер не поддерживат стабильную версию IndexedDB. Такие-то функции будут недоступны");
// }

export class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            tabPages: PageObjectJSON.slice(),
            siteInfo: SiteInfoJSON,
            activeTabPageId: "",
            settingsForSite: true,
            searchPage: "",
            activePageObject: {},
            resultTree: [],
            pageMap: new Map()
        };
        this.addPage = this.addPage.bind(this);
        this.addElement = this.addElement.bind(this);
        this.searchPage = this.searchPage.bind(this);
        this.selectPage = this.selectPage.bind(this);
        this.debounce = this.debounce.bind(this);
        this.editValue = this.editValue.bind(this);
        this.closePage = this.closePage.bind(this);
        this.removePage = this.removePage.bind(this);
        this.showPage = this.showPage.bind(this);
        this.onChangeTree = this.onChangeTree.bind(this);
        this.expandTreeNode = this.expandTreeNode.bind(this);
        this.removeElement = this.removeElement.bind(this);
        this.searchElement = this.searchElement.bind(this);
    }

    componentDidMount() {
    }

    searchElement(e) {
        let element = e.target.value;
        let pages = this.state.tabPages.slice();
        let activeTabPage = this.state.activeTabPageId;
        let pageElements = pages.find((page) => {
            return page.pageId === activeTabPage
        }).elements;
        let map = new Map();
        let resTree = [];
        if (element === "" || element.replace(/\s/g, "") === "") {
            map = drawMap(pageElements, new Map());
            resTree = getChildren(map, null);
        } else {
            let res = searchElement(element, pageElements);
            map = drawMap(res, new Map());
            resTree = getChildren(map, null);
        }
        this.setState({
            tabPages: pages,
            resultTree: resTree,
            pageMap: map
        })
    }

    addElement(e) {
        let el = findParentData(e.target, "pageid");
        let pages = this.state.tabPages.slice();
        let page = findPage(e.target, pages);
        let parent = (el.dataset.name === "null") ? null : el.dataset.name;
        let resTree = [];
        let map = new Map();
        page.elements.map((element) => {
            if (element.name === parent) {
                return element.expanded = true;
            }
        })
        page.elements.push({
            "expanded": false,
            "name": "Element" + (Math.floor(Math.random() * (100 - 1)) + 1) + (Math.floor(Math.random() * (100 - 1)) + 1),
            "type": "button",
            "parent": parent,
            "locator": {
                "type": "",
                "path": ""
            }
        })
        map = drawMap(page.elements, new Map());
        resTree = getChildren(map, null);
        this.setState({
            tabPages: pages,
            resultTree: resTree,
            pageMap: map
        })
    }

    removeElement(e) {
        function del(arr, name) {
            return arr.filter((el) => {
                return el.name !== name
            })
        }
        let children = [];
        let resTree = [];
        let map = new Map();
        let pages = this.state.tabPages.slice();
        let page = findPage(e.target, pages);
        let element = findElement(e.target, pages);
        if (element.children.length) {
            children = element.children[0];
        }
        //let children = element.children[0];
        let name = element.name;
        let newArr = del(page.elements, name);
        if (children.length) {
            children.forEach((child) => {
                newArr = del(newArr, child.name);
            });
        }
        page.elements = newArr;
        map = drawMap(page.elements, new Map());
        resTree = getChildren(map, null);

        this.setState({
            tabPages: pages,
            resultTree: resTree,
            pageMap: map
        })
    }

    expandTreeNode(e) {
        let el = e.target;
        let pagesArray = this.state.tabPages.slice();
        let page = findPage(el, pagesArray);
        let element = findElement(el, pagesArray);
        let resTree = [];
        element.expanded = !element.expanded;
        resTree = getChildren(this.state.pageMap, null);
        this.setState({
            tabPages: pagesArray,
            resultTree: resTree
        })
    }

    onChangeTree(treeData) {
        console.log(treeData)
        return this.setState({ resultTree: treeData })
    }

    showPage(e) {
        let map = new Map();
        let clickedTabPageId = Number(e.target.dataset.tabid);
        let pageElements = this.state.tabPages.find((page) => {
            return page.pageId === clickedTabPageId
        }).elements;
        map = drawMap(pageElements, new Map());
        let resTree = [];
        //if (typeof map.get === "function") {
        resTree = getChildren(map, null);
        //}
        this.setState(function () {
            return {
                activeTabPageId: clickedTabPageId,
                settingsForSite: false,
                resultTree: resTree,
                pageMap: map
            }
        })
    }

    removePage(e) {
        let len = this.state.tabPages.length;
        if (len > 1) {
            let pages = this.state.tabPages.slice();
            let id = findPage(e.target, pages).pageId;
            this.setState({
                tabPages: pages.filter(function (page) {
                    if (page.pageId !== id) {
                        return page
                    }
                }),
                activeTabPageId: ""
            })
        }
    }

    closePage() {
        this.setState(function () {
            return {
                activeTabPageId: ""
            }
        })
    }

    addPage() {
        let id = this.state.tabPages[this.state.tabPages.length - 1].pageId + 1;
        let updateArray = this.state.tabPages.slice();
        updateArray.push(
            {
                "url": "",
                "urlHost": "",
                "urlTemplate": "",
                "urlMatch": "Equals",
                "title": "",
                "titleMatch": "Equals",
                "name": "Default Page " + id,
                "pageId": id,
                "package": "",
                "elements": []
            }
        );
        this.setState(function () {
            return {
                tabPages: updateArray
            }
        })
    }

    editValue(e) {
        let field = e.target.dataset.attribute;
        let value = e.target.value;
        if (e.target.dataset.site === "siteInfo") {
            let updateObj = this.state.siteInfo;
            updateObj[field] = value;
            this.setState(function () {
                return {
                    siteInfo: updateObj
                }
            })
        } else {
            let updateObj = this.state.activePageObject;
            updateObj[field] = value;
            this.setState(function () {
                return {
                    activePageObject: updateObj
                }
            })
        }
    }

    selectPage(e) {
        let pages = this.state.tabPages.slice();
        let page = findPage(e.target, pages);
        this.setState({
            activeTabPageId: page.pageId,
            activePageObject: page
        })
    }

    debounce(page) {
        let inDebounce = undefined;
        let context = this;
        return function () {
            clearTimeout(inDebounce);
            return inDebounce = setTimeout(
                context.setState(function () {
                    return {
                        searchPage: page
                    }
                }), 1000);
        }();
    }

    searchPage(e) {
        let page = document.getElementById("searchInpput").value;
        this.debounce(page);
    }

    render() {
        let searchedPages = [];
        if (this.state.searchPage !== "") {
            let searchPageName = this.state.searchPage;
            searchedPages = this.state.tabPages.filter(function (page, index) {
                if (page.name.toLowerCase().includes(searchPageName.toLowerCase())) {
                    return page;
                }
            });
        } else {
            searchedPages = this.state.tabPages;
        }

        return (
            <div className="start">
                <Tabs tabPages={this.state.tabPages}
                    activeTabPage={this.state.activeTabPageId}
                    settingsForSite={this.state.settingsForSite}
                    showPage={this.showPage} />
                {
                    (this.state.settingsForSite) ?
                        <div id="manage-site">
                            <PanelLeftSite searchPage={this.searchPage}
                                searchedPages={searchedPages}
                                selectPage={this.selectPage}
                                addPage={this.addPage}
                                removePage={this.removePage} />
                            <PanelRightSite siteInfo={this.state.siteInfo}
                                activePageObject={this.state.activePageObject}
                                editValue={this.editValue}
                                activeTabPageId={this.state.activeTabPageId}
                                closePage={this.closePage} />
                        </div>
                        : null
                }
                {
                    (!this.state.settingsForSite && this.state.activeTabPageId !== "") ?
                        <div id="manage-site">
                            <PanelLeftPage tabPages={this.state.tabPages}
                                activeTabPage={this.state.activeTabPageId}
                                expandTreeNode={this.expandTreeNode}
                                removeElement={this.removeElement}
                                addElement={this.addElement}
                                resultTree={this.state.resultTree}
                                searchElement={this.searchElement}
                                onChangeTree={this.onChangeTree} />
                            <PanelRightPage />
                        </div>
                        : null
                }
            </div>
        )
    }
}