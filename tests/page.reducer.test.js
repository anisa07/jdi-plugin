import {mainReducer} from '../app/reducers/mainReducer';
import * as actions from '../app/actions/pageActions';
import * as fake from './fake';

describe('Page reducer', function() {
    it('should handle ADD_ELEMENT', function() {
        let testObj = fake.fakeState;
        testObj.activeTabPageId = 1;
        let newState = mainReducer(testObj,actions.addElement(null));
        let copyPageObjectsArray = newState.PageObjects.find((page) => {
            if (page.pageId === newState.activeTabPageId) {
                return page
            }
        }).elements;
        chai.expect(copyPageObjectsArray.length).to.equal(1);
    });
    it('should handle SHOW_PAGE', function() {
        let testObj = Object.assign({},fake.fakeState);
        let newState = mainReducer(testObj,actions.showPage(1));
        chai.expect(newState.activeTabPageId).to.equal(1);
    });
});