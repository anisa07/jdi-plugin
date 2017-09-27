function PanelLeftPage(props) {
    function draw(array) {
        return (
            <ul className="tree">
                {
                    array.map(function (element, index) {
                        let children = false;
                        let arr = [];
                        let vis = {
                            visibility: "hidden"
                        }
                        if (element.children) {
                            children = !!element.children.length && element.expanded;
                            arr = element.children[0];
                            vis.visibility = !!element.children.length ? "visible" : "hidden";
                        }
                        return (
                            <li key={element.name + index}
                                data-pageid={props.activeTabPage}
                                data-name={element.name}
                                data-parent={element.parent}
                                /*style={{ paddingLeft: element.padding + 'px' }}*/>
                                <button className="img-on-btn btn btn-default"
                                    onClick={props.expandTreeNode}
                                    style={vis}>
                                    <img src={'../bootstrap/pics/add.png'} /></button>
                                <a data-parent={element.parent}>{element.name}</a>
                                <button className="img-on-btn btn btn-default"
                                    onClick={props.addElement}>
                                    <img src={'../bootstrap/pics/add.png'} /></button>
                                <button className="img-on-btn btn btn-default"
                                    onClick={props.removeElement}>
                                    <img src={'../bootstrap/pics/trash.png'} /></button>
                                {children ? draw(arr) : ""}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    return (
        <div className="panel panel-default">
            <div className="panel-body">
                <div className="selectContainer searchElements">
                    <input type="text" className="form-control searchElementInput"
                        placeholder="Search element"
                        id="searchElementInpput"
                        onBlur={props.searchElement} />
                    <div className="btn-group" role="group">
                        <button className="btn btn-default btnGen">Generate</button>
                        <button className="btn btn-default">Gear</button>
                    </div>
                </div>
                <div>
                    {draw(props.resultTree)}
                </div>
                <div className="selectContainer">
                    <button className="btn btn-default addElemntBtn"
                        data-pageid={props.activeTabPage}
                        data-name="null"
                        onClick={props.addElement}>Add element</button>
                </div>
            </div>
        </div>
    )
}

PanelLeftPage.propTypes = {
    tabPages: PropTypes.array.isRequired,
    activeTabPage: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    expandTreeNode: PropTypes.func.isRequired
}

function PanelRightPage() {
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

export { PanelLeftPage, PanelRightPage }