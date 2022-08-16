export function getDeduplicated(list, selector){
    return list.filter((item, index, array) => {
        return index === array.findIndex(elem => item[selector] === elem[selector])
    })
}