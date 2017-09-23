function findElement(el, arr) {
    while (el.dataset.name === undefined) {
        el = el.parentNode;
    }
    let pageId = Number(el.dataset.pageid.replace(/\D/g, ""));
    let name = el.dataset.name;
    let pagesArray = arr;
    let element = findPage(el, pagesArray).elements.find((element) => {
        return element.name === name
    })
    return element;
}

function findPage(el, arr) {
    while (el.dataset.pageid === undefined) {
        el = el.parentNode;
    }
    let id = Number(el.dataset.pageid.replace(/\D/g, ""));
    let page = arr.find((page) => {
        return page.pageId === id;
    })
    return page;
}


export { findElement, findPage }