import { Icon } from "../../icon"
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons"


export const UploadArea = ({fileName}) => {

    console.log('fileName upoad area: ', fileName)
    

    return (
            <label htmlFor="input-file" className="block w-full h-[10rem] bg-slate-200 rounded relative">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">

                    <path className='stroke-blue-500' strokeWidth={'0.25rem'} d='M0,0 L5,0' />
                    <path strokeWidth={'0.1rem'} className='stroke-blue-500' d='M0,0 L0,15' />

                    <path strokeWidth={'0.25rem'} className='stroke-blue-500' d='M95,0 L100,0' />
                    <path strokeWidth={'0.1rem'} className='stroke-blue-500' d='M100,0 L100,15' />

                    <path strokeWidth={'0.1rem'} className='stroke-blue-500' d='M0,85 L0,100' />
                    <path strokeWidth={'0.25rem'} className='stroke-blue-500' d='M0,100 L5,100' />

                    <path strokeWidth={'0.1rem'} className='stroke-blue-500' d='M100,85 L100,100' />
                    <path strokeWidth={'0.25rem'} className='stroke-blue-500' d='M95,100 L100,100' />

                </svg>
               
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center">
                    {fileName ? (
                        <>
                            {fileName}
                        </>
                    ) : (
                        <>
                        <Icon 
                            color='text-blue-500 text-2xl' 
                            icon={faFileCirclePlus} 
                        />
                        <div>Select or drag a xlsx file</div>
                        </>
                    )}
                    
                </div>
                
            </label>
    )
}