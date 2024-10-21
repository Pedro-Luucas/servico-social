import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DadosUsuario, Familiar } from '../types';
import { Input, Select, Checkbox, Button } from 'antd';

const AdicionarDados: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL

  const [formData, setFormData] = useState<DadosUsuario>({
    familiares: [{ nome: '',escolaridade: '', profissao: '', idade: 0, salario: 0, parentesco: '' }],
    fonteRenda: '',
    valorRenda: NaN,
    moradia: '',
    agua: '',
    energia: '',
    bens: '',
    internet: false,
    CRAS: '',
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

  //const handleAddFamiliar = () => {
  //  setFormData({
  //    ...formData,
  //    familiares: [...formData.familiares, { nome: '', idade: 0, parentesco: '' }],
  //  });
  //};

  const handleFamiliarChange = (index: number, field: keyof Familiar, value: string | number) => {
    const updatedFamiliares = [...formData.familiares];
    updatedFamiliares[index] = { ...updatedFamiliares[index], [field]: value };
    setFormData({ ...formData, familiares: updatedFamiliares });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do Usuário:', formData);
    // Aqui você pode enviar os dados para uma API ou outro processamento.
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center">
        Adicionar Dados para o Usuário {id}
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fonte de Renda */}
        <Input
          name="fonteRenda"
          placeholder="Fonte de Renda"
          value={formData.fonteRenda}
          onChange={handleInputChange}
          className="border rounded p-2 w-full text-lg"
        />
        <Input
          name="valorRenda"
          placeholder="Valor da Renda"
          type="number"
          value={formData.valorRenda}
          onChange={handleInputChange}
          className="border rounded p-2 w-full text-lg"
        />

        {/* Moradia */}
        <Input
          name="moradia"
          placeholder="Tipo de Moradia"
          value={formData.moradia}
          onChange={handleInputChange}
          className="border rounded p-2 w-full text-lg"
        />

        {/* Água */}
        <Select
          placeholder="Tipo de Abastecimento de Água"
          onChange={(value) => handleSelectChange('agua', value)}
          className="w-full"
          options={[
            { value: 'Encanada', label: 'Encanada' },
            { value: 'Poço', label: 'Poço' },
            { value: 'Caminhão pipa', label: 'Caminhão pipa' },
          ]}
        />

        {/* Energia */}
        <Select
          placeholder="Tipo de Abastecimento de Energia"
          onChange={(value) => handleSelectChange('energia', value)}
          className="w-full"
          options={[
            { value: 'Elétrica', label: 'Elétrica' },
            { value: 'Gerador', label: 'Gerador' },
          ]}
        />

        {/* Bens */}
        <Input
          name="bens"
          placeholder="Bens Possuídos"
          value={formData.bens}
          onChange={handleInputChange}
          className="border rounded p-2 w-full text-lg"
        />

        {/* Internet 
        <Checkbox
          checked={formData.internet}
          onChange={handleCheckboxChange}
        >
          Possui Internet?
        </Checkbox>
        */}

        {/* CRAS */}
        <Input
          name="CRAS"
          placeholder="CRAS"
          value={formData.CRAS}
          onChange={handleInputChange}
          className="border rounded p-2 w-full text-lg"
        />

        {/* Acesso */}
        <Input
          name="acesso"
          placeholder="Acesso à Informação"
          value={formData.acesso}
          onChange={handleInputChange}
          className="border rounded p-2 w-full text-lg"
        />

        {/* Doenças */}
        <Input
          name="descDoenca"
          placeholder="Descrição de Doenças"
          value={formData.descDoenca}
          onChange={handleInputChange}
          className="border rounded p-2 w-full text-lg"
        />

        {/* Medicamentos */}
        <Input
          name="medicamentos"
          placeholder="Medicamentos Usados"
          value={formData.medicamentos}
          onChange={handleInputChange}
          className="border rounded p-2 w-full text-lg"
        />

        {/* Gastos com Medicamentos */}
        <Input
          name="medicamentosGasto"
          placeholder="Gasto com Medicamentos"
          type="number"
          value={formData.medicamentosGasto}
          onChange={handleInputChange}
          className="border rounded p-2 w-full text-lg"
        />

        {/* Tratamento */}
        <Input
          name="tratamento"
          placeholder="Tratamento Médico"
          value={formData.tratamento}
          onChange={handleInputChange}
          className="border rounded p-2 w-full text-lg"
        />

        {/* Nutrição */}
        <Input
          name="nutri"
          placeholder="Nutrição"
          value={formData.nutri}
          onChange={handleInputChange}
          className="border rounded p-2 w-full text-lg"
        />

        {/* Tempo de Tratamento */}
        <Input
          name="tempoTratamento"
          placeholder="Tempo de Tratamento"
          value={formData.tempoTratamento}
          onChange={handleInputChange}
          className="border rounded p-2 w-full text-lg"
        />

        {/* Local de Tratamento */}
        <Input
          name="local"
          placeholder="Local do Tratamento"
          value={formData.local}
          onChange={handleInputChange}
          className="border rounded p-2 w-full text-lg"
        />

        {/* Encaminhamento */}
        <Input
          name="encaminhamento"
          placeholder="Encaminhamento"
          value={formData.encaminhamento}
          onChange={handleInputChange}
          className="border rounded p-2 w-full text-lg"
        />

        {/* Familiares 
        <div className="md:col-span-2">
          <h2 className="text-lg font-bold">Familiares</h2>
          {formData.familiares.map((familiar, index) => (
            <div key={index} className="flex gap-4">
              <Input
                placeholder="Nome"
                value={familiar.nome}
                onChange={(e) => handleFamiliarChange(index, 'nome', e.target.value)}
                className="border rounded p-2 w-full text-lg"
              />
              <Input
                placeholder="Idade"
                type="number"
                value={familiar.idade}
                onChange={(e) => handleFamiliarChange(index, 'idade', Number(e.target.value))}
                className="border rounded p-2 w-full text-lg"
              />
              <Input
                placeholder="Parentesco"
                value={familiar.parentesco}
                onChange={(e) => handleFamiliarChange(index, 'parentesco', e.target.value)}
                className="border rounded p-2 w-full text-lg"
              />
            </div>
          ))}
          <Button onClick={handleAddFamiliar} className="mt-2">
            Adicionar Familiar
          </Button>
        </div>*/}

        {/* Botão de Envio */}
        <Button type="primary" htmlType="submit" className="md:col-span-2 height">
          Enviar Dados
        </Button>
      </form>
    </div>
  );
};

export default AdicionarDados;
