import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { signinState } from "../atoms/signinState";
import { removeCookie, setCookie } from "../util/cookieUtil";
import { loginPost } from "../api/memberApi";
import { cartState } from "../atoms/cartState";

const useCustomLogin = ()  => {
    const navigate = useNavigate();

    // 리코일로 전환하기위해 리덕스툴킷관련 코드 제거
    // const dispatch = useDispatch();
    //
    // 일일히 selector선언해서 사용하기 귀찮으니까 커스텀훅으로 사용할수있도록 선언
    // const loginState = useSelector(state => state.loginSlice);
    const [loginState, setLoginState] = useRecoilState(signinState);
    const resetState = useResetRecoilState(signinState);

    const resetCartState = useResetRecoilState(cartState);


    const isLogin = loginState.email ? true : false; // 로그인여부

    const doLogin = async (loginParam) => { // 로그인함수
        // 리코일 전환
        // const action = await dispatch(loginPostAsync(loginParam));
        // return action.payload;

        // 쿠키저장
        const result = await loginPost(loginParam);
        saveAsCookie(result);
        // state변경
        setLoginState(result);
        return result;
    }
    const saveAsCookie = (data) => {
        setCookie('member', JSON.stringify(data), 1); // 기본 하루
        setLoginState(data);
    }

    const doLogout = () => { // 로그아웃 함수
        // 리코일 전환
        // dispatch(logout());
        removeCookie('member');
        resetState();
        // 로그아웃시 카트상태도 초기화
        resetCartState();
    }

    const moveToPath = (path) => { // 페이지이동
        navigate({pathname: path},{replace:true})
    }
    
    const moveToLogin = () => { // 로그인페이지로 이동
        navigate({pathname: '/member/login'},{replace:true})
    }

    // 로그인 페이지로 이동 컴포넌트
    const moveToLoginReturn = () => {
        return <Navigate replace to ="/member/login" />
    }

    return {loginState, isLogin, doLogin, doLogout, moveToPath, moveToLogin, moveToLoginReturn, saveAsCookie }
}

export default useCustomLogin;