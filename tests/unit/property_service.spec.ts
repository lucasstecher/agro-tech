import { test } from '@japa/runner'
import { PropertyService } from '#services/property_service'
import PropertiesRepository from '#repositories/property_repository'

const mockRepository = {
  countProperties: async () => 10,
  sumTotalArea: async () => 5000,
  sumAgriculturalArea: async () => 2500,
  sumVegetationArea: async () => 2500,
  countByState: async () => ({ SP: 5, MG: 3, PR: 2 }),
  getByProducer: async (id: string) =>
    id === '1' ? [{ id: '1', farmName: 'Fazenda Modelo' }] : null,
  getById: async (id: string) => (id === '1' ? { id, farmName: 'Fazenda Modelo' } : null),
  create: async (id: string, input: any) => ({ id: '2', ...input }),
  updateById: async (id: string, input: any) => (id === '1' ? { id, ...input } : null),
  delete: async (id: string) => (id === '1' ? { id, farmName: 'Fazenda Modelo' } : null),
} as unknown as PropertiesRepository

test.group('Planting Service', (group) => {
  let service: PropertyService

  group.setup(() => {
    service = new PropertyService(mockRepository)
  })

  test('Deve calcular estatísticas gerais das propriedades', async ({ assert }) => {
    const result = await service.getTotalStats()
    assert.deepEqual(result, { totalProperties: 10, totalHectares: 5000 })
  })

  test('Deve calcular o uso do solo corretamente', async ({ assert }) => {
    const result = await service.getLandUseStats()
    assert.deepEqual(result, { agriculturalPercentage: 50, vegetationPercentage: 50 })
  })

  test('Deve retornar 0% para uso do solo quando não há hectares registrados', async ({
    assert,
  }) => {
    const repoWithZeroArea = {
      ...mockRepository,
      sumTotalArea: async () => 0,
    } as unknown as PropertiesRepository
    const serviceWithZeroArea = new PropertyService(repoWithZeroArea)
    const result = await serviceWithZeroArea.getLandUseStats()
    assert.deepEqual(result, { agriculturalPercentage: 0, vegetationPercentage: 0 })
  })

  test('Deve retornar número de fazendas por estado', async ({ assert }) => {
    const result = await service.getPropertiesByState()
    assert.deepEqual(result, { SP: 5, MG: 3, PR: 2 })
  })

  test('Deve retornar as fazendas de um produtor', async ({ assert }) => {
    const result = await service.getByProducer('1')
    assert.isNotNull(result)
    assert.equal(result?.[0].farmName, 'Fazenda Modelo')
  })

  test('Deve retornar nulo se nenhuma fazenda do produtor for encontrada', async ({ assert }) => {
    const result = await service.getByProducer('999')
    assert.isNull(result)
  })

  test('Deve retornar uma fazenda pelo ID', async ({ assert }) => {
    const result = await service.getById('1')
    assert.isNotNull(result)
    assert.equal(result?.farmName, 'Fazenda Modelo')
  })

  test('Deve retornar nulo se a fazenda não for encontrada', async ({ assert }) => {
    const result = await service.getById('999')
    assert.isNull(result)
  })

  test('Deve criar uma nova fazenda', async ({ assert }) => {
    const newProperty = {
      farmName: 'Fazenda Nova',
      city: 'Formosa',
      state: 'GO',
      totalArea: 500,
      arableArea: 200,
      vegetationArea: 300,
    }
    const result = await service.create('1', newProperty)
    assert.isNotNull(result)
    assert.equal(result.farmName, 'Fazenda Nova')
  })

  test('Deve logar um erro ao tentar criar uma fazenda com área inválida', async ({ assert }) => {
    const invalidProperty = {
      farmName: 'Fazenda Errada',
      city: 'Formosa',
      state: 'GO',
      totalArea: 100,
      arableArea: 60,
      vegetationArea: 50,
    }
    await assert.rejects(async () => {
      await service.create('1', invalidProperty)
    })
  })

  test('Deve atualizar uma fazenda existente', async ({ assert }) => {
    const updatedProperty = { farmName: 'Fazenda Atualizada', totalArea: 400 }
    const result = await service.updateById('1', updatedProperty)
    assert.isNotNull(result)
    assert.equal(result?.farmName, 'Fazenda Atualizada')
  })

  test('Deve retornar um erro ao tentar atualizar uma fazenda com área inválida', async ({
    assert,
  }) => {
    const invalidPropertyUpdate = { totalArea: 100, arableArea: 60, vegetationArea: 50 }
    await assert.rejects(async () => {
      await service.updateById('1', invalidPropertyUpdate)
    })
  })

  test('Deve deletar uma fazenda existente', async ({ assert }) => {
    const result = await service.delete('1')
    assert.isNotNull(result)
    assert.equal(result?.id, '1')
  })

  test('Deve retornar erro ao falhar na remoção de uma fazenda', async ({ assert }) => {
    const faultyRepo = {
      delete: async () => {
        throw new Error('Falha na remoção')
      },
    } as unknown as PropertiesRepository
    const serviceWithFaultyRepo = new PropertyService(faultyRepo)
    await assert.rejects(async () => {
      await serviceWithFaultyRepo.delete('1')
    })
  })
})
