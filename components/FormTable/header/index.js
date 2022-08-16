import { useEffect, useState } from 'react'
import { Cell } from '../../tableComponents/Cell'
import { Icon } from '../../icon'
import { faCaretDown, faCaretUp, faFilter } from "@fortawesome/free-solid-svg-icons"
import { useModal } from '../../../hooks/useModal'
import { useForm } from 'react-hook-form'
import { Filter } from '../../filter'


export const Header = ({dataHeader, handleSort, dataBody, onChangeFilter, isChecked}) => {


   
    const [filterOpenedIndex, setFilterOpenedIndex] = useState(null)


    const { handleSubmit, reset, control, formState: { errors }, register, getValues, watch } = useForm()

    const toggleFilter = (index) => {
       //if the filter is already open and we click on it again, we close it
        if(index === filterOpenedIndex) {
            setFilterOpenedIndex(null)
            return
        }

        setFilterOpenedIndex(index)
        
       
    }

 

    const renderFilterList = (index) => {
    
        let dataBodyCopy = _.cloneDeep(dataBody)
      
        return  dataBodyCopy.map(({rowValues, id}) => {
            let checked
            isChecked.includes(rowValues[index]) ? checked = true : checked = false
           return (
                {label:rowValues[index], value: rowValues[index], checked, id}
            )
        })
    }

  
    

    return (
        dataHeader && (
            <thead>
                <tr className='bg-slate-100 '>
                {dataHeader.rowValues.map((cellValue, index) => {
                    return (
                        <Cell as='th' key={index}>
                            <div className='w-full h-full flex items-center justify-center relative' >
                                <span>{cellValue}</span>
                                <div className='flex justify-end absolute bottom-0 right-0'>                  
                                    <Icon 
                                        color='text-slate-500' 
                                        size='fa-2xs' 
                                        icon={faCaretUp} 
                                        onClick={() => handleSort(index, 'ascending')}
                                    />   
                                    <Icon 
                                        color='text-slate-500' 
                                        size='fa-2xs' 
                                        icon={faCaretDown} 
                                        onClick={() => handleSort(index, 'descending')}
                                    />
                                    <Icon 
                                        color='text-blue-500' 
                                        size='fa-xs' 
                                        icon={faFilter} 
                                        onClick={() => toggleFilter(index)}
                                    />
                                    <Filter 
                                        isVisible={filterOpenedIndex === index}
                                        list={renderFilterList(index)}
                                        onChange={onChangeFilter}
                                    />
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