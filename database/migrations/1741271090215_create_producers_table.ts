import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'producers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .enu('document_type', ['CPF', 'CNPJ'], {
          useNative: true,
          enumName: 'producer_document_type',
          existingType: false,
        })
        .notNullable()
      table.string('document', 20).notNullable()
      table.string('name', 255).notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
