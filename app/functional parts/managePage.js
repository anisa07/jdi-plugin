import SortableTree from 'react-sortable-tree';
import React from 'react';


function PanelLeftPage(props) {
    const canDrop = ({ node, nextParent, prevPath, nextPath }) => {
        if (nextParent === null || nextParent.type === "section" || nextParent.type === "form") {
            return true;
        }
        return false;
    };

    return (
        <div className="panel panel-default">
            <div className="panel-body">
                <div>
                    <div style={{ height: 400 }}>
                        <SortableTree
                            canDrop={canDrop}
                            treeData={props.resultTree}
                            onChange={props.onChangeTree}
                            generateNodeProps={({node}) => (
                                {buttons: (node.type === "section" || node.type === "form") ? [
                                    <button
                                        data-pageid={props.activeTabPage}
                                        data-name={node.title}
                                        onClick={props.addElement}>
                                        <img src={'../bootstrap/pics/add.png'} />
                                    </button>,
                                    <button
                                        data-pageid={props.activeTabPage}
                                        data-name={node.title}
                                        onClick={props.removeElement}>
                                        <img src={'../bootstrap/pics/trash.png'} />
                                    </button>
                                    ] : [<button
                                        data-pageid={props.activeTabPage}
                                        data-name={node.title}
                                        onClick={props.removeElement}>
                                        <img src={'../bootstrap/pics/trash.png'} />
                                    </button>] 
                            })}
                        />
                    </div>
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
    resultTree: PropTypes.array.isRequired,
    activeTabPage: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    addElement: PropTypes.func.isRequired,
    removeElement: PropTypes.func.isRequired,
    onChangeTree: PropTypes.func.isRequired
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