import {PanelLeftRules, PanelRightRules} from './manageRules';

export function Rules(props) {
    let state = props.state;
    let store = props.store;
    return (
        (state.rulesSettings) ?
            <div id="manage-site">
                <PanelLeftRules state={state} store={store} />
                <PanelRightRules state={state} store={store} />
            </div> : null
    )
}

