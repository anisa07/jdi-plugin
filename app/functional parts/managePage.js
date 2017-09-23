function PanelLeftPage(props) {
    let pageElements = props.tabPages.find(function (tabPage) {
        if (tabPage.pageId === props.activeTabPage) {
            return tabPage;
        }
    }).elements;
    let resultTree = [];

    if (pageElements.length){
        let mapArr = new Map();
        let find;
    
        for (let i = 0; i < pageElements.length; i++) {
            let element = pageElements[i];
            let parent = element.parent;
            if (mapArr.has(parent)) {
                let list = mapArr.get(parent);
                list.push(element);
            } else {
                mapArr.set(parent, [element])
            }
        }
    
        function getChildren(arr) {
            let tree = [];
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                let element = arr[i];
                element.children = [];
                if (mapArr.has(element.name)) {
                    element.children.push(getChildren(mapArr.get(element.name)));
                }
                tree.push(element)
            }
            return tree;
        }
    
        resultTree = getChildren(mapArr.get(null));
    } else {
        resultTree = pageElements;
    }

    function draw(array) {
        return (
            <ul className="tree">
                {
                    array.map(function (element, index) {
                        let children = false;
                        let arr = [];
                        if (element.children){
                            children = !!element.children.length && element.expanded;
                            arr = element.children[0];        
                        }
                        return (
                            <li key={element.name + index} 
                                data-pageid={props.activeTabPage}
                                data-name={element.name} 
                                data-parent={element.parent} 
                                /*style={{ paddingLeft: element.padding + 'px' }}*/>
                                <button className="img-on-btn btn btn-default" 
                                    onClick={props.expandTreeNode}>
                                    <img src={'../bootstrap/pics/add.png'} /></button>
                                <a data-parent={element.parent}>{element.name}</a>
                                <button className="img-on-btn btn btn-default" 
                                    data-pageid={props.activeTabPage}>
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
                    <input type="text" className="form-control searchElementInput" placeholder="Search element"
                        id="searchElementInpput" />
                    <div className="btn-group" role="group">
                        <button className="btn btn-default btnGen">Generate</button>
                        <button className="btn btn-default">Gear</button>
                    </div>
                </div>
                <div>
                    {draw(resultTree)}
                </div>
                <div className="selectContainer">
                    <button className="btn btn-default addElemntBtn">Add element</button>
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

export {PanelLeftPage, PanelRightPage}