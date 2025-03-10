import { isValid as isValidCPF } from '@fnando/cpf'
import { isValid as isValidCNPJ } from '@fnando/cnpj'
import vine from '@vinejs/vine'

export const validateCpfCnpj = vine.createRule((value) => {
  const cleanDocument = String(value).replace(/\D/g, '')
  if (cleanDocument.length === 11 && isValidCPF(cleanDocument)) {
    return value
  }
  if (cleanDocument.length === 14 && isValidCNPJ(cleanDocument)) {
    return value
  }
  throw new Error("CPF ou CNPJ inválido.")
})
