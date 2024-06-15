import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/todoApi";


const jwtAxios = axios.create()


const refreshJWT = async (accessToken, refreshToken) => {
    const host = API_SERVER_HOST;
    const header = {headers:{'Authorization' : `Bearer ${accessToken}`}}
    const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`,header);

    return res.data;
}

// 액시오스로 뭔가 데이터를 보내면 beforeReq동작
const beforeReq = (config) => {
    // 쿠키를 확인해서
    const memberInfo = getCookie("member");

    // 로그인한값이 없을경우에 
    if(!memberInfo){
        return Promise.reject(
            {response:
                {date:
                    {error:"REQUIRED_LOGIN"}
                }
            }
        )
    }

    const {accessToken} = memberInfo;
    // 헤더에 accessToken값을 담아줌
    config.headers.Authorization = `Bearer ${accessToken}`

    return config;
}


// 요청 실패
const requestFail = (err) => {
    return Promise.reject(err);
}

// 응답 받기 전
const beforeRes = async (res) => {
    console.log('berfore return res----------');
    const data = res.data;
    if(data && data.error == 'ERROR_ACCESS_TOKEN'){
        const memberCookieValue = getCookie('member');
        const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken);
        
        // 정상로직이라면 새로운 accessToken과 refreshToken
        memberCookieValue.accessToken = result.accessToken;
        memberCookieValue.refreshToken = result.refreshToken;

        setCookie('member', JSON.stringify(memberCookieValue), 1);

        // 원래하려고했던 작업을 다시한번 호출
        const originalRequest = res.config;
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
        return await axios(originalRequest);
    }
    return res;
}

// 응답 실패
const responseFail = (err) => {
    return Promise.reject(err);
}

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;