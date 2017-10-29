import {mainReducer} from '../app/reducers/mainReducer';
import * as actions from '../app/actions/pageActions';
import * as fake from './fake';

describe('Page reducer', function() {
    let fakeState = {};
    beforeEach(function(){
        fakeState = Object.assign({},fake.fakeState);
    });
    it('should handle ADD_ELEMENT', function() {
        let testObj = fakeState;
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
        let testObj = fakeState;
        let newState = mainReducer(testObj,actions.showPage(1));
        chai.expect(newState.activeTabPageId).to.equal(1);
    });
    it('should handle SELECT_ELEMENT', function() {
        let testObj = fakeState;
        testObj.activeTabPageId = 0;
        let newState = mainReducer(testObj,actions.selectElement("el123457"));
        chai.expect(newState.selectedElement).to.equal(newState.PageObjects[0].elements[0]);
    });
    it('should handle DELETE_ELEMENT', function() {
        let testObj = fakeState;
        testObj.activeTabPageId = 0;
        let newState = mainReducer(testObj,actions.deleteElement("el123457"));
        chai.expect(newState.PageObjects[0].elements.length).to.equal(0);
    });

});