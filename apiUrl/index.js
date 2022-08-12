
let url 
if(process.env.NODE_ENV === 'development') url = 'http://localhost:3000/api'
// if(process.env.NODE_ENV === 'production') url = 'http://localhost:3000/'


export const apiUrl = {
    upload: url + '/upload'
}