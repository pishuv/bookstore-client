import './cart.styles.css';
 
import environments from '../../environments/environments.js';

import { useContext } from 'react';
import {AuthContext} from '../../context/Auth.context';
import {CartContext} from '../../context/Cart.context';
import { updateCartAction } from '../../actions/cart.action';

const API_URL = environments.API_URL

const Cart = (props) => {
    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);

    const handleRemoveItemFromCart = async () => {
        const data = {bookID: props.id};

        try {
            const respone = await fetch (`${API_URL}/cart`, {
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : authContextValue.userToken,
                },

                body: JSON.stringify(data),
            });

            if (!respone.ok) {
                throw new Error();
            }

            const action = updateCartAction(props.id, props.price)
            cartContextValue.dispatchCart(action);

        } catch (err) {
            console.log(err)
            alert('Something went wrong!');
        }
    };

    return (
        <div className='cards'>
            <div className='cart-book'>
            <img src={props.bookCover} alt={props.title}></img>

            <div className='book-data'>
                <h3>{props.title}</h3>
                <h4>{props.author}</h4>
            </div>

            <div className='book-price'>${props.price}</div>

            <button onClick={handleRemoveItemFromCart} className='btn-remove'> Remove </button>

        </div>
        </div>
    )
};

export default Cart;