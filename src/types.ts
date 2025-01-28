

export interface User {
    id?: string;
    nome: string;
    cpf: string;
    rg: string;
    data?: string;
    endereco?: Endereco;
    telefone: string;
    profissao: string;
    escolaridade: number;
    patologia: string;
    dados?: DadosUsuario;
    responsavel: Responsavel;
    ativo: number;
  }

  export interface Responsavel {
    nome: string;
    cpf: string;
    idade: number;
    telefone: string;
    profissao?: string;
    escolaridade?: number;
    parentesco: string;
  }

export type Endereco = {
    CEP: string;
    municipio: string;
    bairro: string;
    rua: string;
    numero: number;
    referencia?: string;
}

export interface Familiar {
  nome: string;
  parentesco: string;
  idade: number;
  profissao: string;
  escolaridade: number;
  salario: number;
}
export const escolaridades = ['Ensino Fundamental incompleto','Ensino Fundamental completo','Ensino Medio incompleto','Ensino Medio completo','Ensino Superior incompleto','Ensino Superior completo']



export interface DadosUsuario {
  familiares?: Familiar[];
  fonteRenda: string;
  valorRenda: number;
  moradia: string;
  agua: string;
  energia: string;
  bens: string;
  internet: boolean;
  CRAS: boolean;
  acessoCRAS?: boolean;
  chaveCRAS?: string;
  senhaCRAS?: string;
  descDoenca: string;
  medicamentos: string;
  medicamentosGasto: number;
  tratamento: string;
  nutri: boolean;
  tempoTratamento: string;
  local: string;
  encaminhamento: string;
}

export interface UsuarioDTO {
  id?: string;
  nome: string;
  ativo: number;
  cpf: string;
  rg: string;
  dataNasc: string;
  telefone: string;
  profissao: string;
  escolaridade: number;
  patologia: string;
  CEP: string;
  municipio: string;
  bairro: string;
  rua: string;
  numero: string;
  referencia?: string;
  respNome: string;
  respCpf: string;
  respIdade: number;
  respTelefone: string;
  respProfissao?: string;
  respEscolaridade?: number;
  respParentesco: string;
  fonteRenda: string;
  valorRenda: number;
  moradia: string;
  agua: string;
  energia: string;
  bens: string;
  internet: boolean;
  CRAS: boolean;
  acessoCRAS?: boolean;
  chaveCRAS?: string;
  senhaCRAS?: string;
  descDoenca: string;
  medicamentos: string;
  medicamentosGasto: number;
  tratamento: string;
  nutri: boolean;
  tempoTratamento: string;
  local: string;
  encaminhamento: string;
}