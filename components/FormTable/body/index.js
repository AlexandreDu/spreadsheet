
import { Cell } from '../../tableComponents/Cell'
import { Icon } from '../../icon'
import { faPen, faTrashCan, faCheck } from "@fortawesome/free-solid-svg-icons"
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { InputText } from '../../formComponents'
import _ from 'lodash'

export const Body = ({ filteredList, handleDelete, handleEdit, handleConfirmEdit, isEdit, register}) => {

  


    return (
        filteredList && (
            <tbody>
                {/* <TransitionGroup component={null}> */}
                   
                    {filteredList.map(({rowValues, id}, index) => {
                        return (
                            // <CSSTransition key={id} timeout={300} classNames={'fade'}>
                                <tr key={id} className={`${index % 2 === 0 && 'bg-slate-100'}`}>
                                    {rowValues.map((rowValue, subIndex) => {
                                    return (
                                        <Cell key={subIndex}>
                                           
                                            {isEdit === id ? (
                   
                                                    <InputText  
                                                        register={register}
                                                        defaultValue={rowValue}
                                                        name={`field.${id}.${subIndex}`}
                                                        bgColor={index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}
                                                    />
                                                  
                                             
                                            ) : (
                                                        rowValue
                                            )}
                                         
                                        </Cell>
                                    )
                                    })}
                                    {isEdit === id ? (
                                        
                                        <Cell onClick={() => (handleConfirmEdit(id))}>
                                            <Icon color='text-blue-500' icon={faCheck}/>
                                        </Cell>
                                        
                                    ) : (
                                        <Cell onClick={() => (handleEdit(id))}>
                                                <Icon color='text-blue-500'  icon={faPen}/>
                                        </Cell>
                                    )}
                                    
                                    <Cell onClick={() => (handleDelete(id))}>
                                            <Icon color='text-red-500' icon={faTrashCan}/>
                                    </Cell>
                                </tr>
                            // </CSSTransition>
                        )
                    })}
                {/* </TransitionGroup> */}
            </tbody>
        )
    )
}