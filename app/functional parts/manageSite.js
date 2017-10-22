function PanelLeftSite(props) {
    let state = props.state;
    return (
        <div className="panel panel-default">
            <div className="panel-body leftContainer">
                <div className="selectContainer">
                    <input type="text"
                        className="form-control searchInput"
                        placeholder="Search page"
                        id="searchInput"
                        onChange={(e)=>{let value = e.target.value; props.searchPage(value)}} />
                </div>
                <div>
                    <ul>
                        {
                            state.searchedPages.map(function (page, index) {
                                return (<li key={"listItem" + index}
                                    data-pageid={page.pageId}>
                                    <a onClick={()=>(props.selectPage(page.pageId))}
                                        className={(state.activeTabPageId === page.pageId) ? "selectPage" : ""}>{page.name}</a>
                                    <button className="img-on-btn btn btn-default"
                                        data-pageid={page.pageId}
                                        onClick={()=>{props.deletePage(page.pageId)}}><img src={'../bootstrap/pics/trash.png'} /></button>
                                </li>)
                            })
                        }
                    </ul>
                </div>
                <div className="selectContainer">
                    <button className="btn btn-default customBtn addBtn"
                        onClick={()=>{props.addPage()}}>Add page</button>
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
    return (
        <div className="panel panel-default">
            <div className="panel-body">
                {(props.activeTabPageId === -1) ? <div>
                    <div className="selectContainer">
                        <span>Name: </span>
                        <input type="text"
                            className="form-control searchInput"
                            data-attribute="siteTitle"
                            data-site="siteInfo"
                            defaultValue={props.siteInfo.siteTitle}
                            placeholder="Application name"
                            onChange={props.editValue} />
                    </div>
                    <div className="selectContainer">
                        <span>Domain: </span>
                        <input type="text"
                            className="form-control searchInput"
                            data-attribute="domainName"
                            data-site="siteInfo"
                            defaultValue={props.siteInfo.domainName}
                            placeholder="Domain name"
                            onChange={props.editValue} />
                    </div>
                </div> : null}
                {(props.activeTabPageId > -1) ? <div className="leftContainer">
                    <div className="selectContainer">
                        <span>Name: </span>
                        <input type="text"
                            className="form-control pageSetting"
                            value={props.activePageObject.name}
                            data-attribute="name"
                            placeholder="Page name" onChange={props.editValue} />
                        <button className="btn btn-default"
                            id={"closePage" + props.activePageObject.pageId}
                            onClick={props.closePage}>X
                        </button>
                    </div>
                    <div className="selectContainer">
                        <span>Title: </span>
                        <input type="text"
                            className="form-control pageSetting"
                            value={props.activePageObject.title}
                            data-attribute="title"
                            placeholder="Title"
                            onChange={props.editValue} />
                        <select className="form-control pageSettingCombo"
                            value={props.activePageObject.titleMatch}
                            onChange={props.editValue}
                            data-attribute="titleMatch">
                            <option value="Equals">Equals</option>
                            <option value="Contains">Contains</option>
                            <option value="Not contains">Not contains</option>
                        </select>
                    </div>
                    <div className="selectContainer">
                        <span>Url: </span>
                        <input type="text"
                            className="form-control pageSetting"
                            value={props.activePageObject.url}
                            data-attribute="url"
                            placeholder="Page url"
                            onChange={props.editValue} />
                        <select className="form-control pageSettingCombo"
                            value={props.activePageObject.urlMatch}
                            onChange={props.editValue}
                            data-attribute="urlMatch">
                            <option value="Equals">Equals</option>
                            <option value="Contains">Contains</option>
                            <option value="Not contains">Not contains</option>
                        </select>
                    </div>
                    <div className="selectContainer">
                        <span>Url template: </span>
                        <input type="text"
                            className="form-control pageSetting"
                            value={props.activePageObject.urlTemplate}
                            data-attribute="urlTemplate"
                            placeholder="Url template"
                            onChange={props.editValue} />
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