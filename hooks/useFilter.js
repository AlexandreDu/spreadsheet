import { useState, useEffect, useCallback } from "react"
import _ from "lodash"

export const useFilter = (list) => {
  
    const [isChecked, setIsChecked] = useState({})
   

   

    const onChangeFilter = (e, index) => {
       
        
        let isCheckedCopy = _.cloneDeep(isChecked)
        

        // if there is no items yet in this checked index, we add the item and return
        if(!isCheckedCopy[index]) {
            isCheckedCopy[index] = [e.target.value]
             setIsChecked(isCheckedCopy)
             return
        } 

        //if there is at least one item in this index
        let indexToRemove = isCheckedCopy[index].indexOf(e.target.value)
      
        if(indexToRemove !== -1) {
            isCheckedCopy[index].splice(indexToRemove, 1)

            // if the property is empty, we delete this property
            if(isCheckedCopy[index].length == 0) delete isCheckedCopy[index]
            setIsChecked(isCheckedCopy)
            return
        } 

        // if the item that we will add does not exist yet in this index 
        if(indexToRemove === -1) {
            isCheckedCopy[index].push(e.target.value)
            setIsChecked(isCheckedCopy)
            return
        }

    }

    const filteredList = () => {
        let listCopy = _.cloneDeep(list)
        
        if(Object.keys(isChecked).length > 0) {
         
            return listCopy.filter(({rowValues}, rowIndex) => {

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
            return listCopy
        }
        
    }
    


    return {isChecked, setIsChecked, onChangeFilter, filteredList}

}