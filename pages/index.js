import { useState } from 'react'
import { FormUpload } from '../components/formUpload'
import { FormTable } from '../components/FormTable'
import { FullPageModal } from '../components/modals'
import { Icon } from '../components/icon'
import { faFile } from "@fortawesome/free-solid-svg-icons"
import { useModal } from '../hooks/useModal'
import { useForm } from 'react-hook-form'
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

       let rowsWithCellStrings = rowsWithoutEmpty.map(({rowValues, id}) => {
       let rowValuesWithStr = rowValues.map(rowValue => rowValue.toString())
       return {rowValues: rowValuesWithStr, id}
      })

      const [header, ...body] = rowsWithCellStrings

      setDataHeader(header)
      setDataBody(body)
      setIsModalVisible(true)
      

    } catch(err) {

      let error  = err?.response?.data?.error || 'error'
      setError(error)
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
    <div className='flex flex-col justify-center items-center h-screen bg-slate-200'>
      {dataHeader ? (
        <div>
          <Icon color='text-blue-500 text-2xl' icon={faFile} onClick={() => setIsModalVisible(true)}/>
        </div>
      ) : (
        <FormUpload  
          name='files'
          onSubmit={handleSubmit(onSubmit)}
          onChange={onChange}
          register={register}
          fileName={fileName}
          error={error}
        />
      )}
      
      <FullPageModal
        isVisible={isModalVisible}
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
