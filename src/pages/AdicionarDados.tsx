import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DadosUsuario, Familiar, escolaridades } from '../types';
import type { CheckboxProps } from 'antd';
import { Input, Select, Checkbox, Button, List, Card, Modal } from 'antd';
import { LeftOutlined, EyeInvisibleOutlined, EyeOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import FamiliarModal from '../components/FamiliarModal';
import { useCheckbox } from '../components/useCheckbox';
// @ts-ignore
import { submitUsuario } from "../components/submitUsuario";

const { TextArea } = Input;

const AdicionarDados: React.FC = () => {
  

  const [dados, setDados] = useState<DadosUsuario>({
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
  });

  const [isFormComplete, setIsFormComplete] = useState(false);
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false); // Estado para controlar a montagem

  // Carrega formData do sessionStorage na montagem
  useEffect(() => {
    const storedFormData = sessionStorage.getItem('formData');
    if (storedFormData) {
      const formData = JSON.parse(storedFormData);
      setDados(formData.dados);
      console.log('Dados carregados:', formData);
      console.log('Dados carregados DADOS:', formData.dados);
    }
    setIsMounted(true); // Define como montado após carregar os dados
  }, []);

  // Salva formData no sessionStorage sempre que formData mudar, mas só depois da montagem
  useEffect(() => {
    if (isMounted) { // Só executa se o componente já foi montado
      const storedFormData = sessionStorage.getItem('formData') || '{}';
      const formData = JSON.parse(storedFormData);
      formData.dados = dados;
      sessionStorage.setItem('formData', JSON.stringify(formData));
      console.log('Salvando dados:', formData);
    }
  }, [dados, isMounted]);

  // Verifica se o formulário está completo toda vez que formData mudar
  useEffect(() => {
    const isComplete =
      dados.fonteRenda.trim() !== '' &&
      !isNaN(dados.valorRenda) &&
      dados.moradia.trim() !== '' &&
      dados.agua.trim() !== '' &&
      dados.energia.trim() !== '' &&
      dados.bens.trim() !== '' &&
      dados.descDoenca.trim() !== '' &&
      dados.medicamentos.trim() !== '' &&
      !isNaN(dados.medicamentosGasto) &&
      dados.local.trim() !== '';

    setIsFormComplete(isComplete);
  }, [dados]);


//Familiares
  

  const [showModalFamiliar, setShowModal] = useState(false);
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
  


//------------------------------------CHECKBOXES------------------------------------

  const { checked: isCRAS, toggle: toggleCRAS, setChecked: setIsCRAS } = useCheckbox({
    initialState: dados.CRAS,
    onChange: (newValue) => {
      setDados(prev => ({
        ...prev,
        CRAS: newValue
      }));
    }
  });
  const { checked: isAcessoCRAS, toggle: toggleAcessoCRAS, setChecked: setIsAcessoCRAS } = useCheckbox({
    initialState: dados.acessoCRAS,
    onChange: (newValue) => {
      setDados(prev => ({
        ...prev,
        acessoCRAS: newValue
      }));
    }
  });
  const { checked: isNet, toggle: toggleNet, setChecked: setIsNet } = useCheckbox({
    initialState: dados.internet,
    onChange: (newValue) => {
      setDados(prev => ({
        ...prev,
        internet: newValue
      }));
    }
  });
  const { checked: isNutri, toggle: toggleNutri, setChecked: setIsNutri } = useCheckbox({
    initialState: dados.nutri,
    onChange: (newValue) => {
      setDados(prev => ({
        ...prev,
        nutri: newValue
      }));
    }
  });

//TRATAMENTO
  const tratamentos = [
    'quimioterapia', 
    'radioterapia', 
    'acompanhamento paliativo'
  ];
  
  const tratamentoCheckboxes = tratamentos.map(tratamento => 
    useCheckbox({
      onChange: (checked) => {
        handleTratamentoChange(tratamento, checked);
      }
    })
  );

  var acessoVisibility = isCRAS ? '' : 'hidden'
  var CrasLoginVisibility = (isAcessoCRAS && isCRAS) ? '' : 'hidden'

  var SNnet = isNet ? 'Sim' : 'Não'
  var SNnutri = isNutri  ? 'Sim' : 'Não'
  var SNcras = isCRAS ? 'Sim' : 'Não'
  var SNacessoCRAS = isAcessoCRAS ? 'Sim' : 'Não'



  const handleTratamentoChange = (tratamento: string, checked: boolean) => {
    setDados((prevState) => {
      const tratamentosAtuais = prevState.tratamento 
        ? prevState.tratamento.split(', ').filter(t => t.trim() !== '')
        : [];

      const novosTratamentos = checked
        ? [...tratamentosAtuais, tratamento]
        : tratamentosAtuais.filter((t) => t !== tratamento);

      return { 
        ...prevState, 
        tratamento: novosTratamentos.length > 0 
          ? novosTratamentos.join(', ') 
          : '' 
      };
    });
  };

//useEffect para checar as chekboxers
  useEffect(() => {
    // CRAS
    setIsCRAS(dados.CRAS || false);
    
    // Access CRAS
    setIsAcessoCRAS(dados.acessoCRAS || false);
    
    // Internet
    setIsNet(dados.internet || false);
    
    // Nutrição
    setIsNutri(dados.nutri || false);
    
    // Treatments
    tratamentoCheckboxes.forEach((checkbox, index) => {
      const isChecked = dados.tratamento?.split(', ').includes(tratamentos[index]);
      checkbox.setChecked(isChecked);
    });
  }, [dados]);



//HANDLE AS COISA
  //modal de aviso
  const [showModalExit, setShowModalExit] = useState(false);
  const backHome = () => {
    setShowModalExit(false)
    navigate("/")
  }

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
//SUBMIT---------------------

  const [showModalSubmit, setShowModalSubmit] = useState(false);

  const openModalSubmit = () => {
    setShowModalSubmit(true)
  }
  const closeModalSubmit = () => {
    setShowModalSubmit(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await submitUsuario();
      setShowModalSubmit(false)
      //EDITAR USUARIOOOO
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center">
        Adicionar Dados para o Usuário
      </h1>
      <div className="max-w-3xl mx-auto mb-10 bg-white p-6 rounded-lg shadow-md ">
        <div className="flex flex-row justify-between mx-8">
          <Button type='text' icon={<LeftOutlined />} onClick={handleVoltar} />
          <Button icon={<CloseOutlined />} onClick={() => {setShowModalExit(true)}} className='self-start' />
        </div>
        

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Fonte de Renda */}
          <div className="flex flex-col">
            <label className="text-lg">Fonte de renda familiar</label>
            <Select
              placeholder="Fonte de Renda"
              value={dados.fonteRenda || undefined} 
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
              onChange={(value) => handleSelectChange('moradia', value)}
              className="w-full"
              value={dados.moradia || undefined} 
              options={[
                { value: 'propria', label: 'Casa própria' },
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
              value={dados.agua || undefined} 
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
              value={dados.energia || undefined} 
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
              <Checkbox checked={isAcessoCRAS} onChange={toggleAcessoCRAS} className={acessoVisibility}>Usuário tem acesso ao sistema do CRAS? {SNacessoCRAS}</Checkbox>
              <div className={'' + CrasLoginVisibility}>
                <div>
                  <label className='text-lg'>Chave</label>
                  <Input name="chaveCRAS"
                    placeholder="Chave"
                    value={dados.chaveCRAS}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className='text-lg'>Senha</label>
                  <Input name="senhaCRAS"
                      placeholder="Senha"
                      value={dados.senhaCRAS}
                      onChange={handleInputChange}
                    />
                </div>
              </div>
          </div>

          {/* Acesso */}
          <div className="flex flex-col">
            <label className="text-lg">Acesso a internet</label>
            <Checkbox checked={isNet} onChange={toggleNet}>Usuário possui acesso a internet? {SNnet}</Checkbox>
          </div>

          {/* Doenças */}
          <div className="flex flex-col">
            <label className="text-lg">Descrição da Doença</label>
            <Input
              name="descDoenca"
              placeholder="Descrição da Doença"
              value={dados.descDoenca}
              onChange={handleInputChange}
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
            {tratamentos.map((tratamento, index) => (
              <Checkbox
                key={tratamento}
                checked={tratamentoCheckboxes[index].checked}
                onChange={tratamentoCheckboxes[index].toggle}
              >
                {tratamento.charAt(0).toUpperCase() + tratamento.slice(1)}
              </Checkbox>
            ))}
          </div>

          {/* Nutrição */}
          <div className="flex flex-col">
            <label className="text-lg">Nutrição</label>
              <Checkbox checked={isNutri} onChange={toggleNutri}>Usuário tem dieta da nutricionista? {SNnutri}</Checkbox>
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
              value={dados.encaminhamento}
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
          <Button type="default" htmlType="submit" className="md:col-span-2 bg-blue-600 text-white p-2 md:p-4 w-full text-lg rounded"
          disabled={!isFormComplete} onClick={openModalSubmit}>
            Enviar Dados
          </Button>
        </form>
        {showModalFamiliar && (
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

            <Modal
                  title="Voltar à pagina inicial?"
                  open={showModalExit}
                  onOk={backHome}
                  onCancel={() => {setShowModalExit(false)}}
                  okText="Ok"
                  cancelText="Cancelar"
                >
                  <h1>As alterações não serão salvas! </h1>
            </Modal>

            <Modal
              title="Confirmar Envio"
              open={showModalSubmit}
              onOk={()=>{handleSubmit}}
              onCancel={closeModalSubmit}
              okText="Confirmar"
              cancelText="Cancelar"
            >
              <p>Tem certeza de que deseja enviar os dados?</p>
            </Modal>
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
