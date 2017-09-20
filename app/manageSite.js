import { PageObjectJSON, SiteInfoJSON } from './data/pageObject';


if (!window.indexedDB) {
    window.alert("Ваш браузер не поддерживат стабильную версию IndexedDB. Такие-то функции будут недоступны");
}

function Tabs(props) {
    return (
        <ul className="nav nav-tabs">
            {
                props.tabPages.map(function (tabPage) {
                    let tabPageName = tabPage.name || "Page " + (tabPage.pageId + 1);
                    return (
                        <li role="presentation" /*className={((tabPage.pageId === props.activeTabPage) && !props.settingsForSite) ? "active" : ""}*/
                            key={"tabPage " + tabPage.pageId} onClick={props.showPage}>
                            <a href="#" data-tabId={tabPage.pageId} className={((tabPage.pageId === props.activeTabPage) && !props.settingsForSite) ? "active" : ""}>{tabPageName}</a>
                        </li>
                    )
                })
            }
        </ul>
    )
}

function PanelLeft(props) {
    return (
        <div className="panel panel-default">
            <div className="panel-body">
                <div className="selectContainer">
                    <input type="text" className="form-control searchInput" placeholder="Search page" id="searchInpput" onChange={props.searchPage} />
                </div>
                <div>
                    <ul>
                        {
                            props.searchedPages.map(function (page, index) {
                                return (<li key={"listItem" + index} data-pageId={page.pageId}>
                                    <a onClick={props.selectPage}>{page.name}</a>
                                    <button className="trash btn btn-default" data-pageId={page.pageId} onClick={props.removePage}></button>
                                </li>)
                            })
                        }
                    </ul>
                </div>
                <div className="selectContainer">
                    <button className="btn btn-default customBtn addBtn" onClick={props.addPage}>Add page</button>
                </div>
            </div>
        </div>
    )
}

function PanelRight(props) {
    return (
        <div className="panel panel-default">
            <div className="panel-body">
                {(typeof props.activeTabPageId === "string") ? <div>
                    <div className="selectContainer"><span>Name: </span><input type="text" className="form-control searchInput" data-attribute="siteTitle" data-site="siteInfo" defaultValue={props.siteInfo.siteTitle} placeholder="Application name" onChange={props.editValue} /></div>
                    <div className="selectContainer"><span>Domain: </span><input type="text" className="form-control searchInput" data-attribute="domainName" data-site="siteInfo" defaultValue={props.siteInfo.domainName} placeholder="Domain name" onChange={props.editValue} /></div>
                </div> : null}
                {(typeof props.activeTabPageId === "number") ? <div>
                    <div className="selectContainer">
                        <span>Name: </span><input type="text" className="form-control pageSetting" value={props.activePageObject.name} data-attribute="name" placeholder="Page name" onChange={props.editValue} />
                        <button className="btn btn-default" id={"closePage" + props.activePageObject.pageId} onClick={props.closePage}>X</button>
                    </div>
                    <div className="selectContainer"><span>Title: </span><input type="text" className="form-control pageSetting" value={props.activePageObject.title} data-attribute="title" placeholder="Title" onChange={props.editValue} />
                        <select className="form-control pageSettingCombo" value={props.activePageObject.titleMatch} onChange={props.editValue} data-attribute="titleMatch">
                            <option value="Equals">Equals</option>
                            <option value="Contains">Contains</option>
                            <option value="Not contains">Not contains</option>
                        </select></div>
                    <div className="selectContainer"><span>Url: </span><input type="text" className="form-control pageSetting" value={props.activePageObject.url} data-attribute="url" placeholder="Page url" onChange={props.editValue} />
                        <select className="form-control pageSettingCombo" value={props.activePageObject.urlMatch} onChange={props.editValue} data-attribute="urlMatch">
                            <option value="Equals">Equals</option>
                            <option value="Contains">Contains</option>
                            <option value="Not contains">Not contains</option>
                        </select>
                    </div>
                    <div className="selectContainer"><span>Url template: </span><input type="text" className="form-control pageSetting" value={props.activePageObject.urlTemplate} data-attribute="urlTemplate" placeholder="Url template" onChange={props.editValue} /></div>
                </div> : null}
            </div>
        </div>
    )
}

