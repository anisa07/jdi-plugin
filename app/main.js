import { Tabs } from './functional parts/tabs';
import { Site } from './functional parts/site';
import { Page } from './functional parts/page';

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
                <Tabs state={this.state} store={store}/>
                <Site state={this.state} store={store}/>
                <Page state={this.state} store={store}/>
            </div>
        )
    }
}



//     editElement(e) {
//         let value = e.target.value;
//         let selectedEl = this.state.selectedElement;
//         let elementProp = e.target.dataset.attribute;

//         let pageElements = [];
//         let pages = this.state.tabPages.slice();
//         let activeTabPage = this.state.activeTabPageId;
//         let map = new Map();
//         let resTree = [];

//         if (elementProp === "name") {
//             pageElements = pages.find((page) => {
//                 return page.pageId === activeTabPage
//             }).elements.map((element) => {
//                 if (element.parent === selectedEl.name) {
//                     element.parent = value;
//                 } return element;
//             }).map((element) => {
//                 if (element.name === selectedEl.name) {
//                     element.name = value;
//                 } return element;
//             })

//             map = drawMap(pageElements, new Map());
//             resTree = getChildren(map, null);
//         }

//         if (e.target.dataset.sub) {
//             let sub = e.target.dataset.sub;
//             selectedEl[elementProp][sub] = value;
//         } else {
//             selectedEl[elementProp] = value
//         }

//         if (elementProp === "name") {
//             this.setState({
//                 resultTree: resTree,
//                 pageMap: map,
//                 selectedElement: selectedEl
//             })
//         } else {
//             this.setState({
//                 selectedElement: selectedEl
//             })
//         }
//         console.log(selectedEl)

//     }
