import * as pageActions from '../actions/pageActions';

const Tabs = (props) => {
    const state = props.state;
    const store = props.store;
    return (
        <ul className="nav nav-tabs">
            {
                state.PageObjects.map(function (tabPage) {
                    let tabPageName = tabPage.name || "Page " + (tabPage.pageId + 1);
                    return (
                        <li key={tabPage.pageId} onClick={()=>{store.dispatch(pageActions.showPage(tabPage.pageId))}}>
                            <a href="#" data-tabid={tabPage.pageId}
                                className={((tabPage.pageId === state.activeTabPageId) && !state.settingsForSite) ? "active" : ""}>{tabPageName}</a>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export { Tabs };