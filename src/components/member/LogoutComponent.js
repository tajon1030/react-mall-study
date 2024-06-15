import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/loginSlice';
import useCustomLogin from '../../hooks/useCustomLogin';

function LogoutComponent() {


    // customHook 사용하여 주석처리
    // // 로그아웃컴포넌트에서는 로그아웃을 뿌려야함 => dispatch필요
    // const dispatch = useDispatch();

    const {doLogout, moveToPath} = useCustomLogin();
    
    // 버튼을 클릭하면 로그아웃 해야함
    const handleClickLogout = () => {
        // customHook 사용하여 주석처리
        // dispatch(logout())

        doLogout();
        alert('로그아웃 되었습니다.');
        moveToPath("/")
    }

    return (
        <div className ="border-2 border-red-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-red-500">
                Logout Component
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full justify-center">
                    <div className="w-2/5 p-6 flex justify-center font-bold">
                        <button className="rounded p-4 w-36 bg-red-500 text-xl text-white"
                            onClick={handleClickLogout} > LOGOUT </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogoutComponent;