import { CSSTransition } from 'react-transition-group'
import { Checkbox } from '../formComponents'
import { ellipsis } from '../../utility/ellipsis'
import { Button } from '../button'


export const Filter = ({isVisible, list, onChange}) => {

    
    
    return (
        <CSSTransition in={isVisible} timeout={300} classNames='fade' unmountOnExit>
            <div className='absolute top-[2rem] bg-white shadow-lg shadow-slate-500/50 rounded-sm w-[9rem] max-h-[20rem] overflow-auto'>
                <div className='w-4/5 p-[0.5rem] flex flex-col items-start'>
                    
                    {list.map(({label, value, id}) => (
                        <Checkbox 
                            key={id}
                            name={id}
                            label={label}
                            onChange={onChange}
                        />
                    ))}
                  
                </div>
            </div>
        </CSSTransition>
    )
}