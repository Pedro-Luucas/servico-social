import React, { useState } from 'react';
import { User } from '../types';
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
    endereco: '',
    telefone: '',
    profissao: '',
    escolaridade: '',
    responsavel: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Organize the input fields in two columns using the grid system */}
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
        name="endereco"
        placeholder="Endereço"
        value={formData.endereco}
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
      <input
        name="responsavel"
        placeholder="Responsável"
        value={formData.responsavel}
        onChange={handleChange}
        className="border rounded p-2 w-full"
      />
      <button
        type="submit"
        className="col-span-2 bg-blue-500 text-white p-2 rounded w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default UserForm;
