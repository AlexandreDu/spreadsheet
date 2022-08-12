import { CSSTransition } from 'react-transition-group'
import { Checkbox } from '../formComponents'
import { ellipsis } from '../../utility/ellipsis'
import { Button } from '../button'
export const Filter = ({isVisible, list, register, handleSubmit, onSubmit}) => {

    
    
    return (
        <CSSTransition in={isVisible} timeout={300} classNames='fade' unmountOnExit>
            <div className='absolute top-[2rem] bg-white shadow-lg shadow-slate-500/50 rounded-sm w-[6.5rem]'>
                <div className='w-4/5 p-[0.5rem] flex flex-col items-start'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {list.map(({label, value, id}) => (
                            <Checkbox 
                                key={id}
                                register={register}
                                name={id}
                                label={ellipsis(label)}
                            />
                        ))}
                        <input type='submit' value='filter' />
                    </form>
                </div>
            </div>
        </CSSTransition>
    )
}