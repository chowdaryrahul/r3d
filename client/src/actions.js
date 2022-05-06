const createItem = (title, description) => ({
    type: 'CREATE_ITEM',
    payload: {
        title: title,
        description: description
    }
});

module.exports= {
    createItem
}