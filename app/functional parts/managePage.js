import SortableTree from 'react-sortable-tree';
import * as pageActions from '../actions/pageActions';
import * as rulesActions from '../actions/rulesActions';
import * as codeActions from '../actions/codeActions';

function PanelLeftPage(props) {
    let state = props.state;
    let store = props.store;
    let  droppedItem;
    const canDrop = ({ node, nextParent, prevPath, nextPath }) => {
        if (nextParent === null || nextParent.isSection) {
            droppedItem = node;
            return true;
        }
        return false;
    };

    return (
        <div className="panel panel-default">
            <div className="panel-body leftContainer">
                <div className="selectContainer topContainer">
                    <input type="text"
                        className="form-control searchInput"
                        placeholder="Search element"
                        id="searchElementInput"
                        onChange={(e) => {
                            let value = e.target.value;
                            store.dispatch(pageActions.searchElement(value))
                        }} />
                    <button className="btn btn-default" onClick={()=>{store.dispatch(pageActions.generateElements())}}>Generate PO</button>
                    <button className="btn btn-default" onClick={()=>{store.dispatch(codeActions.genCode())}}>Generate code</button>
                    <button className="btn btn-default" onClick={() => { store.dispatch(rulesActions.openRules()) }}><img src={'../bootstrap/pics/gear.png'} /></button>
                </div>
                <div>
                    <div /*style={{ height: 400 }}*/ className = "tree">
                        <SortableTree
                            canDrop={canDrop}
                            treeData={state.resultTree}
                            onChange={(data) => {
                                store.dispatch(pageActions.changeTree(data, droppedItem))
                            }}
                            generateNodeProps={({ node }) => (
                                {
                                    buttons: (node.isSection) ? [
                                        <button className="btn btn-default"
                                            onClick={() => {
                                                store.dispatch(pageActions.selectElement(node.elId))
                                            }}
                                        >
                                            <img src={'../bootstrap/pics/gear.png'} />
                                        </button>,
                                        <button className="btn btn-default"
                                            onClick={() => {
                                                store.dispatch(pageActions.addElement(node.elId))
                                            }}
                                        >
                                            <img src={'../bootstrap/pics/add.png'} />
                                        </button>,
                                        <button className="btn btn-default"
                                            onClick={() => {
                                                store.dispatch(pageActions.deleteElement(node.elId))
                                            }}
                                        >
                                            <img src={'../bootstrap/pics/trash.png'} />
                                        </button>
                                    ] : [<button className="btn btn-default"
                                        onClick={() => {
                                            store.dispatch(pageActions.selectElement(node.elId))
                                        }}
                                    >
                                        <img src={'../bootstrap/pics/gear.png'} />
                                    </button>,
                                    <button className="btn btn-default"
                                        onClick={() => {
                                            store.dispatch(pageActions.deleteElement(node.elId))
                                        }}
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
                        onClick={() => {
                            store.dispatch(pageActions.addElement(null))
                        }}
                    >Add element
                    </button>
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

{/*<div className="selectContainer"> </div>*/
}
let Input = (props) => {
    let store = props.store;
    return (
        <label><span>{props.inputName}: </span>
            <input
                type="text"
                className="form-control pageSetting"
                value={props.inputValue}
                onChange={(e) => {
                    let value = e.target.value;
                    store.dispatch(pageActions.editElement(props.inputArr, value))
                }} />
        </label>)
};
let Checkbox = (props) => {
    let store = props.store;
    return (
        <label htmlFor={props.inputName}>
            <input type="checkbox"
                id={props.inputName}
                value={props.inputValue ? 'on' : 'off'}
                onChange={(e) => {
                    let v = e.target.checked;
                    store.dispatch(pageActions.editElement([props.inputName], v))
                }} /> {props.inputName}</label>
    )
}

let InputSelect = (props) => {
    let store = props.store;
    return (
        <label>
            {props.inputName ? <span> {props.inputName} </span> : ""}
            <select className="form-control pageSetting" value={props.selectValue}
                onChange={(e) => {
                    let value = e.target.value;
                    store.dispatch(pageActions.editElement(props.selectArr, value))
                }}>
                {
                    props.arr.map((element) => {
                        return (
                            <option key={element.toLowerCase()}>{element}</option>
                        )
                    })
                }
            </select>
        </label>
    )
}

function chooseArr(f, state) {
    switch (f) {
        case "HeaderTypes": {
            return state.HeaderTypes;
        }
        case "Type": {
            return state.Elements;
        }
        case "ListItems": {
            return state.Elements.filter((e) => {
                if (e !== "ListOfElements") {
                    return e
                }
            });
        }
        default: {
            return state.Locators;
        }
    }
}

function PanelRightPageCode(props) {
    let state = props.state;
    let store = props.store;
    let page = state.PageObjects.find((page)=>{
        if (page.pageId === state.activeTabPageId){
            return page;
        }
    })
    let h = 20 * page.elements.length + 200;
   
    return (
        state.showCode && <div className="panel panel-default">
            <div className="panel-body codeContainer">
                <div className="code">
                    <textarea id="code-snippet" style = {{height: h}} value={ state.sectionCode || page.POcode }/>
                </div>
                <div className="details">
                    <button className="btn btn-default codeBtn" onClick = {()=>{store.dispatch(codeActions.downloadCode())}} >Download</button>
                    <div>
                        <button className="btn btn-default">Java</button>
                        <button className="btn btn-default">C#</button>
                    </div>
                    <button className="btn btn-default codeBtn">Details</button>
                </div>
            </div>
        </div>
    )
}

function PanelRightPage(props) {
    let state = props.state;
    let store = props.store;
    let show = false;
    let element = state.selectedElement;
    if (element !== null && element !== "" && !state.showCode) {
        show = true;
    }
    let notVisible = ["title", "subtitle", "elId", "parent", "parentId", "isSection", "expanded", "children"];
    let allFields = Object.keys(element);
    let visible = [];

    for (let i = 0; i < allFields.length; i++) {
        if (!notVisible.includes(allFields[i])) {
            visible.push(allFields[i]);
        }
    }

    let fieldsTypes = state.ElementFields.get(element.Type);

    return (
        <div className="panel panel-default">
            <div className="panel-body">
                {
                    show ? visible.map((f, i) => {
                        if (fieldsTypes[f] === "TextField") {
                            return (
                                <div className="selectContainer" key={f + i}>
                                    <Input inputName={f} inputValue={element[f]} inputArr={[f]} store={store} />
                                </div>
                            )
                        }
                        if (fieldsTypes[f] === "Checkbox") {
                            return (
                                <div className="selectContainer" key={f + i}>
                                    <Checkbox inputName={f} inputValue={element[f]} store={store} />
                                </div>
                            )
                        }
                        if (fieldsTypes[f] === "ComboBoxTextField") {
                            let a = chooseArr(f, state);
                            return (<div className="selectContainer" key={f + i}>
                                <Input inputName={f} inputValue={element[f].path} inputArr={[f, "path"]} store={store} />
                                <InputSelect selectValue={element[f].type} selectArr={[f, "type"]} arr={a} store={store} />
                            </div>)
                        }
                        if (fieldsTypes[f] === "ComboBox") {
                            let a = chooseArr(f, state);
                            return (
                                <div className="selectContainer" key={f + i}>
                                    <InputSelect inputName={f} selectValue={element[f]} selectArr={[f]} arr={a} store={store} />
                                </div>
                            )
                        }
                    }) : null
                }
                { show && state.CompositeRules[element.Type] && <button className="btn btn-default"
                    onClick={() => {
                        store.dispatch(codeActions.showCode())
                    }}>View code</button> }
            </div>
        </div>
    )
}

export { PanelLeftPage, PanelRightPage, PanelRightPageCode }