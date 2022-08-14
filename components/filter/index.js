import { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Checkbox } from '../formComponents'
import { ellipsis } from '../../utility/ellipsis'
import { Button } from '../button'
import _ from 'lodash'

export const Filter = ({isVisible, list, onChange}) => {

    
    const [deduplicatedList, setDeduplicatedList] = useState([])

    useEffect(() => {
        let listCopy = _.cloneDeep(list)
        let listDedup = listCopy.filter((item, index, array) => {
            return index === array.findIndex(elem => item.label === elem.label)
        })

        setDeduplicatedList(listDedup)
    }, [list])
    
    return (
        <CSSTransition in={isVisible} timeout={300} classNames='fade' unmountOnExit>
            <div className='absolute top-[2rem] bg-white shadow-lg shadow-slate-500/50 rounded-sm w-[9rem] max-h-[20rem] overflow-auto z-10'>
                <div className='w-4/5 p-[0.5rem] flex flex-col items-start'>
                    <Checkbox 
                        name='all'
                        label='all'
                        onChange={onChange}
                    /> test
                    
                    {deduplicatedList.map(({label, id, value, checked}) => (
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