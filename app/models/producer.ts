import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { v4 as uuidv4 } from 'uuid'
import Property from '#models/property'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Producer extends BaseModel {
  static selfAssignPrimaryKey = true
  @column({ isPrimary: true })
  declare id: string

  @column()
  // @example(John Doe)
  declare name: string

  @column()
  // @enum(CPF, CNPJ)
  declare documentType: string

  @column()
  // @example(19289765470)
  declare document: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(producer: Producer) {
    producer.id = uuidv4()
  }

  @hasMany(() => Property)
  declare properties: HasMany<typeof Property>
}
