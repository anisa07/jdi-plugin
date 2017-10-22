import {mainReducer} from '../app/reducers/mainReducer';
import * as actions from '../app/actions/pageActions';
import * as fake from './fake';

describe('Page reducer', function() {
    it('should handle SHOW_PAGE', function() {
        let testObj = Object.assign({},fake.fakeState);
        let newState = mainReducer(testObj,actions.showPage(1));
        chai.expect(newState.activeTabPageId).to.equal(1);
    });
});