import React, { useEffect, useState, useCallback } from 'react';
import { DatePicker, Input, Select, Button, Radio, Modal } from "antd";
import type { RadioChangeEvent } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { LeftOutlined } from '@ant-design/icons';
import EnderecoModal from '../components/EnderecoModal';
import ResponsavelModal from '../components/ResponsavelModal';
import { Responsavel, User, Endereco } from '../types';
import api from '../service/api';

interface UserFormProps {
  onSubmit: (user: User) => void;
  initialData?: User;
}

const initialUserState: User = {
  nome: '',
  cpf: '',
  rg: '',
  data: undefined,
  telefone: '',
  profissao: '',
  escolaridade: 0,
  endereco: undefined,
  patologia: '',
  dados: {
    fonteRenda: '',
    valorRenda: 0,
    moradia: '',
    agua: '',
    energia: '',
    bens: '',
    internet: false,
    CRAS: false,
    acessoCRAS: false,
    chaveCRAS: '',
    senhaCRAS: '',
    descDoenca: '',
    medicamentos: '',
    medicamentosGasto: 0,
    tratamento: '',
    nutri: false,
    tempoTratamento: '',
    local: '',
    encaminhamento: ''
  },
  responsavel: {
    nome: '',
    cpf: '',
    idade: 0,
    telefone: '',
    profissao: '',
    escolaridade: 0,
    parentesco: '',
  },
  ativo: 1,
};

const escolaridadeOptions = [
  { value: 0, label: 'Ensino fundamental incompleto' },
  { value: 1, label: 'Ensino fundamental completo' },
  { value: 2, label: 'Ensino médio incompleto' },
  { value: 3, label: 'Ensino médio completo' },
  { value: 4, label: 'Ensino superior incompleto' },
  { value: 5, label: 'Ensino superior completo' },
];

const CadastroUsuario: React.FC<UserFormProps> = ({ onSubmit, initialData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<User>(() => {
    try {
      const storedData = sessionStorage.getItem('formData');
      return storedData ? JSON.parse(storedData) : initialData || initialUserState;
    } catch {
      return initialData || initialUserState;
    }
  });

  const [showModals, setShowModals] = useState({
    exit: false,
    endereco: false,
    responsavel: false,
  });

  const [dataNasc, setDataNasc] = useState<Dayjs | undefined>(
    formData.data ? dayjs(formData.data) : undefined
  );

  const handleToggleModal = useCallback((modal: keyof typeof showModals, value: boolean) => {
    setShowModals(prev => ({ ...prev, [modal]: value }));
  }, []);

  useEffect(() => {
    sessionStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const isFormComplete = Boolean(
    formData.nome.trim() &&
    formData.cpf.trim() &&
    formData.data &&
    formData.telefone.trim() &&
    formData.escolaridade !== undefined &&
    formData.patologia.trim() &&
    formData.endereco?.CEP?.trim() &&
    formData.responsavel.nome.trim()
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleDate = useCallback((date: Dayjs | null) => {
    if (!date) return;
    setDataNasc(date);
    setFormData(prev => ({ ...prev, data: date.toISOString() }));
  }, []);

  const handleSelectChange = useCallback((name: keyof User, value: unknown) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleEnderecoSubmit = useCallback((enderecoData: Endereco) => {
    setFormData(prev => ({ ...prev, endereco: enderecoData }));
    handleToggleModal('endereco', false);
  }, [handleToggleModal]);

  const handleResponsavelSubmit = useCallback((responsavelData: Responsavel) => {
    setFormData(prev => ({ ...prev, responsavel: responsavelData }));
    handleToggleModal('responsavel', false);
  }, [handleToggleModal]);

  const renderField = (label: string, name: keyof User, required = false) => (
    <div className="flex flex-col">
      <label className="text-lg">{label}{required && '*'}</label>
      <Input
        name={name}
        placeholder={label}
        value={formData[name] as string}
        onChange={handleChange}
        className="border rounded p-2 md:p-4 w-full text-lg"
      />
    </div>

    
  );return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center">Serviço Social</h1>
      <h1 className="md:text-2xl font-bold mb-4 md:mb-4 text-center">Cadastrar Usuário</h1>
      
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between mx-8">
          <Button icon={<LeftOutlined />} onClick={() => handleToggleModal('exit', true)} />
        </div>

        <form onSubmit={e => { e.preventDefault(); onSubmit(formData); }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderField('Nome', 'nome', true)}
          {renderField('Telefone', 'telefone', true)}
          {renderField('RG', 'rg')}
          
          <div className="flex flex-col">
            <label className="text-lg">Data de nascimento*</label>
            <DatePicker
              value={dataNasc}
              onChange={handleDate}
              className="border rounded p-2 md:p-4 w-full text-lg"
              popupClassName="date-picker-dropdown"
            />
          </div>

          {renderField('CPF', 'cpf', true)}
          {renderField('Profissão', 'profissao')}

          <div className="flex flex-col">
            <label className="text-lg">Escolaridade*</label>
            <Select
              value={formData.escolaridade}
              onChange={v => handleSelectChange('escolaridade', v)}
              options={escolaridadeOptions}
              className="w-full text-lg"
             
            />
          </div>

          {renderField('Patologia', 'patologia', true)}

          <Button
            type="primary"
            onClick={() => handleToggleModal('responsavel', true)}
            className="md:col-span-2 bg-blue-500 text-white p-2 md:p-4 w-full text-lg rounded my-3"
          >
            Adicionar Responsável
          </Button>

          <div className="md:col-span-2 my-5">
            <h1 className="text-2xl font-bold mb-4 text-center">Situação do Usuário</h1>
            <Radio.Group
              value={formData.ativo}
              onChange={e => handleSelectChange('ativo', e.target.value)}
              className="w-full flex justify-around"
            >
              <Radio value={0}>Ativo</Radio>
              <Radio value={1}>Inativo</Radio>
              <Radio value={2}>Óbito</Radio>
            </Radio.Group>
          </div>

          <Button
            type="primary"
            className="md:col-span-2 bg-blue-500 text-white p-2 md:p-4 w-full text-lg rounded hover:bg-yellow-700"
            disabled={!isFormComplete}
          >
            <Link to="/adicionar-dados" className="w-full block">Adicionar Dados</Link>
          </Button>

          <Button
            type="primary"
            onClick={() => handleToggleModal('endereco', true)}
            className="md:col-span-2 bg-blue-500 text-white p-2 md:p-4 w-full text-lg rounded"
          >
            Adicionar Endereço
          </Button>
        </form>

        <EnderecoModal
          open={showModals.endereco}
          onClose={() => handleToggleModal('endereco', false)}
          onSave={handleEnderecoSubmit}
          initialData={formData.endereco}
        />

        <ResponsavelModal
          open={showModals.responsavel}
          onClose={() => handleToggleModal('responsavel', false)}
          onSave={handleResponsavelSubmit}
          initialData={formData.responsavel}
        />

        <Modal
          title="Voltar à página inicial?"
          open={showModals.exit}
          onOk={() => navigate("/")}
          onCancel={() => handleToggleModal('exit', false)}
          okText="Confirmar"
          cancelText="Cancelar"
        >
          <p>Todas as alterações não salvas serão perdidas!</p>
        </Modal>
      </div>
    </div>
  );
};

export default React.memo(CadastroUsuario);