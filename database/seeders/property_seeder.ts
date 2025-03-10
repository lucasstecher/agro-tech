import db from '@adonisjs/lucid/services/db'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await db.table('properties').multiInsert([
      {
        id: '61d957a0-0865-4bbb-99b5-b3173cfcda72',
        producer_id: '4a6b030a-e75e-44e9-b046-7c842ef89ec2',
        city: 'Formosa',
        farm_name: 'Mini Fazenda',
        state: 'GO',
        total_area: 500,
        arable_area: 250,
        vegetation_area: 250,
      },
      {
        id: '4a6b030a-e75e-44e9-b046-7c842ef89ec2',
        producer_id: '4a6b030a-e75e-44e9-b046-7c842ef89ec2',
        city: 'Cascavel',
        farm_name: 'Colheita Feliz',
        state: 'PR',
        total_area: 600,
        arable_area: 300,
        vegetation_area: 300,
      },
      {
        id: '5410b357-5ccd-412a-834b-ced8e5ddec1a',
        producer_id: 'b796b7f0-3b38-4f98-bbdf-f7ecdcac1e07',
        city: 'Natal',
        farm_name: 'Natal Fazenda',
        state: 'RN',
        total_area: 1000,
        arable_area: 500,
        vegetation_area: 500,
      },
    ])
  }
}
