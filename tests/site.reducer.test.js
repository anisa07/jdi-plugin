let chai = require('chai');
let assert = chai.assert;
let expect = chai.expect;
import {siteReducer} from '../app/reducers/siteReducers';
import {addPage, deletePage} from '../app/actions/siteActions';

let deleteState = [
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
]
let deleteState2 = [
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
]

describe('Site reducer', function() {
    it('should handle ADD_PAGE', function() {
        expect(siteReducer([],addPage(1))).to.eql([
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
        ])
    });
    it('should handle DELETE_PAGE', function() {
        expect(siteReducer(deleteState,deletePage(1))).to.eql(
            deleteState
        );
        expect(siteReducer(deleteState2,deletePage(1))).to.eql(
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

});