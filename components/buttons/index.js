
export const Button = ({bgColor = 'bg-blue-500', children, onClick}) => {

    let className = "rounded text-white px-[0.725rem] py-[0.725rem]"

    className += ` ${bgColor}`
    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    )
}

