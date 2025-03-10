import Property from '#models/property'
import logger from '@adonisjs/core/services/logger'
import { PropertyPayload, PropertyUpdatePayload } from '#interfaces/property'

export default class PropertyRepository {
  public async countProperties(): Promise<number> {
    const result = await Property.query().count('* as total')
    return Number(result[0].$extras.total)
  }

  public async sumTotalArea(): Promise<number> {
    const result = await Property.query().sum('total_area as total')
    return Number(result[0].$extras.total)
  }

  public async sumAgriculturalArea(): Promise<number> {
    const result = await Property.query().sum('arable_area as total')
    return Number(result[0].$extras.total)
  }

  public async sumVegetationArea(): Promise<number> {
    const result = await Property.query().sum('vegetation_area as total')
    return Number(result[0].$extras.total)
  }

  public async countByState(): Promise<Record<string, number>> {
    const result = await Property.query().select('state').count('* as total').groupBy('state')
    return result.reduce(
      (acc, row) => {
        acc[row.state] = Number(row.$extras.total) || 0
        return acc
      },
      {} as Record<string, number>
    )
  }

  public async getByProducer(id: string): Promise<Property[] | null> {
    logger.debug(`Buscando fazendas do produtor ${id}`)
    return await Property.findManyBy('producerId', id)
  }

  public async getById(id: string): Promise<Property | null> {
    logger.debug(`Buscando fazenda ${id}`)
    return await Property.find(id)
  }

  public async create(id: string, input: PropertyPayload): Promise<Property> {
    logger.debug(`Criando fazenda do produtor ${id}`)
    return await Property.create({
      producerId: id,
      farmName: input.farmName,
      city: input.city,
      state: input.state,
      totalArea: input.totalArea,
      arableArea: input.arableArea,
      vegetationArea: input.vegetationArea,
    })
  }

  public async updateById(id: string, input: PropertyUpdatePayload): Promise<Property | null> {
    logger.debug(`Atualizando fazenda do produtor ${id}`)
    const property = await Property.findOrFail(id)
    if (!property) return null
    return await property.merge(input).save()
  }

  public async delete(id: string): Promise<Property> {
    logger.debug(`Tendando deletar fazenda ${id}`)
    const result = await Property.findOrFail(id)
    await result.delete()
    return result
  }
}
