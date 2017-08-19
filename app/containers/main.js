//import {settingsObj} from "./settings";
import elementsJSON from "../data/pageObject.json";

function Tabs(props) {
    return (
        <ul className="nav nav-tabs">
            {
                props.tabPages.map(function (tabPage) {
                    let tabPageName = tabPage.name || "Page ";
                    return (
                        <li role="presentation" className={tabPage.pageId === props.activeTabPage ? "active" : ""}
                            key={"tabPage " + tabPage.pageId} onClick={props.showPage}>
                            <a href="#" data-tabId={tabPage.pageId}>{tabPageName}{tabPage.pageId + 1}</a>
                        </li>
                    )
                })
            }
        </ul>
    )
}

function Controls(props) {
    return (
        <div id={"controls" + props.controlsId}>
            <button className="btn btn-default customBtn">Get elements</button>
            <button className="btn btn-default customBtn">Generate file</button>
            <button className="btn btn-default customBtn">Save file</button>
            <button className="btn btn-default customBtn" id={"closePage" + props.controlsId} onClick={props.closePage}>
                X
            </button>
        </div>
    )
}

function PageAttributes(props) {
    return (
        <div>
            <div id={"content" + props.controlsId} className="form-group">
                <div className="col-xs-2 selectContainer">
                    <label className="control-label displayType"
                           htmlFor={"inputUrl" + props.controlsId}>URL:</label><br></br>
                    <input type="text" className="form-control" id={"inputUrl" + props.controlsId}
                           readOnly="readonly" defaultValue={props.tabPageContent.url}/>
                </div>
                <div className="col-xs-2 selectContainer">
                    <label className="control-label displayType" htmlFor={"urlTemplate" + props.controlsId}>URL
                        template:</label><br></br>
                    <input type="text" className="form-control" id={"urlTemplate" + props.controlsId}
                           defaultValue={props.tabPageContent.urlTemplate} onBlur={props.changeAttribute}/>
                </div>
                <div className="col-xs-2 selectContainer">
                    <label className="control-label displayType" htmlFor={"urlMatch" + props.controlsId}>URL
                        match:</label><br></br>
                    <select className="form-control" name="size" id={"urlMatch" + props.controlsId}
                            defaultValue={props.tabPageContent.urlMatch}
                            onChange={props.changeAttribute}>
                        <option value="Equals">Equals</option>
                        <option value="Contains">Contains</option>
                        <option value="Not contains">Not contains</option>
                    </select>
                </div>
                <div className="col-xs-2 selectContainer">
                    <label className="control-label displayType" htmlFor={"pageTitle" + props.controlsId}>Title:</label><br></br>
                    <input type="text" className="form-control" id={"pageTitle" + props.controlsId}
                           defaultValue={props.tabPageContent.title} onBlur={props.changeAttribute}/>
                </div>
                <div className="col-xs-2 selectContainer">
                    <label className="control-label displayType"
                           htmlFor={"titleTemplate" + props.controlsId}>Title
                        template:</label><br></br>
                    <input type="text" className="form-control" id={"titleTemplate" + props.controlsId}
                           defaultValue={props.tabPageContent.titleTemplate} onBlur={props.changeAttribute}/>
                </div>
                <div className="col-xs-2 selectContainer">
                    <label className="control-label displayType" htmlFor={"titleMatch" + props.controlsId}>Title
                        match:</label><br></br>
                    <select className="form-control" name="size" id={"titleMatch" + props.controlsId}
                            defaultValue={props.tabPageContent.titleMatch} onChange={props.changeAttribute}>
                        <option value="Equals">Equals</option>
                        <option value="Contains">Contains</option>
                        <option value="Not contains">Not contains</option>
                    </select>
                </div>
                <div className="col-xs-2 selectContainer">
                    <label className="control-label displayType" htmlFor={"package" + props.controlsId}>Package:</label><br></br>
                    <input type="text" className="form-control" id={"package" + props.controlsId}
                           defaultValue={props.tabPageContent.package} onBlur={props.changeAttribute}/>
                </div>
            </div>
            <div id={"containers" + props.controlsId}>
                <div id={"contentContainer" + props.controlsId}
                     className="elementsList">
                    {props.tabPageContent.elements.map(function (element, index) {
                        return (
                            <div className="form-group elementContainer" draggable={true}
                                 key={props.controlsId + "jdi" + index}>
                                <div className="selectContainer">
                                    <input className="form-control" placeholder="Name of element"
                                           defaultValue={element.name}
                                           onClick={props.expandAtributes}
                                           data-page={props.controlsId}
                                           data-index={index}/>
                                </div>
                                {
                                    element.expanded ?
                                        <div className="otherAttr">
                                            <input className="form-control" placeholder="Type of element"
                                                   defaultValue={element.type}/>
                                            <input className="form-control" placeholder="Type of locator"
                                                   defaultValue={element.locator.type}/>
                                            <input className="form-control" placeholder="Locator"
                                                   defaultValue={element.locator.path}/>
                                        </div>
                                        : null
                                }
                            </div>
                        )
                    })}
                </div>
                <div className="elements">
                    <button className="btn btn-default" id={"addElement" + props.controlsId}
                            onClick={props.addElement}>Manually identify element
                    </button>
                </div>
                <div id={"codeContainer" + props.controlsId} className="form-group">
                    <textarea type="text" id={"code" + props.controlsId}
                              className="form-control code-textarea"></textarea>
                </div>
            </div>
        </div>
    )
}

