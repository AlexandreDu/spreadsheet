import { CSSTransition } from 'react-transition-group'
import { Icon } from '../icon'
import { Button } from '../buttons'
import { faXmark, faMinus } from "@fortawesome/free-solid-svg-icons"

export const Modal = ({isVisible, setIsVisible, title, content, buttonLabel, onClick, children}) => {

    // modal normal


    return (
        <CSSTransition in={isVisible} timeout={300} classNames={'fade'} unmountOnExit>
            <div className=' bg-slate-500/50 fixed top-0 bottom-0 left-0 right-0'>
                <div className={` w-1/4 bg-slate-50 rounded-lg absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] p-[1rem] `}>
                    <div className='text-right'>
                        <Icon color='text-blue-500 text-2xl' icon={faXmark} onClick={() => {
                            document.body.style.overflow = 'auto'
                            setIsVisible(false)
                        }}/>
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


export const FullPageModal = ({isVisible, setIsVisible, onClickMinus, onClickCross, children}) => {

    return (
        <CSSTransition in={isVisible} timeout={450} classNames={'vertical-translate'} unmountOnExit>
            
            <div className={` w-full h-full bg-slate-50  absolute p-[1rem] border-blue-500 border-t-[0.25rem] `}>
                <div className='text-right'>
                <Icon 
                        color='text-blue-500 text-2xl' 
                        icon={faMinus} 
                        onClick={onClickMinus}/>
                    <Icon 
                        color='text-blue-500 text-2xl' 
                        icon={faXmark} 
                        onClick={onClickCross}/>
                </div>
               

                {/* content */}
                <div className='p-[1rem]'>
                    {children}
                </div>   
            </div>
        
        </CSSTransition>
    )
}