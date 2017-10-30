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
      "enum": "",
      "parentId": null,
      "root":{
          "type": "",
          "path": ""
      },
      "locator": {
          "type": "",
          "path": ""
      },
      "value": {
          "type": "",
          "path": ""
      },
      "list": {
          "type": "",
          "path": ""
      },
      "expand": {
          "type": "",
          "path": ""
      },
      "headers": "",
      "rowHeaders": "",
      "header": {
          "type": "",
          "path": ""
      },
      "rowHeader": {
          "type": "",
          "path": ""
      },
      "cell": {
          "type": "",
          "path": ""
      },
      "column": {
          "type": "",
          "path": ""
      },
      "row": {
          "type": "",
          "path": ""
      },
      "footer": {
          "type": "",
          "path": ""
      },
      "height": "",
      "width": "",
      "rowStartIndex": "",
      "columnStartIndex": "",
      "headerType": "",
      "useCache": false,
      "entity": "",
      "isSection": false,
      "next": {
          "type": "",
          "path": ""
      },
      "previous": {
          "type": "",
          "path": ""
      },
      "first": {
          "type": "",
          "path": ""
      },
      "last": {
          "type": "",
          "path": ""
      },
      "page": {
          "type": "",
          "path": ""
      },
      "ok": {
          "type": "",
          "path": ""
      },
      "cancel": {
          "type": "",
          "path": ""
      },
      "close": {
          "type": "",
          "path": ""
      },
      "yes": {
          "type": "",
          "path": ""
      },
      "no": {
          "type": "",
          "path": ""
      },
      "search button": {
          "type": "",
          "path": ""
      },
      "suggestions": {
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
  it('should create an action to select element on a page', () => {
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
    chai.expect(actions.selectElement("el12345").elId).to.eql(element.elId);
  })
  it('should create an action to edit element on a page', () => {
    chai.expect(actions.editElement("name", "test")).to.eql({
      type: 'EDIT_ELEMENT',
      elField: "name",
      value: "test"
    });
  })
})