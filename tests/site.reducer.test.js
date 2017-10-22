import {mainReducer} from '../app/reducers/mainReducer';
import * as actions from '../app/actions/siteActions';

let deleteState = {PageObjects: [
    {
        "url": "",
        "urlHost": "",
        "urlTemplate": "",
        "urlMatch": "Equals",
        "title": "",
        "titleMatch": "Equals",
        "name": "Default Page " + 1,
        "pageId": 1,
        "package": "",
        "elements": []
    }
]}
let deleteState2 = {PageObjects: [
    {
        "url": "",
        "urlHost": "",
        "urlTemplate": "",
        "urlMatch": "Equals",
        "title": "",
        "titleMatch": "Equals",
        "name": "Default Page " + 1,
        "pageId": 1,
        "package": "",
        "elements": []
    },
    {
        "url": "",
        "urlHost": "",
        "urlTemplate": "",
        "urlMatch": "Equals",
        "title": "",
        "titleMatch": "Equals",
        "name": "Default Page " + 2,
        "pageId": 2,
        "package": "",
        "elements": []
    }
],
activePageObject: {},
searchedPages: []}

describe('Site reducer', function() {
    it('should handle ADD_PAGE', function() {
        let testRes = mainReducer({PageObjects:[]},actions.addPage()); 
        chai.expect(testRes.PageObjects).to.eql([
            {
                "url": "",
                "urlHost": "",
                "urlTemplate": "",
                "urlMatch": "Equals",
                "title": "",
                "titleMatch": "Equals",
                "name": "Default Page " + 0,
                "pageId": 0,
                "package": "",
                "elements": []
            }
        ])
    });
    it('should handle DELETE_PAGE', function() {
        let res1 = mainReducer(deleteState,actions.deletePage(1));
        chai.expect(res1.PageObjects).to.eql(
            deleteState.PageObjects
        );
        let res2 = mainReducer(deleteState2,actions.deletePage(1));
        chai.expect(res2.PageObjects).to.eql(
            [
                {
                    "url": "",
                    "urlHost": "",
                    "urlTemplate": "",
                    "urlMatch": "Equals",
                    "title": "",
                    "titleMatch": "Equals",
                    "name": "Default Page " + 2,
                    "pageId": 2,
                    "package": "",
                    "elements": []
                }
            ]
        );
    });
    it('should handle SEARCH_PAGE', function(){
        let testRes = mainReducer(deleteState2,actions.searchPage("page 1"));
        
        chai.expect([{
            "url": "",
            "urlHost": "",
            "urlTemplate": "",
            "urlMatch": "Equals",
            "title": "",
            "titleMatch": "Equals",
            "name": "Default Page " + 1,
            "pageId": 1,
            "package": "",
            "elements": []
        }]).to.eql(testRes.searchedPages);
    })
    it('should handle SELECT_PAGE', function(){
        let testRes = mainReducer(deleteState2,actions.selectPage(1));
        chai.expect({
            "url": "",
            "urlHost": "",
            "urlTemplate": "",
            "urlMatch": "Equals",
            "title": "",
            "titleMatch": "Equals",
            "name": "Default Page " + 1,
            "pageId": 1,
            "package": "",
            "elements": []
        }).to.eql(testRes.activePageObject);
    })

});