import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Producer Controller', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('Deve listar todos os produtores', async ({ client, assert }) => {
    const response = await client.get('/producers')
    response.assertStatus(200)
    assert.isArray(response.body())
    assert.isNotEmpty(response.body())
  })

  test('Deve retornar detalhes de um produtor pelo ID', async ({ client, assert }) => {
    const id = 'b796b7f0-3b38-4f98-bbdf-f7ecdcac1e07'
    const response = await client.get(`/producers/${id}`)
    response.assertStatus(200)
    assert.equal(response.body().id, id)
  })

  test('Deve retornar erro ao buscar um produtor inexistente', async ({ client }) => {
    const response = await client.get(`/producers/b796b7f0-3b38-4f98-bbdf-f7ecdcac1e08`)
    response.assertStatus(404)
    response.assertBodyContains({ message: 'Produtor não encontrado.' })
  })

  test('Deve criar um novo produtor', async ({ client, assert }) => {
    const newProducer = {
      name: 'João da Silva',
      documentType: 'CPF',
      document: '95678574078',
    }
    const response = await client.post('/producers').json(newProducer)
    response.assertStatus(201)
    assert.equal(response.body().name, 'João da Silva')
  })

  test('Deve retornar erro ao criar um produtor com dados inválidos', async ({ client }) => {
    const response = await client.post('/producers').json({})
    response.assertStatus(422)
  })

  test('Deve retornar erro ao criar um produtor com CPF inválido', async ({ client }) => {
    const newProducer = {
      name: 'João da Silva',
      documentType: 'CPF',
      document: '99999999999',
    }
    const response = await client.post('/producers').json(newProducer)
    response.assertStatus(500)
  })

  test('Deve atualizar um produtor existente', async ({ client, assert }) => {
    const id = 'b796b7f0-3b38-4f98-bbdf-f7ecdcac1e07'
    const updatedProducer = {
      name: 'José da Costa',
    }
    const response = await client.put(`/producers/${id}`).json(updatedProducer)
    response.assertStatus(200)
    assert.equal(response.body().name, 'José da Costa')
  })

  test('Deve retornar erro ao tentar atualizar um produtor inexistente', async ({ client }) => {
    const response = await client
      .put(`/producers/b796b7f0-3b38-4f98-bbdf-f7ecdcac1e08`)
      .json({ name: 'Novo Nome' })
    response.assertStatus(404)
  })

  test('Deve deletar um produtor existente', async ({ client }) => {
    const id = 'b796b7f0-3b38-4f98-bbdf-f7ecdcac1e07'
    const response = await client.delete(`/producers/${id}`)
    response.assertStatus(204)
  })

  test('Deve retornar erro ao tentar deletar um produtor inexistente', async ({ client }) => {
    const response = await client.delete(`/producers/b796b7f0-3b38-4f98-bbdf-f7ecdcac1e08`)
    response.assertStatus(404)
  })
})
