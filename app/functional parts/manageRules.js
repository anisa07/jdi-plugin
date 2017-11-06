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
                                    <a onClick={() => {store.dispatch(rulesActions.selectRule(element))}} 
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
}
export { PanelLeftRules, PanelRightRules };
