import React from 'react';
import ReactDOM from 'react-dom';
//import ReactRouter from 'react-router-dom';
// import {Settings} from './containers/settings';
// import {MainPage} from  './containers/main';
// import {Nav} from './containers/nav';

import {ManageSite} from './manageSite.js'

import { BrowserRouter, Route, Switch} from 'react-router-dom';

let Router = BrowserRouter;


class App extends React.Component {
    render(){
        return(
            // <Router>
            //     <div>
            //         <Nav />
            //         <Switch>
            //             <Route exact path="/" component={MainPage}/>
            //             <Route path="/settings" component={Settings}/>
            //         </Switch>
            //     </div>
            // </Router>
            <ManageSite />
        )
    }
}

ReactDOM.render(<App />,
    document.getElementById('app')
);