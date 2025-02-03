import React, { useEffect, useState } from 'react';
import { Card, Spin, Alert, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../service/api'; // Substitua pelo serviço apropriado para a API
import { escolaridades } from '../types';
import { HomeOutlined, LeftOutlined } from '@ant-design/icons';

const DetalhesUsuario = () => {
  const { id } = useParams(); // Captura o ID da URL
  const navigate = useNavigate(); // Para navegação
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = [
    {
      title: 'Informações Pessoais',
      fields: [
        { key: 'nome', label: 'Nome' },
        { key: 'cpf', label: 'CPF' },
        { key: 'rg', label: 'RG' },
        { key: 'dataNasc', label: 'Data de Nascimento' },
        { key: 'telefone', label: 'Telefone' },
        { key: 'patologia', label: 'Patologia' }
      ]
    },
    {
      title: 'Localização',
      fields: [
        { key: 'municipio', label: 'Município' },
        { key: 'bairro', label: 'Bairro' },
        { key: 'rua', label: 'Rua' },
        { key: 'numero', label: 'Número' },
        { key: 'cep', label: 'CEP' }
      ]
    },
    {
      title: 'Responsável',
      fields: [
        { key: 'respNome', label: 'Nome do responsavel' },
        { key: 'respCpf', label: 'CPF do responsavel' },
        { key: 'respIdade', label: 'Idade do responsavel' },
        { key: 'respTelefone', label: 'Telefone do responsavel' },
        { key: 'respProfissao', label: 'Profissão do responsavel' },
        { key: 'respParentesco', label: 'Parentesco'}
      ]
    },
    {
      title: 'Financeiro',
      fields: [
        { key: 'profissao', label: 'Profissão' },
        { key: 'escolaridade', label: 'Escolaridade' },
        
        { key: 'fonteRenda', label: 'Fonte de Renda' },
        { key: 'valorRenda', label: 'Valor da Renda' }
      ]
    },
    {
      title: 'Tratamento',
      fields: [
        
        { key: 'tratamento', label: 'Tratamento' },
        
        { key: 'tempoTratamento', label: 'Duração do Tratamento' },
        { key: 'local', label: 'Local do tratamento' },
        { key: 'encaminhamento', label: 'Encaminhamento' },
        
        
      ]
    },
    {
      title: 'Saúde',
      fields: [
        { key: 'descDoenca', label: 'Descrição da Doença' },
        { key: 'medicamentos', label: 'Medicamentos' },
        { key: 'medicamentosGasto', label: 'Gasto com Medicamentos' },
      ]
    },
    {
      title: 'Acesso',
      fields: [
        { key: 'internet', label: 'Internet' },
        { key: 'agua', label: 'Água' },
        { key: 'energia', label: 'Energia' },
        { key: 'moradia', label: 'Moradia' }
      ]
      
    },
    {
      title: 'CRAS',
      fields: [
        { key: 'cras', label: 'CRAS' },
        { key: 'acessoCRAS', label: 'Acesso ao sistema do CRAS' },
        { key: 'chaveCRAS', label: 'Chave do CRAS' },
        { key: 'senhaCRAS', label: 'senha do CRAS' },
      ]
      
    }
  ];

  // Busca os dados do usuário pelo ID
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/usuarios/pesquisarId/${id}`); 
        setData(response.data);
      } catch (err: any) {
        setError('Erro ao carregar os detalhes do usuário. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Conteúdo de erro, carregamento ou exibição dos dados
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Detalhes do Usuário</h2>
              <div className="self-start">
                {/* ATIVO INATIVO OU ÓBITO */}

                  {/* Botão para voltar */}
              <Button
                icon={<LeftOutlined />}
                onClick={() => navigate(-1)}
                className="self-start"
              >
                Voltar
              </Button>

              {/* Botão para ir para a página inicial */}
              <Button
                icon={<HomeOutlined />}
                onClick={() => navigate('/')}
                className="ml-3"
              >
                Início
              </Button>
            </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Spin size="large" />
          </div>
        ) : error ? (
          <div className="p-4">
            <Alert message={error} type="error" showIcon />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {columns.map((column, idx) => (
              <Card key={idx} className="p-4">
                <h3 className="font-semibold mb-3">{column.title}</h3>
                <div className="space-y-2">
                  {column.fields.map((field) => (
                    <div key={field.key}>
                      <span className="text-sm text-gray-500">{field.label}</span>
                      <p className="font-medium">
                      {field.key === 'escolaridade'
                        ? escolaridades[data[field.key]]
                        : field.key === 'dataNasc'
                        ? new Date(data[field.key]).toLocaleDateString('pt-BR')
                        : typeof data[field.key] === 'boolean'
                        ? data[field.key]
                          ? 'Sim'
                          : 'Não'
                        : data[field.key] || '-'}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetalhesUsuario;
