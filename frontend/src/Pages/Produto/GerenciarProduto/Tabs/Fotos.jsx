import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, CardImg, Col, Form, Input, Label, Row } from 'reactstrap'
import { useProduct } from '../../../../context/ProductContext/useProduct'

export const Fotos = ({ data, handleFileChange, Loading, handleSubmit }) => {
  const { deleteFile } = useProduct()
  const navigate = useNavigate()
  const handleCancel = () => {
    navigate('/produto/gerenciar')
  }

  let fileURL;

  // Verificar o formato do arquivo
  if (typeof data.fileUrl === 'string') {
    // Se data.fileUrl for uma string, é uma URL válida
    fileURL = data.fileUrl;
  } else if (data.file instanceof File) {
    // Se data.file for uma instância de File, criar uma URL temporária
    fileURL = URL.createObjectURL(data.file);
  } else {
    // Caso contrário, não há arquivo ou formato não suportado
    fileURL = null;
  }

  const onDelete = async () => {
    const updatedData = { ...data }
    updatedData.file = null
    updatedData.fileUrl = null
    handleFileChange({ target: { files: [] } }); // Passando um objeto vazio como seletor de arquivos

    //TODO: If fileURL is not blob, delete the file from server 
    if (typeof data.fileUrl === 'string') {
      //update the data object
      const updatedData = { ...data }
      updatedData.fileUrl = null
      await deleteFile(data.id_produto)
      handleFileChange({ target: { files: [] } }); // Passando um objeto vazio como seletor de arquivos
     
    }
  }
  return (
    <Card className='main-card mb-3'>
      <CardBody>
        <Loading />
        <div className='dropzone dropzone-single mb-3' id='file-upload'>
          {  /* <h5 className='text-center'>Solte o arquivo aqui para fazer upload</h5>
          <h6 className='text-center'>ou</h6>*/}

          <div className='fallback'>
            <div className='custom-file'>
              <Form onSubmit={handleSubmit} enctype="multipart/form-data">
                <Input
                  type='file'
                  className='custom-file-input'
                  id='file'
                  name='file'
                  multiple

                  onChange={handleFileChange}
                />
                <Label className='custom-file-label' htmlFor='customFileUpload'>
                  Escolha um arquivo
                </Label>

                {/* Buttons Add and Cancel*/}
                <Row className='mb-2'>
                  <Col md={12}>
                    <Button color='primary' type='submit' >
                      <FontAwesomeIcon icon={faSave} size='xl' style={{ marginRight: 3 }} />
                      Salvar
                    </Button>
                    <Button color='danger' onClick={handleCancel} style={{ marginLeft: 3 }}>
                      <FontAwesomeIcon icon={faTimes} size='xl' style={{ marginRight: 3 }} />
                      Cancelar
                    </Button>

                  </Col>
                </Row>
              </Form>

              {fileURL && (
                <CardBody>
                  <Row>
                    <Col md={12}>
                      <div className='dropzone-previews'>
                        <div className='dz-preview dz-preview-single'>
                          <div className='dz-preview-cover'>
                            <Card>
                              <CardImg top src={fileURL} alt="Imagem" />
                              <CardBody className="text-center">
                                <Button color="danger" onClick={onDelete} className="position-absolute top-0 start-100 translate-middle">
                                  X
                                </Button>
                              </CardBody>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>

              )}

            </div>
          </div>
        </div>
      </CardBody>
    </Card>

  )
}
