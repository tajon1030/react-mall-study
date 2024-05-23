import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { getList } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";


// api 응답값이랑 맞춰준 기본 변수들
const initState = {
    dtoList:[], pageNumList:[], pageRequestDTO: null, prev: false, next: false,
    totoalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0 }

// 이미지 출력하는 경로
const host = API_SERVER_HOST

const ListComponent = () => {

    // 다른페이지로 이동하기위해 커스텀훅이용
    const { moveToList, moveToRead, page, size, refresh } = useCustomMove();

    // 목록데이터를 가져오기위해서 useEffect와 useState 같이 사용해야함
    // axios로 가져온 결과를 담아서 사용하기위해
    const [serverData, setServerData] = useState(initState);

    // 페칭모달
    const [fetching, setFetching] = useState(false);

    useEffect(()=> {
        // useEffect가 동작하면 페칭=true 데이터를 가져오고있음
        setFetching(true);

        //page와 size를 전달
        getList({page, size}).then(data => {
            // 데이터를 다 가져오면
            setFetching(false);
            setServerData(data);
        });
    },[page, size, refresh]);

    return ( 
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
            
            {fetching? <FetchingModal/> :<></>}

            <div className="flex flex-wrap mx-auto p-6">
                
                {serverData.dtoList.map(product =>

                <div key= {product.pno} className="w-1/2 p-1 rounded shadow-md border-2" 
                    onClick={() => moveToRead(product.pno)}>
                    <div className="flex flex-col h-full">
                        <div className="font-extrabold text-2xl p-2 w-full ">{product.pno}</div>
                        <div className="text-1xl m-1 p-2 w-full flex flex-col">
                            <div className="w-full overflow-hidden ">
                                <img alt="product" className="m-auto rounded-md w-60"
                                    src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}/>
                            </div>
                            <div className="bottom-0 font-extrabold bg-white">
                                <div className="text-center p-1">
                                이름: {product.pname}
                                </div>
                                <div className="text-center p-1">
                                가격: {product.price}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
                </div>

                <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
        </div>
     );
}
 
export default ListComponent;