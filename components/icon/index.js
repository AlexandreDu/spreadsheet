import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Icon = ({icon, color='', hoverColor='bg-slate-100', onClick}) => {
    
    let className = `${color}`
    return (
        <div 
            onClick={onClick}
            className={`${color} hover:${hoverColor} h-100 w-auto inline-block p-[0.5rem] rounded-lg cursor-pointer`}
            >
                <FontAwesomeIcon 
                    className={className} 
                    icon={icon}
                />
        </div>
    )
}

