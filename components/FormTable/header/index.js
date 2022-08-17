import { useEffect, useState } from 'react'
import { Cell } from '../../tableComponents/Cell'
import { Icon } from '../../icon'
import { faCaretDown, faCaretUp, faFilter } from "@fortawesome/free-solid-svg-icons"
import { useModal } from '../../../hooks/useModal'
import { useForm } from 'react-hook-form'
import { Filter } from '../../filter'
import _ from 'lodash'

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
        console.log('isChecked', isChecked)
        let dataBodyCopy = _.cloneDeep(dataBody)

        let displayedList

        

        
    // s'il n'y a qu'un index dans isChecked, il faut que le filtre correspondant à cet index retourne toute la liste et pas le displayed
    
    if(Object.keys(isChecked).length === 1) {

        let checkedIndex = parseInt(Object.keys(isChecked), 10)

        if(checkedIndex === index ) {
            listColumn = dataBodyCopy.map(({rowValues, id}) => {
                let checked

                isChecked[checkedIndex].includes(rowValues[index]) ? checked = true : checked = false
                return {value: rowValues[index], checked, label: rowValues[index], id}
            })
            
            return listColumn
        }
        
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
      
    if(Object.keys(isChecked).length === 0) {
        displayedList = dataBodyCopy
    }

    

    console.log('displayedList: ', displayedList)
    

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

    console.log('displayedListColumn: ', displayedListColumn)
    return displayedListColumn
   
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
                                        index={index}
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