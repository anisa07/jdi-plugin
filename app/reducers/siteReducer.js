export let addPage = (mainObj, obj)=>{
        let arrCopy = mainObj.PageObjects.slice();
        let id = (arrCopy.length > 0) ? (arrCopy[arrCopy.length-1].pageId + 1) : 0;
        obj.pageId = id;
        obj.name += id; 
        arrCopy.push(obj);
        let objCopy = Object.assign({},mainObj);
        objCopy.PageObjects = arrCopy;
        objCopy.searchedPages = arrCopy;
        return objCopy 
    }

export let deletePage = (mainObj, id)=>{
    let arrCopy = mainObj.PageObjects.slice();
    if (arrCopy.length > 1){
        let res = arrCopy.filter((page)=>{
            if (page.pageId !== id){
                return page;
            } 
        });
        let objCopy = Object.assign({},mainObj);
        objCopy.PageObjects = res;
        objCopy.searchedPages = res;
        objCopy.activeTabPageId = -1;
        return objCopy 
    }
    return mainObj;
}

export let selectPage = (mainObj, id)=>{
    let arrCopy = mainObj.PageObjects.slice();
    let activeObject = arrCopy.find((page)=>{
        if (page.pageId === id){
            return page
        }
    });
    let objCopy = Object.assign({},mainObj);
    objCopy.activePageObject = activeObject;
    objCopy.activeTabPageId = id;
    return objCopy;
}

export let searchPage = (mainObj, searchedPage) => {
    let searchedPages = [];
    let objCopy = Object.assign({},mainObj);
    if (searchedPage !== ""){
        let arrCopy = mainObj.PageObjects.slice();
        searchedPages = arrCopy.filter(function (page) {
            if (page.name.toLowerCase().includes(searchedPage.toLowerCase())) {
                return page;
            }
        });
    } else {
        searchedPages = mainObj.PageObjects.slice();
    }
    objCopy.searchedPages = searchedPages;
    objCopy.activeTabPageId = -1;
    return objCopy;
}