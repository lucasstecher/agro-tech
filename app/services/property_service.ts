import PropertiesRepository from '#repositories/property_repository'
import logger from '@adonisjs/core/services/logger'
import { Property, PropertyPayload, PropertyUpdatePayload } from '#interfaces/property'
import { inject } from '@adonisjs/core'

@inject()
export class PropertyService {
  constructor(private _propertyRepository: PropertiesRepository) {}

  private checkTotalArea(arableArea: number, vegetationArea: number, totalArea: number) {
    if (arableArea + vegetationArea > totalArea) {
      logger.warn(
        `Área inválida! Plantio: ${arableArea}, Vegetação: ${vegetationArea}, Total: ${totalArea}`
      )
      throw new Error('A soma da área de plantio e vegetação não devem ultrapassar a área total.')
    }
  }

  public async getTotalStats(): Promise<{ totalProperties: number; totalHectares: number }> {
    logger.info('Calculando estatísticas gerais das propriedades')
    const totalProperties = await this._propertyRepository.countProperties()
    const totalHectares = await this._propertyRepository.sumTotalArea()
    return { totalProperties, totalHectares }
  }

  public async getLandUseStats(): Promise<{
    agriculturalPercentage: number
    vegetationPercentage: number
  }> {
    logger.info('Calculando uso do solo')
    const totalArea = await this._propertyRepository.sumTotalArea()
    const agriculturalArea = await this._propertyRepository.sumAgriculturalArea()
    const vegetationArea = await this._propertyRepository.sumVegetationArea()
    if (totalArea === 0) {
      return { agriculturalPercentage: 0, vegetationPercentage: 0 }
    }
    return {
      agriculturalPercentage: Number.parseFloat(((agriculturalArea / totalArea) * 100).toFixed(2)),
      vegetationPercentage: Number.parseFloat(((vegetationArea / totalArea) * 100).toFixed(2)),
    }
  }

  public async getPropertiesByState() {
    logger.info('Calculando número de fazendas por estado')
    return await this._propertyRepository.countByState()
  }

  public async getByProducer(id: string): Promise<Property[] | null> {
    const property = await this._propertyRepository.getByProducer(id)
    if (!property) logger.warn(`Nenhuma fazenda do produtor ${id} encontrada`)
    return property
  }

  public async getById(id: string): Promise<Property | null> {
    const property = await this._propertyRepository.getById(id)
    if (!property) logger.warn(`Nenhuma fazenda ${id} encontrada`)
    return property
  }

  public async create(id: string, input: PropertyPayload) {
    try {
      this.checkTotalArea(input.arableArea, input.vegetationArea, input.totalArea)
      return await this._propertyRepository.create(id, input)
    } catch (error) {
      logger.error(`Erro ao salvar fazenda do produtor ${id}: ${error.message}`)
      throw error
    }
  }

  public async updateById(id: string, input: PropertyUpdatePayload): Promise<Property | null> {
    try {
      const existingProperty = await this._propertyRepository.getById(id)
      if (!existingProperty) return null
      const arableArea = input.arableArea ?? existingProperty.arableArea
      const vegetationArea = input.vegetationArea ?? existingProperty.vegetationArea
      const totalArea = input.totalArea ?? existingProperty.totalArea
      if (arableArea && vegetationArea && totalArea) {
        this.checkTotalArea(arableArea, vegetationArea, totalArea)
      }
      return await this._propertyRepository.updateById(id, input)
    } catch (error) {
      logger.error(`Erro ao atualizar fazenda do produtor ${id}: ${error.message}`)
      throw error
    }
  }

  public async delete(id: string): Promise<Property> {
    try {
      return await this._propertyRepository.delete(id)
    } catch (error) {
      logger.error(`Erro ao deletar fazenda ${id}`)
      throw error
    }
  }
}
