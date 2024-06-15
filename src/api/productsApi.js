import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtils";


const host = `${API_SERVER_HOST}/api/products`

// 비동기니까 async
export const postAdd = async (product) => {
    
    // 엑시오스를 사용하여 multipart/form-data전송
    // 헤더셋팅을 다르게 해줄 필요가 있음
    const header = {headers: {'Content-Type':'multipart/form-data'}}

    // product는 FormData객체
    const res = await jwtAxios.post(`${host}/`, product, header)

    return res.data
}

export const getList = async(pageParam) => {

    const {page, size} = pageParam

    // async니까 await
    const res = await jwtAxios.get(`${host}/list`, {params: {page:page, size: size}})

    return res.data
}

export const getOne = async(pno) => {
    const res = await jwtAxios.get(`${host}/${pno}`);

    return res.data;
}

export const deleteOne = async(pno) => {
    const res = await jwtAxios.delete(`${host}/${pno}`);

    return res.data
}

// 수정은 multipart/form-data 주의
// 경로처리가 불편해서 pno는 따로 빼서 받음
export const putOne = async(pno, product) => {
    
    const header = {headers: {'Content-Type':'multipart/form-data'}}

    // product 전달해야하고 header도 같이 보내야함
    const res = await jwtAxios.put(`${host}/${pno}`, product, header);

    return res.data
}