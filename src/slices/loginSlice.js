import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const initState = {
    email: ''
}

const loadMemberCookie = () => {
    const memberInfo = getCookie("member");

    return memberInfo;
}

// createAsyncThunk(이름문자열, 함수, )
export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => loginPost(param))

const loginSlice = createSlice({
    name: 'loginSlice',    
    // 초기상태값
    // 쿠키가 있다면 쿠키에서부터 값을 가져오고싶음
    initialState: loadMemberCookie() || initState,
    reducers: { // reducer는 금고를 어떻게 할것인지를 나타냄
        // 입력값을 두개밖에 받지 못함
        login: (state, action) => { // 기존의상태state, 지금처리하고싶은데이터 action
            console.log('login......');
            // 리턴값은 앞으로 유지해야하는 데이터(next state. 새로운 상태)
            return {email: action.payload.email}
        },
        logout: () => {
            console.log('logout...');
            // 로그아웃시 쿠키 제거
            removeCookie('member');
            return {...initState}
        }

    },
    extraReducers: (builder) => {
        // actionCreater = createAsyncThunk에서 지정한 이름문자열
        // 완료가 됐다 -> fulfilled
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            console.log('fulfilled')

            // action.payload 실제로 전달되는 데이터
            const payload = action.payload;

            // 로그인을 하면 메모리상으로도 보관해둬야하고 쿠키에도 보관을 해둬야함
            if(!payload.error){
                setCookie("member", JSON.stringify(payload), 1);
            }

            // 리듀서이기때문에 리턴하는값이 다음상태로 유지
            return payload
        })
        .addCase(loginPostAsync.pending, (state, action) => {
            console.log('pending')
        })
        .addCase(loginPostAsync.rejected, (state, action) => {
            console.log('rejected')
        })
    }
})

export const {login, logout} = loginSlice.actions;

export default loginSlice.reducer;