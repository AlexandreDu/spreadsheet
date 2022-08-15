import { useState } from "react"
export const useModal = () => {

    const [isVisible, setIsVisible] = useState(false)

    const toggle = () => {
        setIsVisible(prevState => !prevState)
        
    }

    return [isVisible, setIsVisible, toggle]
}