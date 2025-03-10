import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Property Controller', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('Deve listar as fazendas de um produtor', async ({ client, assert }) => {
    const id = '4a6b030a-e75e-44e9-b046-7c842ef89ec2'
    const response = await client.get(`/properties/producer/${id}`)
    response.assertStatus(200)
    assert.isArray(response.body())
    assert.isNotEmpty(response.body())
  })

  test('Deve retornar detalhes de uma fazenda pelo ID', async ({ client, assert }) => {
    const id = '61d957a0-0865-4bbb-99b5-b3173cfcda72'
    const response = await client.get(`/properties/${id}`)
    response.assertStatus(200)
    assert.equal(response.body().id, id)
  })

  test('Deve retornar erro ao buscar uma fazenda inexistente', async ({ client }) => {
    const response = await client.get(`/properties/61d957a0-0865-4bbb-99b5-b3173cfcda73`)
    response.assertStatus(404)
    response.assertBodyContains({ message: 'Fazenda não encontrada' })
  })

  test('Deve criar uma nova fazenda para um produtor', async ({ client, assert }) => {
    const id = '4a6b030a-e75e-44e9-b046-7c842ef89ec2'
    const newProperty = {
      farmName: 'Fazenda Nova',
      city: 'Brasília',
      state: 'DF',
      totalArea: 500,
      arableArea: 200,
      vegetationArea: 300,
    }
    const response = await client.post(`properties/producer/${id}`).json(newProperty)
    response.assertStatus(201)
    assert.equal(response.body().farmName, 'Fazenda Nova')
  })

  test('Deve retornar erro ao criar uma fazenda com dados inválidos', async ({ client }) => {
    const id = '4a6b030a-e75e-44e9-b046-7c842ef89ec2'
    const response = await client.post(`properties/producer/${id}`).json({})
    response.assertStatus(422)
  })

  test('Deve atualizar uma fazenda existente', async ({ client, assert }) => {
    const id = '61d957a0-0865-4bbb-99b5-b3173cfcda72'
    const updatedProperty = {
      farmName: 'Fazenda Atualizada',
      city: 'Curitiba',
      state: 'PR',
    }
    const response = await client.put(`/properties/${id}`).json(updatedProperty)
    response.assertStatus(200)
    assert.equal(response.body().farmName, 'Fazenda Atualizada')
  })

  test('Deve retornar erro ao tentar atualizar uma fazenda inexistente', async ({ client }) => {
    const response = await client
      .put(`/properties/61d957a0-0865-4bbb-99b5-b3173cfcda73`)
      .json({ farmName: 'Nova Fazenda' })
    response.assertStatus(404)
    response.assertBodyContains({ message: 'Fazenda não encontrada' })
  })

  test('Deve deletar uma fazenda existente', async ({ client }) => {
    const id = '61d957a0-0865-4bbb-99b5-b3173cfcda72'
    const response = await client.delete(`/properties/${id}`)
    response.assertStatus(204)
  })

  test('Deve retornar erro ao tentar deletar uma fazenda inexistente', async ({ client }) => {
    const response = await client.delete(`/properties/61d957a0-0865-4bbb-99b5-b3173cfcda73`)
    response.assertStatus(404)
  })

  test('Deve retornar métricas de total de fazendas e hectares', async ({ client, assert }) => {
    const response = await client.get(`/dashboard/total`)
    response.assertStatus(200)
    assert.isObject(response.body())
  })

  test('Deve retornar métricas de uso do solo', async ({ client, assert }) => {
    const response = await client.get(`/dashboard/land-use`)
    response.assertStatus(200)
    assert.isObject(response.body())
  })

  test('Deve retornar métrica de fazendas por estado', async ({ client, assert }) => {
    const response = await client.get(`/dashboard/by-state`)
    response.assertStatus(200)
    assert.isObject(response.body())
  })
})
