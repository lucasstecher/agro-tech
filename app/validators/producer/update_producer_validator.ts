import vine from '@vinejs/vine'
import { validateCpfCnpj } from './validate_cpf_cnpj.js'

export const updateProducerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).optional(),
    documentType: vine.enum(['CPF', 'CNPJ']).optional(),
    document: vine.string().trim().use(validateCpfCnpj()).minLength(11).maxLength(14).optional(),
  })
)
