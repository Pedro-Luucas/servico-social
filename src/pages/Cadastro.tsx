import React, { useState } from 'react';
import { User, Endereco } from '../types';
import AddressModal from '../components/EnderecoModal';
import { useNavigate } from 'react-router-dom';
import { DatePicker, Input, Select, Button } from "antd";

interface UserFormProps {
  onSubmit: (user: User) => void;
  initialData?: User;
}




const Cadastro: React.FC<UserFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<User>(initialData || {
    id: '',
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
  
  const handleEnderecoSubmit = (enderecoData: Endereco) => {
    setEndereco(enderecoData);
    setFormData({ ...formData, endereco: enderecoData });
    setShowModal(false); // Fechar modal após adicionar o endereço
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
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
<div className="container mx-auto size- p-8">
  <h1 className="text-4xl font-bold mb-8">Serviço Social </h1>
    <div className='size-full'>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
        <Input
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          className="border rounded p-4 w-full text-lg"
        />
        <Input
          name="telefone"
          placeholder="Telefone"
          value={formData.cpf}
          onChange={handleChange}
          className="border rounded p-4 w-full text-lg"
        />
        <Input
          name="rg"
          placeholder="RG"
          value={formData.rg}
          onChange={handleChange}
          className="border rounded p-4 w-full text-lg"
        />
        <DatePicker
          name="data"
          placeholder="Data de nascimento"
          type = "date"
          onChange={handleDate}
          className="border rounded p-4 w-full text-lg"
        />
        <Input
          name="cpf"
          placeholder="CPF"
          value={formData.telefone}
          onChange={handleChange}
          className="border rounded p-4 w-full text-lg"
        />
        <Input
          name="profissao"
          placeholder="Profissão"
          value={formData.profissao}
          onChange={handleChange}
          className="border rounded p-4 w-full text-lg"
        />
        <Select
          placeholder="Escolaridade"
          onChange={handleEscolaridade}
          className='size-full text-lg'
          options={[
            { value: 'Ensino fundamental incompleto', label: 'Ensino fundamental incompleto' },
            { value: 'Ensino fundamental completo', label: 'Ensino fundamental completo' },
            { value: 'Ensino medio incompleto', label: 'Ensino médio incompleto' },
            { value: 'Ensino médio completo', label: 'Ensino médio completo' },
            { value: 'Ensino superior incompleto', label: 'Ensino superior incompleto' },
            { value: 'Ensino superior completo', label: 'Ensino superior completo' },
        ]}
        />
          {/* Botão para abrir o modal de adicionar endereço */}
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className=" bg-green-500 text-white p-4 w-full text-lg rounded"
          >
            Adicionar Endereço
          </button>

          <button
            type="submit"
            className="col-span-2 bg-blue-500 text-white p-4 text-lg rounded w-full"
          >
            Submit
          </button>
        </form>

        {/* Renderizar o modal quando showModal for true */}
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
