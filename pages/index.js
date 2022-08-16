import { useState } from 'react'
import { FormUpload } from '../components/formUpload'
import { FormTable } from '../components/FormTable'
import { FullPageModal } from '../components/modals'
import { useModal } from '../hooks/useModal'
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
    finally {
      setIsModalVisible(true)
    }
  }

  const [fileName, setFileName] = useState(null)



  const onChange = (e) => {
    
    if(e.target.files.length === 0) return
   
    setFileName(e.target.files[0].name)
  }


  //modal
  const [isModalVisible, setIsModalVisible, toggle] = useModal()

  const handleClickMinus = () => {
    setIsModalVisible(false)
  }

  const handleClickCross = () => {
    setDataBody(null)
    setDataHeader(null)
    setFileName(null)
    setIsModalVisible(false)
  }

  return (
    <div className='flex flex-col items-center'>
      {dataHeader ? (
        <div onClick={() => setIsModalVisible(true)}>
          file
        </div>
      ) : (
        <FormUpload  
          name='files'
          onSubmit={handleSubmit(onSubmit)}
          onChange={onChange}
          register={register}
          fileName={fileName}
        />
      )}
      
      {error && error}
      <FullPageModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onClickMinus={handleClickMinus}
        onClickCross={handleClickCross}

      >
        <FormTable 
          dataHeader={dataHeader}
          dataBody={dataBody}
          setDataBody={setDataBody}
        />
      </FullPageModal>
    </div>
  )
}
