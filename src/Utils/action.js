function handleInputChange(field, value, data, setData) {
    setData({...data, [field]: value});
}

function selectItem(value, key, data, setData) {
    if (data[key] === value) {
        setData({...data, [key]: null});
    }   else {
        setData({...data, [key]: value});
    }
}

export { handleInputChange, selectItem }