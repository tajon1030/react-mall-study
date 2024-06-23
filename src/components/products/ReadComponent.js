import { useEffect, useState } from "react";
import { getOne } from "../../api/productsApi";
import { API_SERVER_HOST } from "../../api/todoApi";
import FetchingModal from "../common/FetchingModal";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useQuery } from "@tanstack/react-query";

const initState = {
    pno: 0,
    pname:'',
    pdesc:'',
    price:0,
    uploadFileNames:[]
}

const host = API_SERVER_HOST;

const ReadComponent = ({pno}) => {

    // 리액트 쿼리를 사용하기때문에 setProduct할 필요가 없어짐
    // const [product, setProduct] = useState(initState);

    // 리액트쿼리에서 isFetching을 사용하면되서 제거
    // const [fetching,setFetching] = useState(false);

    const { moveToList, moveToModify, page, size } = useCustomMove();

    // 파라미터가 객체로 처리됨
    const {data, isFetching} = useQuery({
        queryKey: ['products', pno], // 식별자
        queryFn: () => getOne(pno), // 실행하기위해 가져와야하는것이 무엇인지
        staleTime : 1000 * 10 // 10초동안의 유통기한(해당시간동안 새롭게조회하지않음)
    });

    const product = data || initState;

    // useEffect를 통해서 상태관리하던 비동기데이터를 useQuery로 관리하도록 변경
    // useEffect(()=>{
    //     getOne(pno).then(data => {
    //         setProduct(data);
    //         setFetching(false);
    //     })
    // },[pno]);

    // 현재 사용자의 장바구니 아이템들
    const {cartItems, changeCart} = useCustomCart();

    const {loginState} = useCustomLogin();

    const handleClickAddCart = () => {
        let qty = 1;

        const addedItem = cartItems.filter(item => item.pno === parseInt(pno))[0];

        if(addedItem){
            if(window.confirm('이미 추가한 상품입니다. 추가하시겠습니까?') === false){
                return
            }

            qty = addedItem.qty + 1;
        }

        changeCart({email: loginState.email, qty: qty, pno:pno});
    }

    return ( 
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4">

            {/* {fetching? <FetchingModal/> :<></>} */}
            {isFetching? <FetchingModal/> :<></>}

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PNO</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{product.pno}</div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PNAME</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{product.pname}</div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PRICE</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{product.price}</div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PDESC</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{product.pdesc}</div>
                </div>
            </div>
            <div className="w-full justify-center flex flex-col m-auto items-center">
                {product.uploadFileNames.map( (imgFile, i) =>
                    <img alt ="product" key={i} className="p-4 w-1/2"src={`${host}/api/products/view/${imgFile}`}/>
                )}
            </div>
            <div className="flex justify-end p-4">
                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-green-500"
                onClick={handleClickAddCart} > Add Cart </button>

                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                onClick={() => moveToModify(pno)}
                >
                Modify
                </button>

                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                    onClick={() => moveToList({page,size})}>
                List
                </button>
            </div>
        </div>
     );
}
 
export default ReadComponent;