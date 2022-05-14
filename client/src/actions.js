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

const mapItemQty = (itmQty) => ({
    type: 'MAP_ITEM_QTY',
    payload: {
        itmQty: itmQty
    }
})

const itemQtyEmpty = () => ({
    type: 'ITEM_QTY_EMPTY',
    payload: {
        itmQty: []
    }
})

module.exports= {
    addCartItem,
    emptyCart,
    storeOrderIds,
    mapItemQty,
    itemQtyEmpty
}
