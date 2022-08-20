

//'as' can have have the followig values: th, td




export const Cell = ({as = 'td', color, onClick, children}) => {
   
  
    let componentToRender

    if(as === 'th') {
        componentToRender = (
            <th className=' break-words font-semibold rounded-[0.25rem] p-[1rem]' onClick={onClick}>
                <div className="h-[4rem]  inline-block leading-[4rem]">
                    {children}
                </div>
            </th>
        )
        
    }
    if(as ==='td') {
        componentToRender = (
            
            <td className='break-words rounded-[0.25rem] p-[1rem] ' onClick={onClick}>
                <div className="w-full inline-block ">
                    {children}
                </div>   
            </td>
            
        )
        
    }


    return (
    
            componentToRender
           
    )

}



