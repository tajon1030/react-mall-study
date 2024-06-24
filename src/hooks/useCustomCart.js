import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getCartItems, postChangeCart } from "../api/cartApi";
import { cartState } from "../atoms/cartState";

const useCustomCart = () => {
    // const cartItems = useSelector(state => state.cartSlice);

    // const dispatch = useDispatch();

    // const refreshCart = ()  => {
    //     dispatch(getCartItemsAsync())
    // }

    // const changeCart = (param) => {
    //     dispatch(postChangeCartAsync(param))
    // }

    // return {cartItems, refreshCart, changeCart};

    const [cartItems, setCartItems] = useRecoilState(cartState);

    const queryClient = useQueryClient();

    const changeMutation = useMutation({
        mutationFn: (param) => postChangeCart(param),
        onSuccess: (result) => setCartItems(result)
    });

    // useQuery에서 onSuccess를 지정하고싶어도 deprecated되었기때문에 안됨..
    const query = useQuery({
        queryKey : ['cart'],
        queryFn : getCartItems,
        staleTime : 1000 * 60 * 60
    });

    useEffect(() => {
        if(query.isSuccess){
            queryClient.invalidateQueries("cart");
            setCartItems(query.data);
        }
    }, [query.isSuccess]);

    const changeCart = (param) => {
        changeMutation.mutate(param);
    }

    return {cartItems, changeCart};
}

export default useCustomCart;