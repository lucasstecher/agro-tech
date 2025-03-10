import Planting from '#models/planting'
import logger from '@adonisjs/core/services/logger'
import db from '@adonisjs/lucid/services/db'
import { PlantingPayload, PlantingUpdatePayload } from '#interfaces/planting'

export default class PlantingRepository {
  public async countByCrop(): Promise<Record<string, number>> {
    const result = await db
      .from('plantings')
      .select('culture')
      .count('* as total')
      .groupBy('culture')
    return result.reduce(
      (acc, row) => {
        acc[row.culture] = Number(row.total) || 0
        return acc
      },
      {} as Record<string, number>
    )
  }

  public async getByProperty(id: string): Promise<Planting[] | null> {
    logger.debug(`Buscando plantio ${id}`)
    return await Planting.findManyBy('propertyId', id)
  }

  public async getById(id: string): Promise<Planting | null> {
    logger.debug(`Buscando plantios da fazenda ${id}`)
    return await Planting.find(id)
  }

  public async create(id: string, input: PlantingPayload): Promise<Planting> {
    logger.debug(`Criando o plantio da fazenda ${id}`)
    return await Planting.create({
      propertyId: id,
      harvest: input.harvest,
      culture: input.culture,
    })
  }

  public async updateById(id: string, input: PlantingUpdatePayload): Promise<Planting | null> {
    logger.debug(`Atualizando plantio ${id}`)
    const planting = await Planting.findOrFail(id)
    if (!planting) return null
    return await planting.merge(input).save()
  }

  public async delete(id: string): Promise<Planting> {
    logger.debug(`Tentando deletar plantio ${id}`)
    const result = await Planting.findOrFail(id)
    await result.delete()
    return result
  }
}
