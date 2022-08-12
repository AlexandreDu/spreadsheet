import { useState } from 'react'
import { Cell } from '../../tableComponents/Cell'
import { Icon } from '../../icon'
import { faCaretDown, faCaretUp, faFilter } from "@fortawesome/free-solid-svg-icons"
import { useModal } from '../../../hooks/useModal'
import { useForm } from 'react-hook-form'
import { Filter } from '../../filter'
import _ from 'lodash'

export const Header = ({dataHeader, handleSort, dataBody}) => {


    //for filter
    const [isVisible, setIsVisible, toggle] = useModal()
    const [filtersVisibility, setFiltersVisibility] = useState({})
    const [columnList, setColumnList] = useState([])

    const { handleSubmit, reset, control, formState: { errors }, register, getValues } = useForm()

    const toggleFilter = (index) => {
       
        let filtersVisibilityCopy = _.cloneDeep(filtersVisibility)
        filtersVisibilityCopy[index] = !filtersVisibility[index]
        // we close all the filters excep the one we want to open
        for(const i in filtersVisibilityCopy) {
         
            filtersVisibilityCopy[i] = index.toString() === i ? filtersVisibilityCopy[i] : false
        }


        setFiltersVisibility(filtersVisibilityCopy)

        let columnListFormat = dataBody.map(({rowValues, id}) => (
            {label:rowValues[index], value: false, id}
        ))
        
        setColumnList(columnListFormat)
    }

    const onChange = () => {
        console.log('getValues(): ', getValues())
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
                                        register={register}
                                        isVisible={filtersVisibility[index]}
                                        list={columnList}
                                        onChange={onChange}
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