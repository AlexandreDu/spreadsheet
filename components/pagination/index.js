import { useState, useEffect } from "react"
import { PaginationBox } from "./paginationBox"
import { PageSize } from "./pageSize"
export const Pagination = ({totalCount, pageSize, currentPage, handleChangePage, handleChangePageSize }) => {


   
    let totalPagesCount = Math.ceil(totalCount / pageSize)
  
    let arr = new Array(totalPagesCount).fill(undefined)


    return (
        <div className="flex flex-wrap justify-end items-center mt-6 ">
            {arr.map((_, index) => {
                return (
                    <PaginationBox 
                    key={index} 
                    pageNumber={index + 1} 
                    onClick={handleChangePage} 
                    isSelected={currentPage === index + 1} 
                />
                )
            })}
            <PageSize 
                pageSize={pageSize} 
                handleChangePageSize={handleChangePageSize} 
            />
        </div>
    )
}