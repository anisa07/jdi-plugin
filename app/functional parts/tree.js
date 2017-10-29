function getChildren(mapArr, parentId) {
    if (typeof mapArr.get === "function") {
        let arr = mapArr.get(parentId);
        //let arr = mapArr.get(parentName);
        //resTree = getChildren(map.get(null), map)
        let tree = [];
        if (arr){
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                let element = arr[i];
                element.children = [];
                if (mapArr.has(element.elId)) {
                    element.children = getChildren(mapArr, element.elId);
                }
                // if (mapArr.has(element.name)) {
                //     element.children = getChildren(mapArr, element.name);
                // }
                tree.push(element)
            }
        }
        return tree;
    } return [];
}

function drawMap(arr, mapArr) {
    if (arr.length) {
        for (let i = 0; i < arr.length; i++) {
            let element = arr[i];
            element.title = element.name;
            element.subtitle = element.type;
            // let parent = element.parent;
            // if (mapArr.has(parent)) {
            //     let list = mapArr.get(parent);
            //     list.push(element);
            // } else {
            //     mapArr.set(parent, [element])
            // }
            let parentId = element.parentId;
            if (mapArr.has(parentId)) {
                let list = mapArr.get(parentId);
                list.push(element);
            } else {
                mapArr.set(parentId, [element])
            }
        }
        return mapArr;
    }
    return arr;
}

function searchElement(searched, pageElements) {
    //let searched = e.target.value;
    let searchedArr = [];
    let result = [];

    searchedArr = pageElements.filter((element) => {
        if (element.name.toLowerCase().includes(searched)) {
            return element;
        }
    });

    if (searchedArr.length) {        
        function findParent(p) {
            if (p === null) { return };
            let element = pageElements.find((element) => {
                return element.elId === p;
            });
            let e = result.find((r) => { return r.elId === element.elId });
            if (e === undefined) {
                element.children = [];
                element.expanded = true;
                result.push(element);
            }
            findParent(element.parentId);
        }

        for (let i = 0; i < searchedArr.length; i++) {
            searchedArr[i].children = [];
            if (!result.find((r) => { return r.elId === searchedArr[i].elId })) {
                searchedArr[i].expanded = true;
                result.push(searchedArr[i]);
            };
            findParent(searchedArr[i].parentId);
        }
    }
    return result;
}

export { getChildren, drawMap, searchElement }
