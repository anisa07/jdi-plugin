import {settingsObj} from "./settings";
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
            <button className="btn btn-default customBtn" id="closePage">X</button>
        </div>
    )
}

function PageAttributes(props) {
    return (
        <div>
            <div id={"content" + props.tabPageContent.pageId} className="form-group">
                <div className="col-xs-2 selectContainer">
                    <label className="control-label displayType"
                           htmlFor={"inputUrl" + props.tabPageContent.pageId}>URL:</label><br></br>
                    <input type="text" className="form-control" id={"inputUrl" + props.tabPageContent.pageId}
                           readOnly="readonly" value={props.tabPageContent.url}/>
                </div>
                <div className="col-xs-2 selectContainer">
                    <label className="control-label displayType" htmlFor={"urlTemplate" + props.tabPageContent.pageId}>URL
                        template:</label><br></br>
                    <input type="text" className="form-control" id={"urlTemplate" + props.tabPageContent.pageId}
                           value={props.tabPageContent.urlTemplate}/>
                </div>
                <div className="col-xs-2 selectContainer">
                    <label className="control-label displayType" htmlFor="urlMatch">URL match:</label><br></br>
                    <select className="form-control" name="size" id="urlMatch" value={props.tabPageContent.urlMatch}>
                        <option value="Equal">Equals</option>
                        <option value="Contains">Contains</option>
                        <option value="Not contains">Not contains</option>
                    </select>
                </div>
                <div className="col-xs-2 selectContainer">
                    <label className="control-label displayType" htmlFor={"pageTitle" + props.tabPageContent.pageId}>Title:</label><br></br>
                    <input type="text" className="form-control" id={"pageTitle" + props.tabPageContent.pageId}
                           value={props.tabPageContent.title}/>
                </div>
                <div className="col-xs-2 selectContainer">
                    <label className="control-label displayType"
                           htmlFor={"titleTemplate" + props.tabPageContent.pageId}>Title
                        template:</label><br></br>
                    <input type="text" className="form-control" id={"titleTemplate" + props.tabPageContent.pageId}
                           value={props.tabPageContent.titleTemplate}/>
                </div>
                <div className="col-xs-2 selectContainer">
                    <label className="control-label displayType" htmlFor={"titleMatch" + props.tabPageContent.pageId}>Title
                        match:</label><br></br>
                    <select className="form-control" name="size" id={"titleMatch" + props.tabPageContent.pageId}
                            value={props.tabPageContent.titleMatch}>
                        <option value="Equal">Equals</option>
                        <option value="Contains">Contains</option>
                        <option value="Not contains">Not contains</option>
                    </select>
                </div>
                <div className="col-xs-2 selectContainer">
                    <label className="control-label displayType" htmlFor={"package" + props.tabPageContent.pageId}>Package:</label><br></br>
                    <input type="text" className="form-control" id={"package" + props.tabPageContent.pageId}/>
                </div>
            </div>
            <div id={"containers" + props.tabPageContent.pageId} className="elements container-fluid">
                <div id={"contentContainer" + props.tabPageContent.pageId}
                     className="elementsList container-fluid"></div>
                <div id={"codeContainer" + props.tabPageContent.pageId} className="form-group col-xs-6">
                    <textarea type="text" id={"code" + props.tabPageContent.pageId}
                              className="form-control"></textarea>
                </div>
            </div>
            <button className="btn btn-default customBtn">Manually identify element</button>
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
                            <Controls controlsId={tabPage.pageId}/>
                            <PageAttributes tabPageContent={props.tabPages[tabPage.pageId]}/>
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
                <PageContainer tabPages={this.state.tabPages} activeTabPage={this.state.activeTabPageId}
                               showPage={this.showPage}/>
            </div>
        )
    }
}

export {MainPage}
