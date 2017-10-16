import React from 'react';
import ReactDOM from 'react-dom';
import {Main} from './main.js';
import './style/style.css';
import {store} from './store/store';

//console.log(store.getState());

class App extends React.Component {
    render(){
        return(
            <Main />
        )
    }
}

ReactDOM.render(<App />,
    document.getElementById('app')
);

