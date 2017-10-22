// import React from 'react';
// import ReactDOM from 'react-dom';
import { Main } from './main.js';
import './style/style.css';

//import { Provider } from 'react-redux';

// class App extends React.Component {
//     render(){
//         return(
//             <Main />
//         )
//     }
// }

// ReactDOM.render(<App />,
//     document.getElementById('app')
// );

const App = (
    <Main />
)

// ReactDOM.render(App, document.getElementById('app'));

// class Provider extends React.Component {
//     getChildContext() {
//       return {
//         store: this.props.store // This corresponds to the `store` passed in as a prop
//       };
//     }
//     render() {
//       return this.props.children;
//     }
//   }

// Provider.childContextTypes = {
//     store: React.PropTypes.object
//   }

ReactDOM.render(<Main />,document.getElementById('app'));