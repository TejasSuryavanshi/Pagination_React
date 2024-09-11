import React, { useEffect, useReducer } from 'react'

const itemPerPage = 5;

const paginationReducer = (state,action) =>{
    switch(action.type){
        case 'SET_CURRENT_PAGE':
        return {...state,currentPage:action.payload}
        case 'SET_TOTAL_ITEMS':
            return {...state,totalItem:action.payload}
            default :
            return state
    }
}
function Pagination() {
    const data = Array.from({length:25},(_,index) => `item ${index+1}`);
    console.log(data);

    const [paginationState,dispatch] = useReducer(paginationReducer,{
        currentPage:1,
        totalItem:0
    })

    useEffect(()=>{
        dispatch({type:'SET_TOTAL_ITEMS',payload:data.length})
    },[data])
    
    const startIndex = (paginationState.currentPage-1)*itemPerPage;
    const endIndex = startIndex + itemPerPage;

    const displayedItems = data.slice(startIndex,endIndex);

    const handlePageClick = (newpage)=>{
        dispatch({type:'SET_CURRENT_PAGE',payload:newpage})
    }
  return (
    <div>
        <h1>Pagination</h1>

        <ul>
            {
                displayedItems.map((item,index)=>(
                    <li key={index}>
                        {item}
                    </li>
                ))
            }
        </ul>
        <div>
            <button onClick={()=>handlePageClick(paginationState.currentPage-1)} disabled={paginationState.currentPage === 1}>Previous</button>
            <button onClick={()=>handlePageClick(paginationState.currentPage+1)} disabled={endIndex >= data.length}>Next</button>
        </div>
    </div>
  )
}

export default Pagination