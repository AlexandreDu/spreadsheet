import { useEffect, useState } from 'react'
import { Cell } from '../../tableComponents/Cell'
import { Icon } from '../../icon'
import { faCaretDown, faCaretUp, faFilter } from "@fortawesome/free-solid-svg-icons"
import { useModal } from '../../../hooks/useModal'
import { useForm } from 'react-hook-form'
import { Filter } from '../../filter'
import _ from 'lodash'
import { ellipsis } from '../../../utility/ellipsis'

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

   
    const getFilterList = (index) => {
        let dataBodyCopy = _.cloneDeep(dataBody)
        let displayedList

    // if there is only one property in the isChecked object, it means we are using only one column filter -> the corresponding filter must list all the items of the columns (and not only the displayed ones)

    let checkedIndex = parseInt(Object.keys(isChecked), 10)
    
    if(Object.keys(isChecked).length === 1 && checkedIndex === index) {

        listColumn = dataBodyCopy.map(({rowValues, id}) => {
            let checked

            isChecked[checkedIndex].includes(rowValues[index]) ? checked = true : checked = false
            return {value: rowValues[index], checked, label: rowValues[index], id}
        })
        
        // we return listColumn and exit the function
        return listColumn
        
        
    }
    
    if(Object.keys(isChecked).length >= 1) {
        displayedList = dataBodyCopy.filter(({rowValues}, rowIndex) => {

            let result = rowValues.map((cell, cellIndex) => {
                if(isChecked[cellIndex]) {
                    return isChecked[cellIndex].includes(cell)
                }
                return true
            }) 
            
            
            const areCellAllTrue = result.every((cellBoolean) => cellBoolean === true)
            
            return areCellAllTrue
        })
    } 
      
    //if no value is selected in every filter, the displayed list in the table is the data we fetched initially
    if(Object.keys(isChecked).length === 0) {
        displayedList = dataBodyCopy
    }


    let listColumn = displayedList.map(({rowValues, id}) => {
        return {value: rowValues[index], checked: false, label: rowValues[index], id}
    })
    

    let displayedListColumn

    if(!isChecked[index]) {
        displayedListColumn = _.cloneDeep(listColumn)
    }
    
    if(isChecked[index]) {
        displayedListColumn = listColumn.map(item => {
            item.checked = isChecked[index].includes(item.value) ? true : false
            return item
        })
        displayedListColumn = displayedListColumn.filter(({value, id}) => {
            return isChecked[index].includes(value)
        })
    }

   
    return displayedListColumn
   
    }



    return (
        dataHeader && (
            <thead>
                <tr className='bg-slate-200'>
                {dataHeader.rowValues.map((cellValue, index) => {
                    let isSomeChecked = getFilterList(index).some(item => item.checked)
                    return (
                        <Cell as='th' key={index}>
                            <div className='w-full h-full flex flex-col justify-center  relative' >
                                <span>{ellipsis(cellValue, 10)}</span>
                                <div className='flex justify-end '>                  
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
                                        color={`${isSomeChecked ? 'text-blue-500' : 'text-slate-500' }`} 
                                        size='fa-xs' 
                                        icon={faFilter} 
                                        onClick={() => toggleFilter(index)}
                                    />
                                    <Filter 
                                        index={index}
                                        isVisible={filterOpenedIndex === index}
                                        list={getFilterList(index)}
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