import { UploadArea } from "./uploadArea"
import { SubmitButton } from "../formComponents"

export const FormUpload = ({register, name, onSubmit, onChange, fileName}) => {

    return (
        <form onChange={onChange} onSubmit={onSubmit} className='w-full sm:w-3/4 md:w-1/3 flex flex-col border-slate-100 bg-slate-100 border-[1.5rem] rounded-[0.25rem]'>
            <input id="input-file" className="hidden" {...register(name, { required: true })} type='file' />
            <UploadArea fileName={fileName} />
            <div className="pt-[1rem] bg-slate-100 self-end">
                <SubmitButton className=''>Submit</SubmitButton>
            </div>
            
        </form>
    )
}