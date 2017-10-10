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
                <div className="selectContainer">
                    <input type="text"
                        className="form-control searchInput"
                        placeholder="Search element"
                        id="searchElementInput"
                        onChange={props.searchElement} />
                </div>
                <div>
                    <div style={{ height: 400 }}>
                        <SortableTree
                            canDrop={canDrop}
                            treeData={props.resultTree}
                            onChange={props.onChangeTree}
                            generateNodeProps={({ node }) => (
                                {
                                    buttons: (node.type === "section" || node.type === "form") ? [
                                        <button
                                            data-title={node.title}
                                            onClick={props.selectElement}>
                                            <img src={'../bootstrap/pics/gear.png'} />
                                        </button>,
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
                                        data-title={node.title}
                                        onClick={props.selectElement}>
                                        <img src={'../bootstrap/pics/gear.png'} />
                                    </button>,
                                    <button
                                        data-pageid={props.activeTabPage}
                                        data-name={node.title}
                                        onClick={props.removeElement}>
                                        <img src={'../bootstrap/pics/trash.png'} />
                                    </button>]
                                }
                            )}
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
    onChangeTree: PropTypes.func.isRequired,
    searchElement: PropTypes.func.isRequired
}

function PanelRightPage(props) {
    return (
        <div className="panel panel-default">
            <div className="panel-body">
                {(typeof props.selectedElement === "object") ? <div>
                    <div className="selectContainer"><span>Name: </span><input type="text" className="form-control pageSetting" data-attribute="name" value={props.selectedElement.name} placeholder="Element name" onChange={props.editElement} />
                        <select className="form-control pageSettingCombo" data-attribute="type" value={props.selectedElement.type} onChange={props.editElement}>
                            {
                                props.elementsList.map((element) => {
                                    return (
                                        <option key={element.toLowerCase()} value={element.toLowerCase()}>{element}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="selectContainer"><span>Locator: </span><input type="text" className="form-control pageSetting" data-attribute="locator" data-sub="path" value={props.selectedElement.locator.path} placeholder="Locator" onChange={props.editElement} />
                        <select className="form-control pageSettingCombo" data-attribute="locator" data-sub="type" value={props.selectedElement.locator.type} onChange={props.editElement}>
                            {
                                props.locatorsList.map((locator) => {
                                    return (
                                        <option key={locator} value={locator}>{locator}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div> : null}
                {/* {(typeof props.activeTabPageId === "number") ? <div>
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