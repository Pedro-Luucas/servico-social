import { v4 as uuidv4 } from 'uuid';
import { User, UsuarioDTO } from '../types'
// DTO equivalente ao backend


export function transformFrontToDTO(frontUser: User): UsuarioDTO {
  return {
    nome: frontUser.nome,
    ativo: frontUser.ativo,
    cpf: frontUser.cpf,
    rg: frontUser.rg,
    dataNasc: frontUser.data || '',
    telefone: frontUser.telefone,
    profissao: frontUser.profissao,
    escolaridade: frontUser.escolaridade,
    patologia: frontUser.patologia,
    CEP: frontUser.endereco?.CEP || '',
    municipio: frontUser.endereco?.municipio || '',
    bairro: frontUser.endereco?.bairro || '',
    rua: frontUser.endereco?.rua || '',
    numero: frontUser.endereco?.numero.toString() || '',
    referencia: frontUser.endereco?.referencia || '',
    respNome: frontUser.responsavel.nome,
    respCpf: frontUser.responsavel.cpf,
    respIdade: frontUser.responsavel.idade,
    respTelefone: frontUser.responsavel.telefone,
    respProfissao: frontUser.responsavel.profissao || '',
    respEscolaridade: frontUser.responsavel.escolaridade || undefined,
    respParentesco: frontUser.responsavel.parentesco,
    fonteRenda: frontUser.dados?.fonteRenda || '',
    valorRenda: frontUser.dados?.valorRenda || 0,
    moradia: frontUser.dados?.moradia || '',
    agua: frontUser.dados?.agua || '',
    energia: frontUser.dados?.energia || '',
    bens: frontUser.dados?.bens || '',
    internet: frontUser.dados?.internet || false,
    CRAS: frontUser.dados?.CRAS || false,
    acessoCRAS: frontUser.dados?.acessoCRAS || false,
    chaveCRAS: frontUser.dados?.chaveCRAS || '',
    senhaCRAS: frontUser.dados?.senhaCRAS || '',
    descDoenca: frontUser.dados?.descDoenca || '',
    medicamentos: frontUser.dados?.medicamentos || '',
    medicamentosGasto: frontUser.dados?.medicamentosGasto || 0,
    tratamento: frontUser.dados?.tratamento || '',
    nutri: frontUser.dados?.nutri || false,
    tempoTratamento: frontUser.dados?.tempoTratamento || '',
    local: frontUser.dados?.local || '',
    encaminhamento: frontUser.dados?.encaminhamento || '',
  };
}

export function transformDTOToFront(dto: UsuarioDTO): User {
  return {
    id: dto.id,
    nome: dto.nome,
    ativo: dto.ativo,
    cpf: dto.cpf,
    rg: dto.rg,
    data: dto.dataNasc,
    telefone: dto.telefone,
    profissao: dto.profissao,
    escolaridade: dto.escolaridade,
    patologia: dto.patologia,
    endereco: {
      CEP: dto.CEP,
      municipio: dto.municipio,
      bairro: dto.bairro,
      rua: dto.rua,
      numero: parseInt(dto.numero, 10), // Converte número de string para inteiro
      referencia: dto.referencia || '',
    },
    responsavel: {
      nome: dto.respNome,
      cpf: dto.respCpf,
      idade: dto.respIdade,
      telefone: dto.respTelefone,
      profissao: dto.respProfissao || '',
      escolaridade: dto.respEscolaridade || undefined,
      parentesco: dto.respParentesco,
    },
    dados: {
      fonteRenda: dto.fonteRenda,
      valorRenda: dto.valorRenda,
      moradia: dto.moradia,
      agua: dto.agua,
      energia: dto.energia,
      bens: dto.bens,
      internet: dto.internet,
      CRAS: dto.CRAS,
      acessoCRAS: dto.acessoCRAS || false,
      chaveCRAS: dto.chaveCRAS || '',
      senhaCRAS: dto.senhaCRAS || '',
      descDoenca: dto.descDoenca,
      medicamentos: dto.medicamentos,
      medicamentosGasto: dto.medicamentosGasto,
      tratamento: dto.tratamento,
      nutri: dto.nutri,
      tempoTratamento: dto.tempoTratamento,
      local: dto.local,
      encaminhamento: dto.encaminhamento,
      familiares: [], // Assumimos como vazio para compatibilidade
    },
  };
}
