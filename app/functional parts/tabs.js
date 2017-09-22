function Tabs(props) {
    return (
        <ul className="nav nav-tabs">
            {
                props.tabPages.map(function (tabPage) {
                    let tabPageName = tabPage.name || "Page " + (tabPage.pageId + 1);
                    return (
                        <li role="presentation"
                            key={"tabPage " + tabPage.pageId} onClick={props.showPage}>
                            <a href="#" data-tabid={tabPage.pageId}
                                className={((tabPage.pageId === props.activeTabPage) && !props.settingsForSite) ? "active" : ""}>{tabPageName}</a>
                        </li>
                    )
                })
            }
        </ul>
    )
}

Tabs.propTypes = {
    tabPages: PropTypes.array.isRequired,
    activeTabPage: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    settingsForSite: PropTypes.bool.isRequired,
    showPage: PropTypes.func.isRequired
}

export {Tabs};