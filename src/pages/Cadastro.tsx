import React, { useState } from 'react';
import { User, Endereco } from '../types';
import AddressModal from '../components/EnderecoModal';
import { useNavigate } from 'react-router-dom';

interface UserFormProps {
  onSubmit: (user: User) => void;
  initialData?: User;
}




const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData }) => {
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
  <div>
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        name="nome"
        placeholder="Nome"
        value={formData.nome}
        onChange={handleChange}
        className="border rounded p-2 w-full"
      />
      <input
        name="cpf"
        placeholder="CPF"
        value={formData.cpf}
        onChange={handleChange}
        className="border rounded p-2 w-full"
      />
      <input
        name="rg"
        placeholder="RG"
        value={formData.rg}
        onChange={handleChange}
        className="border rounded p-2 w-full"
      />
      <input
        name="data"
        placeholder="Data de nascimento"
        type = "date"
        value={formData.data}
        onChange={handleChange}
        className="border rounded p-2 w-full"
      />
      <input
        name="telefone"
        placeholder="Telefone"
        value={formData.telefone}
        onChange={handleChange}
        className="border rounded p-2 w-full"
      />
      <input
        name="profissao"
        placeholder="Profissão"
        value={formData.profissao}
        onChange={handleChange}
        className="border rounded p-2 w-full"
      />
      <input
        name="escolaridade"
        placeholder="Escolaridade"
        value={formData.escolaridade}
        onChange={handleChange}
        className="border rounded p-2 w-full"
      />
        {/* Botão para abrir o modal de adicionar endereço */}
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="col-span-2 bg-green-500 text-white p-2 rounded w-full"
        >
          Adicionar Endereço
        </button>

        <button
          type="submit"
          className="col-span-2 bg-blue-500 text-white p-2 rounded w-full"
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
  );
};

export default UserForm;
