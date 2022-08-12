import { CSSTransition } from 'react-transition-group'
import { Icon } from '../icon'
import {Button} from '../button'
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export const Modal = ({isVisible, setIsVisible, title, content, buttonLabel, onClick, children}) => {

    

//translate-y-[-1/2] translate-x-[-1/2]
    return (
        <CSSTransition in={isVisible} timeout={300} classNames={'fade'} unmountOnExit>
            <div className=' bg-slate-500/50 fixed top-0 bottom-0 left-0 right-0'>
                <div className={` w-1/4 bg-slate-50 rounded-lg absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] p-[1rem] `}>
                    <div className='text-right'>
                        <Icon color='text-blue-500 text-2xl' icon={faXmark} onClick={() => setIsVisible(false)}/>
                    </div>
                    {/* title */}
                    <div className="text-center">
                        Add a line
                    </div>

                    {/* content */}
                    <div className='p-[1rem]'>
                        {children}
                    </div>
                    <div className='text-center'>
                        <Button onClick={onClick}>{buttonLabel}</Button>
                    </div>
                    
                </div>
            </div>
        </CSSTransition>
    )
}