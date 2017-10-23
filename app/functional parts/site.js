import { PanelLeftSite, PanelRightSite } from './manageSite';
import { store } from '../store/store';

export function Site(props) {
    let state = props.state;
    return (
        (state.settingsForSite) ?
            <div id="manage-site">
                <PanelLeftSite state={state} addPage={props.addPage} deletePage={props.deletePage} selectPage={props.selectPage} searchPage={props.searchPage} />
                <PanelRightSite state={state} editValue={props.editValue} closePage={props.closePage}/>
            </div> : null
    )
}