import { atom } from "recoil"
import { getCookie } from "../util/cookieUtil"

const initState = {
    email : '',
    nickname : '',
    social : false,
    accessToken : '',
    refreshToken : ''
}

const loadMemberCookie = () => {
    const memberInfo = getCookie('member');

    // 한글닉네임처리
    if(memberInfo && memberInfo.nickname){
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
    }
    return memberInfo;
}

export const signinState = atom({
    key: 'signinState',
    // 쿠키값 확인해보고 없으면 initState
    default: loadMemberCookie() || initState
});