function getChildren(mapArr, parentName) {
    if (typeof mapArr.get === "function") {
        let arr = mapArr.get(parentName);
        //resTree = getChildren(map.get(null), map)
        let tree = [];
        if (arr){
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                let element = arr[i];
                element.children = [];
                if (mapArr.has(element.name)) {
                    element.children.push(getChildren(mapArr, element.name));
                }
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
            let parent = element.parent;
            if (mapArr.has(parent)) {
                let list = mapArr.get(parent);
                list.push(element);
            } else {
                mapArr.set(parent, [element])
            }
        }
        return mapArr;
    }
    return arr;
}

function searchElement(searched, pageElements) {
    //let searched = e.target.value;
    let searchedArr = [];

    searchedArr = pageElements.filter((element) => {
        if (element.name.includes(searched)) {
            return element;
        }
    });

    if (searchedArr.length) {
        let result = [];
        
        function findParent(p) {
            if (p === null) { return };
            let element = pageElements.find((element) => {
                return element.name === p;
            });
            let e = result.find((r) => { return r.name === element.name });
            if (e === undefined) {
                element.children = [];
                element.expanded = (searched === "") ? false : true;
                result.push(element);
            }
            findParent(element.parent);
        }

        for (let i = 0; i < searchedArr.length; i++) {
            searchedArr[i].children = [];
            if (!result.find((r) => { return r.name === searchedArr[i].name })) {
                searchedArr[i].expanded = true;
                result.push(searchedArr[i]);
            };
            findParent(searchedArr[i].parent);
        }
        return result;
    }
    return [];
}

export { getChildren, drawMap, searchElement }
