import * as rulesActions from '../actions/rulesActions';

function PanelLeftRules(props) {
    let state = props.state;
    let store = props.store;
    return (
        <div className="panel panel-default">
            <div className="panel-body leftContainer">
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
    let rulesArray = state.Rules[selectedRule] || [];
    let elementFields = state.ElementFields.get(selectedRule) || {};
    let elementRule = rulesArray.find((rule) => {
        if (rule.id === ruleId) {
            return rule;
        }
    }) || {};

    let allFields = Object.keys(elementRule);

    let visibleRules = allFields.filter((field) => {
        if (elementFields[field] === "ComboBoxTextField") {
            return field
        }
    }) || [];

    return (
        <div className="panel panel-default">
            <div className="panel-body">
                {
                    visibleRules.map(function (rule, index) {
                        return (<div key={"rule-" + index} className="selectContainer">
                            <label>
                                <span>{rule}: </span>
                                <input
                                    type="text"
                                    className="form-control pageSetting"
                                    value={elementRule[rule]["path"]} />
                            </label>
                            <label>
                                <select className="form-control pageSetting" value={elementRule[rule]["type"]}>
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
                                    value={elementRule[rule]["uniqness"]} />
                            </label>
                        </div>)
                    })
                }
                <div className="topContainer">
                    <ul className="nav nav-tabs">
                        {
                            rulesArray.map(function (rule, index) {
                                let ruleName = "Rule " + (++index);
                                return (
                                    <li key={ruleName}>
                                        <a href="#" className={(rule.id === ruleId) ? "active" : ""}>{ruleName}</a>
                                    </li>
                                )
                            })
                        }
                        {rulesArray.length ? 
                        <li>
                            <a><img src={'../bootstrap/pics/add.png'} /> Add rule</a>
                        </li> : null}
                    </ul>

                </div>
            </div>
        </div>)
}

//onClick={() => { store.dispatch(pageActions.showPage(tabPage.pageId)) }}
export { PanelLeftRules, PanelRightRules };
