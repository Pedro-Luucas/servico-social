import React, { useEffect, useState } from 'react';

// Define the type inline since external types are not supported
interface Responsavel {
  nome: string;
  cpf: string;
  idade: number;
  telefone: string;
  profissao: string;
  escolaridade: number;
  parentesco: string;
}

interface ResponsavelModalProps {
  onClose: () => void;
  onSave: (responsavel: Responsavel) => void;
  initialData?: Responsavel | null;
}

const ResponsavelModal: React.FC<ResponsavelModalProps> = ({ onClose, onSave, initialData }) => {
  const [nome, setNome] = useState(initialData?.nome || '');
  const [cpf, setCpf] = useState(initialData?.cpf || '');
  const [idade, setIdade] = useState(initialData?.idade || NaN);
  const [telefone, setTelefone] = useState(initialData?.telefone || '');
  const [profissao, setProfissao] = useState(initialData?.profissao || '');
  const [escolaridade, setEscolaridade] = useState(initialData?.escolaridade || 0);
  const [parentesco, setParentesco] = useState(initialData?.parentesco || '');

  const [addOrEdit] = useState(initialData ? 'Editar' : 'Adicionar');

  const handleSubmit = () => {
    const responsavelFinal: Responsavel = {
      nome,
      cpf,
      idade,
      telefone,
      profissao,
      escolaridade,
      parentesco,
    };
    onSave(responsavelFinal);
    onClose();
  };

  const handleCancel = () => {
    setNome('');
    setCpf('');
    setIdade(NaN);
    setTelefone('');
    setProfissao('');
    setEscolaridade(0);
    setParentesco('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="text-xl">{addOrEdit} Responsável</h2>
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
        </div>

        <form className="grid grid-cols-1 gap-4">
          {/* Nome */}
          <div>
            <label className="block text-sm mb-1">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
              className="border rounded p-2 w-full text-base"
            />
          </div>

          {/* CPF */}
          <div>
            <label className="block text-sm mb-1">CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="CPF"
              className="border rounded p-2 w-full text-base"
            />
          </div>

          {/* Idade */}
          <div>
            <label className="block text-sm mb-1">Idade</label>
            <input
              type="number"
              value={isNaN(idade) ? '' : idade}
              onChange={(e) => setIdade(Number(e.target.value))}
              placeholder="Idade"
              className="border rounded p-2 w-full text-base"
            />
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-sm mb-1">Telefone</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Telefone"
              className="border rounded p-2 w-full text-base"
            />
          </div>

          {/* Profissão */}
          <div>
            <label className="block text-sm mb-1">Profissão</label>
            <input
              type="text"
              value={profissao}
              onChange={(e) => setProfissao(e.target.value)}
              placeholder="Profissão"
              className="border rounded p-2 w-full text-base"
            />
          </div>

          {/* Escolaridade */}
          <div>
            <label className="block text-sm mb-1">Escolaridade</label>
            <select
              value={escolaridade}
              onChange={(e) => setEscolaridade(Number(e.target.value))}
              className="border rounded p-2 w-full text-base"
            >
              <option value={0}>Ensino fundamental incompleto</option>
              <option value={1}>Ensino fundamental completo</option>
              <option value={2}>Ensino médio incompleto</option>
              <option value={3}>Ensino médio completo</option>
              <option value={4}>Ensino superior incompleto</option>
              <option value={5}>Ensino superior completo</option>
            </select>
          </div>

          {/* Parentesco */}
          <div>
            <label className="block text-sm mb-1">Parentesco</label>
            <input
              type="text"
              value={parentesco}
              onChange={(e) => setParentesco(e.target.value)}
              placeholder="Parentesco"
              className="border rounded p-2 w-full text-base"
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResponsavelModal;