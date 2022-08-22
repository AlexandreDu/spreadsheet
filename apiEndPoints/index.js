
let url 
if(process.env.NODE_ENV === 'development') url = 'http://localhost:3000/api'
if(process.env.NODE_ENV === 'production') url = 'https://spreadsheet-chi.vercel.app/api'


export const apiEndPoints = {
    upload: url + '/upload'
}