import SortableTree from 'react-sortable-tree';
import * as pageActions from '../actions/pageActions';

function PanelLeftPage(props) {
    let state = props.state;
    let store = props.store;
    const canDrop = ({node, nextParent, prevPath, nextPath}) => {
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
                           }}/>
                </div>
                <div>
                    <div style={{height: 400}}>
                        <SortableTree
                            canDrop={canDrop}
                            treeData={state.resultTree}
                            onChange={(data) => {
                                store.dispatch(pageActions.changeTree(data))
                            }}
                            generateNodeProps={({node}) => (
                                {
                                    buttons: (node.type === "section" || node.type === "form") ? [
                                        <button
                                            onClick={() => {
                                                store.dispatch(pageActions.selectElement(node.elId))
                                            }}
                                        >
                                            <img src={'../bootstrap/pics/gear.png'}/>
                                        </button>,
                                        <button
                                            onClick={() => {
                                                store.dispatch(pageActions.addElement(node.elId))
                                            }}
                                        >
                                            <img src={'../bootstrap/pics/add.png'}/>
                                        </button>,
                                        <button
                                            onClick={() => {
                                                store.dispatch(pageActions.deleteElement(node.elId))
                                            }}
                                        >
                                            <img src={'../bootstrap/pics/trash.png'}/>
                                        </button>
                                    ] : [<button
                                        onClick={() => {
                                            store.dispatch(pageActions.selectElement(node.elId))
                                        }}
                                    >
                                        <img src={'../bootstrap/pics/gear.png'}/>
                                    </button>,
                                        <button
                                            onClick={() => {
                                                store.dispatch(pageActions.deleteElement(node.elId))
                                            }}
                                        >
                                            <img src={'../bootstrap/pics/trash.png'}/>
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

let Input = (props) => {
    let store = props.store;
    return (
        <div className="selectContainer">
            <span>{props.inputName}</span>
            <input type="text"
                   className="form-control pageSetting"
                   value={props.inputValue}
                   onChange={(e) => {
                       let value = e.target.value;
                       store.dispatch(pageActions.editElement(props.inputEvArr, value))
                   }}/>
        </div>
    )
};

let InputSelect = (props) => {
    let store = props.store;
    return (<div className="selectContainer">
        <span>{props.inputName}</span>
        <input type="text"
               className="form-control pageSetting"
               value={props.inputValue}
               onChange={(e) => {
                   let value = e.target.value;
                   store.dispatch(pageActions.editElement(props.inputEvArr, value))
               }}/>
        <select className="form-control pageSettingCombo" value={props.selectValue} onChange={(e) => {
            let value = e.target.value;
            store.dispatch(pageActions.editElement(props.selectEvArr, value))
        }}>
            {
                props.arr.map((element) => {
                    return (
                        <option key={element.toLowerCase()} value={element.toLowerCase()}>{element}</option>
                    )
                })
            }
        </select>
    </div>)
}


//Button, Checkbox, Image, Label, Link, Text, TextField, Input, TextArea, DataPicker, FileInput
let enUm = ["selector", "checkList", "menu", "radiobuttons", "tabs", "textlist", "chat", "combobox", "dropdown",
    "droplist", "listofelements"];
let root = ["combobox", "dropdown", "droplist", "table", "dynamictable"];
let loc = ["button", "checkbox", "image", "label", "link", "text", "textfield", "input", "textarea", "datapicker",
    "fileinput", "section", "form", "selector", "checkList", "menu", "radiobuttons", "tabs", "textlist", "chat", "listofelements"];
let val = ["combobox", "dropdown", "droplist", "search"];
let listExpand = ["combobox", "dropdown", "droplist"];
let tables = ["table", "dynamictable"];

function PanelRightPage(props) {
    let state = props.state;
    let store = props.store;
    return (
        <div className="panel panel-default">
            <div className="panel-body">
                {(typeof state.selectedElement === "object") ? <div>
                    <InputSelect
                        store={store}
                        inputName={"Name: "}
                        inputValue={state.selectedElement.name}
                        inputEvArr={["name"]}
                        selectValue={state.selectedElement.type}
                        selectEvArr={["type"]}
                        arr={state.Elements}
                    />

                    {(loc.includes(state.selectedElement.type)) ?
                        <InputSelect
                            store={store}
                            inputName={"Locator: "}
                            inputValue={state.selectedElement.locator.path}
                            inputEvArr={["locator", "path"]}
                            selectValue={state.selectedElement.locator.type}
                            selectEvArr={["locator", "type"]}
                            arr={state.Locators}
                        /> : null}

                    { (root.includes(state.selectedElement.type)) ?
                        <InputSelect
                            store={store}
                            inputName={"Root: "}
                            inputValue={state.selectedElement.root.path}
                            inputEvArr={["root", "path"]}
                            selectValue={state.selectedElement.root.type}
                            selectEvArr={["root", "type"]}
                            arr={state.Locators}
                        /> : null}

                    { (val.includes(state.selectedElement.type)) ?
                        <InputSelect
                            store={store}
                            inputName={"Value: "}
                            inputValue={state.selectedElement.value.path}
                            inputEvArr={["value", "path"]}
                            selectValue={state.selectedElement.value.type}
                            selectEvArr={["value", "type"]}
                            arr={state.Locators}
                        /> : null}

                    { (listExpand.includes(state.selectedElement.type)) ?
                        <div>
                            <InputSelect
                                store={store}
                                inputName={"List: "}
                                inputValue={state.selectedElement.list.path}
                                inputEvArr={["list", "path"]}
                                selectValue={state.selectedElement.list.type}
                                selectEvArr={["list", "type"]}
                                arr={state.Locators}
                            />
                            <InputSelect
                                store={store}
                                inputName={"Expand: "}
                                inputValue={state.selectedElement.expand.path}
                                inputEvArr={["expand", "path"]}
                                selectValue={state.selectedElement.expand.type}
                                selectEvArr={["expand", "type"]}
                                arr={state.Locators}
                            />
                        </div>
                        : null}

                    {
                        (tables.includes(state.selectedElement.type)) ?
                            <div>

                            </div> : null
                    }

                    { (enUm.includes(state.selectedElement.type)) ?
                        <Input
                            store={store}
                            inputName={"Enum: "}
                            inputValue={state.selectedElement.enum}
                            inputEvArr={["enum"]}
                        /> : null}

                </div> : null}
            </div>
        </div>
    )
}

export {PanelLeftPage, PanelRightPage}