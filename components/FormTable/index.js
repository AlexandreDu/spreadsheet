import {useState, useCallback} from 'react'
import { Header } from './header'
import { useForm } from 'react-hook-form'
import _ from 'lodash'
import { Body } from './body'
import { Icon } from '../icon'
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"

export const FormTable = ({dataHeader, dataBody, setDataBody}) => {


    const { handleSubmit, reset, control, formState: { errors }, register, getValues } = useForm()

    const[isEdit, setIsEdit] = useState(null)

    const handleEdit = (index) => {
        setIsEdit(index)
    }

    const handleConfirmEdit = (rowNumber) => {
        let updatedValues = getValues(`field.${rowNumber}`)
        
        let dataBodyCopy = _.cloneDeep(dataBody)
        let indexToUpdate = dataBodyCopy.findIndex(row => row.rowNumber === rowNumber)
        dataBodyCopy[indexToUpdate].rowValues = updatedValues
        setDataBody(dataBodyCopy)
        setIsEdit(null)
    }
    
    
    const handleDelete = (rowNumber) => {
        try {
            let dataBodyCopy = _.cloneDeep(dataBody)
            let indexToDelete = dataBodyCopy.findIndex(row => row.rowNumber === rowNumber)
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
   

    return (
        <div className='flex flex-col items-center justify-center '>
            
            <div className='w-3/4 flex flex-col items-end'>
                {/* add button */}
            <Icon color='text-blue-500 text-2xl' icon={faCirclePlus}/>
            <form>
                <table className='w-full table-fixed border-separate border-[1rem] border-slate-50 text-center rounded-[0.25rem] '>
                    <Header 
                        dataHeader={dataHeader}
                        handleSort={handleSort}
                    />
                    <Body 
                        dataBody={dataBody}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleConfirmEdit={handleConfirmEdit}
                        isEdit={isEdit}
                        register={register}
                    />
                </table>
            </form>
            </div>
        </div>
    )
}