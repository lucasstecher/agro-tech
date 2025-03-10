import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import logger from '@adonisjs/core/services/logger'
import { PlantingService } from '#services/planting_service'
import { createPlantingValidator } from '#validators/planting/create_planting_validator'
import { updatePlantingValidator } from '#validators/planting/update_planting_validator'
import { idValidator } from '#validators/id_validator'

@inject()
export default class PlantingsController {
  constructor(private _plantingService: PlantingService) {}

  /**
   * @getPropertiesByCrop
   * @operationId getPropertiesByCrop
   * @summary Métricas culturas
   * @description Retorna quantidade total de cada cultura
   * @responseBody 200 - { "Soja": 10, "Milho": 5 }
   */
  async getPropertiesByCrop({ response }: HttpContext): Promise<void> {
    const stats = await this._plantingService.getPropertiesByCrop()
    logger.info('Foram encontradas métricas de culturas plantadas')
    return response.ok(stats)
  }

  /**
   * @indexByProperty
   * @operationId getPlantingsByProperty
   * @summary Retorna cultura(s) da fazenda
   * @paramPath id - ID da fazenda - @type(string) @required
   * @description Lista todos as culturas cadastrados
   * @responseBody 200 - <Planting[]>
   * @responseBody 404 - Nenhuma cultura encontrada
   */
  async indexByProperty({ params, response }: HttpContext): Promise<void> {
    const id = await idValidator.validate(params.id)
    const planting = await this._plantingService.getByProperty(id)
    if (!planting) return response.notFound({ message: 'Cultura não encontrada.' })
    logger.info(`Foram encontrados plantios para a fazenda ${id}`)
    return response.ok(planting)
  }

  /**
   * @show
   * @operationId getPlantingById
   * @summary Retorna cultura por ID
   * @paramPath id - ID da cultura - @type(string) @required
   * @description Retorna os detalhes uma cultura específica pelo ID
   * @responseBody 200 - <Planting>
   * @responseBody 404 - Cultura não encontrada
   */
  async show({ params, response }: HttpContext): Promise<void> {
    const id = await idValidator.validate(params.id)
    const planting = await this._plantingService.getById(id)
    if (!planting) return response.notFound({ message: 'Cultura não encontrada.' })
    logger.info(`Plantio ${id} encontrado e retornado com sucesso`)
    return response.ok(planting)
  }

  /**
   * @store
   * @operationId createPlanting
   * @summary Cadastrar cultura
   * @description Registra uma cultura em uma fazenda específica
   * @paramPath id - ID da fazenda - @type(string) @required
   * @requestBody <PlantingPayload>
   * @responseBody 201 - Cultura cadastrada com sucesso
   * @responseBody 400 - Dados inválidos
   */
  async store({ params, request, response }: HttpContext): Promise<void> {
    const data = request.all()
    const payload = await createPlantingValidator.validate(data)
    const id = await idValidator.validate(params.id)
    const planting = await this._plantingService.create(id, payload)
    logger.info(`Plantio ${planting.id} criado com sucesso na fazenda ${id}`)
    return response.created(planting)
  }

  /**
   * @update
   * @operationId updatePlanting
   * @summary Atualizar cultura
   * @paramPath id - ID da cultura - @type(string) @required
   * @description Atualiza uma cultura existente do sistema
   * @requestBody <PlantingUpdatePayload>
   * @responseBody 200 - Cultura atualizada com sucesso
   * @responseBody 404 - Cultura não encontrada
   */
  async update({ params, request, response }: HttpContext): Promise<void> {
    const data = request.all()
    const payload = await updatePlantingValidator.validate(data)
    const id = await idValidator.validate(params.id)
    const planting = await this._plantingService.updateById(id, payload)
    if (!planting) return response.notFound({ message: 'Cultura não encontrada.' })
    logger.info(`Plantio ${planting.id} atualizado com sucesso`)
    return response.ok(planting)
  }

  /**
   * @delete
   * @operationId deletePlanting
   * @summary Deletar cultura
   * @paramPath id - ID da cultura - @type(string) @required
   * @description Remove uma cultura existente do sistema
   * @responseBody 204 - Cultura removida com sucesso
   * @responseBody 404 - Cultura não encontrada
   */
  async delete({ params, response }: HttpContext): Promise<void> {
    const id = await idValidator.validate(params.id)
    const planting = await this._plantingService.delete(id)
    if (!planting) return response.notFound({ message: 'Cultura não encontrada.' })
    logger.info(`Plantio ${id} deletado com sucesso`)
    return response.noContent()
  }
}
