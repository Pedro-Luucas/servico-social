import React, { useState } from 'react';
import { Button, Input, Select, Card, Typography, List, Alert, Modal } from 'antd';
import { pesquisar } from '../service/pesquisar';
import { escolaridades, User } from '../types';
import { EditOutlined, EyeOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const PesquisaUsuario: React.FC = () => {
  const [search, setSearch] = useState('');
  const [tipoPesquisa, setTipoPesquisa] = useState('nome');
  const [responseData, setResponseData] = useState<any>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModalExit, setShowModalExit] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  let navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    if (search.length > 2) {
      try {
        const data = await pesquisar(tipoPesquisa, search);
        setResponseData(data);
      } catch (err: any) {
        if (err.message === 'Nenhum resultado encontrado para a pesquisa.') {
          setError(err.message);
        } else {
          setError('Erro ao buscar dados. Tente novamente mais tarde.');
        }
        console.error(err);
      } finally {
        setAlertVisible(false);
        setLoading(false);
      }
    } else {
      setAlertVisible(true);
      setLoading(false);
    }
  };

//MODAL DE AVISO
  const backHome = () => {
    setShowModalExit(false)
    navigate("/")
  }

//DETALHES USUARIO
  //const detalhes = (id) => {
    //AQUI
  //}

  const renderResults = () => {
    if (loading) return <Text type="secondary">Carregando...</Text>;
    if (error) return <Text type="danger">{error}</Text>;
    if (!responseData) return <Text type="secondary">Realize uma pesquisa para exibir resultados</Text>;
    const ativo = ['ATIVO', 'INATIVO', 'OBITO']

    return (
      <div className='md:col-span-2'>
        <h1 className='text-2xl md:text-2xl font-bold mb-2 md:mb-4 text-center'>Usuários</h1>
        <List
          grid={{
            gutter: 14,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
          }}
          dataSource={responseData}
          renderItem={(u: User) => (
            <List.Item>
              <Card
                title={u.nome}
                extra={
                  <div>
                    <Button type='text' icon={<EyeOutlined />} onClick={() => {}} className='ml-1' />
                    <Button type='text' icon={<EditOutlined />} onClick={() => {console.log(u)}}className='ml-1' />
                  </div>
                }
              >
                <p>{ativo[u.ativo]}</p>
                
                <p>{u.cpf}</p>
                <p>{u.telefone}</p>
                <p>{escolaridades[u.escolaridade]}</p>
                <p>{u.endereco?.CEP}</p>
                <p>...</p>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-100 p-8 shadow-lg fixed h-full">
      <div className="flex flex-row justify-between mx-8">
          <h2></h2>
          <Button icon={<LeftOutlined />} onClick={() => {setShowModalExit(true)}} className='self-start' />
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center">Pesquisa de Usuário</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Pesquisar Usuário</label>
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={tipoPesquisa}
              className="w-full"
            />
            {alertVisible && (
              <Alert message="No mínimo 3 caracteres! " type="error" closable afterClose={()=>{setAlertVisible(false)}}/>
            )}
          </div>

          <div>
            <label className="block text-sm mb-2">Tipo de Pesquisa</label>
            <Select
              value={tipoPesquisa}
              onChange={(value) => setTipoPesquisa(value)}
              className="w-full"
            >
              <Select.Option value="nome">Nome</Select.Option>
              <Select.Option value="telefone">Telefone</Select.Option>
              <Select.Option value="cpf">CPF</Select.Option>
              <Select.Option value="cep">CEP</Select.Option>
            </Select>
          </div>

          <Button
            onClick={handleSearch}
            className="w-full"
            type="primary"
            loading={loading}
          >
            Pesquisar
          </Button>
        </div>
      </div>

      {/* Right Content */}
      <div className="ml-[33%] w-2/3 bg-white flex items-start justify-center p-8 overflow-y-auto h-screen">
        <div className="w-full">{renderResults()}</div>
      </div>
      <Modal
        title="Voltar à pagina inicial?"
        open={showModalExit}
        onOk={backHome}
        onCancel={() => {setShowModalExit(false)}}
        okText="Ok"
        cancelText="Cancelar"
      >
        <h1>As alterações não serão salvas! </h1>
      </Modal>
    </div>
  );
};

export default PesquisaUsuario;
