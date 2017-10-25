import { PanelLeftSite, PanelRightSite } from './manageSite';
import { store } from '../store/store';

export function Site(props) {
    let state = props.state;
    let store = props.store;
    return (
        (state.settingsForSite) ?
            <div id="manage-site">
                <PanelLeftSite state={state} store={store} />
                <PanelRightSite state={state} store={store}/>
            </div> : null
    )
}
