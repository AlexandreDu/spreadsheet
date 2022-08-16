
import { CSSTransition } from 'react-transition-group'
import { Checkbox } from '../formComponents'
import { getDeduplicated } from '../../utility/getDeduplicated'
import _ from 'lodash'

export const Filter = ({isVisible, list, onChange}) => {

    
    
   
    
    return (
        <CSSTransition in={isVisible} timeout={300} classNames='fade' unmountOnExit>
            <div className='absolute top-[2rem] bg-white shadow-lg shadow-slate-500/50 rounded-sm w-[9rem] max-h-[20rem] overflow-auto z-10'>
                <div className='w-4/5 p-[0.5rem] flex flex-col items-start'>
                    
                    
                    {getDeduplicated(list, 'label').map(({label, id, value, checked}) => (
                        <Checkbox 
                            key={id}
                            name={id}
                            label={label}
                            onChange={onChange}
                            value={value}
                            checked={checked}
                        />
                    ))}
                  
                </div>
            </div>
        </CSSTransition>
    )
}