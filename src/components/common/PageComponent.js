import React from 'react';

// serverDate : 페이징 처리를 위한 데이터들
// movePage : 페이지를 이동할 수 있는 커스텀 훅 기능
function PageComponent({serverData, movePage}) {
    return (
        <div className="m-6 flex justify-center">
            
            {serverData.prev ?
                <div 
                    className="m-2 p-2 w-16 text-center font-bold text-blue-400 "
                    onClick={() => movePage({page:serverData.prevPage})}>
                Prev </div> : <></>
            }

            {serverData.pageNumList.map(pageNum =>
                <div 
                    key={pageNum}
                    className={ `m-2 p-2 w-12 text-center rounded shadow-md text-white
                       ${serverData.current === pageNum? 'bg-gray-500':'bg-blue-400'}`}
                    onClick={() => movePage({page:pageNum})}>
                {pageNum}
                </div>
            )}

            {serverData.next ?
                <div className="m-2 p-2 w-16 text-center font-bold text-blue-400"
                    onClick={() => movePage( {page:serverData.nextPage})}>
                Next </div> : <></>
            }

        </div>
    );
}

export default PageComponent;