import api from "./api";

export const pesquisar = async (tipo: string, query: string) => {
  const endpoints: { [key: string]: string } = {
    nome: 'usuarios/pesquisarNome',
    telefone: 'usuarios/pesquisarTelefone',
    cpf: 'usuarios/pesquisarCpf',
    cep: 'usuarios/pesquisarCep',
    id: 'usuarios/pesquisarId'
  };

  const endpoint = endpoints[tipo];
  if (!endpoint) {
    throw new Error(`Tipo de pesquisa inválido: ${tipo}`);
  }

  try {
    const response = await api.get(`${endpoint}?${tipo}=${query}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      throw new Error('Nenhum resultado encontrado para a pesquisa.');
    }
    console.error('Erro na pesquisa:', error);
    throw error;
  }
};