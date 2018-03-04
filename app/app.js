// import { Site } from './functional parts/site';
// import { Page } from './functional parts/page';
// import { Rules } from './functional parts/rules';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TabsContainer from './containers/tabs.container';
import SiteContainer from './containers/site/site.container';
import PageContainer from './containers/page/page.container';
import RuleContainer from './containers/rule/rule.container';

//import { store } from './store/store';

//import * as pageActions from './actions/pageActions';
//import * as siteActions from './actions/siteActions';

// export class Main extends React.Component {
//     constructor() {
//         super();
//         this.state = store.getState();
//     }
//     componentDidMount(){
//         store.subscribe(() => {
//             this.state = store.getState();
//             this.forceUpdate();
//             console.log(this.state)
//         })
//     }

//     render() {
//         return (
//             <div className="start">
//                 <Tabs className="tabs" state={this.state} store={store}/>
//                 {/* <div>
//                     <Site state={this.state} store={store}/>
//                     <Page state={this.state} store={store}/>
//                     <Rules state={this.state} store={store}/>
//                 </div> */}
//             </div>
//         )
//     }
// }

export const Main = (props) => {
    return (
        <div className='start'>
            <TabsContainer />
            <div>
                <SiteContainer />
                <PageContainer />
                <RuleContainer />
            </div>
        </div>
    )
}
