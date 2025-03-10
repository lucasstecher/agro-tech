import path from 'node:path'
import url from 'node:url'

export default {
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
  snakeCase: true,
  tagIndex: 1,
  info: {
    title: 'Brain Agriculture',
    version: '1.0.0',
    description:
      'Bem vindo ao projeto do teste técnico Brain Agriculture! Feito com Adonisjs, combina um backend robusto com uma developer experience sensacional.',
  },
  tags: [
    { name: 'PRODUCERS', description: 'Gerenciamento de produtores' },
    { name: 'PROPERTIES', description: 'Gerenciamento de fazendas' },
    { name: 'PLANTINGS', description: 'Gerenciamento de plantios' },
    { name: 'DASHBOARD', description: 'Rotas de dashboard' },
  ],
  ignore: ['/openapi', '/docs'],
  preferredPutPatch: 'PUT',
  common: {
    parameters: {},
    headers: {},
  },
}
