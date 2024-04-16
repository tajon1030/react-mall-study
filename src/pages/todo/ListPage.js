import React from 'react';
import ListComponent from '../../components/todo/ListComponent';

function ListPage(props) {

    // ListComponent는 브라우저 주소창을 기준으로 동작을 하여 속성값으로 주는것이 없음 
    return (
        <div className="p-4 w-full bg-orange-200 ">
            <div className="text-3xl font-extrabold">
            Todo List Page Component
            </div>

            <ListComponent></ListComponent>
        </div>
    );
}

export default ListPage;