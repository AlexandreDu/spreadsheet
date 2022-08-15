import { useEffect, useState } from 'react'
import { FormUpload } from '../components/formUpload'
import { FormTable } from '../components/FormTable'
import { SubmitButton } from '../components/formComponents'
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
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('files', { required: true })} type='file' />
        <SubmitButton>Submit</SubmitButton>
      </form> */}
      <FormUpload  
        name='files'
        onSubmit={handleSubmit(onSubmit)}
        register={register}
      />
      {error && error}
      <FormTable 
        dataHeader={dataHeader}
        dataBody={dataBody}
        setDataBody={setDataBody}
      />
     
    </>
  )
}
