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
  it('should create an action to add element on a page', () => {
    let element = {
      "expanded": false,
      "name": "",
      "type": "button",
      "parent": "",
      "parentId": null,
      "locator": {
        "type": "",
        "path": ""
      }
    }
    chai.expect(actions.addElement(null).element).to.eql(element)
  })
  it('should create an action to delete element from a page', () => {
    let element = {
      "expanded": false,
      "name": "",
      "type": "button",
      "parent": "",
      "parentId": null,
      "elId": "el12345",
      "locator": {
        "type": "",
        "path": ""
      }
    }
    chai.expect(actions.deleteElement("el12345").elId).to.eql(element.elId);
  })

})