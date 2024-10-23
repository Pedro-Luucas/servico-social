import React, { useEffect, useState } from 'react';
import { Familiar } from '../types';
import { Input, Button, Select } from "antd";
import { CloseOutlined } from '@ant-design/icons';

interface FamiliarModalProps {
  onClose: () => void;
  onSave: (familiar: Familiar) => void;
  initialData?: Familiar | null;
}

const FamiliarModal: React.FC<FamiliarModalProps> = ({ onClose, onSave, initialData }) => {
  const [nome, setNome] = useState(initialData?.nome || '');
  const [parentesco, setParentesco] = useState(initialData?.parentesco || '');
  const [idade, setIdade] = useState(initialData?.idade || NaN);
  const [profissao, setProfissao] = useState(initialData?.profissao || '');
  const [escolaridade, setEscolaridade] = useState(initialData?.escolaridade || '');
  const [salario, setSalario] = useState(initialData?.salario || NaN);

  // Atualiza os valores iniciais caso initialData seja fornecido
  useEffect(() => {
    if (initialData) {
      setNome(initialData.nome || '');
      setParentesco(initialData.parentesco || '');
      setIdade(initialData.idade || NaN);
      setProfissao(initialData.profissao || '');
      setEscolaridade(initialData.escolaridade || '');
      setSalario(initialData.salario || NaN);
    }
  }, [initialData]);

  // Função para submeter o formulário
  const handleSubmit = () => {
    const familiarFinal: Familiar = {
      nome,
      parentesco,
      idade,
      profissao,
      escolaridade,
      salario,
    };
    onSave(familiarFinal);  // Chama a função de salvamento passando os dados do familiar
    onClose();              // Fecha o modal após salvar
  };

  const handleCancel = () => {
    // Reseta os valores dos campos e fecha o modal
    setNome('');
    setParentesco('');
    setIdade(NaN);
    setProfissao('');
    setEscolaridade('');
    setSalario(NaN);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl mb-4">Adicionar Familiar</h2>
          <Button type='text' icon={<CloseOutlined />} onClick={onClose} className='self-start' />
        </div>

        <form className="grid grid-cols-1 gap-4">
          {/* Nome */}
          <Input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
            className="border rounded p-4 w-full text-lg"
          />

          {/* Parentesco */}
          <Input
            value={parentesco}
            onChange={(e) => setParentesco(e.target.value)}
            placeholder="Parentesco"
            className="border rounded p-4 w-full text-lg"
          />

          {/* Idade */}
          <Input
            type="number"
            value={idade}
            onChange={(e) => setIdade(Number(e.target.value))}
            placeholder="Idade"
            className="border rounded p-4 w-full text-lg"
          />

          {/* Profissão */}
          <Input
            value={profissao}
            onChange={(e) => setProfissao(e.target.value)}
            placeholder="Profissão"
            className="border rounded p-4 w-full text-lg"
          />

          {/* Escolaridade */}
          <Select
              placeholder="Escolaridade"
              onChange={(value) => setEscolaridade(value)}
              className="w-full size-full text-lg"
              options={[
                { value: 'ef-incompleto', label: 'Ensino fundamental incompleto' },
                { value: 'ef-completo', label: 'Ensino fundamental completo' },
                { value: 'em-incompleto', label: 'Ensino médio incompleto' },
                { value: 'em-completo', label: 'Ensino médio completo' },
                { value: 'es-incompleto', label: 'Ensino superior incompleto' },
                { value: 'es-completo', label: 'Ensino superior completo' },
              ]}
            />

          {/* Salário */}
          <Input
            type="number"
            value={salario}
            onChange={(e) => setSalario(Number(e.target.value))}
            placeholder="Salário"
            className="border rounded p-4 w-full text-lg"
          />

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-black p-4 text-lg rounded"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-4 text-lg rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FamiliarModal;