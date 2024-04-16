
// AWS를 사용할때 이 부분만 변경하면 되도록 구현

import axios from "axios"

// 경로 따기
export const API_SERVER_HOST = 'http://localhost:8080'

// 내가 사용하는 경로
const prefix = `${API_SERVER_HOST}/api/todo`


// 비동기 통신이니까 async
// 참고로 async 함수 내에서 return 키워드를 사용하여 값을 반환하면,
// 해당 값은 암시적으로 Promise 객체로 감싸져서 반환된다.
// 따라서 async 함수를 호출한 쪽에서는 then 메서드나 await 키워드를 사용하여 결과를 처리해야 한다.
export const getOne = async (tno) => { // tno를 받으면 동작하도록 함
    const res = await axios.get(`${prefix}/${tno}`)

    return res.data
}


// 파라미터를 여러개 받을때에는 객체스타일로 받는 것이 편함(확장성을 생각해서)
// -> 파라미터 갯수가 늘어나지않아서 좋음
export const getList = async (pageParam) => {
    const {page, size} = pageParam

    const res = await axios.get(`${prefix}/list`, {params:{page, size}}) // {...pageParam} 도 가능

    return res.data
}

export const postAdd = async (todoObj) => {

    // JSON.stringfy(obj) => 객체를 json문자열로 바꿔서 처리하던 이전 방식
    // axios를 이용하면 그럴 필요가 없음
    const res = await axios.post(`${prefix}/`, todoObj)

    return res.data

}


export const deleteOne = async (tno) => {

    const res = await axios.delete(`${prefix}/${tno}`)

    return res.data
}

export const putOne = async (todo) => {

    const res = await axios.put(`${prefix}/${todo.tno}`, todo)

    return res.data
}