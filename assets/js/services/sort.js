let direction = "ASC";

const desc = (sortable) => {
    return (a, b) => a[sortable] < b[sortable] ? -1 : a[sortable] > b[sortable] ? 1 : 0;
}

const asc = (sortable) => {
    return (a, b) =>  a[sortable] < b[sortable] ? 1 : a[sortable] > b[sortable] ? -1 : 0;
}

function sortItems(obj, sortable){
    if(direction === "ASC"){
        obj.sort(desc(sortable))
            direction = "DESC"
            return obj;
    }if(direction === "DESC"){
        obj.sort(asc(sortable))
            direction = "ASC"
            return obj;
        }
}


export default {
    sortItems,
}