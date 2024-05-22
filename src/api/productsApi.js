import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";


const host = `${API_SERVER_HOST}/api/products`

// 비동기니까 async
export const postAdd = async (product) => {
    
    // 엑시오스를 사용하여 multipart/form-data전송
    // 헤더셋팅을 다르게 해줄 필요가 있음
    const header = {headers: {'Content-Type':'multipart/form-data'}}

    // product는 FormData객체
    const res = await axios.post(`${host}/`, product, header)

    return res.data
}