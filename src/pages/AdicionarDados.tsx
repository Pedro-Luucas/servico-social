import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DadosUsuario, Familiar, CRAS, escolaridades } from '../types';
import type { CheckboxProps } from 'antd';
import { Input, Select, Checkbox, Button, List, Card, Modal } from 'antd';
import { LeftOutlined, EyeInvisibleOutlined, EyeOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import FamiliarModal from '../components/FamiliarModal';

const { TextArea } = Input;

const AdicionarDados: React.FC = () => {
  
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL

  const [dados, setDados] = useState<DadosUsuario>({
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
    encaminhamento: ''
  });

  const navigate = useNavigate();


//Familiares
  

  const [showModal, setShowModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const [familiarToEdit, setFamiliarToEdit] = useState<Familiar | null>(null);
  const [familiarToDelete, setFamiliarToDelete] = useState<Familiar | null>(null);
  
 //ADICIONAR FAMILIAR
  const handleFamiliarSubmit = (familiarData: Familiar) => {
    setDados((prevState) => {
      const familiares = prevState.familiares || [];

      // Verifica se está editando um familiar
      if (familiarToEdit) {
        // Atualiza o familiar editado
        const updatedFamiliares = familiares.map((f) =>
          f.nome === familiarToEdit.nome ? familiarData : f
        );
        return { ...prevState, familiares: updatedFamiliares };
      } else {
        // Adiciona um novo familiar
        return { ...prevState, familiares: [...familiares, familiarData] };
      }
    });

    setShowModal(false); // Fecha o modal após salvar
    setFamiliarToEdit(null); // Limpa o familiar a ser editado
  };


 // EDITAR FAMILIAR
  const handleEditFamiliar = (familiarData: Familiar) => {
    setFamiliarToEdit(familiarData); // Define o familiar a ser editado
    setShowModal(true); // Abre o modal para edição
  };

 // DELETAR FAMILIAR
  const handleDeleteFamiliar = (fToDelete: Familiar) => {
    setFamiliarToDelete(fToDelete)
    setShowModalConfirm(true)
  }

  const deleteFamiliar = () => {
    // Filtra os familiares pra deletar o familiarToDelete com essa gambiarra de operador ternario pq o TS nao para de apitar
    const updatedFamiliares = dados.familiares ? dados.familiares.filter(f => f !== familiarToDelete) : dados.familiares;
    
    // Atualiza o estado com a nova lista de familiares
    setDados({
      ...dados,
      familiares: updatedFamiliares,
    });
    closeModalConfirm()
  };

  const closeModalConfirm = () => {
    setShowModalConfirm(false)
  }
  


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




//HANDLE AS COISA
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setDados({ ...dados, [name]: value });
  };

  const handleVoltar = () => {
    navigate('/cadastro-usuario')
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do Usuário:', dados);
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
              value={dados.valorRenda}
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
              value={dados.bens}
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
              placeholder="Descrição da Doença"
              value={dados.descDoenca}
              className="border rounded p-2 w-full text-lg"
            />
          </div>

          {/* Medicamentos */}
          <div className="flex flex-col">
            <label className="text-lg">Medicamentos Usados</label>
            <Input
              name="medicamentos"
              placeholder="Medicamentos Usados"
              value={dados.medicamentos}
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
              value={dados.medicamentosGasto}
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
              value={dados.tempoTratamento}
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
              value={dados.local}
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
            color="default" variant="filled"
            onClick={() => setShowModal(true)} 
            className="md:col-span-2 bg-blue-500 mt-3 p-2 md:p-4 w-full text-lg rounded"
          >
            Adicionar Familiar
          </Button>

          <div className='md:col-span-2'>
            <h1 className='text-2xl md:text-2xl font-bold mb-2 md:mb-4 text-center'>Familiares</h1>
              <List
                grid={{
                  gutter: 14,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                }}
                dataSource={dados.familiares}
                renderItem={(f) => (
                  <List.Item>
                    <Card title={f.nome} extra={
                        <div>
                          <Button type='text' icon={<EditOutlined />} onClick={() => {handleEditFamiliar(f)}} className='ml-1' />
                          <Button type='text' icon={<CloseOutlined />} onClick={() => {handleDeleteFamiliar(f)}} />
                          </div>}>
                      <p>{f.parentesco}</p>
                      <p>{f.idade} anos</p>
                      <p>{escolaridades[f.escolaridade]}</p>
                      <p>{f.profissao}</p>
                      <p>{f.salario}</p>
                    </Card>
                  </List.Item>
                )}
              />
          </div>

          {/* Botão de Envio */}
          <Button type="default" htmlType="submit" className="md:col-span-2 bg-blue-600 text-white p-2 md:p-4 w-full text-lg rounded">
            Enviar Dados
          </Button>
        </form>
        {showModal && (
          <FamiliarModal
            initialData={familiarToEdit}
            onClose={() => setShowModal(false)}
            onSave={handleFamiliarSubmit}
          />)}
                <Modal
                  open={showModalConfirm}
                  title={"Deseja deletar o familiar?"}
                  onOk={deleteFamiliar}
                  onCancel={closeModalConfirm}
                  footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                      <CancelBtn />
                      <OkBtn />
                    </>
                  )}
                  />
        {/*showModalEdit && (
          <FamiliarModal
            
            onClose={() => setShowModalEdit(false)}
            onSave={handleFamiliarSubmit}
          />)*/}
      
      </div>
    </div>
  );
};

export default AdicionarDados;
