

//as can have have the followig values: th, td




export const Cell = ({as = 'td', color, onClick, children}) => {
  
    let componentToRender

    if(as === 'th') {
        componentToRender = (
            <th className=' h-[5rem] break-words font-semibold rounded-[0.25rem] p-[1rem]' onClick={onClick}>
                {children}
            </th>
        )
        
    }
    if(as ==='td') {
        componentToRender = (
            <td className='break-words h-[48px] rounded-[0.25rem] p-[1rem]' onClick={onClick}>
                {children}
            </td>
        )
        
    }




    return (
        
            componentToRender      
    )

}



