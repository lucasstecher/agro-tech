import db from '@adonisjs/lucid/services/db'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await db.table('producers').multiInsert([
      {
        id: '4a6b030a-e75e-44e9-b046-7c842ef89ec2',
        document_type: 'CPF',
        document: '19216801099',
        name: 'Lucas Vieira',
      },
      {
        id: 'b796b7f0-3b38-4f98-bbdf-f7ecdcac1e07',
        document_type: 'CPF',
        document: '19216801099',
        name: 'Carlos Andrade',
      },
    ])
  }
}
