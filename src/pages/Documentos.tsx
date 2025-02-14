import React, { useState, useEffect } from 'react';
import { Button, Modal, Upload, Card, List, Typography } from 'antd';
import { LeftOutlined, PlusOutlined, EyeOutlined, DeleteOutlined, UploadOutlined, FilePdfOutlined, FileWordOutlined, FileImageOutlined, FileExcelOutlined, FileUnknownOutlined } from '@ant-design/icons';
import { msgSucesso, msgErro } from '../utils/message';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../service/api';
import type { UploadFile } from 'antd/es/upload/interface';

const { Text } = Typography;

const Documentos: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/usuarios/pesquisarId/${id}`);
        setUserData(response.data);
        const documentsResponse = await api.get(`/usuarios/documents/${id}/all`);
        setData(documentsResponse.data);
      } catch (err: any) {
        setError('Erro ao carregar os documentos. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!filePath) {
      msgErro('Por favor, selecione um arquivo para upload');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', new Blob([], { type: '' }), filePath);

      await api.post(`/usuarios/documents/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const documentsResponse = await api.get(`/usuarios/documents/${id}/all`);
      setData(documentsResponse.data);

      msgSucesso('Documento anexado com sucesso!');
      setIsModalOpen(false);
      setFilePath(null);
    } catch (err) {
      console.error('Error uploading document:', err);
      msgErro('Erro ao anexar documento');
    }
  };

  const handleDeleteDocument = (documentId: string) => {
    setDocumentToDelete(documentId);
  };

  const confirmDelete = async () => {
    //if (!documentToDelete) return;
//
    //try {
//
    //  const documentsResponse = await api.get(`/usuarios/${id}/documents`);
    //  setData(documentsResponse.data);
//
    //  msgSucesso('Documento excluído com sucesso!');
    //} catch (err) {
    //  console.error('Error deleting document:', err);
    //  msgErro('Erro ao excluir documento');
    //} finally {
    //  setDocumentToDelete(null);
    //}
  };

  const handleViewDocument = async (documentId: string) => {
    try {
      const response = await api.get(`/usuarios/${id}/documentos/${documentId}/download`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      window.open(url);
    } catch (err) {
      console.error('Error viewing document:', err);
      msgErro('Erro ao visualizar documento');
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FilePdfOutlined className="text-6xl text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileWordOutlined className="text-6xl text-blue-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FileImageOutlined className="text-6xl text-green-500" />;
      case 'xls':
      case 'xlsx':
        return <FileExcelOutlined className="text-6xl text-green-700" />;
      default:
        return <FileUnknownOutlined className="text-6xl text-gray-500" />;
    }
  };

  const renderResults = () => {
    if (loading) return <Text type="secondary">Carregando...</Text>;
    if (error) return <Text type="danger">{error}</Text>;
    if (!data) return <Text type="secondary">Nenhum documento encontrado</Text>;

    return (
      <div className='w-full'>
        <h1 className='text-xl lg:text-2xl font-bold mb-2 lg:mb-4 text-center'>Documentos</h1>
        <List
          grid={{
            gutter: 14,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 3,
          }}
          dataSource={data}
          renderItem={(item: any) => (
            <List.Item className="w-full">
              <Card
                className="w-full"
                actions={[
                  <Button 
                    type="text" 
                    icon={<EyeOutlined />} 
                    onClick={() => handleViewDocument(item.id)}
                  />,
                  <Button 
                    type="text" 
                    icon={<DeleteOutlined />} 
                    onClick={() => handleDeleteDocument(item.id)}
                    danger
                  />
                ]}
              >
                <div className="flex flex-col items-center">
                  <Text strong className="mb-4 text-center">
                    {item.fileName}
                  </Text>
                  <div className="my-4">
                    {getFileIcon(item.fileName)}
                  </div>
                  <Text className="text-sm text-gray-500">
                    Anexado em: {new Date(item.uploadDate).toLocaleDateString('pt-BR')}
                  </Text>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Sidebar */}
      <div className="w-full lg:w-1/3 bg-gray-100 p-4 lg:p-8 lg:shadow-lg lg:fixed lg:h-full">
        <div className="flex flex-row justify-between mx-2 lg:mx-8">
          <h2></h2>
          <Button 
            icon={<LeftOutlined />} 
            onClick={() => navigate(-1)} 
            className='self-start'
          />
        </div>
        <h1 className="text-xl lg:text-2xl font-bold text-center">
          Documentos Anexados
        </h1>
        <h1 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-center">
          {userData?.nome || ''}
        </h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenModal}
          className="w-full"
        >
          Anexar Documento
        </Button>
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-2/3 lg:ml-[33%] bg-white p-4 lg:p-8 min-h-screen">
        {renderResults()}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirmar Exclusão"
        open={!!documentToDelete}
        onOk={confirmDelete}
        onCancel={() => setDocumentToDelete(null)}
        okText="Excluir"
        cancelText="Cancelar"
        okButtonProps={{ danger: true }}
      >
        <p>Tem certeza que deseja excluir este documento?</p>
      </Modal>

      {/* Upload Modal */}
      <Modal
        title="Anexar Documento"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText="Anexar"
        cancelText="Cancelar"
      >
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFilePath(file.path);
            } else {
              setFilePath(null);
            }
          }}
        />
      </Modal>
    </div>
  );
};

export default Documentos;
