import { ProducerService } from '#services/producer_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { createProducerValidator } from '#validators/producer/create_producer_validator'
import { updateProducerValidator } from '#validators/producer/update_producer_validator'
import logger from '@adonisjs/core/services/logger'
import { idValidator } from '#validators/id_validator'

@inject()
export default class ProducersController {
  constructor(private _producerService: ProducerService) {}

  /**
   * @index
   * @operationId getProducers
   * @summary Retorna todos os produtores
   * @description Lista todos os produtores cadastrados
   * @responseBody 200 - <Producer[]>
   * @responseBody 404 - Nenhum produtor encontrado
   */
  public async index({ response }: HttpContext): Promise<void> {
    const producers = await this._producerService.findAll()
    if (!producers) return response.notFound({ message: 'Nenhum Produtor encontrado.' })
    logger.info('Produtores encontrados com sucesso')
    return response.ok(producers)
  }

  /**
   * @show
   * @operationId getProducerById
   * @summary Retorna um produtor
   * @paramPath id - ID do produtor - @type(string) @required
   * @description Retorna um produtor específico pelo ID
   * @responseBody 200 - <Producer>
   * @responseBody 404 - Produtor não encontrado
   */
  public async show({ params, response }: HttpContext): Promise<void> {
    const id = await idValidator.validate(params.id)
    const producer = await this._producerService.getById(id)
    if (!producer) return response.notFound({ message: 'Produtor não encontrado.' })
    logger.info(`Produtor ${id} encontrado e retornado com sucesso`)
    return response.ok(producer)
  }

  /**
   * @store
   * @operationId createProducer
   * @summary Cadastrar produtor
   * @description Cadastra um novo produtor no sistema
   * @requestBody <ProducerPayload>
   * @responseBody 201 - Produtor cadastrado com sucesso
   * @responseBody 400 - Dados inválidos
   */
  public async store({ request, response }: HttpContext): Promise<void> {
    const data = request.all()
    const payload = await createProducerValidator.validate(data)
    const producer = await this._producerService.create(payload)
    logger.info(`Produtor ${producer.id} criado com sucesso`)
    return response.created(producer)
  }

  /**
   * @update
   * @operationId updateProducer
   * @summary Atualizar produtor
   * @paramPath id - ID do produtor - @type(string) @required
   * @description Atualiza um produtor existente do sistema
   * @requestBody <ProducerUpdatePayload>
   * @responseBody 200 - Produtor atualizado com sucesso
   * @responseBody 404 - Produtor não encontrado
   */
  public async update({ params, request, response }: HttpContext): Promise<void> {
    const data = request.all()
    const payload = await updateProducerValidator.validate(data)
    const id = await idValidator.validate(params.id)
    const producer = await this._producerService.updateById(id, payload)
    if (!producer) return response.notFound({ message: 'Produtor não encontrado.' })
    logger.info(`Produtor ${id} atualizado com sucesso`)
    return response.ok(producer)
  }

  /**
   * @delete
   * @operationId deleteProducer
   * @summary Deletar produtor
   * @paramPath id - ID do produtor - @type(string) @required
   * @description Remove um produtor existente do sistema
   * @responseBody 204 - Produtor removido com sucesso
   * @responseBody 404 - Produtor não encontrado
   */
  public async delete({ params, response }: HttpContext): Promise<void> {
    const id = await idValidator.validate(params.id)
    const producer = await this._producerService.delete(id)
    if (!producer) return response.notFound({ message: 'Produtor não encontrado.' })
    logger.info(`Produtor ${id} deletado com sucesso`)
    return response.noContent()
  }
}
