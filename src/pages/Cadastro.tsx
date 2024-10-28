import React, { useEffect, useState } from 'react';
import { Responsavel, User, Endereco, escolaridades } from '../types';
import EnderecoModal from '../components/EnderecoModal';
import { DatePicker, Input, Select, Button, Radio } from "antd";
import type { RadioChangeEvent } from 'antd';
import { useNavigate } from 'react-router-dom';
import { json } from 'stream/consumers';

interface UserFormProps {
  onSubmit: (user: User) => void;
  id: string;
  initialData?: User;
}

const Cadastro: React.FC<UserFormProps> = ({ onSubmit, initialData, id }) => {
  const [formData, setFormData] = useState<User>(initialData || {
    id: id,
    nome: '',
    cpf: '',
    rg: '',
    data: undefined,
    telefone: '',
    profissao: '',
    escolaridade: NaN,
    endereco: undefined,
    patologia: '',
    dados: {
      fonteRenda: '',
      valorRenda: NaN,
      moradia: '',
      agua: '',
      energia: '',
      bens: '',
      internet: false,
      acesso: '',
      descDoenca: '',
      medicamentos: '',
      medicamentosGasto: NaN,
      tratamento: '',
      nutri: '',
      tempoTratamento: '',
      local: '',
      encaminhamento: '',
    },
    responsavel: {
      nome: '',
      cpf: '',
      idade: NaN,
      endereco: undefined,
      telefone: '',
      profissao: '',
      escolaridade: NaN,
      parentesco: '',
    },
    ativo: false,
    obito: false,
  });

// Carrega formData do localStorage na montagem  
  useEffect(() => {
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData) as User);
      console.log(formData)
    }
    console.log('CARREGOU')
  }, []); 

