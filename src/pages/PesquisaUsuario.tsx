import React, { useState } from 'react';
import { Button, Input, Select, Card, Typography, List, Alert } from 'antd';
import { pesquisar } from '../service/pesquisar';
import { escolaridades, User } from '../types';
import { EditOutlined } from '@ant-design/icons';

const { Text } = Typography;

const PesquisaUsuario: React.FC = () => {
  const [search, setSearch] = useState('');
  const [tipoPesquisa, setTipoPesquisa] = useState('nome');
  const [responseData, setResponseData] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    if(search.length >3){
    try {
      const data = await pesquisar(tipoPesquisa, search);
      setResponseData(data);
    } catch (err) {
      setError('Erro ao buscar dados');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  else{
    setVisible(false)
  }};

  const renderResults = () => {
    if (loading) return <Text type="secondary">Carregando...</Text>;
    if (error) return <Text type="danger">{error}</Text>;
    if (!responseData) return <Text type="secondary">Realize uma pesquisa para exibir resultados</Text>;

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
                    <Button type='text' icon={<EditOutlined />} className='ml-1' />
                  </div>
                }
              >
                <p>{u.cpf}</p>
                <p>{u.telefone}</p>
                <p>{escolaridades[u.escolaridade]}</p>
                <p>{u.endereco?.CEP}</p>
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
            {visible && (
              <Alert message="No mínimo 3 caracteres! " type="error" closable afterClose={()=>{setVisible(false)}}/>
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
    </div>
  );
};

export default PesquisaUsuario;
