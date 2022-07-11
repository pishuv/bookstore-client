const cartActionTypes = {
    INIT_CART: 'INIT_CART',
    REMOVE_ITEM: 'REMOVE_ITEM',
    CHECKOUT: 'CHECKOUT',
};
export const initCartAction = (cartItems) => ({
    type: cartActionTypes.INIT_CART,
    payload: {
        cartItems: cartItems,
    }
});

export const updateCartAction = (itemID, itemPrice) => ({
    type: cartActionTypes.REMOVE_ITEM,
    payload: {
        itemID: itemID,
        itemPrice: itemPrice, 
    },
});

export const checkoutAction = () => ({
    type: cartActionTypes.CHECKOUT,
    payload: {

    },
});

export default cartActionTypes;