function PageContainer(props) {
    return (
        <div>
            <Tabs tabPages={props.tabPages} activeTabPage={props.activeTabPage} showPage={props.showPage}/>
            {
                props.tabPages.map(function (tabPage) {
                    return (
                        <div className={tabPage.pageId !== props.activeTabPage ? "hideContent" : ""}
                             key={"content " + tabPage.pageId}>
                            <Controls controlsId={tabPage.pageId} closePage={props.closePage}/>
                            <PageAttributes controlsId={tabPage.pageId}
                                            tabPageContent={tabPage}
                                            changeAttribute={props.changeAttribute}
                                            selectValue={props.selectValue}
                                            addElement={props.addElement}
                                            expandAtributes={props.expandAttributes}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            tabPages: elementsJSON.slice(),
            activeTabPageId: 0
        };
        this.showPage = this.showPage.bind(this);
        this.changeAttribute = this.changeAttribute.bind(this);
        this.closePage = this.closePage.bind(this);
        this.addElement = this.addElement.bind(this);
        this.expandAttributes = this.expandAttributes.bind(this);
    }

    componentDidMount() {

    }

    expandAttributes(e) {

    }

    addElement(e) {
        let id = Number(e.target.id.replace(/\D/g, ""));
        let pages = this.state.tabPages.slice();
        this.setState(function () {
            return {
                tabPages: pages.map(function (page) {
                    if (page.pageId === id) {
                        page.elements.push({
                            "expanded": false,
                            "name": "",
                            "type": "",
                            "parent": null,
                            "locator": {
                                "type": "",
                                "path": ""
                            }
                        })
                    }
                    return page;
                }),
            }
        })
    }

    closePage(e) {
        let len = this.state.tabPages.length;
        let id = Number(e.target.id.replace(/\D/g, ""));
        let pages;
        if (len > 1) {
            pages = this.state.tabPages.slice();
            this.setState(function () {
                return {
                    tabPages: pages.filter(function (page) {
                        if (page.pageId !== id) {
                            return page
                        }
                    })
                }
            })

        }
    }

    changeAttribute(e) {
        let name = e.target.id.replace(/\d/g, "");
        let id = Number(e.target.id.replace(/\D/g, ""));
        let value = e.target.value;
        let result = this.state.tabPages.slice();
        this.setState(function () {
            return {
                tabPages: result.map(function (page) {
                    if (page.pageId === id) {
                        page[name] = value;
                    }
                    return page;
                })
            }
        })
    }

    showPage(e) {
        let clickedTabPageId = Number(e.target.dataset.tabid);
        this.setState(function () {
            return {
                activeTabPageId: clickedTabPageId
            }
        })
    }

    render() {
        return (
            <div id="main-page">
                <PageContainer tabPages={this.state.tabPages}
                               activeTabPage={this.state.activeTabPageId}
                               closePage={this.closePage}
                               showPage={this.showPage}
                               changeAttribute={this.changeAttribute}
                               selectValue={this.selectValue}
                               addElement={this.addElement}
                               expandAttributes={this.expandAttributes}
                />
            </div>
        )
    }
}

export {MainPage}
