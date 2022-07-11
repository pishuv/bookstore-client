import cartActionTypes from "../actions/cart.action";

export const CART_INITIAL_STATE = {items: [], price: 0};


const CartReducer = (state, action) => {
    switch (action.type) {
        case cartActionTypes.INIT_CART: {
            const cartItems = action.payload.cartItems
            
            let price = 0;
            for (let i = 0; i < cartItems.length; i++) {
                const cartItem = cartItems[i].bookID;

                price += cartItem.price;
            }

            const updateState = {items: cartItems, price: price}

            return updateState;
        }

        case cartActionTypes.REMOVE_ITEM: {
            const itemID = action.payload.itemID;
            const itemPrice = action.payload.itemPrice;

            const updateCartItems = [...state.items].filter((item) => item.bookID._id !== itemID);
            const updatePrice = state.price - itemPrice;

            const updateState = {items: updateCartItems , price: updatePrice};

            return updateState;
        }

        case cartActionTypes.CHECKOUT: {
            const updateState = {items: [], price: 0};

            return updateState;
        }

        default:
            return state;
    }
};

export default CartReducer;