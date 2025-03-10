import type { HttpContext } from '@adonisjs/core/http'
import { PropertyService } from '#services/property_service'
import { createPropertyValidator } from '#validators/property/create_property_validator'
import { updatePropertyValidator } from '#validators/property/update_property_validator'
import { idValidator } from '#validators/id_validator'
import logger from '@adonisjs/core/services/logger'
import { inject } from '@adonisjs/core'

@inject()
export default class PropertiesController {
  constructor(private _propertyService: PropertyService) {}

  /**
   * @getTotalStats
   * @operationId getTotalStats
   * @summary Métricas de fazendas e hectares
   * @description Retorna total de fazendas e total de hectares cadastrados
   */
  async getTotalStats({ response }: HttpContext): Promise<void> {
    const stats = await this._propertyService.getTotalStats()
    logger.info('Foram encontradas métricas de fazendas e hectares')
    return response.ok(stats)
  }

  /**
   * @getLandUseStats
   * @operationId getLandUseStats
   * @summary Métricas de culturas
   * @description Retorna total de fazendas e total de hectares cadastrados
   */
  async getLandUseStats({ response }: HttpContext): Promise<void> {
    const stats = await this._propertyService.getLandUseStats()
    logger.info('Foram encontradas métricas de uso de solo')
    return response.ok(stats)
  }

  /**
   * @getPropertiesByState
   * @operationId getPropertiesByState
   * @summary Métricas fazenda por estado
   * @description Retorna quantidade de fazendas por estado
   */
  async getPropertiesByState({ response }: HttpContext): Promise<void> {
    const stats = await this._propertyService.getPropertiesByState()
    logger.info('Foram encontradas métricas de distribuição de fazendas por estado')
    return response.ok(stats)
  }

  /**
   * @indexByProducer
   * @operationId getPropertyByProducer
   * @summary Retorna fazenda(s) do produtor
   * @paramPath id - ID do produtor - @type(string) @required
   * @description Lista uma ou mais fazendas do produtor
   * @responseBody 200 - <Property[]>
   * @responseBody 404 - Nenhuma fazenda encontrada
   */
  async indexByProducer({ params, response }: HttpContext): Promise<void> {
    const id = await idValidator.validate(params.id)
    const property = await this._propertyService.getByProducer(id)
    if (!property) return response.notFound({ message: 'Nenhuma fazenda encontrada' })
    logger.info(`Foram encontradas fazendas para o produtor ${id}`)
    return response.ok(property)
  }

  /**
   * @show
   * @operationId getPropertyById
   * @summary Retorna uma fazenda
   * @paramPath id - ID da fazenda - @type(string) @required
   * @description Retorna uma fazenda específica pelo ID
   * @responseBody 200 - <Property>
   * @responseBody 404 - Produtor não encontrado
   */
  async show({ params, response }: HttpContext): Promise<void> {
    const id = await idValidator.validate(params.id)
    const property = await this._propertyService.getById(id)
    if (!property) return response.notFound({ message: 'Fazenda não encontrada' })
    logger.info(`Fazenda ${id} econtrada e retornada com sucesso`)
    return response.ok(property)
  }

  /**
   * @store
   * @operationId createProperty
   * @summary Cadastrar Fazenda
   * @description Cadastra uma nova fazenda do produtor
   * @paramPath id - ID do produtor - @type(string) @required
   * @requestBody <PropertyPayload>
   * @responseBody 201 - Fazenda cadastrada com sucesso
   * @responseBody 400 - Dados inválidos
   */
  async store({ params, request, response }: HttpContext): Promise<void> {
    const data = request.all()
    const payload = await createPropertyValidator.validate(data)
    const id = await idValidator.validate(params.id)
    const property = await this._propertyService.create(id, payload)
    logger.info(`Fazenda ${property.id} criada com sucesso`)
    return response.created(property)
  }

  /**
   * @update
   * @operationId updateProperty
   * @summary Atualizar Fazenda
   * @paramPath id - ID da fazenda - @type(string) @required
   * @description Atualiza uma fazenda existente do sistema
   * @requestBody <PropertyUpdatePayload>
   * @responseBody 200 - Fazenda atualizada com sucesso
   * @responseBody 404 - Fazenda não encontrada
   */
  async update({ params, request, response }: HttpContext): Promise<void> {
    const data = request.all()
    const payload = await updatePropertyValidator.validate(data)
    const id = await idValidator.validate(params.id)
    const property = await this._propertyService.updateById(id, payload)
    if (!property) return response.notFound({ message: 'Fazenda não encontrada' })
    logger.info(`Fazenda ${id} atualizada com sucesso`)
    return response.ok(property)
  }

  /**
   * @delete
   * @operationId deleteProperty
   * @summary Deletar fazenda
   * @paramPath id - ID da fazenda - @type(string) @required
   * @description Remove uma fazenda existente do sistema
   * @responseBody 204 - Fazenda removida com sucesso
   * @responseBody 404 - Fazenda não encontrada
   */
  async delete({ params, response }: HttpContext): Promise<void> {
    const id = await idValidator.validate(params.id)
    const property = await this._propertyService.delete(id)
    if (!property) return response.notFound({ message: 'Fazenda não encontrada' })
    logger.info(`Fazenda ${id} deletada com sucesso`)
    return response.noContent()
  }
}
