import React, { useRef, useState } from "react";
import { postAdd } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const initState = {
    pname:'',
    pdesc:'',
    price:0,
    files:[]
}

// js에서 파일을 보내려면 multipart/form-data를 사용하고
// js에 있는 new FormData() 객체를 사용하여 파일을 심어서 보내야함
// 크게 두가지 방법이 존재
// 1. post방식
// 2. put방식

const AddComponent = () => {
    // 사용자가 입력하는부분이 있으니까 useState를 사용
    const [product, setProduct] = useState(initState)

    // ref를 사용해서 레퍼런싱하는애를 가져다가 쓰는 업로드방법
    // dom엘리먼트 찾을때 사용하는 document.getElementById같은것들을 쓸수는 있지만
    // 컴포넌트는 재사용을 목적으로 하기때문에
    // 리액트에서 고유한 돔엘리먼트를 식별할때 쓰기위하여 useRef
    const uploadRef = useRef()

    // useMutation을 이용하여 페칭상태가 없어도 됨
    // // 페치모달과 result모달을 사용하기위해 상태관리
    // const [fetching,setFetching] = useState(false);

    // useMutation을 이용하여 주석처리
    // const [result, setResult] = useState(false);


    // 모달을 닫았을때 페이지를 이동시키기위한 커스텀훅함수
    const {moveToList} = useCustomMove();

    const addMutation = useMutation({
        mutationFn: (product) => postAdd(product)
    })
    
    // 입력하는값을 변경해주는 역할을 하는 애
    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value

        // 변경된 내용은 setProduct로 상태변경시킴
        setProduct({...product})
    }

    // 버튼처리
    const handleClickAdd = (e) => {
        console.log(product)

        // 폼데이터 만들기
        const formData = new FormData()

        // 파일데이터
        const files = uploadRef.current.files

        for(let i=0; i<files.length; i++){
            // 서버측 request명이 files이기때문에...
            formData.append("files", files[i])
        }
        formData.append("pname", product.pname)
        formData.append("pdesc", product.pdesc)
        formData.append("price", product.price)

        // setFetching(true)

        // 기존 직접호출하는 방식에서 useMutation을 사용한 방식으로 수정
        // postAdd(formData).then(data => {
        //     setFetching(false)
        //     setResult(data.result)
        // })
        addMutation.mutate(formData);
    }

    const queryClient = useQueryClient();
    // 결과 모달을 닫기위해서
    const closeModal = () => {
        
        // useMutation을 사용하므로 주석처리
        // setResult(null)

        // list에서 사용했던 useQuery를 초기화시켜서 다시조회하도록함
        // (이게 없으면 모달을 닫고 목록으로 돌아갔을때 유효기간이내일경우 조회를 안함)
        queryClient.invalidateQueries("products/list");
        
        // 커스텀훅으로 만들어놨던 moveToList 기능을 이용해서 모달을 닫았을때 페이지 이동
        moveToList({page:1})
    }


    return ( 
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                    name="pname" type={'text'} value={product.pname} onChange={handleChangeProduct} >
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                    <textarea
                    className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                    name="pdesc" rows="4" onChange={handleChangeProduct} value={product.pdesc}>
                    {product.pdesc}
                    </textarea>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input
                    className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                    name="price" type={'number'} value={product.price} onChange={handleChangeProduct}>
                    </input>
                </div>
            </div>
        <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 text-right font-bold">Files</div>
                <input
                    ref={uploadRef}
                    className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                    type={'file'} multiple={true}>
                </input>
            </div>
        </div>
            <div className="flex justify-end">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button type="button"
                        className="rounded p-4 w-36 bg-blue-500 text-xl  text-white "
                        onClick={handleClickAdd} >
                    ADD
                    </button>
                </div>
            </div>

            {/* {fetching ? <FetchingModal/> : <></>} */}
            {addMutation.isPending ? <FetchingModal/> : <></>}
{/* 
            {result ? <ResultModal
                            callbackFn={closeModal}        
                            title={'Product Add Result'}
                            content={`${result}번 상품 등록 완료`}
                        ></ResultModal> : <></>} */}

            
                {addMutation.isSuccess ? <ResultModal
                            callbackFn={closeModal}        
                            title={'Product Add Result'}
                            content={`${addMutation.data.result}번 상품 등록 완료`}
                        ></ResultModal> : <></>}
        </div>
     );
}
 
export default AddComponent;