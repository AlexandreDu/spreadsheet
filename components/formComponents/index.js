import { ellipsis } from "../../utility/ellipsis"

export const InputText = ({register, name, defaultValue, bgColor='', height='', align='text-center'}) => {


    return (
        
        <div>
            <input
                className={`${bgColor} ${height} w-full rounded-[0.25rem] ${align} focus:outline-none focus:ring focus:border-blue-500`}
                
                {...register(name)}
                defaultValue={defaultValue}
            />
        </div>
    
    
    )
}

export const Checkbox = ({register, name, label, onChange, checked}) => {

    let props = {}
    if(register) props = {...register(name)}

    let EllipsedLabel = ellipsis(label)

    return (
        <div>
            <input 
                {...props}
                type='checkbox' 
                className='mr-[0.25rem]'
                onChange={(e) => onChange(e, label)}
                checked={checked}
                title={label}
                value={label}
            />
            <label title={label} className="font-normal">{EllipsedLabel}</label>
        </div>
    )
}

export const SubmitButton = ({bgColor = 'bg-blue-500', className='', children}) => {

    className += " rounded text-white px-[0.725rem] py-[0.725rem] cursor-pointer"
    className += ` ${bgColor}`   
    return (
        <input 
            className={className}
            value={children}
            type="submit"
        />
    )
}

