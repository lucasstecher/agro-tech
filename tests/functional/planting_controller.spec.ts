import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Planting Controller', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('Deve listar culturas de uma fazenda', async ({ client, assert }) => {
    const response = await client.get(`/plantings/property/61d957a0-0865-4bbb-99b5-b3173cfcda72`)
    response.assertStatus(200)
    assert.isArray(response.body())
    assert.isNotEmpty(response.body())
  })

  test('Deve retornar detalhes de uma cultura pelo ID', async ({ client, assert }) => {
    const response = await client.get(`/plantings/9a22c1e2-4692-4ae7-8c88-98433b2697da`)
    response.assertStatus(200)
    assert.equal(response.body().id, '9a22c1e2-4692-4ae7-8c88-98433b2697da')
  })

  test('Deve retornar erro ao buscar uma cultura inexistente', async ({ client }) => {
    const response = await client.get(`/plantings/9a22c1e2-4692-4ae7-8c88-98433b2697db`)
    response.assertStatus(404)
    response.assertBodyContains({ message: 'Cultura não encontrada.' })
  })

  test('Deve retornar erro pelo ID não ser do tipo UUID', async ({ client }) => {
    const response = await client.get(`/plantings/9999999999999`)
    response.assertStatus(422)
  })

  test('Deve criar um novo plantio via API', async ({ client, assert }) => {
    const response = await client
      .post('/plantings/property/61d957a0-0865-4bbb-99b5-b3173cfcda72')
      .json({
        harvest: '2021',
        culture: 'Arroz',
      })
    response.assertStatus(201)
    assert.equal(response.body().culture, 'Arroz')
  })

  test('Deve buscar um plantio pelo ID via API', async ({ client, assert }) => {
    const response = await client.get('/plantings/9a22c1e2-4692-4ae7-8c88-98433b2697da')
    response.assertStatus(200)
    assert.equal(response.body().culture, 'Arroz')
  })

  test('Deve retornar erro ao criar um plantio com dados inválidos', async ({ client }) => {
    const response = await client
      .post(`/plantings/property/61d957a0-0865-4bbb-99b5-b3173cfcda72`)
      .json({})
    response.assertStatus(422)
  })

  test('Deve atualizar um plantio existente', async ({ client, assert }) => {
    const updatedPlanting = {
      culture: 'Soja',
      harvest: '2025',
    }
    const response = await client
      .put(`/plantings/9a22c1e2-4692-4ae7-8c88-98433b2697da`)
      .json(updatedPlanting)
    response.assertStatus(200)
    assert.equal(response.body().culture, 'Soja')
  })

  test('Deve retornar erro ao tentar atualizar uma cultura inexistente', async ({ client }) => {
    const response = await client
      .put(`/plantings/9a22c1e2-4692-4ae7-8c88-98433b2697db`)
      .json({ culture: 'Trigo' })
    response.assertStatus(404)
  })

  test('Deve deletar um plantio existente', async ({ client }) => {
    const response = await client.delete(`/plantings/9a22c1e2-4692-4ae7-8c88-98433b2697da`)
    response.assertStatus(204)
  })

  test('Deve retornar erro ao tentar deletar uma cultura inexistente', async ({ client }) => {
    const response = await client.delete(
      `/plantings/plantings/9a22c1e2-4692-4ae7-8c88-98433b2697db`
    )
    response.assertStatus(404)
  })

  test('Deve retornar métrica de culturas', async ({ client, assert }) => {
    const response = await client.get(`/dashboard/by-crop`)
    response.assertStatus(200)
    assert.isObject(response.body())
  })
})
