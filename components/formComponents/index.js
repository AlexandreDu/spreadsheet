import {useEffect} from 'react'
import { Controller } from 'react-hook-form'
import { ErrorMessage } from './errorMessage'



export const InputText = ({register, name, defaultValue, bgColor=''}) => {


    return (
        
        <div>
            <input
                className={`${bgColor} w-full rounded-[0.25rem] p-[0.25rem] text-center`}
                
                {...register(name)}
                defaultValue={defaultValue}
            />
            {/* <ErrorMessage error={error} /> */}
        </div>
    
    
    )
}


