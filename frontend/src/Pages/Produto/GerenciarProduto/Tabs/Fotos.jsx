import React from 'react'
import { Card, CardBody, Input, Label } from 'reactstrap'

export const Fotos = ({ data, handleSubmit, handleInputChange, Loading }) => {
  return (
    <Card className='main-card mb-3'>
      <CardBody>
      <Loading />
        <div className='dropzone dropzone-single mb-3' id='file-upload'>
          <h5 className='text-center'>Solte o arquivo aqui para fazer upload</h5>
          <h6 className='text-center'>ou</h6>

          <div className='fallback'>
            <div className='custom-file'>
              <Input
                type='file'
                className='custom-file-input'
                id='customFileUpload'
                multiple
              />
              <Label className='custom-file-label' htmlFor='customFileUpload'>
                Escolha um arquivo
              </Label>



            </div>
          </div>
        </div>
      </CardBody>
    </Card>

  )
}
