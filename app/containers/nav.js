import {/*BrowserRouter, Route, Link,*/ NavLink} from 'react-router-dom';
import elementsJSON from '../data/pageObject.json';

class Nav extends React.Component {
    constructor() {
        super();
        this.state = {
            fileSavedLocally: false
        };
        this.saveElementsJSON = this.saveElementsJSON.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
    }

    saveElementsJSON() {
        let json = JSON.stringify(elementsJSON);
        let blob = new Blob([json], {type: "application/json"});
        saveAs(blob, 'pageObject.json');
        this.setState(function () {
            return {
                fileSavedLocally: true
            }
        })
    }

    closeNotification() {
        this.setState(function () {
            return {
                fileSavedLocally: false
            }
        })
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navbar-collapse" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li>
                                <NavLink exact activeClassName='active' to="/">Main</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName='active' to='/settings'> Settings</NavLink>
                            </li>
                        </ul>
                        <div className="navbar-form navbar-left">
                            <button className="btn btn-default menu-button" onClick={this.saveElementsJSON}>Save
                                elements
                                locally
                            </button>
                            <button className="btn btn-default menu-button">Zip generated code</button>
                        </div>
                        <div className="text-center">
                        {this.state.fileSavedLocally ?
                            <span className="warn menu-button">Warning! PageObject.json is saved only in browser downloads folder.
                            To make its default change original pageObject.json with this in plugin 'app/data' folder extends
                            <button className="btn btn-defaul"
                                    onClick={this.closeNotification}>Ok, got it</button></span> : null}
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export {Nav}