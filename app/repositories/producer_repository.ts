import Producer from '#models/producer'
import logger from '@adonisjs/core/services/logger'
import { ProducerPayload, ProducerUpdatePayload } from '#interfaces/producer'

export default class ProducersRepository {
  public async findAll(): Promise<Producer[]> {
    logger.debug(`Buscando todos os produtores}`)
    return await Producer.all()
  }

  public async getById(id: string): Promise<Producer | null> {
    logger.debug(`Buscando o produtor ${id}`)
    return await Producer.find(id)
  }

  public async create(input: ProducerPayload): Promise<Producer> {
    logger.debug(`Criando novo produtor`)
    return await Producer.create({
      documentType: input.documentType,
      document: input.document,
      name: input.name,
    })
  }

  public async updateById(id: string, input: ProducerUpdatePayload): Promise<Producer | null> {
    logger.debug(`Atualizando o produtor ${id}`)
    const producer = await Producer.findOrFail(id)
    if (!producer) return null
    return await producer.merge(input).save()
  }

  public async delete(id: string): Promise<Producer> {
    logger.debug(`Tentando deletar o produtor ${id}`)
    const result = await Producer.findOrFail(id)
    await result.delete()
    return result
  }
}
