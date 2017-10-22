import * as actions from '../app/actions/pageActions.js';

describe('Page actions', () => {
  it('should create an action to show a page in Tabs', () => {
    const pageId = 1;
    const expectedAction = {
      type: 'SHOW_PAGE',
      pageId
    }
    chai.expect(actions.showPage(1)).to.eql(expectedAction)
  })
})