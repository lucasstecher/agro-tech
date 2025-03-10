import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'properties'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('producer_id').references('id').inTable('producers').onDelete('CASCADE')
      table.string('farm_name').notNullable()
      table.string('city').notNullable()
      table.string('state').notNullable()
      table.float('total_area', 10, 2).notNullable()
      table.float('arable_area', 10, 2).notNullable()
      table.float('vegetation_area', 10, 2).notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
