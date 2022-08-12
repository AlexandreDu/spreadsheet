export function ellipsis(text) {
    
    if(typeof text !== 'string') {
        try {
            text = text.toString()
        } catch(err) {
            console.log(err)
            return
        }
    } 
    let slicedText = text.slice('0', '5')
    if(text.length > 6) slicedText += '...'

    return slicedText
}