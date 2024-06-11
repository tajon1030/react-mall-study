import axios from "axios";
import { API_SERVER_HOST } from "./todoApi"

const host = `${API_SERVER_HOST}/api/member`

// 비동기니까 async
export const loginPost = async (loginParam) => {
    
    // 엑시오스를 사용하여 x-www-form-urlencoded전송
    const header = {headers: {'Content-Type':'x-www-form-urlencoded'}}

    // product는 FormData객체
    const form = new FormData();
    form.append('username',loginParam.email);
    form.append('password',loginParam.pw);

    const res = await axios.post(`${host}/login`, form, header)

    return res.data
}