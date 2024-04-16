import React, { useState } from 'react';
import ResultModal from '../common/ResultModal';
import { postAdd } from '../../api/todoApi';
import useCustomMove from '../../hooks/useCustomMove';

const initState = {
    title : '',
    content : '',
    dueDate : ''
}

function AddComponent(props) {

    const [todo, setTodo] = useState({...initState})
    // post api 결과를 상태로 보관하기위해
    const [result, setResult] = useState(null)
    const {moveToList} = useCustomMove()

    const handleChangeTodo = (e) => {

        console.log(e.target.name, e.target.value)

        todo[e.target.name] = e.target.value

        // state를 바꿀때에는 항상 새로운 객체여야하기때문에 완전히 새로 만들어줌
        setTodo({...todo})
    }

    const handleClickAdd = () => {
        postAdd(todo).then(result => {
            setResult(result.tno)
            // 기존에 있던 값 초기화해서 화면input태그 내용들을 지우기
            setTodo({...initState})
        })
    }

    const closeModal = () => {
        // result상태값을 null로 다시 바꿔버리면 모달화면 안나옴
        setResult(null)
        moveToList()
    }

    return (
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="title" type={'text'} value={todo.title} onChange={handleChangeTodo}></input>
                </div>
            </div>
            
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">CONTENT</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="content" type={'text'} value={todo.content} onChange={handleChangeTodo}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="dueDate" type={'date'} value={todo.dueDate} onChange={handleChangeTodo}></input>
                </div>
            </div>
            
            <div className="flex justify-end">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button type="button" onClick={handleClickAdd}
                        className="rounded p-4 w-36 bg-blue-500 text-xl text-white" >
                    ADD
                    </button>
                </div>
            </div>

            {result ? 
                <ResultModal 
                    title={'Add Result'}
                    content={`New ${result} Added`}
                    callbackFn={closeModal}
                ></ResultModal> 
                : <></>}
        </div>
    );
}

export default AddComponent;