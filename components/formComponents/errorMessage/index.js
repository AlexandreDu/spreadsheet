export const ErrorMessage = ({error}) => {
    
   

    let errorMessage = error?.message || ''

    return (
        <span color={'red'}>{errorMessage}</span>
    )
}
