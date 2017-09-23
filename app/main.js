import { PageObjectJSON, SiteInfoJSON } from './data/pageObject';

import { Tabs } from './functional parts/tabs';
import { PanelLeftSite, PanelRightSite } from './functional parts/manageSite';
import { PanelLeftPage, PanelRightPage } from './functional parts/managePage';

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
            activePageObject: {}
        };
        this.addPage = this.addPage.bind(this);
        this.searchPage = this.searchPage.bind(this);
        this.selectPage = this.selectPage.bind(this);
        this.debounce = this.debounce.bind(this);
        this.editValue = this.editValue.bind(this);
        this.closePage = this.closePage.bind(this);
        this.removePage = this.removePage.bind(this);
        this.showPage = this.showPage.bind(this);
        this.expandTreeNode = this.expandTreeNode.bind(this);
    }

    componentDidMount() {
    }

    expandTreeNode(e) {
        let el = e.target;
        while (el.dataset.name === undefined) {
            el = el.parentNode;
        }
        let pageId = Number(el.dataset.pageid.replace(/\D/g, ""));
        let name = el.dataset.name;
        let pagesArray = this.state.tabPages.slice();
        let element = pagesArray.find((page)=>{
            return page.pageId === pageId
        }).elements.find((element)=>{
            return element.name === name
        })
        element.expanded = !element.expanded;
        this.setState({
            tabPages: pagesArray
        })
    }

    showPage(e) {
        let clickedTabPageId = Number(e.target.dataset.tabid);
        this.setState(function () {
            return {
                activeTabPageId: clickedTabPageId,
                settingsForSite: false
            }
        })
    }

    removePage(e) {
        let id;
        if (e.target.dataset.pageid) {
            id = Number(e.target.dataset.pageid.replace(/\D/g, ""));
        } else {
            id = Number(e.target.parentNode.dataset.pageid.replace(/\D/g, ""));
        }
        let len = this.state.tabPages.length;
        let pages;
        if (len > 1) {
            pages = this.state.tabPages.slice();
            this.setState(function () {
                return {
                    tabPages: pages.filter(function (page) {
                        if (page.pageId !== id) {
                            return page
                        }
                    }),
                    activeTabPageId: ""
                }
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
        let pageNum = Number(e.target.parentNode.dataset.pageid);
        let obj = this.state.tabPages.find(function (page) {
            if (page.pageId === pageNum) {
                return page;
            }
        });
        this.setState({
            activeTabPageId: pageNum,
            activePageObject: obj
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
                                expandTreeNode={this.expandTreeNode} />
                            <PanelRightPage />
                        </div>
                        : null
                }
            </div>
        )
    }
}