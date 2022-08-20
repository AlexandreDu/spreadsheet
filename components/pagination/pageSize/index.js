
export const PageSize = ({pageSize, handleChangePageSize}) => {

    let optionsValues = ['5', '10', '15']

    return (
       

            <select className="outline-0  flex flex-wrap items-center ml-[0.25rem] cursor-pointer  rounded-[0.25rem] focus:border-blue-500 h-[1.5rem] leading-[1rem]" value={pageSize} onChange={(e => handleChangePageSize(e.target.value))}>
                {optionsValues.map(value => (
                    <option key={value} value={value}>{value} / page</option>
                ))}
            </select>
 
       
    )
}