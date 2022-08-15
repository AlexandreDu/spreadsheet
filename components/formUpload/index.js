import { UploadArea } from "./uploadArea"
import { SubmitButton } from "../formComponents"

export const FormUpload = ({register, name, onSubmit}) => {

    return (
        <form onSubmit={onSubmit} className='flex flex-col border-slate-100 bg-slate-100 border-[1.5rem] rounded-[0.25rem]'>
            <input id="input-file" className="" {...register(name, { required: true })} type='file' />
            <UploadArea />
            <div className="pt-[1rem] bg-slate-100 self-end">
                <SubmitButton className=''>Submit</SubmitButton>
            </div>
            
        </form>
    )
}