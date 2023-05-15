const upperCaseFirstLetter = (str) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
}

const totalCostOrder = (orders) => {
    return orders?.length ? orders.reduce((total,order) => total + order.itemCost, 0).toFixed(2) + "$" : "NULL"
}

const getParamFromLocation= (locationUrl) => {
    const parts = locationUrl.split("/");
    return parts[parts.length - 1];
}


export {upperCaseFirstLetter, totalCostOrder, getParamFromLocation}