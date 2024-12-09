function generateUid() {
    return "uid-" + Math.random().toString(26).substring(2, 18);
}

function updateData(data, id) {
    const totalData = list();
    const index = totalData.findIndex((item) => item.id === id);
    
    totalData[index] = data;    
    saveLocalStorage('items', totalData);
}

function deleteData(id) {
    const totalData = list();
    const index = totalData.findIndex((item) => item.id === id);
    totalData.splice(index, 1);
    saveLocalStorage('items', totalData);
}

function getItem(id) {
    const totalData = list();

    return totalData.find((item) => item.id === id);
}

function list() {
    const data = localStorage.getItem("items");
    
    if (data) {
        return JSON.parse(data);
    }
    return [];
}

function saveData(data) {
    const totalData = list();

    const d = {
        ...data,
        id: generateUid(),
    }

    totalData.push(d);
    saveLocalStorage('items', totalData);
}

function saveLocalStorage(itemName, data) {
    localStorage.setItem(itemName , JSON.stringify(data));
}

export { saveData, updateData, deleteData, getItem, list }

