import * as pageActions from '../actions/pageActions';
import * as siteActions from '../actions/siteActions';
import * as codeActions from '../actions/codeActions';

const Tabs = (props) => {
    const state = props.state;
    const store = props.store;
    return (
        <div className="topContainer">
            <ul className="nav nav-tabs ">
                {
                    state.PageObjects.map(function (tabPage) {
                        let tabPageName = tabPage.name || "Page " + (tabPage.pageId + 1);
                        return (
                            <li key={tabPage.pageId} onClick={() => { store.dispatch(pageActions.showPage(tabPage.pageId)) }}>
                                <a href="#" data-tabid={tabPage.pageId}
                                    className={((tabPage.pageId === state.activeTabPageId) && !state.settingsForSite) ? "shortText active" : "shortText"}>{tabPageName}</a>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className="btn btn-default" onClick = { ()=>{ store.dispatch(codeActions.zipAllCode()) }}><img src={'../bootstrap/pics/arrow.png'} /></button>
                <button className="btn btn-default" onClick={ () => { store.dispatch(siteActions.backToSite()) }}>Back to Site</button>
                <button className="btn btn-default"><img src={'../bootstrap/pics/gear.png'} /></button>
            </div>
        </div>
    )
}

export { Tabs };