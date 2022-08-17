
import { Cell } from '../../tableComponents/Cell'
import { Icon } from '../../icon'
import { faPen, faTrashCan, faCheck } from "@fortawesome/free-solid-svg-icons"
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { InputText } from '../../formComponents'
import _ from 'lodash'
export const Body = ({dataBody, isChecked, handleDelete, handleEdit, handleConfirmEdit, isEdit, register}) => {

  

    const filteredList = () => {
        let dataBodyCopy = _.cloneDeep(dataBody)
        
        if(Object.keys(isChecked).length > 0) {
         
            return dataBodyCopy.filter(({rowValues}, rowIndex) => {

                let result = rowValues.map((cell, cellIndex) => {
                    if(isChecked[cellIndex]) {
                       return isChecked[cellIndex].includes(cell)
                    }
                    return true
                }) 
               
               
                const areCellAllTrue = result.every((cellBoolean) => cellBoolean === true)
               
                return areCellAllTrue
            })
            
        } else {
            return dataBodyCopy
        }
        
    }


    return (
        dataBody && (
            <tbody>
                <TransitionGroup component={null}>
                   
                    {filteredList().map(({rowValues, id}, index) => {
                        return (
                            <CSSTransition key={id} timeout={300} classNames={'fade'}>
                                <tr key={id} className={`${index % 2 === 0 && 'bg-slate-100'}`}>
                                    {rowValues.map((rowValue, subIndex) => {
                                    return (
                                        <Cell key={subIndex}>
                                            <TransitionGroup component={null}>
                                            {isEdit === id ? (
                                                // issue, transition does not work
                                                <CSSTransition timeout={300} classNames={'fade'}>
                                                  
                                                    <InputText  
                                                        register={register}
                                                        defaultValue={rowValue}
                                                        name={`field.${id}.${subIndex}`}
                                                        bgColor={index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}
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
                            </CSSTransition>
                        )
                    })}
                </TransitionGroup>
            </tbody>
        )
    )
}