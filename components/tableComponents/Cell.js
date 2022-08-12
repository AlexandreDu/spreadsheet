

//as can have have the followig values: th, td




export const Cell = ({as = 'td', color, onClick, children}) => {
  
    let componentToRender

    if(as === 'th') {
        componentToRender = (
            <th className='rounded-[0.25rem] h-[5rem]' onClick={onClick}>
                {children}
            </th>
        )
        
    }
    if(as ==='td') {
        componentToRender = (
            <td className='break-words h-[48px]' onClick={onClick}>
                {children}
            </td>
        )
        
    }




    return (
        
            componentToRender      
    )

}



