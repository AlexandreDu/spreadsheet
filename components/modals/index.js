import { CSSTransition } from 'react-transition-group'
import { Icon } from '../icon'
import { Button } from '../buttons'
import { faXmark, faMinus } from "@fortawesome/free-solid-svg-icons"

export const Modal = ({isVisible, setIsVisible, title, buttonLabel, onClick, children}) => {

    // modal normal


    return (
        <CSSTransition in={isVisible} timeout={300} classNames={'fade'} unmountOnExit>
         
            <div className=' bg-slate-500/50 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
                <div className={` w-5/6 max-h-[90%] md:w-1/2 lg:w-1/4 bg-slate-50 rounded-lg p-[1rem] overflow-auto`}>
                    <div className='text-right'>
                        <Icon color='text-blue-500 text-2xl' icon={faXmark} onClick={() => {
                            document.body.style.overflow = 'auto'
                            setIsVisible(false)
                        }}/>
                    </div>
                    {/* title */}
                    <div className="text-center">
                        {title}
                    </div>

                    {/* content */}
                    <div>
                        {children}
                        <div className='text-right pt-[1rem]'>
                            <Button onClick={onClick}>{buttonLabel}</Button>
                        </div>
                    </div>
                </div>
            </div>
      
        </CSSTransition>
    )
}


export const FullPageModal = ({isVisible, onClickMinus, onClickCross, children}) => {

    return (
        <CSSTransition in={isVisible} timeout={450} classNames={'vertical-translate'} unmountOnExit>
            
            <div className={` w-full md:h-full bg-slate-50 absolute p-[1rem] border-blue-500 border-t-[0.25rem] `}>
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