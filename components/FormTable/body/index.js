import { Cell } from '../../tableComponents/Cell'
import { Icon } from '../../icon'
import { faPen, faTrashCan, faCheck } from "@fortawesome/free-solid-svg-icons"
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { InputText } from '../../formComponents'

export const Body = ({dataBody, handleDelete, handleEdit, handleConfirmEdit, isEdit, register}) => {


    return (
        dataBody && (
            <tbody>
                <TransitionGroup component={null}>
                    {dataBody.map(({rowValues, rowNumber}, index) => {
                        return (
                            <CSSTransition key={rowNumber} timeout={300} classNames={'fade'}>
                                <tr key={rowNumber} className={`${index % 2 === 0 && 'bg-slate-50'}`}>
                                    {rowValues.map((rowValue, subIndex) => {
                                    return (
                                        <Cell key={subIndex}>
                                            <TransitionGroup component={null}>
                                            {isEdit === rowNumber ? (
                                                // issue, transition does not work
                                                <CSSTransition timeout={300} classNames={'fade'}>
                                                  
                                                    <InputText  
                                                        register={register}
                                                        defaultValue={rowValue}
                                                        name={`field.${rowNumber}.${subIndex}`}
                                                        bgColor={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                                                    />
                                                  
                                                </CSSTransition>
                                            ) : (
                                                // issue
                                                <CSSTransition  timeout={300} classNames={'fade'}>
                                                    <>
                                                        {rowValue}
                                                    </>
                                                </CSSTransition>
                                            )}
                                            </TransitionGroup>
                                        </Cell>
                                    )
                                    })}
                                    {isEdit === rowNumber ? (
                                        
                                        <Cell onClick={() => (handleConfirmEdit(rowNumber))}>
                                            <Icon color='text-blue-500' icon={faCheck}/>
                                        </Cell>
                                        
                                    ) : (
                                        <Cell onClick={() => (handleEdit(rowNumber))}>
                                                <Icon color='text-blue-500'  icon={faPen}/>
                                        </Cell>
                                    )}
                                    
                                    <Cell onClick={() => (handleDelete(rowNumber))}>
                                            <Icon color='text-red-500' icon={faTrashCan}/>
                                    </Cell>
                                </tr>
                            </CSSTransition>
                        )
                    })}
                </TransitionGroup>
            </tbody>
        )
    )
}