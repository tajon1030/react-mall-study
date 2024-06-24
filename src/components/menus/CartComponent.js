import React from 'react';
import { useRecoilValue } from 'recoil';
import useCustomCart from '../../hooks/useCustomCart';
import useCustomLogin from '../../hooks/useCustomLogin';
import CartItemComponent from '../cart/CartItemComponent';
import { cartTotalState } from '../../atoms/cartState';

function CartComponent(props) {

    const {isLogin, loginState} = useCustomLogin();

    // custom훅으로 변경하여 주석처리
    // const dispatch = useDispatch();

    // // 스토어 상태값을 반환해주는 useSelector
    // const cartItems = useSelector(state => state.cartSlice);

    const {cartItems, changeCart} = useCustomCart();

    // useEffect(()=>{
    //     // dispatch(getCartItemsAsync());
    //     refreshCart();
    // },[isLogin]);

    const totalValue = useRecoilValue(cartTotalState);

    return (
        <div className="w-full">
            {isLogin ?
                <div className="flex">
                    <div className="m-2 font-extrabold">
                        {loginState.nickname}'s Cart
                    </div>
                    <div className="bg-orange-600 w-9 text-center text-white font-bold
                        rounded-full m-2">{cartItems.length}
                    </div>

                    <div>
                        <ul>
                            {cartItems.map(item => 
                                <li>
                                    <CartItemComponent {...item} 
                                        key={item.cino} 
                                        changeCart={changeCart}
                                        email = {loginState.email}
                                    />
                                </li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <div className='text-2xl text-right font-extrabold'>
                            TOTAL: {totalValue}
                        </div>
                    </div>
                </div>
                :
                <div></div>
            }
        </div>

    );
}

export default CartComponent;