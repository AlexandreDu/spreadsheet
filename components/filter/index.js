
import { CSSTransition } from 'react-transition-group'
import { Checkbox } from '../formComponents'
import { getDeduplicated } from '../../utility/getDeduplicated'
import _ from 'lodash'

export const Filter = ({isVisible, list, onChange, index}) => {

    let deduplicatedList = getDeduplicated(list, 'label')
   
    // if the filter is on the first row
    let isFirst = index === 0 || !index
        
    
    
    return (
        <CSSTransition in={isVisible} timeout={300} classNames='fade' unmountOnExit>
            <div className={`absolute top-[4rem] ${isFirst ? 'left-[2rem]' : ''} md:left-auto bg-white shadow-lg shadow-slate-500/50 rounded-sm w-[9rem] max-h-[20rem] overflow-auto`}>
                <div className='w-4/5 p-[0.5rem] flex flex-col items-start'>
                    {deduplicatedList.map(({label, id, value, checked}) => (
                        <Checkbox 
                            key={id}
                            name={id}
                            label={label}
                            onChange={(e) => onChange(e, index)}
                            value={value}
                            checked={checked}
                        />
                    ))}           
                </div>
            </div>
        </CSSTransition>
    )
}