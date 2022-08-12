import { useEffect, useState } from 'react'
import { FormTable } from '../components/FormTable'
import {useForm } from 'react-hook-form'
import axios from 'axios'
import { apiUrl } from '../apiUrl'

export default function Home() {
  
  const [dataHeader, setDataHeader] = useState(null)
  const [dataBody, setDataBody] = useState(null)

  
  const [error, setError] = useState(null)

  const {register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
   
    let formData = new FormData()
    
    formData.append('filestoupload', data.files[0])

    try {
      setError(null)
      const res = await axios({
        method: 'post',
        url: apiUrl.upload,
        headers: { 
          'content-type': 'multipart/form-data' 
        },
        data: formData
      })
      let rowsWithoutEmpty = res.data.rows.map(({rowValues, id}) => {
        return {
          rowValues: rowValues.filter(cell => {
            return cell !== null
          }),
          id
        }
      })
      

      const [header, ...body] = rowsWithoutEmpty

      setDataHeader(header)
      setDataBody(body)
      

    } catch(err) {
      console.log(err)
      setError(err.response.data.error)
    }
  }

  


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('files', { required: true })} type='file' />
        <input type='submit' value='submit' />
      </form>
      {error && error}
      <FormTable 
        dataHeader={dataHeader}
        dataBody={dataBody}
        setDataBody={setDataBody}
      />
     
    </>
  )
}

        // onUploadProgress: (event) => {
        //   console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        // },