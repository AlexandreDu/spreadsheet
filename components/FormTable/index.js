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
        let updatedValues = getValues(`field.${id}`)
        
        let dataBodyCopy = _.cloneDeep(dataBody)
        let indexToUpdate = dataBodyCopy.findIndex(row => row.id === id)
        dataBodyCopy[indexToUpdate].rowValues = updatedValues
        setDataBody(dataBodyCopy)
        setIsEdit(null)
    }
    
    
    const handleDelete = (id) => {
        try {
            let dataBodyCopy = _.cloneDeep(dataBody)
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
    const [isChecked, setIsChecked] = useState([])
    
    const onChangeFilter = (e, label) => {
        console.log(label)

        let filterListCopy = [...isChecked]
        let indexToRemove = filterListCopy.indexOf(label)
        if(indexToRemove !== -1) {
            filterListCopy.splice(indexToRemove, 1)
        } else {
            filterListCopy.push(label)
            
            
        }

        setIsChecked(filterListCopy)

    }

    const [listToShow, setListToShow] = useState(dataBody)
    useEffect(() => {
        
        if(!isChecked) return
       
        if(isChecked.length > 0) {
           let filteredList = dataBody.filter(({rowValues}) => {
                return rowValues.find(rowValue => {
                   return isChecked.includes(rowValue)
                })
            })
            setListToShow(filteredList)
           
            return
        }

        if(isChecked.length === 0) {
            setListToShow(dataBody)
        }
    }, [isChecked])


    return (
        <div className='flex flex-col items-center  '>
            <div className='w-3/4 flex flex-col items-end'>
                {/* add button */}
                {dataHeader && (
                    <Icon color='text-blue-500 text-2xl' icon={faCirclePlus} onClick={() => {
                        document.body.style.overflow = 'hidden'
                        setIsVisible(true)
                    }}/>
                )}
                
                <form>
                    <table className='w-full table-fixed border-separate   text-center rounded-[0.25rem] '>
                        <Header 
                            dataHeader={dataHeader}
                            handleSort={handleSort}
                            dataBody={dataBody}
                            onChangeFilter={onChangeFilter}
                            isChecked={isChecked}

                        />
                        <Body 
                            listToShow={listToShow}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            handleConfirmEdit={handleConfirmEdit}
                            isEdit={isEdit}
                            register={register}
                        />
                    </table>
                </form>
            </div>
            <Modal 
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                buttonLabel='save'
                onClick={handleAdd}
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