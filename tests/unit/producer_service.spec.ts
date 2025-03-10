import { test } from '@japa/runner'
import { ProducerService } from '#services/producer_service'
import ProducersRepository from '#repositories/producer_repository'

const mockRepository = {
  findAll: async () => [
    { id: '1', name: 'João Silva', documentType: 'CPF', document: '12345678900' },
  ],
  getById: async (id: string) =>
    id === '1' ? { id, name: 'João Silva', documentType: 'CPF', document: '12345678900' } : null,
  create: async (input: any) => ({ id: '2', ...input }),
  updateById: async (id: string, input: any) => (id === '1' ? { id, ...input } : null),
  delete: async (id: string) => (id === '1' ? { id, name: 'João Silva' } : null),
} as unknown as ProducersRepository

test.group('Planting Service', (group) => {
  let service: ProducerService

  group.setup(() => {
    service = new ProducerService(mockRepository)
  })

  test('Deve retornar uma lista de produtores', async ({ assert }) => {
    const result = await service.findAll()
    assert.isArray(result)
    assert.lengthOf(result ?? [], 1)
    assert.equal(result?.[0].name, 'João Silva')
  })

  test('Deve retornar nulo se nenhum produtor for encontrado', async ({ assert }) => {
    const emptyRepo = { findAll: async () => null } as unknown as ProducersRepository
    const serviceWithEmptyRepo = new ProducerService(emptyRepo)
    const result = await serviceWithEmptyRepo.findAll()
    assert.isNull(result)
  })

  test('Deve retornar um produtor pelo ID', async ({ assert }) => {
    const result = await service.getById('1')
    assert.isNotNull(result)
    assert.equal(result?.name, 'João Silva')
  })

  test('Deve retornar nulo se o produtor não for encontrado', async ({ assert }) => {
    const result = await service.getById('999')
    assert.isNull(result)
  })

  test('Deve criar um novo produtor', async ({ assert }) => {
    const newProducer = { name: 'Maria Oliveira', documentType: 'CPF', document: '98765432100' }
    const result = await service.create(newProducer)
    assert.isNotNull(result)
    assert.equal(result.name, 'Maria Oliveira')
  })

  test('Deve retornar um erro ao falhar na criação do produtor', async ({ assert }) => {
    const faultyRepo = {
      create: async () => {
        throw new Error('Falha na criação')
      },
    } as unknown as ProducersRepository
    const serviceWithFaultyRepo = new ProducerService(faultyRepo)
    await assert.rejects(async () => {
      await serviceWithFaultyRepo.create({
        name: 'Maria',
        documentType: 'CPF',
        document: '98765432100',
      })
    })
  })

  test('Deve atualizar um produtor existente', async ({ assert }) => {
    const updatedProducer = { name: 'Carlos Souza' }
    const result = await service.updateById('1', updatedProducer)
    assert.isNotNull(result)
    assert.equal(result?.name, 'Carlos Souza')
  })

  test('Deve retornar um erro ao falhar na atualização de um produtor', async ({ assert }) => {
    const faultyRepo = {
      updateById: async () => {
        throw new Error('Falha na atualização')
      },
    } as unknown as ProducersRepository
    const serviceWithFaultyRepo = new ProducerService(faultyRepo)
    await assert.rejects(async () => {
      await serviceWithFaultyRepo.updateById('1', { name: 'Carlos' })
    })
  })

  test('Deve deletar um produtor existente', async ({ assert }) => {
    const result = await service.delete('1')
    assert.isNotNull(result)
    assert.equal(result?.id, '1')
  })

  test('Deve retornar um erro ao falhar na remoção de um produtor', async ({ assert }) => {
    const faultyRepo = {
      delete: async () => {
        throw new Error('Falha na remoção')
      },
    } as unknown as ProducersRepository
    const serviceWithFaultyRepo = new ProducerService(faultyRepo)
    await assert.rejects(async () => {
      await serviceWithFaultyRepo.delete('1')
    })
  })
})
