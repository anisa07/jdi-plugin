export let showCode = (mainObj)=>{
    let objCopy = Object.assign({},mainObj);
    objCopy.showCode = true;
    objCopy.selectedElement = '';
    return objCopy;
}