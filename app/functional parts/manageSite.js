import * as siteActions from '../actions/siteActions';
let clearValue = () => {
    $("#searchInput")[0].value = "";
}
function PanelLeftSite(props) {
    let state = props.state;
    let store = props.store;
    return (
        <div className="panel panel-default">
            <div className="panel-body leftContainer">
                <div className="selectContainer">
                    <input type="text"
                        className="form-control searchInput"
                        placeholder="Search page"
                        id="searchInput"
                        onChange={(e) => { let value = e.target.value; store.dispatch(siteActions.searchPage(value)) }} />
                </div>
                <div>
                    <ul>
                        {
                            state.searchedPages.map(function (page, index) {
                                return (<li key={"listItem" + index}
                                    data-pageid={page.pageId}>
                                    <a onClick={() => {store.dispatch(siteActions.selectPage(page.pageId))}}
                                        className={(state.activeTabPageId === page.pageId) ? "selectPage" : ""}>{page.name}</a>
                                    <button className="img-on-btn btn btn-default"
                                        data-pageid={page.pageId}
                                        onClick={() => {clearValue(); store.dispatch(siteActions.deletePage(page.pageId))}}><img src={'../bootstrap/pics/trash.png'} /></button>
                                </li>)
                            })
                        }
                    </ul>
                </div>
                <div className="selectContainer">
                    <button className="btn btn-default customBtn addBtn"
                        onClick={() => { store.dispatch(siteActions.addPage()) }}>Add page</button>
                </div>
            </div>
        </div>
    )
}
//selectPage
// PanelLeftSite.propTypes = {
//     searchPage: PropTypes.func.isRequired,
//     searchedPages: PropTypes.array.isRequired,
//     selectPage: PropTypes.func.isRequired,
//     addPage: PropTypes.func.isRequired,
//     removePage: PropTypes.func.isRequired,
//     selectPageId: PropTypes.number.isRequired
// }

function PanelRightSite(props) {
    let state = props.state;
    let store = props.store;
    return (
        <div className="panel panel-default">
            <div className="panel-body">
                {(state.activeTabPageId === -1) ? <div>
                    <div className="selectContainer">
                        <span>Name: </span>
                        <input type="text"
                            className="form-control pageSetting"
                            defaultValue={state.SiteInfo.siteTitle}
                            placeholder="Application name"
                            onBlur={(e) => { let value = e.target.value; store.dispatch(siteActions.editValue(["SiteInfo", "siteTitle"], value))}} />
                    </div>
                    <div className="selectContainer">
                        <span>Domain: </span>
                        <input type="text"
                            className="form-control pageSetting"
                            defaultValue={state.SiteInfo.domainName}
                            placeholder="Domain name"
                            onBlur={(e) => { let value = e.target.value; store.dispatch(siteActions.editValue(["SiteInfo", "domainName"], value))}} />
                    </div>
                </div> : null}
                {(state.activeTabPageId > -1) ? <div className="leftContainer">
                    <div className="selectContainer">
                        <span>Name: </span>
                        <input type="text"
                            className="form-control pageSetting"
                            value={state.activePageObject.name}
                            placeholder="Page name" 
                            onChange={(e) => { let value = e.target.value; store.dispatch(siteActions.editValue(["name"], value, state.activeTabPageId)) }} />
                        <button className="btn btn-default"
                            id={"closePage" + state.activePageObject.pageId}
                            onClick={props.closePage}>X
                        </button>
                    </div>
                    <div className="selectContainer">
                        <span>Title: </span>
                        <input type="text"
                            className="form-control pageSetting"
                            value={state.activePageObject.title}
                            placeholder="Title"
                            onChange={(e) => { let value = e.target.value;store.dispatch(siteActions.editValue(["title"], value, state.activeTabPageId)) }} />
                        <select className="form-control pageSettingCombo"
                            value={state.activePageObject.titleMatch}
                            onChange={(e) => { let value = e.target.value; store.dispatch(siteActions.editValue(["titleMatch"], value, state.activeTabPageId)) }}>
                            <option value="Equals">Equals</option>
                            <option value="Contains">Contains</option>
                            <option value="Not contains">Not contains</option>
                        </select>
                    </div>
                    <div className="selectContainer">
                        <span>Url: </span>
                        <input type="text"
                            className="form-control pageSetting"
                            value={state.activePageObject.url}
                            placeholder="Page url"
                            onChange={(e) => { let value = e.target.value; store.dispatch(siteActions.editValue(["url"], value, state.activeTabPageId)) }} />
                        <select className="form-control pageSettingCombo"
                            value={state.activePageObject.urlMatch}
                            onChange={(e) => { let value = e.target.value; store.dispatch(siteActions.editValue(["urlMatch"], value, state.activeTabPageId))}}>
                            <option value="Equals">Equals</option>
                            <option value="Contains">Contains</option>
                            <option value="Not contains">Not contains</option>
                        </select>
                    </div>
                    <div className="selectContainer">
                        <span>Url template: </span>
                        <input type="text"
                            className="form-control pageSetting"
                            value={state.activePageObject.urlTemplate}
                            placeholder="Url template"
                            onChange={(e) => { let value = e.target.value; store.dispatch(siteActions.editValue(["urlTemplate"], value, state.activeTabPageId)) }} />
                    </div>
                </div> : null}
            </div>
        </div>
    )
}

// PanelRightSite.propTypes = {
//     editValue: PropTypes.func.isRequired,
//     siteInfo: PropTypes.object.isRequired,
//     activePageObject: PropTypes.object.isRequired,
//     activeTabPageId: PropTypes.number.isRequired,
//     closePage: PropTypes.func.isRequired
// }

export { PanelLeftSite, PanelRightSite };