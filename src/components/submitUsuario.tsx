import api from '../service/api';

const submitUsuario = async () => {
  try {
    // Recupera o formData do sessionStorage
    const formDataString = sessionStorage.getItem('formData');
    if (!formDataString) {
      throw new Error('No form data found in sessionStorage');
    }

    const formData = JSON.parse(formDataString);

    // Transforma o formData no formato do requestBody
    const requestBody = {
      nome: formData.nome,
      ativo: formData.ativo,
      cpf: formData.cpf,
      rg: formData.rg || null,
      dataNasc: formData.data,
      telefone: formData.telefone,
      profissao: formData.profissao || null,
      escolaridade: formData.escolaridade,
      patologia: formData.patologia,
      cep: formData.endereco.CEP,
      municipio: formData.endereco.municipio,
      bairro: formData.endereco.bairro,
      rua: formData.endereco.rua,
      numero: formData.endereco.numero,
      referencia: formData.endereco.referencia || null,
      respNome: formData.responsavel.nome || null,
      respCpf: formData.responsavel.cpf || null,
      respIdade: formData.responsavel.idade || null,
      respTelefone: formData.responsavel.telefone || null,
      respProfissao: formData.responsavel.profissao || null,
      respEscolaridade: formData.responsavel.escolaridade || null,
      respParentesco: formData.responsavel.parentesco || null,
      fonteRenda: formData.dados.fonteRenda,
      valorRenda: parseFloat(formData.dados.valorRenda) || null,
      moradia: formData.dados.moradia,
      agua: formData.dados.agua,
      energia: formData.dados.energia,
      bens: formData.dados.bens,
      internet: formData.dados.internet,
      cras: formData.dados.CRAS,
      acessoCRAS: formData.dados.acessoCRAS,
      chaveCRAS: formData.dados.chaveCRAS || null,
      senhaCRAS: formData.dados.senhaCRAS || null,
      descDoenca: formData.dados.descDoenca,
      medicamentos: formData.dados.medicamentos,
      medicamentosGasto: parseFloat(formData.dados.medicamentosGasto) || 0,
      tratamento: formData.dados.tratamento,
      nutri: formData.dados.nutri,
      tempoTratamento: formData.dados.tempoTratamento,
      local: formData.dados.local,
      encaminhamento: formData.dados.encaminhamento,
    };

    // Faz a requisição POST para o endpoint "usuarios"
    const response = await api.post('usuarios', requestBody);
    console.log('foi: ', response)
    return response.data;
  } catch (error) {
    console.error('Full Error:', error);
    throw error;
  }
};

export { submitUsuario };