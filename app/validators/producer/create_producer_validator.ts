import vine from '@vinejs/vine'
import { validateCpfCnpj } from './validate_cpf_cnpj.js'

export const createProducerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    documentType: vine.enum(['CPF', 'CNPJ']),
    document: vine.string().trim().use(validateCpfCnpj()).minLength(11).maxLength(14),
  })
)
