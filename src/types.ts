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
  escolaridade: string;
  salario: number;
}