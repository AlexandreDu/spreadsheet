export function ellipsis(text, max = 5) {
    
    if(typeof text !== 'string') {
        try {
            text = text.toString()
        } catch(err) {
            console.log(err)
            return
        }
    } 
    let slicedText = text.slice(0, max)
    if(text.length > max + 1) slicedText += '...'

    return slicedText
}