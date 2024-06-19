import { API_SERVER_HOST } from "./todoApi"
import jwtAxios from "../util/jwtUtils";

const host = `${API_SERVER_HOST}/api/cart`

// 비동기니까 async
export const getCartItems = async () => { // jwtAxios를 사용할것이기때문에 파라미터 필요없음
    
    const res = await jwtAxios.get(`${host}/items`)

    return res.data
}

export const postChangeCart = async (cartItem) => {
    const res = await jwtAxios.post(`${host}/change`, cartItem);
    return res.data;
}