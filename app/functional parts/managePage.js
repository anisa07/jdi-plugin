import SortableTree from 'react-sortable-tree';
import * as pageActions from '../actions/pageActions';

function PanelLeftPage(props) {
    let state = props.state;
    let store = props.store;
    const canDrop = ({ node, nextParent, prevPath, nextPath }) => {
        if (nextParent === null || nextParent.type === "section" || nextParent.type === "form") {
            return true;
        }
        return false;
    };

    return (
        <div className="panel panel-default">
            <div className="panel-body leftContainer">
                <div className="selectContainer">
                    <input type="text"
                        className="form-control searchInput"
                        placeholder="Search element"
                        id="searchElementInput"
                        onChange={(e)=>{
                            let value = e.target.value;
                            store.dispatch(pageActions.searchElement(value))
                        }} />
                </div>
                <div>
                    <div style={{ height: 400 }}>
                        <SortableTree
                            canDrop={canDrop}
                            treeData={state.resultTree}
                            onChange={(data) => { store.dispatch(pageActions.changeTree(data)) }}
                            generateNodeProps={({ node }) => (
                                {
                                    buttons: (node.type === "section" || node.type === "form") ? [
                                        <button
                                            onClick={() => { store.dispatch(pageActions.selectElement(node.elId)) }}
                                        >
                                            <img src={'../bootstrap/pics/gear.png'} />
                                        </button>,
                                        <button
                                            onClick={() => { store.dispatch(pageActions.addElement(node.elId)) }}
                                        >
                                            <img src={'../bootstrap/pics/add.png'} />
                                        </button>,
                                        <button
                                            onClick={() => { store.dispatch(pageActions.deleteElement(node.elId)) }}
                                        >
                                            <img src={'../bootstrap/pics/trash.png'} />
                                        </button>
                                    ] : [<button
                                        onClick={() => { store.dispatch(pageActions.selectElement(node.elId)) }}
                                    >
                                        <img src={'../bootstrap/pics/gear.png'} />
                                    </button>,
                                    <button
                                        onClick={() => { store.dispatch(pageActions.deleteElement(node.elId)) }}
                                    >
                                        <img src={'../bootstrap/pics/trash.png'} />
                                    </button>]
                                }
                            )}
                        />
                    </div>
                </div>
                <div className="selectContainer">
                    <button className="btn btn-default addElemntBtn"
                        onClick={() => { store.dispatch(pageActions.addElement(null)) }}
                    >Add element</button>
                </div>
            </div>
        </div>
    )
}

// PanelLeftPage.propTypes = {
//     resultTree: PropTypes.array.isRequired,
//     activeTabPage: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number
//     ]),
//     addElement: PropTypes.func.isRequired,
//     removeElement: PropTypes.func.isRequired,
//     onChangeTree: PropTypes.func.isRequired,
//     searchElement: PropTypes.func.isRequired
// }

function PanelRightPage(props) {
    let state = props.state;
    let store = props.store;
    return (
        <div className="panel panel-default">
            <div className="panel-body">
                {(typeof state.selectedElement === "object") ? <div>
                    <div className="selectContainer">
                        <span>Name: </span>
                        <input type="text"
                            className="form-control pageSetting"
                            value={state.selectedElement.name}
                            placeholder="Element name"
                            onChange={(e) => {
                                let value = e.target.value;
                                store.dispatch(pageActions.editElement(["name"], value))
                            }} />
                        <select className="form-control pageSettingCombo" value={state.selectedElement.type} onChange={(e) => {
                                let value = e.target.value;
                                store.dispatch(pageActions.editElement(["type"], value))}}>
                            {
                                state.Elements.map((element) => {
                                    return (
                                        <option key={element.toLowerCase()} value={element.toLowerCase()}>{element}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="selectContainer">
                        <span>Locator: </span>
                        <input type="text" 
                            className="form-control pageSetting" 
                            value={state.selectedElement.locator.path} 
                            placeholder="Locator"
                            onChange={(e) => {
                                let value = e.target.value;
                                store.dispatch(pageActions.editElement(["locator","path"], value))
                            }}/>
                        <select className="form-control pageSettingCombo" 
                            value={state.selectedElement.locator.type} 
                            onChange={(e) => {
                                let value = e.target.value;
                                store.dispatch(pageActions.editElement(["locator","type"], value))}}>
                            {
                                state.Locators.map((locator) => {
                                    return (
                                        <option key={locator} value={locator}>{locator}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div> : null}
            </div>
        </div>
    )
}

export { PanelLeftPage, PanelRightPage }