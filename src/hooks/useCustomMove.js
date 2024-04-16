import { useState } from "react"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"

const getNum = (param, defaultValue) => {

    if(!param){
        return defaultValue
    }

    return parseInt(param)
}

const useCustomMove  = () => {

    const navigate = useNavigate()

    const [refresh, setRefresh] = useState(false)

    const [queryParams] = useSearchParams()

    const page = getNum(queryParams.get('page'), 1)
    const size = getNum(queryParams.get('size'), 10)

    // page=1&size=10 문자를 만들어 내는 함수
    const queryDefault = createSearchParams({page, size}).toString()

    const moveToList = (pageParam) => {
        let queryStr = ''

        if(pageParam){
            // 페이지나 사이즈 값이 있을경우
            const pageNum = getNum(pageParam.page, 1)
            const sizeNum = getNum(pageParam.size, 10)

            queryStr = createSearchParams({page:pageNum, size:sizeNum}).toString()

        } else {
            // 파라미터가 없으면 현주소창에 연결되어있는 페이지로 이동
            queryStr = queryDefault
        }

        setRefresh(!refresh)

        navigate({pathname:`../list`, search:queryStr})
    }

    const moveToModify = (page) => {
        navigate({
            pathname: `../modify/${page}`,
            search: queryDefault
        })
    }

    const moveToRead = (page) => {
        navigate({
            pathname: `../read/${page}`,
            search: queryDefault
        })
    }


    // 나중에 여러개를 추가할 것이기때문에 객체스타일로 빼줌
    return {moveToList, moveToModify, moveToRead, page, size, refresh}
}


// 외부에서 사용할 수 있게끔 export
export default useCustomMove