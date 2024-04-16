import React, { useEffect, useState } from 'react';
import useCustomMove from '../../hooks/useCustomMove';
import { getList } from '../../api/todoApi';
import PageComponent from '../common/PageComponent';

// api 응답값이랑 맞춰준 기본 변수들
const initState = {
    dtoList:[], pageNumList:[], pageRequestDTO: null, prev: false, next: false,
    totoalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0 }

function ListComponent(props) {

    // ajax통신을 할것이고 그러기위해 기본적으로 useState, useEffect를 사용할 것
    const {page, size, moveToList, moveToRead, refresh} = useCustomMove()

    const [serverData, setServerData] = useState(initState)

    useEffect(()=>{
        getList({page, size}).then(data => {
            setServerData(data)
        })

    }, [page, size, refresh]) // page나 size가 변경될때 다시 호출,
                            // refresh 변경시마다 다시호출(refresh는 페이지 클릭때마다 변경)

    return (
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
            <div className="flex flex-wrap mx-auto justify-center p-6">
                {serverData.dtoList.map(todo =>
                    <div key= {todo.tno} className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
                        onClick={()=>moveToRead(todo.tno)}>
                        <div className="flex ">
                            <div className="font-extrabold text-2xl p-2 w-1/12"> {todo.tno} </div>
                            <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">{todo.title}</div>
                            <div className="text-1xl m-1 p-2 w-2/10 font-medium"> {todo.dueDate} </div>
                        </div>
                    </div>
                )}
            </div>
            
            <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
        </div>
    );
}

export default ListComponent;