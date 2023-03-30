import React, { useState } from 'react'
import './pagination.css'

const Pagination = ({items,handlePage,currentPageNo}) => {

    // console.log('items',items)
    if(items==0) return
    const pages1 = Math.ceil(items / 5)
    var arr=[] 
    for(let i=1;i<=pages1;i++){
        arr.push(i)
    }
    // const [pages,setPages]=useState(new Array(pages1).fill(-1))
    // console.log(items)
  return (
    <div className='pagination'>
        {/* {console.log('pages',arr)} */}
        {
            arr.map(page=>{
                return(
                    <button className={page==currentPageNo?'activePage':''} onClick={()=>handlePage(page)}>{page}</button>
                )
            })
        }
    </div>
  )
}

export default Pagination