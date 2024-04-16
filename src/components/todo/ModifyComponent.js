import React, { useEffect, useState } from 'react';
import { getOne } from '../../api/todoApi';

// 처음에 화면나올때 없으면 undefined 뜨면서 에러가 나니까..
const initState = { tno:0, title:'', writer: '', dueDate: '', complete: false }

function ModifyComponent({tno}) {

    const [todo, setTodo] = useState(initState)

    useEffect(() => {
        getOne(tno).then(data => {
            console.log(data)
            setTodo(data)
        })
    },[tno]); 

    return (
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-end p-4">
                <button type="button"
                    className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500" >
                Delete
                </button>
                <button type="button"
                    className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" >
                Modify
                </button>
            </div>
        </div>
    );
}

export default ModifyComponent;