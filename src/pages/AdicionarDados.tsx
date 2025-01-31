import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DadosUsuario } from '../types';
import { Input, Select, Checkbox, Button, List, Card, Modal } from 'antd';
import { LeftOutlined, CloseOutlined } from '@ant-design/icons';
import { useCheckbox } from '../components/useCheckbox';
// @ts-ignore
import { submitUsuario } from "../components/submitUsuario";
// @ts-ignore
import { editUsuario } from '../components/editUsuario';

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
  setShowModalSubmit(true);
};

const closeModalSubmit = () => {
  setShowModalSubmit(false);
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const isEditing = sessionStorage.getItem("edit") === "true";
    
    if (isEditing) {
      setShowModalSubmit(false);
      const result = await editUsuario();
      navigate('/pesquisa')
    } else {
      setShowModalSubmit(false);
      const result = await submitUsuario();
      navigate('/')
    }
    
  } catch (error) {
    console.error("Error submitting/editing user:", error);
    // You might want to show an error message to the user here
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

          {/* Botão de Envio */}
          <Button type="default" htmlType="submit" className="md:col-span-2 bg-blue-600 text-white p-3 md:p-6 w-full text-lg rounded mt-5"
          disabled={!isFormComplete} onClick={openModalSubmit}>
            Enviar Dados
          </Button>
        </form>
     

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
              title={sessionStorage.getItem("edit") === "true" ? "Editar dados" : "Enviar dados"}
              open={showModalSubmit}
              onOk={handleSubmit}
              onCancel={closeModalSubmit}
              okText="Confirmar"
              cancelText="Cancelar"
            >
              <p>Tem certeza de que deseja {sessionStorage.getItem("edit") === "true" ? "editar" : "enviar"} os dados?</p>
            </Modal>
      
      </div>
    </div>
  );
};

export default AdicionarDados;
