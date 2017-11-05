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
                        onChange={(e) => {
                            let value = e.target.value;
                            store.dispatch(pageActions.searchElement(value))
                        }} />
                </div>
                <div>
                    <div style={{ height: 400 }}>
                        <SortableTree
                            canDrop={canDrop}
                            treeData={state.resultTree}
                            onChange={(data) => {
                                store.dispatch(pageActions.changeTree(data))
                            }}
                            generateNodeProps={({ node }) => (
                                {
                                    buttons: (node.isSection) ? [
                                        <button
                                            onClick={() => {
                                                store.dispatch(pageActions.selectElement(node.elId))
                                            }}
                                        >
                                            <img src={'../bootstrap/pics/gear.png'} />
                                        </button>,
                                        <button
                                            onClick={() => {
                                                store.dispatch(pageActions.addElement(node.elId))
                                            }}
                                        >
                                            <img src={'../bootstrap/pics/add.png'} />
                                        </button>,
                                        <button
                                            onClick={() => {
                                                store.dispatch(pageActions.deleteElement(node.elId))
                                            }}
                                        >
                                            <img src={'../bootstrap/pics/trash.png'} />
                                        </button>
                                    ] : [<button
                                        onClick={() => {
                                            store.dispatch(pageActions.selectElement(node.elId))
                                        }}
                                    >
                                        <img src={'../bootstrap/pics/gear.png'} />
                                    </button>,
                                    <button
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
                onChange={(e)=>{
                    let v = e.target.checked; 
                    store.dispatch(pageActions.editElement([props.inputName], v)) 
                }}/> {props.inputName}</label>
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

function PanelRightPage(props) {
    let state = props.state;
    let store = props.store;
    let show = false;
    let element = state.selectedElement;
    if (element !== null && element !== "") {
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
                        if (fieldsTypes[f] === "Checkbox"){
                            return(
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
            </div>
        </div>
    )
}

export { PanelLeftPage, PanelRightPage }