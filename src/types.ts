import exp from "constants";

export interface User {
    id: string;
    nome: string;
    cpf: string;
    rg: string;
    data: string;
    endereco?: Endereco;
    telefone: string;
    profissao: string;
    escolaridade: string;
  }

export type Endereco = {
    CEP: string;
    municipio: string;
    bairro: string;
    rua: string;
    numero: number;
    referencia?: string;
}

export interface Responsavel extends User {
    parentesco: string;
}

export interface Usuario extends User {
  patologia: string;
  familiares: Familiar[]
}

export interface Familiar {
  nome: string;
  parentesco: string;
  idade: number;
  profissao: string;
  escolaridade: number;
  salario: number;
}

export interface CRAS {
  cras: boolean;
  acesso: boolean;
  chave: string;
  senha: string;
}

export interface DadosUsuario {
  familiares?: Familiar[];
  fonteRenda: string;
  valorRenda: number;
  moradia: string;
  agua: string;
  energia: string;
  bens: string;
  internet: boolean;
  CRAS?: CRAS;
  acesso: string;
  descDoenca: string;
  medicamentos: string;
  medicamentosGasto: number;
  tratamento: string;
  nutri: string;
  tempoTratamento: string;
  local: string;
  encaminhamento: string;
  ativo: boolean;
  obito: boolean;
}