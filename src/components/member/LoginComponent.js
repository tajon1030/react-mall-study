import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, loginPostAsync } from "../../slices/loginSlice";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import KakaoLoginComponent from "./KakaoLoginComponent";

const initState = {
    email: '',
    pw: ''
}

const LoginComponent = () => {

    const [loginParam, setLoginParam] = useState({...initState});

    // 커스텀 훅을 사용하여 수정됨
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const {doLogin, moveToPath} = useCustomLogin();
    

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value;

        setLoginParam({...loginParam});
    }
    
    // dispatch의 내용물은 어플리케이션에서 이 데이터를 이렇게 유지해줘~ 하는 다음 데이터
    const handleClickLogin = (e) => {
        // 리듀서를 호출한 결과를 디스패치한다.
        //dispatch(login(loginParam))

        // createAsyncThunk를 바로 호출해서 사용
        // 유지하는 데이터를 사용하려면 useSelector를 이용해서 정보를 추출해내야함
        // -> 비동기이기때문에 언제데이터가 올줄 몰라서 거기에 맞춰 코딩하기 어려움
        // -> unwrap 사용을하면 비동기를 사용했지만 동기화된것처럼 결과를 받아서 보는 상황에 유용함
        // 커스텀훅 추가로 주석처리하였음
        // dispatch(loginPostAsync(loginParam))
        //     .unwrap()
        //     .then(data => {
        //         if(data.error){
        //             alert("이메일과 패스워드를 확인해주세요")
        //         }else{
        //             alert("로그인성공");
        //             navigate({pathname:'/'}, {replace: true}) // 뒤로가기했을경우를 위해서 replace옵션 추가
        //         }
        //     })

        doLogin(loginParam).then(data => {
            if(data.error){
                alert("이메일과 패스워드를 확인해주세요")
            }else{
                moveToPath("/");
            }
        })
    }

    return ( 
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">Login Component</div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-2/5 p-6 text-right font-bold">Email</div>
                    <input className="w-1/2 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="email" type='text' value={loginParam.email} onChange={handleChange}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-2/5 p-6 text-right font-bold">Password</div>
                    <input className="w-1/2 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="pw" type={'password'} value={loginParam.pw} onChange={handleChange}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full justify-center">
                    <div className="w-2/5 p-6 flex justify-center font-bold">
                        <button className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
                            onClick={handleClickLogin}>
                        LOGIN
                        </button>
                    </div>
                </div>
            </div>
            <KakaoLoginComponent/>
        </div>
     );
}
 
export default LoginComponent;