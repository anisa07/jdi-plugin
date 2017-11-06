import {PanelLeftRules, PanelRightRules} from './manageRules';

export function Rules(props) {
    let state = props.state;
    let store = props.store;
    return (
        (state.rulesSettings) ?
            <div id="manage-site">
                <PanelLeftRules state={state} store={store} />
            </div> : null
    )
}
/*<PanelLeftSite state={state} store={store} />
                <PanelRightSite state={state} store={store}/>*/