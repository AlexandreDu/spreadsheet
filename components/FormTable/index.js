import {useState, useCallback, useEffect} from 'react'
import { Header } from './header'
import { Modal } from '../modals'
import { InputText } from '../formComponents'
import { useForm } from 'react-hook-form'
import { useModal } from '../../hooks/useModal'
import _ from 'lodash'
import { Body } from './body'
import { Icon } from '../icon'
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { v4 as uuidv4 } from 'uuid'


export const FormTable = ({dataHeader, dataBody, setDataBody}) => {


    const { handleSubmit, reset, control, formState: { errors }, register, getValues } = useForm()

    const[isEdit, setIsEdit] = useState(null)

    const handleEdit = (index) => {
        setIsEdit(index)
    }

    const handleConfirmEdit = (id) => {
      
        
    
        let dataBodyCopy = _.cloneDeep(dataBody)
        let isCheckedCopy = _.cloneDeep(isChecked)

        let indexToUpdate = dataBodyCopy.findIndex(row => {
            console.log('row.id === id: ', row.id === id)
            return row.id === id
        })
        
        let updatedValues = getValues(`field.${id}`)

        //before updating the row, we checked if the cells were used in the corresponding filter. If yes, we update the filter with the new value
        dataBodyCopy[indexToUpdate].rowValues.forEach((cell, cellIndex) => {
            
            if(isCheckedCopy[cellIndex] && isCheckedCopy[cellIndex].includes(cell)) {
                let index = isCheckedCopy[cellIndex].findIndex(cell => cell === updatedValues[cellIndex] )
                isCheckedCopy[cellIndex].splice(index, 1, updatedValues[cellIndex]) 
                setIsChecked(isCheckedCopy)
            }
        })
       

        dataBodyCopy[indexToUpdate].rowValues = updatedValues
        
        setDataBody(dataBodyCopy)
        setIsEdit(null)
    }
    
    
    const handleDelete = (id) => {
        try {
            let dataBodyCopy = _.cloneDeep(dataBody)
            let isCheckedCopy = _.cloneDeep(isChecked)
            
           
            let rowValuesToBeDeleted = dataBodyCopy.filter(({rowValues, id:rowId}) => {
                return id === rowId
            })[0]['rowValues']

           
            // for each column, if one cellValue is used in the corresponding filter and if there is only 1 of this cellValues in the dataBody column, so we delete the value from isChecked
            rowValuesToBeDeleted.forEach((cellValue, cellIndex) => {
                if(isCheckedCopy[cellIndex]) {
                    let indexToRemove = isCheckedCopy[cellIndex].findIndex(elem => elem === cellValue)
                    let valueFound = 0
                    dataBodyCopy.forEach(({rowValues}) => {
                        if(rowValues[cellIndex] === cellValue) valueFound++
                    })
                    console.log('valueFound', valueFound)
                    if(indexToRemove !== -1 && valueFound <= 1) {
                        isCheckedCopy[cellIndex].splice(indexToRemove, 1)
                    }
                }
            })
            console.log('isCheckedCopy', isCheckedCopy)
            setIsChecked(isCheckedCopy)

            
            let indexToDelete = dataBodyCopy.findIndex(row => row.id === id)
            dataBodyCopy.splice(indexToDelete, 1)
            setDataBody(dataBodyCopy)

            



        } catch(err) {
            console.log(err)
        }
   
    }

    const handleSort = (columnIndex, direction) => {
        let dataBodyCopy = _.cloneDeep(dataBody)
    
        dataBodyCopy.sort(function(a,b) {
      
            if(a.rowValues[columnIndex] > b.rowValues[columnIndex]) return direction === 'ascending' ? 1 : -1
            if(a.rowValues[columnIndex] < b.rowValues[columnIndex]) return direction === 'ascending' ? -1 : 1
            return 0
        })
        setDataBody(dataBodyCopy)
    }


    const handleAdd = () => {
        
        let dataBodyCopy = _.cloneDeep(dataBody)
        let newValuesArr = Object.values(getValuesAddLine())
        dataBodyCopy.push({rowValues: newValuesArr, id: uuidv4()})
        setDataBody(dataBodyCopy)
        resetAddLine()
        setIsVisible(false)
    }

    // modal
    
    const [isVisible, setIsVisible, toggle] = useModal()
   
    const { handleSubmit: handleAddLine, reset: resetAddLine, control: controllAddLine, formState: { errors: errorsAddLine }, register: registerAddLine, getValues: getValuesAddLine } = useForm()

   
    // filter
    const [isChecked, setIsChecked] = useState({})
    
    const onChangeFilter = (e, index) => {
       
        
        let isCheckedCopy = _.cloneDeep(isChecked)
        

        // if there is no items yet in this checked index, we add the item and return
        if(!isCheckedCopy[index]) {
            isCheckedCopy[index] = [e.target.value]
             setIsChecked(isCheckedCopy)
             return
        } 

        //if there is at least one item in this index
        let indexToRemove = isCheckedCopy[index].indexOf(e.target.value)
      
        if(indexToRemove !== -1) {
            isCheckedCopy[index].splice(indexToRemove, 1)

            // if the property is empty, we delete this property
            if(isCheckedCopy[index].length == 0) delete isCheckedCopy[index]
            setIsChecked(isCheckedCopy)
            return
        } 

        // if the item that we will add does not exist yet in this index 
        if(indexToRemove === -1) {
            isCheckedCopy[index].push(e.target.value)
            setIsChecked(isCheckedCopy)
            return
        }

    }


    

    return (
   
        <div className='flex flex-col items-center w-full'>
                <form className='w-full'>
                    {dataHeader && (
                    <Icon color='text-blue-500 text-2xl' icon={faCirclePlus} onClick={() => {
                        document.body.style.overflow = 'hidden'
                        setIsVisible(true)
                    }}/>
                )}
                    <div className='overflow-x-auto'>
                        <table className='w-full h-full sm:table-auto md:table-auto border-separate text-center '>
                            <Header 
                                dataHeader={dataHeader}
                                handleSort={handleSort}
                                dataBody={dataBody}
                                onChangeFilter={onChangeFilter}
                                isChecked={isChecked}

                            />
                            <Body 
                                dataBody={dataBody}
                                isChecked={isChecked}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                                handleConfirmEdit={handleConfirmEdit}
                                isEdit={isEdit}
                                register={register}
                            />
                        </table>
                   </div>
                        
              
                    
                </form>
        
            <Modal 
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                buttonLabel='save'
                onClick={handleAdd}
                title='add a line'
            >
                <form className='text-left'>
                    {dataHeader && dataHeader.rowValues.map((value, index) => {
                        return (
                            <>
                                <label 
                                    key={index}
                                    className='block p-[1rem]'
                                >
                                    {value}
                                </label>
                                <InputText  
                                    register={registerAddLine}
                                    name={`${index}`}
                                    height='h-[3rem]'
                                    align='text-left'
                                />
                            </>
                        )
                    })}
                </form>
            </Modal>
        </div>
    )
}