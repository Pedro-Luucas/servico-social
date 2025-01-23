import React from 'react';
import api from '../service/api';

export const submitUsuario = async () => {
  try {
    const formDataString = sessionStorage.getItem('formData');
    if (!formDataString) {
      throw new Error('No form data found in sessionStorage');
    }

    const formData = JSON.parse(formDataString);

    const requestBody = {
      nome: formData.nome,
      ativo: formData.ativo,
      cpf: formData.cpf ,
      rg: formData.rg || formData.cpf,
      dataNasc: formData.dataNasc,
      telefone: formData.telefone,
      profissao: formData.profissao || '',
      escolaridade: formData.escolaridade,
      patologia: formData.patologia ,

      CEP: formData.endereco.CEP || '', 
      municipio: formData.endereco.municipio || '', 
      bairro: formData.endereco.bairro || '', 
      rua: formData.endereco.rua || '', 
      numero: formData.numero || '', 
      referencia: formData.endereco.referencia || '', 
      
      // Responsavel
      respNome: formData.responsavel?.nome || '',
      respCpf: formData.responsavel?.cpf || '',
      respIdade: formData.responsavel?.idade || 0,
      respTelefone: formData.responsavel?.telefone || '',
      respProfissao: formData.responsavel?.profissao || '',
      respEscolaridade: formData.responsavel?.escolaridade || '',
      respParentesco: formData.responsavel?.parentesco || '',
      
      
      
      // Convert some fields to appropriate types
      valorRenda: parseFloat(formData.dados.valorRenda) || 0.0,
      medicamentosGasto: parseFloat(formData.dados.medicamentosGasto) || 0.0,
      
      // Rename some keys to match the expected format
      acessoCRAS: formData.dados.acessoCRAS || '',
      chaveCRAS: formData.dados.chaveCRAS || '',
      senhaCRAS: formData.dados.senhaCRAS || '',
      descDoenca: formData.dados.descDoenca || '',
      encaminhamento: formData.dados.encaminhamento || '',
      local: formData.dados.local || '',
      tratamento: formData.dados.tratamento || '',
      tempoTratamento: formData.dados.tempoTratamento || ''
    };

    const response = await api.post('usuarios', requestBody);
    return response.data;
  } catch (error) {
    console.error('Full Error:', error);
    throw error;
  }
};