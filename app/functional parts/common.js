function findElement(elem, arr) {
    // while (el.dataset.name === undefined) {
    //     el = el.parentNode;
    // }
    let el = findParentData(elem, "name")
    let pageId = Number(el.dataset.pageid.replace(/\D/g, ""));
    let name = el.dataset.name;
    let pagesArray = arr;
    let element = findPage(el, pagesArray).elements.find((element) => {
        return element.name === name
    })
    return element;
}

function findPage(elem, arr) {
    // while (el.dataset.pageid === undefined) {
    //     el = el.parentNode;
    // }
    let el = findParentData(elem, "pageid");
    let id = Number(el.dataset.pageid.replace(/\D/g, ""));
    let page = arr.find((page) => {
        return page.pageId === id;
    })
    return page;
}

function findParentData(el, d){
    while (el.dataset[d] === undefined) {
        el = el.parentNode;
    }
    return el;
}


export { findElement, findPage, findParentData}