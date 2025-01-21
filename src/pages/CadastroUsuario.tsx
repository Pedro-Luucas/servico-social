import React, { useEffect, useState } from 'react';
import { Responsavel, User, Endereco, escolaridades } from '../types';
import EnderecoModal from '../components/EnderecoModal';
import { DatePicker, Input, Select, Button, Radio } from "antd";
import type { RadioChangeEvent } from 'antd';
import { Link } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import api from '../service/api';

interface UserFormProps {
  onSubmit: (user: User) => void;
  id?: string;
  initialData?: User;
}

const CadastroUsuario: React.FC<UserFormProps> = ({ onSubmit, initialData }) => {
  let user = {
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
    CRAS: false,
    acessoCRAS: false,
    chaveCRAS:  '',
    senhaCRAS: '',
    descDoenca: '',
    medicamentos: '',
    medicamentosGasto: NaN,
    tratamento: '',
    nutri: false,
    tempoTratamento: '',
    local: '',
    encaminhamento: ''
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
  ativo: 1,
}
  const storedFormData = sessionStorage.getItem('formData'); 
  if(storedFormData){
    user = JSON.parse(storedFormData)
  }

//HOOKS
  const [formData, setFormData] = useState<User>(user);

  const [showModal, setShowModal] = useState(false);
  const [endereco, setEndereco] = useState<Endereco | undefined>(formData.endereco);
  const [ativo, setAtivo] = useState(formData.ativo);
  const [escolaridade, setEscolaridade] = useState(formData.escolaridade);
  const [isFormComplete, setIsFormComplete] = useState(false);

  let aniversario: dayjs.Dayjs | undefined = undefined;
  if (typeof formData.data === 'string' && formData.data.trim() !== '') {
    aniversario = dayjs(formData.data);
  }
  
  const [dataNasc, setDataNasc] = useState<dayjs.Dayjs | undefined>(aniversario);

//Carrega formData do sessionStorage na montagem  
  useEffect(() => {
    const storedFormData = sessionStorage.getItem('formData');
    try{
      if (storedFormData) {
        let formdata = JSON.parse(storedFormData)
        setFormData(formdata as User);
        console.log(formData)
      }
    }
    catch (error){

    }
  }, []); 

//Salva formData no sessionStorage sempre que formData mudar
  useEffect(() => {
    const storedFormData = sessionStorage.getItem('formData');
    sessionStorage.setItem('formData', JSON.stringify(formData));
    if(storedFormData){
    console.log('SALVANDO: ',JSON.parse(storedFormData))}
  }, [formData]);

//Verifica se o formulário está completo toda vez que formData mudar
  useEffect(() => {
    const isComplete = 
      formData.nome.trim() !== '' &&
      formData.cpf.trim() !== '' &&
      formData.data !== undefined &&
      formData.telefone.trim() !== '' &&
      !isNaN(formData.escolaridade) &&
      formData.patologia.trim() !== '';

    setIsFormComplete(isComplete);
  }, [formData]);




  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDate = (data: Dayjs | null) => {
    if (data) {
      setDataNasc(data);
      setFormData({ ...formData, data: data.toISOString() });
    }
  };

  const handleEscolaridade = (escolaridadeN: number) => {
    if (escolaridadeN) {
      setEscolaridade(escolaridadeN)
      setFormData({ ...formData, escolaridade: escolaridadeN })
      
    }
  };

  const handleAtivo = (e: RadioChangeEvent) => {
    setAtivo(e.target.value)
    setFormData({...formData, ativo: e.target.value})
  }

  const handleAdicionarDados = () => {
   //if (formData.id) {
   //  navigate(`/adicionar-dados/${formData.id}`); // Redireciona para a rota com o ID do usuário
   //} else {
   //  api.get('') // GERAR ID DO USUARIO
   //}
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
              value={dataNasc}
              onChange={(value) => handleDate(value)}
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
              value={escolaridade}
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
            disabled={!isFormComplete}
          >
            <Link to={'/adicionar-dados'} className='w-max'>Adicionar Dados</Link>
          </Button>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => setShowModal(true)}
            className="md:col-span-2 bg-blue-500 text-white p-2 md:p-4 w-full text-lg rounded"
          >
            Adicionar Endereço
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

export default CadastroUsuario;
