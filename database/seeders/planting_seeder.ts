import db from '@adonisjs/lucid/services/db'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await db.table('plantings').multiInsert([
      {
        id: '38f53e85-e966-407e-87fb-4f728b30369d',
        property_id: '61d957a0-0865-4bbb-99b5-b3173cfcda72',
        harvest: '2020',
        culture: 'Arroz',
      },
      {
        id: 'cc999c89-7d6b-4cc0-9cdb-eebfe4f171e5',
        property_id: '61d957a0-0865-4bbb-99b5-b3173cfcda72',
        harvest: '2021',
        culture: 'Milho',
      },
      {
        id: '61916569-bb84-4af8-88bb-3d49fabbaa49',
        property_id: '61d957a0-0865-4bbb-99b5-b3173cfcda72',
        harvest: '2022',
        culture: 'Soja',
      },
      {
        id: '0979db88-cbca-49dc-a9c6-7ba2744bed5d',
        property_id: '4a6b030a-e75e-44e9-b046-7c842ef89ec2',
        harvest: '2023',
        culture: 'Feijão',
      },
      {
        id: '1b25d160-a392-4c69-8a77-f1b9b0f4892f',
        property_id: '4a6b030a-e75e-44e9-b046-7c842ef89ec2',
        harvest: '2024',
        culture: 'Soja',
      },
      {
        id: '9a22c1e2-4692-4ae7-8c88-98433b2697da',
        property_id: '4a6b030a-e75e-44e9-b046-7c842ef89ec2',
        harvest: '2025',
        culture: 'Arroz',
      },
    ])
  }
}
