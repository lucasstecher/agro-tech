import PlantingRepository from '#repositories/planting_repository'
import { test } from '@japa/runner'
import { PlantingService } from '#services/planting_service'

const mockRepository = {
  countByCrop: async () => ({ Soja: 10, Milho: 5 }),
  getByProperty: async (id: string) => (id === '1' ? [{ id: '1', culture: 'Soja' }] : null),
  getById: async (id: string) => (id === '1' ? { id, culture: 'Soja' } : null),
  create: async (id: string, input: any) => ({ id: '2', ...input }),
  updateById: async (id: string, input: any) => (id === '1' ? { id, ...input } : null),
  delete: async (id: string) => (id === '1' ? { id, culture: 'Soja' } : null),
} as unknown as PlantingRepository

test.group('Planting Service', (group) => {
  let service: PlantingService

  group.setup(() => {
    service = new PlantingService(mockRepository)
  })

  test('Deve retornar número de fazendas por cultura plantada', async ({ assert }) => {
    const result = await service.getPropertiesByCrop()
    assert.deepEqual(result, { Soja: 10, Milho: 5 })
  })

  test('Deve retornar os plantios de uma fazenda', async ({ assert }) => {
    const result = await service.getByProperty('1')
    assert.isNotNull(result)
    assert.equal(result?.[0].culture, 'Soja')
  })

  test('Deve retornar nulo se nenhum plantio for encontrado para a fazenda', async ({ assert }) => {
    const result = await service.getByProperty('999')
    assert.isNull(result)
  })

  test('Deve retornar um plantio pelo ID', async ({ assert }) => {
    const result = await service.getById('1')
    assert.isNotNull(result)
    assert.equal(result?.culture, 'Soja')
  })

  test('Deve retornar nulo se o plantio não for encontrado', async ({ assert }) => {
    const result = await service.getById('999')
    assert.isNull(result)
  })

  test('Deve criar um novo plantio', async ({ assert }) => {
    const newPlanting = { culture: 'Milho', harvest: '2024' }
    const result = await service.create('1', newPlanting)
    assert.isNotNull(result)
    assert.equal(result.culture, 'Milho')
  })

  test('Deve logar um erro ao tentar criar um plantio e falhar', async ({ assert }) => {
    const faultyRepo = {
      create: async () => {
        throw new Error('Falha na criação')
      },
    } as unknown as PlantingRepository
    const serviceWithFaultyRepo = new PlantingService(faultyRepo)
    await assert.rejects(async () => {
      await serviceWithFaultyRepo.create('1', { culture: 'Soja', harvest: '2020' })
    })
  })

  test('Deve atualizar um plantio existente', async ({ assert }) => {
    const updatedPlanting = { culture: 'Trigo', harvest: '2025' }
    const result = await service.updateById('1', updatedPlanting)
    assert.isNotNull(result)
    assert.equal(result?.culture, 'Trigo')
  })

  test('Deve logar um erro ao tentar atualizar um plantio e falhar', async ({ assert }) => {
    const faultyRepo = {
      updateById: async () => {
        throw new Error('Falha na atualização')
      },
    } as unknown as PlantingRepository
    const serviceWithFaultyRepo = new PlantingService(faultyRepo)
    await assert.rejects(async () => {
      await serviceWithFaultyRepo.updateById('1', { culture: 'Milho' })
    })
  })

  test('Deve deletar um plantio existente', async ({ assert }) => {
    const result = await service.delete('1')
    assert.isNotNull(result)
    assert.equal(result?.id, '1')
  })

  test('Deve retornar nulo ao falhar na remoção de um plantio', async ({ assert }) => {
    const faultyRepo = {
      delete: async () => {
        throw new Error('Falha na remoção')
      },
    } as unknown as PlantingRepository
    const serviceWithFaultyRepo = new PlantingService(faultyRepo)
    await assert.rejects(async () => {
      await serviceWithFaultyRepo.delete('1')
    })
  })
})
