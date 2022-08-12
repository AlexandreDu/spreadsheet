

export const InputText = ({register, name, defaultValue, bgColor='', height='', align='text-center'}) => {


    return (
        
        <div>
            <input
                className={`${bgColor} ${height} w-full rounded-[0.25rem] p-[0.25rem] ${align} focus:outline-none focus:ring focus:border-blue-500`}
                
                {...register(name)}
                defaultValue={defaultValue}
            />
        </div>
    
    
    )
}

export const Checkbox = ({register, name, label, id, onChange}) => {

    return (
        <div>
            <input 
                {...register(name)}
                type='checkbox' 
                defaultChecked={false}
                className='mr-[0.25rem]'
                onChange={onChange}
            />
            <label className="font-normal">{label}</label>
        </div>
    )
}

