import { Cell } from '../../tableComponents/Cell'
import { Icon } from '../../icon'
import { faCaretDown, faCaretUp, faFilter } from "@fortawesome/free-solid-svg-icons"

export const Header = ({dataHeader, handleSort}) => {


    return (
        dataHeader && (
            <thead>
                <tr className='bg-slate-100'>
                {dataHeader.rowValues.map((cellValue, index) => {
                    return (
                        <Cell as='th' key={index}>
                            <div className='flex flex-col' >
                                <span>{cellValue}</span>
                                <div className='flex justify-end'>                  
                                    <Icon color='text-blue-500' icon={faCaretUp} onClick={() => handleSort(index, 'ascending')}/>   
                                    <Icon color='text-blue-500' icon={faCaretDown} onClick={() => handleSort(index, 'descending')}/>
                                    <Icon color='text-blue-500' icon={faFilter} onClick={() => handleSort(index, 'descending')}/>
                                </div>
                            </div>
                            
                        </Cell>
                    )
                })}
                <Cell as='th'>edit</Cell>
                <Cell as='th'>delete</Cell>
                </tr>
            </thead>
        )
    )
}