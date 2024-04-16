import React, { useEffect, useState } from 'react';
import { getOne } from '../../api/todoApi';
import useCustomMove from '../../hooks/useCustomMove';


// 처음에 데이터를 호출했을때 화면이 나와야한다
// 모양이 나와있는 상태에서 내용이 채워지게끔 하기위해 빈 데이터를 만들어준다.
const initState = {
    // 아무것도 없는 값으로 보통 채운다.
    tno : 0,
    title : '',
    content : '',
    dueDate : '',
    complete : false
}

// 데이터가 다 왔을때 처리해주는것  -> useEffect
// readPage -> 몇번째 todo를 내가 본다는 것을 의미
// -> readComponent는 ajax통신을 할것이고 내가 몇번인지 알아야함
// -> 몇번인지 주입받기
function ReadComponent({tno}) {

    // 나중에 데이터가 바뀐다는 얘기는 상태처리라는 이야기
    const [todo, setTodo] = useState(initState)

    // 커스텀 훅을 활용
    const {moveToList, moveToModify} = useCustomMove()

    // 리액트의 컴포넌트는 상태가 바뀌면 자동으로 렌더링된다
    // 함수형 컴포넌트에서 상태를 유지하기위해 useState사용
    // useEffect와 함께 사용
    useEffect(() => {
        getOne(tno).then(data => {
            console.log(data)
            setTodo(data)
        })
    },[tno]); // tno가 바뀌면다시 가져온다. 번호가 안바뀌었으면 호출을 하지않음

    return (
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
            {makeDiv('Tno', todo.tno)}
            {makeDiv('Content', todo.content)}
            {makeDiv('Title', todo.title)}
            {makeDiv('DueDate', todo.dueDate)}
            {makeDiv('Complete', todo.complete ? 'Completed' : 'Not Yet')}

            <div className="flex justify-end p-4">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                    onClick={() => moveToList()}>
                List
                </button>

                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                    onClick={() => moveToModify(todo.tno)}>
                Modify
                </button>
            </div>

        </div>
    );
}

const makeDiv = (title, value) => 
<div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <div className="w-1/5 p-6 text-right font-bold">{title}</div>
        <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
        {value}
        </div>
    </div>
</div>

export default ReadComponent;