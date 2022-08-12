import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Icon = ({icon, color='', size='', hoverColor='bg-slate-100', onClick}) => {
    
    let className = `${color}`
    return (
        <div 
            onClick={onClick}
            className={`${color} hover:${hoverColor} ${size} w-auto inline-block p-[0.25rem] rounded-lg cursor-pointer`}
            >
                <FontAwesomeIcon 
                    className={className} 
                    icon={icon}
                />
        </div>
    )
}

