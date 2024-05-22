import React, { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';


const Loading = <div className={'bg-red-500'}>Loading....</div>
const ProductList = lazy(() => import("../pages/products/ListPage"))
const ProductAdd = lazy(() => import("../pages/products/AddPage"))

// product로 시작했을때 등록/수정/삭제 이동시킬수있도록
const productsRouter = () => {
    return [
        {
            path: 'list',
            element: <Suspense fallback={Loading}><ProductList/></Suspense>
        },
        {
            path:'add',
            element: <Suspense fallback={Loading}><ProductAdd/></Suspense>
        },
        {
            path:'',
            element: <Navigate replace to="/products/list"></Navigate>
        }
    ];
}

export default productsRouter;