import { mainReducer } from '../app/reducers/mainReducer';
import * as actions from '../app/actions/rulesActions';
import * as fake from './fake';

describe('Rule reducer', function() {
    let fakeState = {};
    beforeEach(function () {
        fakeState = Object.assign({}, fake.fakeState);
    });
    it('should handle SELECT_RULE', function() {
        let testRes = mainReducer(fakeState,actions.selectRule("Button")); 
        chai.expect(testRes.selectedRule).to.equal("Button")
    });
});