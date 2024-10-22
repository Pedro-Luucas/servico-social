import React, { useState } from 'react';
import { User, Endereco } from '../types';
import AddressModal from '../components/EnderecoModal';
import { DatePicker, Input, Select, Button } from "antd";
import { useNavigate } from 'react-router-dom';

interface UserFormProps {
  onSubmit: (user: User) => void;
  id: string
  initialData?: User;
  Usuario?: boolean;
}



const Cadastro: React.FC<UserFormProps> = ({ onSubmit, initialData, id, Usuario }) => {
  const [formData, setFormData] = useState<User>(initialData || {
    id: id,
    nome: '',
    cpf: '',
    rg: '',
    data: '',
    telefone: '',
    profissao: '',
    escolaridade: '',
    endereco: undefined,
  });

  const [showModal, setShowModal] = useState(false);
  const [endereco, setEndereco] = useState<Endereco | null>(null);

  const navigate = useNavigate();


  const handleEnderecoSubmit = (enderecoData: Endereco) => {
    setEndereco(enderecoData);
    setFormData({ ...formData, endereco: enderecoData });
    setShowModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };

  const handleAdicionarDados = () => {
    if (formData.id) {
      navigate(`/adicionar-dados/${formData.id}`); // Redireciona para a rota com o ID do usuário
    } else {
      alert('O ID do usuário não está definido');
    }
  };

  const handleDate = (date: Date) => {
    if (date) {
      console.log('Date: ', date);
    } else {
      console.log('Clear');
    }
  };

  const handleEscolaridade = (escolaridade: string) => {
    if (escolaridade) {
      console.log('escolaridade: ', escolaridade);
    } else {
      console.log('Clear');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center">Serviço Social</h1>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            className="border rounded p-2 md:p-4 w-full text-lg"
          />
          <Input
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="border rounded p-2 md:p-4 w-full text-lg"
          />
          <Input
            name="rg"
            placeholder="RG"
            value={formData.rg}
            onChange={handleChange}
            className="border rounded p-2 md:p-4 w-full text-lg"
          />
          <DatePicker
            name="data"
            placeholder="Data de nascimento"
            onChange={handleDate}
            className="border rounded p-2 md:p-4 w-full text-lg"
          />
          <Input
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleChange}
            className="border rounded p-2 md:p-4 w-full text-lg"
          />
          <Input
            name="profissao"
            placeholder="Profissão"
            value={formData.profissao}
            onChange={handleChange}
            className="border rounded p-2 md:p-4 w-full text-lg"
          />
          <Select
            placeholder="Escolaridade"
            onChange={handleEscolaridade}
            className="w-full size-full text-lg"
            options={[
              { value: 'Ensino fundamental incompleto', label: 'Ensino fundamental incompleto' },
              { value: 'Ensino fundamental completo', label: 'Ensino fundamental completo' },
              { value: 'Ensino médio incompleto', label: 'Ensino médio incompleto' },
              { value: 'Ensino médio completo', label: 'Ensino médio completo' },
              { value: 'Ensino superior incompleto', label: 'Ensino superior incompleto' },
              { value: 'Ensino superior completo', label: 'Ensino superior completo' },
            ]}
          />
          <Button
            type='primary'
            htmlType="button"
            onClick={handleAdicionarDados}
            className="md:col-span-2 bg-blue-500 text-white p-2 md:p-4 w-full text-lg rounded hover:bg-yellow-700"
          >
            Adicionar Dados
          </Button>
          <Button
            type='primary'
            htmlType="button"
            onClick={() => setShowModal(true)}
            className="md:col-span-2 bg-blue-500 text-white p-2 md:p-4 w-full text-lg rounded"
          >
            Adicionar Endereço
          </Button>
          <Button
            type='primary'
            htmlType="submit"
            className="md:col-span-2 bg-blue-500 text-white p-2 md:p-4 w-full text-lg rounded"
          >
            Cadastrar
          </Button>
        </form>

        {showModal && (
          <AddressModal
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