function PanelLeftStructure(props) {
    let pageElements = props.tabPages.find(function(tabPage){
        if (tabPage.pageId === props.activeTabPage){
            return tabPage;
        }
    });
  
    return (
        <div className="panel panel-default">
            <div className="panel-body">
                <div className="selectContainer searchElements">
                    <input type="text" className="form-control searchElementInput" placeholder="Search element" id="searchElementInpput" />
                    <div className="btn-group" role="group">
                        <button className="btn btn-default btnGen">Generate</button>
                        <button className="btn btn-default">Gear</button>
                    </div>
                </div>
                <div>
                    <ul>
                        {
                            pageElements.elements.map(function (element, index) {
                                return (<li key={"element" + index} data-pageId={props.activeTabPage} data-index={index}>
                                    <a>{element.name}</a>
                                    <button className="trash btn btn-default" data-pageId={props.activeTabPage} data-index={index}></button>
                                </li>)
                            })
                        }
                    </ul>
                </div>
                <div className="selectContainer">
                    <button className="btn btn-default addElemntBtn">Add element</button>
                </div>
            </div>
        </div>
    )
}

function PanelRighttStructure() {
    return (
        <div className="panel panel-default">
            <div className="panel-body">
                {/* {(typeof props.activeTabPageId === "string") ? <div>
                    <div className="selectContainer"><span>Name: </span><input type="text" className="form-control searchInput" data-attribute="siteTitle" data-site="siteInfo" defaultValue={props.siteInfo.siteTitle} placeholder="Application name" onChange={props.editValue} /></div>
                    <div className="selectContainer"><span>Domain: </span><input type="text" className="form-control searchInput" data-attribute="domainName" data-site="siteInfo" defaultValue={props.siteInfo.domainName} placeholder="Domain name" onChange={props.editValue} /></div>
                </div> : null}
                {(typeof props.activeTabPageId === "number") ? <div>
                    <div className="selectContainer">
                        <span>Name: </span><input type="text" className="form-control pageSetting" value={props.activePageObject.name} data-attribute="name" placeholder="Page name" onChange={props.editValue} />
                        <button className="btn btn-default" id={"closePage" + props.activePageObject.pageId} onClick={props.closePage}>X</button>
                    </div>
                    <div className="selectContainer"><span>Title: </span><input type="text" className="form-control pageSetting" value={props.activePageObject.title} data-attribute="title" placeholder="Title" onChange={props.editValue} />
                        <select className="form-control pageSettingCombo" value={props.activePageObject.titleMatch} onChange={props.editValue} data-attribute="titleMatch">
                            <option value="Equals">Equals</option>
                            <option value="Contains">Contains</option>
                            <option value="Not contains">Not contains</option>
                        </select></div>
                    <div className="selectContainer"><span>Url: </span><input type="text" className="form-control pageSetting" value={props.activePageObject.url} data-attribute="url" placeholder="Page url" onChange={props.editValue} />
                        <select className="form-control pageSettingCombo" value={props.activePageObject.urlMatch} onChange={props.editValue} data-attribute="urlMatch">
                            <option value="Equals">Equals</option>
                            <option value="Contains">Contains</option>
                            <option value="Not contains">Not contains</option>
                        </select>
                    </div>
                    <div className="selectContainer"><span>Url template: </span><input type="text" className="form-control pageSetting" value={props.activePageObject.urlTemplate} data-attribute="urlTemplate" placeholder="Url template" onChange={props.editValue} /></div>
                </div> : null} */}
            </div>
        </div>
    )
}
export class ManageSite extends React.Component {
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

    }

    componentDidMount() {

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
        let len = this.state.tabPages.length;
        let id = Number(e.target.dataset.pageid.replace(/\D/g, ""));
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
        )
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
        })
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
                <Tabs tabPages={this.state.tabPages} activeTabPage={this.state.activeTabPageId} settingsForSite={this.state.settingsForSite} showPage={this.showPage} />
                {
                    (this.state.settingsForSite) ?
                        <div id="manage-site">
                            <PanelLeft searchPage={this.searchPage} searchedPages={searchedPages} selectPage={this.selectPage} addPage={this.addPage} removePage={this.removePage} />
                            <PanelRight siteInfo={this.state.siteInfo} activePageObject={this.state.activePageObject} editValue={this.editValue} activeTabPageId={this.state.activeTabPageId} closePage={this.closePage} />
                        </div>
                        : null
                }
                {
                    (!this.state.settingsForSite && this.state.activeTabPageId !== "") ?
                        <div id="manage-site">
                            <PanelLeftStructure tabPages={this.state.tabPages} activeTabPage={this.state.activeTabPageId}/>
                            <PanelRighttStructure />
                        </div>
                        : null
                }
            </div>
        )
    }
}