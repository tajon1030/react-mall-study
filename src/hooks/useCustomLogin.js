import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";

const useCustomLogin = ()  => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    // 일일히 selector선언해서 사용하기 귀찮으니까 커스텀훅으로 사용할수있도록 선언
    const loginState = useSelector(state => state.loginSlice);

    const isLogin = loginState.email ? true : false; // 로그인여부

    const doLogin = async (loginParam) => { // 로그인함수
        const action = await dispatch(loginPostAsync(loginParam));

        return action.payload;
    }

    const doLogout = () => { // 로그아웃 함수
        dispatch(logout());
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

    return {loginState, isLogin, doLogin, doLogout, moveToPath, moveToLogin, moveToLoginReturn }
}

export default useCustomLogin;