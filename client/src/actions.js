const addCartItem = (cartItemData) => ({
    type: 'ADD_CART_ITEM',
    payload: {
        cartItemData: cartItemData,
    }
});

const emptyCart = () => ({
    type: 'ADD_CART_ITEM',
    payload: {
        cartItemData: [],
    }
});

const storeOrderIds = (id) => ({
    type: 'STORE_ORDER_IDS',
    payload: {
        orderId: id
    }
})

module.exports= {
    addCartItem,
    emptyCart,
    storeOrderIds
}