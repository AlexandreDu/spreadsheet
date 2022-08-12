
export const Button = ({bgColor = 'bg-blue-500', children}) => {

    let className = "rounded text-white px-[0.725rem] py-[0.725rem]"

    className += ` ${bgColor}`
    return (
        <button className={className}>
            {children}
        </button>
    )
}