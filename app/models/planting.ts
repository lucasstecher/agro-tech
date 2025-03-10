import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { v4 as uuidv4 } from 'uuid'
import Property from '#models/property'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Planting extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare propertyId: string

  @column()
  declare harvest: string

  @column()
  declare culture: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(planting: Planting) {
    planting.id = uuidv4()
  }

  @belongsTo(() => Property)
  declare property: BelongsTo<typeof Property>
}
