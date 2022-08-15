import { SubmitButton } from "../formComponents"

export const FormUpload = ({register, name, onSubmit}) => {


    return (
        <form onSubmit={onSubmit}>
            <input id="input-file" className="hidden" {...register(name, { required: true })} type='file' />
            <label htmlFor="input-file" className="block w-[30rem] h-[10rem] bg-slate-100 rounded relative">
                
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                
                <path strokeWidth={'0.25rem'} stroke='red' d='M0,0 L5,0' />
                <path strokeWidth={'0.1rem'} stroke='red' d='M0,0 L0,15' />

                <path strokeWidth={'0.25rem'} stroke='red' d='M95,0 L100,0' />
                <path strokeWidth={'0.1rem'} stroke='red' d='M100,0 L100,15' />

                <path strokeWidth={'0.1rem'} stroke='red' d='M0,85 L0,100' />
                <path strokeWidth={'0.25rem'} stroke='red' d='M0,100 L5,100' />

                <path strokeWidth={'0.1rem'} stroke='red' d='M100,85 L100,100' />
                <path strokeWidth={'0.25rem'} stroke='red' d='M95,100 L100,100' />

                </svg>
               
                
                <span className="color-red absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">Select or drag a xlsx file</span>
            </label>
            <SubmitButton>Submit</SubmitButton>
        </form>
    )
}