// Salva formData no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);



  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const [endereco, setEndereco] = useState<Endereco | null>(null);
  const [ativo, setAtivo] = useState(1);

  // const isAtivo = (formData.ativo ? true : false) && (formData.obito ? false : true)
  // const isInativo = (formData.ativo ? false : true) && (formData.obito ? false : true)
  // const isObito = (formData.ativo ? false : true) && (formData.obito ? true : false)
  // const isInvalido = (formData.ativo ? true : false) && (formData.obito ? true : false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });

    console.log(formData);
  };

  const handleDate = (data: Date) => {
    if (data) {
      console.log('Date: ', data);

      setFormData({ ...formData, data: data })


    } else {
      console.log('Clear');
    }
  };

  const handleEscolaridade = (escolaridade: number) => {
    if (escolaridade) {
      console.log('escolaridade: ', escolaridades[escolaridade]);

      setFormData({ ...formData, escolaridade: escolaridade })

    } else {
      console.log('Clear');
    }
  };

  const handleAtivo = (e: RadioChangeEvent) => {
    switch(e.target.value){
      case 0: {
        setAtivo(0)
        setFormData({ ...formData, ativo: true })
        break;
      }
      case 1: {
        setAtivo(1)
        setFormData({ ...formData, ativo: false })
        break;
      }
      case 2: {
        setAtivo(2)
        setFormData({ ...formData, ativo: false})
        setFormData({ ...formData, obito: true})
        break;
      }
    }
  }

  const handleAdicionarDados = () => {
    if (formData.id) {
      navigate(`/adicionar-dados/${formData.id}`); // Redireciona para a rota com o ID do usuário
    } else {
      alert('O ID do usuário não está definido');
    }
  };

  const handleEnderecoSubmit = (enderecoData: Endereco) => {
    setEndereco(enderecoData);
    setFormData({ ...formData, endereco: enderecoData });
    setShowModal(false);
    console.log(formData.endereco)
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center">Serviço Social</h1>
      <h1 className="md:text-2xl font-bold mb-4 md:mb-4 text-center">Cadastrar Usuário</h1>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Nome */}
          <div className="flex flex-col">
            <label className="text-lg">Nome</label>
            <Input
              name="nome"
              placeholder="Nome"
              value={formData.nome}
              onChange={handleChange}
              className="border rounded p-2 md:p-4 w-full text-lg"
            />
          </div>

          {/* Telefone */}
          <div className="flex flex-col">
            <label className="text-lg">Telefone</label>
            <Input
              name="telefone"
              placeholder="Telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="border rounded p-2 md:p-4 w-full text-lg"
            />
          </div>

          {/* RG */}
          <div className="flex flex-col">
            <label className="text-lg">RG</label>
            <Input
              name="rg"
              placeholder="RG"
              value={formData.rg}
              onChange={handleChange}
              className="border rounded p-2 md:p-4 w-full text-lg"
            />
          </div>

          {/* Data de nascimento */}
          <div className="flex flex-col">
            <label className="text-lg">Data de nascimento</label>
            <DatePicker
              name="data"
              placeholder="Data de nascimento"
              onChange={handleDate}
              className="border rounded p-2 md:p-4 w-full text-lg"
            />
          </div>

          {/* CPF */}
          <div className="flex flex-col">
            <label className="text-lg">CPF</label>
            <Input
              name="cpf"
              placeholder="CPF"
              value={formData.cpf}
              onChange={handleChange}
              className="border rounded p-2 md:p-4 w-full text-lg"
            />
          </div>

          {/* Profissão */}
          <div className="flex flex-col">
            <label className="text-lg">Profissão</label>
            <Input
              name="profissao"
              placeholder="Profissão"
              value={formData.profissao}
              onChange={handleChange}
              className="border rounded p-2 md:p-4 w-full text-lg"
            />
          </div>

          {/* Escolaridade */}
          <div className="flex flex-col">
            <label className="text-lg">Escolaridade</label>
            <Select
              placeholder="Escolaridade"
              onChange={handleEscolaridade}
              className="w-full size-full text-lg"
              options={[
                { value: 0, label: 'Ensino fundamental incompleto' },
                { value: 1, label: 'Ensino fundamental completo' },
                { value: 2, label: 'Ensino médio incompleto' },
                { value: 3, label: 'Ensino médio completo' },
                { value: 4, label: 'Ensino superior incompleto' },
                { value: 5, label: 'Ensino superior completo' },
              ]}
            />
          </div>

          {/* Patologia */}
          <div className="flex flex-col ">
            <label className="text-lg">Patologia</label>
            <Input
              name="patologia"
              placeholder="Patologia"
              value={formData.patologia}
              onChange={handleChange} 
              className="border rounded p-2 md:p-4 w-full text-lg"
            />
          </div>

          {/* Ativo Inativo ou Obito */}
          <div className='md:col-span-2 my-5'>
            <h1 className='text-2xl md:text-2xl font-bold mb-2 md:mb-4 text-center'>Situação do Usuário</h1>
            <Radio.Group onChange={handleAtivo} value={ativo} block size='large'>
              <Radio value={0}>Ativo</Radio>
              <Radio value={1}>Inativo</Radio>
              <Radio value={2}>Obito</Radio>
            </Radio.Group>
          </div>

          {/* Botões */}
          <Button
            type="primary"
            htmlType="button"
            onClick={handleAdicionarDados}
            className="md:col-span-2 bg-blue-500 text-white p-2 md:p-4 w-full text-lg rounded hover:bg-yellow-700"
          >
            Adicionar Dados
          </Button>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => setShowModal(true)}
            className="md:col-span-2 bg-blue-500 text-white p-2 md:p-4 w-full text-lg rounded"
          >
            Adicionar Endereço
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="md:col-span-2 bg-blue-500 text-white p-2 md:p-4 w-full text-lg rounded"
          >
            Cadastrar
          </Button>
        </form>

        {showModal && (
          <EnderecoModal
            onClose={() => setShowModal(false)}
            onSave={handleEnderecoSubmit}
            initialData={endereco}
          />
        )}
      </div>
    </div>
  );
};

export default Cadastro;
