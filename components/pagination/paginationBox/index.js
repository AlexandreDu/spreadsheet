
export const PaginationBox = ({pageNumber, isSelected, onClick}) => {

    return (
        <div onClick={() => onClick(pageNumber)} className={`${isSelected ? 'bg-blue-100' : 'bg-white'} text-black border-blue-500 border-[0.1rem] min-w-[1.5rem] max-h-[1.5rem] leading-[1.3rem] rounded-[0.25rem] text-center ml-[0.25rem] cursor-pointer`}>
            {pageNumber}
        </div>
    )
}