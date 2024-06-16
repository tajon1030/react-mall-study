import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { login } from "../../slices/loginSlice";
import { useDispatch } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {

    const [searchParams] = useSearchParams();

    const authCode = searchParams.get('code');

    const dispatch = useDispatch();

    const {moveToPath} = useCustomLogin();

    // 인가코드가 바뀌면 getAccessToken을 할것
    useEffect(() =>{ 
        getAccessToken(authCode)
        .then(accessToken =>{
            // 액세스토큰으로 회원정보를 가져오기 api 호출
            getMemberWithAccessToken(accessToken)
                .then(result => { 
                    // 회원정보 쿠키 저장
                    dispatch(login(result));

                    if(result && result.social){
                        moveToPath('/member/modify');
                    }else{
                        moveToPath('/');
                    }                    
                });
        });
    }, [authCode]);

    return ( 
        <div>
            <div>KakaoLoginRedirect</div>
            <div>{authCode}</div>
        </div>
     );
}
 
export default KakaoRedirectPage;