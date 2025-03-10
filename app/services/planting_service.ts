import PlantingRepository from '#repositories/planting_repository'
import logger from '@adonisjs/core/services/logger'
import { PlantingPayload, PlantingUpdatePayload, Planting } from '#interfaces/planting'
import { inject } from '@adonisjs/core'

@inject()
export class PlantingService {
  constructor(private _plantingRepository: PlantingRepository) {}

  public async getPropertiesByCrop(): Promise<Record<string, number>> {
    logger.info('Calculando número de fazendas por cultura plantada')
    return await this._plantingRepository.countByCrop()
  }
  public async getByProperty(id: string): Promise<Planting[] | null> {
    const planting = await this._plantingRepository.getByProperty(id)
    if (!planting) logger.warn(`Nenhum plantio encontrado para a fazenda ${id}`)
    return planting
  }

  public async getById(id: string): Promise<Planting | null> {
    const planting = await this._plantingRepository.getById(id)
    if (!planting) logger.warn(`Nenhum plantio ${id} encontrado`)
    return planting
  }

  public async create(id: string, input: PlantingPayload): Promise<Planting> {
    try {
      return await this._plantingRepository.create(id, input)
    } catch (error) {
      logger.error(`Erro ao salvar plantio na fazenda ${id}: ${error.message}`)
      throw error
    }
  }

  public async updateById(id: string, input: PlantingUpdatePayload): Promise<Planting | null> {
    try {
      return await this._plantingRepository.updateById(id, input)
    } catch (error) {
      logger.error(`Erro ao atualizar o plantio ${id}`)
      throw error
    }
  }

  public async delete(id: string): Promise<Planting> {
    try {
      return await this._plantingRepository.delete(id)
    } catch (error) {
      logger.error(`Erro ao deletar o plantio ${id}: ${error.message}`)
      throw error
    }
  }
}
