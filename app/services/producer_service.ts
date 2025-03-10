import ProducersRepository from '#repositories/producer_repository'
import logger from '@adonisjs/core/services/logger'
import { Producer, ProducerPayload, ProducerUpdatePayload } from '#interfaces/producer'
import { inject } from '@adonisjs/core'

@inject()
export class ProducerService {
  constructor(private _producerRepository: ProducersRepository) {}

  public async findAll(): Promise<Producer[] | null> {
    const producers = await this._producerRepository.findAll()
    if (!producers) logger.warn(`Nenhum produtor encontrado`)
    return producers
  }

  public async getById(id: string): Promise<Producer | null> {
    const producer = await this._producerRepository.getById(id)
    if (!producer) logger.warn(`Nenhum produtor ${id} encontrado`)
    return producer
  }

  public async create(input: ProducerPayload): Promise<Producer> {
    try {
      return await this._producerRepository.create(input)
    } catch (error) {
      logger.error(`Erro ao salvar produtor`)
      throw error
    }
  }

  public async updateById(id: string, input: ProducerUpdatePayload): Promise<Producer | null> {
    try {
      return await this._producerRepository.updateById(id, input)
    } catch (error) {
      logger.error(`Erro ao atualizar produtor ${id}`)
      throw error
    }
  }

  public async delete(id: string): Promise<Producer> {
    try {
      return await this._producerRepository.delete(id)
    } catch (error) {
      logger.error(`Erro ao deletar produtor ${id}`)
      throw error
    }
  }
}
