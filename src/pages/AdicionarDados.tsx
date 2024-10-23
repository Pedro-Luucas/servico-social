import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DadosUsuario, Familiar, CRAS } from '../types';
import type { CheckboxProps } from 'antd';
import { Input, Select, Checkbox, Button } from 'antd';
import { LeftOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import FamiliarModal from '../components/FamiliarModal';

const { TextArea } = Input;

const AdicionarDados: React.FC = () => {
  
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL

  const [formData, setFormData] = useState<DadosUsuario>({
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
  });

  const navigate = useNavigate();

  //Familiares
  const [showModal, setShowModal] = useState(false);
  const [familiar, setFamiliar] = useState<Familiar | null>(null);
  const handleFamiliarSubmit = (familiarData: Familiar) => {
    setFamiliar(familiarData);
    setFormData((prevState) => ({
      ...prevState,
      familiares: [...(prevState.familiares || []), familiarData]
    }));
    setShowModal(false);
    console.log(formData)
  };

  //CRAS
  const [isCRAS, setIsCRAS] = useState(false)
  const [isAcesso, setIsAcesso] = useState(false)
  var acessoVisibility = isCRAS ? '' : 'hidden'
  var CrasLoginVisibility = isAcesso ? '' : 'hidden'
  
  const toggleCRAS: CheckboxProps['onChange'] = (e) => {
    setIsCRAS(e.target.checked)
  }
  const toggleAcesso: CheckboxProps['onChange'] = (e) => {
    setIsAcesso(e.target.checked)

  }

  // SN SIM OU NAO
  const [isNet, setIsNet] = useState(false)
  const [isNutri, setIsNutri] = useState(false)
  const toggleNet: CheckboxProps['onChange'] = (e) => {
    setIsNet(e.target.checked)
  }
  const toggleNutri: CheckboxProps['onChange'] = (e) => {
    setIsNutri(e.target.checked)
  }
  var SNnet = isNet ? 'Sim' : 'Não'
  var SNnutri = isNutri  ? 'Sim' : 'Não'
  var SNcras = isCRAS ? 'Sim' : 'Não'
  var SNacesso = isAcesso ? 'Sim' : 'Não'


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, internet: e.target.checked });
  };

  const handleVoltar = () => {
    setFormData({
      familiares: [{ nome: '', escolaridade: '', profissao: '', idade: 0, salario: 0, parentesco: '' }],
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
    });
    navigate('/Cadastro')
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do Usuário:', formData);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center">
        Adicionar Dados para o Usuário {id}
      </h1>
      <div className="max-w-3xl mx-auto mb-10 bg-white p-6 rounded-lg shadow-md ">
        <div className='button p-4'>
          <Button type='text' icon={<LeftOutlined />} onClick={handleVoltar} />
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Fonte de Renda */}
          <div className="flex flex-col">
            <label className="text-lg">Fonte de renda familiar</label>
            <Select
              placeholder="Fonte de Renda"
              onChange={(value) => handleSelectChange('fonteRenda', value)}
              className="w-full"
              options={[
                { value: 'emp-formal', label: 'emp. formal' },
                { value: 'emp-informal', label: 'emp. informal' },
                { value: 'ap-invalidez', label: 'aposentado por invalidez' },
                { value: 'ap-contribuicao', label: 'aposentado por tempo de contribuição' },
                { value: 'pens-morte', label: 'pensão por morte' },
                { value: 'aux-doenca', label: 'auxilio doença' },
                { value: 'BPC-LOAS', label: 'BPC/LOAS' },
                { value: 'bolsa-familia', label: 'bolsa familia' },
              ]}
            />
          </div>

          {/* Valor da Renda */}
          <div className="flex flex-col">
            <label className="text-lg">Valor da Renda</label>
            <Input
              name="valorRenda"
              placeholder="Valor da Renda"
              type="number"
              value={formData.valorRenda}
              onChange={handleInputChange}
              className="border rounded p-2 w-full text-lg"
            />
          </div>

          {/* Moradia */}
          <div className="flex flex-col">
            <label className="text-lg">Tipo de Moradia</label>
            <Select
              placeholder="Fonte de Renda"
              onChange={(value) => handleSelectChange('fonteRenda', value)}
              className="w-full"
              options={[
                { value: 'própria', label: 'Casa própria' },
                { value: 'alugada', label: 'Casa alugada' },
                { value: 'cedida', label: 'Casa cedida' },
                { value: 'financiada', label: 'Casa financiada' },
              ]}
            />
          </div>

          {/* Água */}
          <div className="flex flex-col">
            <label className="text-lg">Tipo de Abastecimento de Água</label>
            <Select
              placeholder="Tipo de Abastecimento de Água"
              onChange={(value) => handleSelectChange('agua', value)}
              className="w-full"
              options={[
                { value: 'publica', label: 'rede pública' },
                { value: 'poco', label: 'poço ou nascente' },
                { value: 'outros', label: 'outros' },
              ]}
            />
          </div>

          {/* Energia */}
          <div className="flex flex-col">
            <label className="text-lg">Tipo de Abastecimento de Energia</label>
            <Select
              placeholder="Tipo de Abastecimento de Energia"
              onChange={(value) => handleSelectChange('energia', value)}
              className="w-full"
              options={[
                { value: 'celesc', label: 'celesc' },
                { value: 'cooperativa', label: 'cooperativa' },
                { value: 'irregular', label: 'irregular' },
              ]}
            />
          </div>

          {/* Bens */}
          <div className="flex flex-col">
            <label className="text-lg">Bens Possuídos</label>
            <Input
              name="bens"
              placeholder="Bens Possuídos"
              value={formData.bens}
              onChange={handleInputChange}
              className="border rounded p-2 w-full text-lg"
            />
          </div>

          {/* CRAS */}
          <div className="flex flex-col">
            <label className="text-lg">CRAS</label>
              <Checkbox checked={isCRAS} onChange={toggleCRAS}>Usuário é acompanhado pelo CRAS? {SNcras}</Checkbox>
              <Checkbox checked={isAcesso} onChange={toggleAcesso} className={acessoVisibility}>Usuário tem acesso ao sistema do CRAS? {SNacesso}</Checkbox>
              <div className={'' + CrasLoginVisibility}>
                <div>
                  <label className='text-lg'>Chave</label>
                  <Input placeholder='Chave'></Input>
                </div>
                <div>
                  <label className='text-lg'>Senha</label>
                  <Input.Password placeholder='Senha' iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)} ></Input.Password>
                </div>
              </div>
          </div>

          {/* Acesso */}
          <div className="flex flex-col">
            <label className="text-lg">Acesso a internet</label>
            <Checkbox onChange={toggleNet}>Usuário possui acesso a internet? {SNnet}</Checkbox>
          </div>

          {/* Doenças */}
          <div className="flex flex-col">
            <label className="text-lg">Descrição da Doença</label>
            <TextArea
              name="descDoenca"
              placeholder="Descrição de Doenças"
              value={formData.descDoenca}
              className="border rounded p-2 w-full text-lg"
            />
          </div>

          {/* Medicamentos */}
          <div className="flex flex-col">
            <label className="text-lg">Medicamentos Usados</label>
            <Input
              name="medicamentos"
              placeholder="Medicamentos Usados"
              value={formData.medicamentos}
              onChange={handleInputChange}
              className="border rounded p-2 w-full text-lg"
            />
          </div>

          {/* Gastos com Medicamentos */}
          <div className="flex flex-col">
            <label className="text-lg">Gasto com Medicamentos</label>
            <Input
              name="medicamentosGasto"
              placeholder="Gasto com Medicamentos"
              type="number"
              value={formData.medicamentosGasto}
              onChange={handleInputChange}
              className="border rounded p-2 w-full text-lg"
            />
          </div>

          {/* Tratamento */}
          <div className="flex flex-col">
            <label className="text-lg">Tratamento Médico</label>
            <Checkbox>Quimioterapia</Checkbox>
            <Checkbox>Radioterapia</Checkbox>
            <Checkbox>Acompanhamento paliativo</Checkbox>
          </div>

          {/* Nutrição */}
          <div className="flex flex-col">
            <label className="text-lg">Nutrição</label>
              <Checkbox onChange={toggleNutri}>Usuário tem dieta da nutricionista? {SNnutri}</Checkbox>
          </div>

          {/* Tempo de Tratamento */}
          <div className="flex flex-col">
            <label className="text-lg">Tempo de Tratamento</label>
            <Input
              name="tempoTratamento"
              placeholder="Tempo de Tratamento"
              value={formData.tempoTratamento}
              onChange={handleInputChange}
              className="border rounded p-2 w-full text-lg"
            />
          </div>

          {/* Local de Tratamento */}
          <div className="flex flex-col">
            <label className="text-lg">Local do Tratamento</label>
            <Input
              name="local"
              placeholder="Local do Tratamento"
              value={formData.local}
              onChange={handleInputChange}
              className="border rounded p-2 w-full text-lg"
            />
          </div>

          {/* Encaminhamento */}
          <div className="flex flex-col">
            <label className="text-lg">Encaminhamento</label>
            <Input
              name="encaminhamento"
              placeholder="Encaminhamento"
              onChange={handleInputChange}
              className="border rounded p-2 w-full text-lg"
            />
          </div>


          <Button
            type="primary" htmlType="button"
            onClick={() => setShowModal(true)} 
            className="md:col-span-2 bg-blue-500 text-white p-2 md:p-4 w-full text-lg rounded"
          >
            Adicionar Familiar
          </Button>

          {/* Botão de Envio */}
          <Button type="primary" htmlType="submit" className="md:col-span-2 bg-blue-500 text-white p-2 md:p-4 w-full text-lg rounded">
            Enviar Dados
          </Button>
        </form>
        {showModal && (
          <FamiliarModal
            onClose={() => setShowModal(false)}
            onSave={handleFamiliarSubmit}
          />)}
      </div>
    </div>
  );
};

export default AdicionarDados;
