export function addPage() {
    return {
        type: 'ADD_PAGE',
        page: {
            "url": "",
            "urlHost": "",
            "urlTemplate": "",
            "urlMatch": "Equals",
            "title": "",
            "titleMatch": "Equals",
            "name": "Default Page ",
            "pageId": 0,
            "package": "",
            "elements": []
        }
    }
}

export function deletePage(pageId) {
    return {
        type: 'DELETE_PAGE',
        pageId
    }
}

export function closePage() {
    return {
        type: "CLOSE_PAGE"
    }
}

export function editValue(element, value) {
    return {
        type: "EDIT_VALUE",
        element: element,
        value: value
    }
}

export function selectPage(pageId) {
    return {
        type: "SELECT_PAGE",
        pageId
    }
}

export function searchPage(page) {
    return {
        type: "SEARCH_PAGE",
        page: page
    }
}

