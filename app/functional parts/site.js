import { PanelLeftSite, PanelRightSite } from './manageSite';
import { store } from '../store/store';

export function Site(props) {
    let state = props.state;
    return (
        (state.settingsForSite) ?
            <div id="manage-site">
                <PanelLeftSite state={state} addPage={props.addPage} deletePage={props.deletePage} selectPage={props.selectPage} searchPage={props.searchPage} />
            //  {/* <PanelRightSite /> */}
            </div> : null
    )
}

//                 {
//                     (this.state.settingsForSite) ?
//                         <div id="manage-site">
//                             <PanelLeftSite 
//                                 searchPage={this.searchPage}
//                                 selectPage={this.selectPage}
//                                 addPage={this.addPage}
//                                 removePage={this.removePage}

//                                 />
//                             <PanelRightSite siteInfo={this.state.siteInfo}
//                                 activePageObject={this.state.activePageObject}
//                                 editValue={this.editValue}
//                                 activeTabPageId={this.state.activeTabPageId}
//                                 closePage={this.closePage} />
//                         </div>
//                         : null
//                 }

// Site.contextTypes = {
//     store: React.PropTypes.object
// }