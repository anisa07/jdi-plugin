import { Tabs } from './functional parts/tabs';
import { Site } from './functional parts/site';
import { Page } from './functional parts/page';
import { Rules } from './functional parts/rules';

import { store } from './store/store';

import * as pageActions from './actions/pageActions';
import * as siteActions from './actions/siteActions';

export class Main extends React.Component {
    constructor() {
        super();
        this.state = store.getState();
    }
    componentDidMount(){
        store.subscribe(() => {
            this.state = store.getState();
            this.forceUpdate();
            console.log(this.state)
        })
    }

    render() {
        return (
            <div className="start">
                <Tabs className="tabs" state={this.state} store={store}/>
                <div>
                    <Site state={this.state} store={store}/>
                    <Page state={this.state} store={store}/>
                    <Rules state={this.state} store={store}/>
                    <div id="test"></div>
                </div>
            </div>
        )
    }
}