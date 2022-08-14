import { useEffect, useState } from 'react'
import { Cell } from '../../tableComponents/Cell'
import { Icon } from '../../icon'
import { faCaretDown, faCaretUp, faFilter } from "@fortawesome/free-solid-svg-icons"
import { useModal } from '../../../hooks/useModal'
import { useForm } from 'react-hook-form'
import { Filter } from '../../filter'
import _, { filter } from 'lodash'

export const Header = ({dataHeader, handleSort, dataBody, onChangeFilter, isChecked, setIsChecked}) => {


    //for filter
    const [isVisible, setIsVisible, toggle] = useModal()
    const [filtersVisibility, setFiltersVisibility] = useState({})
    const [columnList, setColumnList] = useState({})

    const { handleSubmit, reset, control, formState: { errors }, register, getValues, watch } = useForm()

    const toggleFilter = (index) => {
       
        let filtersVisibilityCopy = _.cloneDeep(filtersVisibility)
        filtersVisibilityCopy[index] = !filtersVisibility[index]
        // we close all the filters except the one we want to open
        for(const i in filtersVisibilityCopy) {
            
            filtersVisibilityCopy[i] = index.toString() === i ? filtersVisibilityCopy[i] : false
        }


        setFiltersVisibility(filtersVisibilityCopy)

        
       
    }
    useEffect(() => {

        if(!dataBody) return
        if(!dataHeader) return
        let dataBodyCopy = _.cloneDeep(dataBody)

        //we look for the quantity of cells in a row
        let cellsQuantity = 0
        console.log('dataHeader: ', typeof dataHeader)
        dataHeader['rowValues'].forEach(cell => cellsQuantity++)

        let columnListFormat = {}
        for(let i = 0; i < cellsQuantity; i++) {
            columnListFormat[i] = dataBodyCopy.map(({rowValues, id}) => (
                {label:rowValues[i], value: rowValues[i], checked: false, id}
            ))
        }

        setColumnList(columnListFormat)

        

    }, [dataBody && dataBody.length])

    useEffect(() => {

        console.log('columnList', columnList)
    }, [columnList])


    useEffect(() => {

        if(!dataBody) return

        let filtersVisibilityCopy = _.cloneDeep(filtersVisibility)
        let openedFilterIndex
        for(const index in filtersVisibilityCopy) {
            if(filtersVisibilityCopy[index] === true) openedFilterIndex = index
        }
       
        let columnListCopy = _.cloneDeep(columnList)
        

        
        columnListCopy[openedFilterIndex] = columnListCopy[openedFilterIndex].map(item => {
            let checked
            isChecked.includes(item.value) ? checked = true : checked = false

            return (
                {...item, checked}
            )
        })

        setColumnList(columnListCopy)

    }, [isChecked.length])

    
//columnList devrait être un object avec comme props index et comme valeur array
   




   
 

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
                                        isVisible={filtersVisibility[index]}
                                        list={columnList[index]}
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