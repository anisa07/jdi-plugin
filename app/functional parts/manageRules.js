import * as rulesActions from '../actions/rulesActions';

function PanelLeftRules(props) {
    let state = props.state;
    let store = props.store;
    return (
        <div className="panel panel-default">
            <div className="panel-body leftContainer">
                <div>
                    <button className="btn btn-default" onClick={() => {store.dispatch(rulesActions.exportRules())}}><img src={'../bootstrap/pics/arrow-up.png'} /> Export rules</button>
                    <button className="btn btn-default" onClick={() => {}}><img src={'../bootstrap/pics/arrow.png'} /> Import rules</button>
                </div>
                <div>
                    <ul>
                        {
                            state.Elements.map(function (element, index) {
                                return (<li key={"element-" + index}>
                                    <a onClick={() => { store.dispatch(rulesActions.selectRule(element)) }}
                                        className={(state.selectedRule === element) ? "selectPage" : ""}>{element}</a>
                                </li>)
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
function PanelRightRules(props) {
    let state = props.state;
    let store = props.store;
    let selectedRule = state.selectedRule;
    let ruleId = state.ruleId;
    //change here RULES
    let rulesArray = state.Rules[selectedRule] || [];
    let elementFields = state.ElementFields.get(selectedRule) || {};
    let elementRule = rulesArray.find((rule) => {
        if (rule.id === ruleId) {
            return rule;
        }
    }) || {};

    let allFields = Object.keys(elementRule);

    let visibleRules = allFields.filter((field) => {
        if (elementFields[field] === "TextField" || field === "uniqness") {
            return field
        }
    }) || [];

    return (
        <div className="panel panel-default">
            <div className="panel-body">
                <div className='absolutContainer'>
                    <div>
                        {
                            visibleRules.map(function (rule, index) {
                                return (<div key={"rule-" + index} className="selectContainer">
                                    <label>
                                        <span>{rule}: </span>
                                        <input
                                            type="text"
                                            className="form-control pageSetting"
                                            onChange={(e) => { let value = e.target.value; store.dispatch(rulesActions.editRule(rule, value)) }}
                                            value={elementRule[rule]} />
                                    </label>
                                    {/* <label>
                                    <select className="form-control pageSetting" value={elementRule[rule]["type"]}
                                    onChange={(e) => { let value = e.target.value; store.dispatch(rulesActions.editRule([rule, "type"], value)) }}>
                                        {
                                            state.Locators.map((element) => {
                                                return (
                                                    <option key={element.toLowerCase()}>{element}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </label>
                                <label>
                                    <input
                                        type="text"
                                        className="form-control pageSetting"
                                        value={elementRule[rule]["uniqness"]}
                                        onChange={(e) => { let value = e.target.value; store.dispatch(rulesActions.editRule([rule, "uniqness"], value)) }} />
                                </label> */}
                                </div>)
                            })
                        }
                    </div>
                    <div className="topContainer">
                        <ul className="nav nav-tabs">
                            {
                                rulesArray.map(function (rule, index) {
                                    let ruleName = "Rule " + (++index);
                                    return (
                                        <li key={ruleName}>
                                            <a href="#" className={(rule.id === ruleId) ? "active" : ""}
                                                onClick={() => { store.dispatch(rulesActions.showRule(rule.id)) }}>{ruleName}
                                            </a>
                                            <button className='btnWithoutPM' onClick={() => { store.dispatch(rulesActions.deleteRule(rule.id)) }}>
                                                <img src={'../bootstrap/pics/trash.png'} />
                                            </button>
                                        </li>
                                    )
                                })
                            }
                            {!!rulesArray.length && <li>
                                <a onClick={() => { store.dispatch(rulesActions.addRule(selectedRule)) }} ><img src={'../bootstrap/pics/add.png'} /> Add rule</a>
                            </li>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>)
}

//onClick={() => { store.dispatch(rulesActions.showRule(rule.id)) }}
export { PanelLeftRules, PanelRightRules };
