import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { v4 as uuidv4 } from 'uuid'
import Planting from '#models/planting'
import Producer from '#models/producer'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Property extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare producerId: string

  @column()
  declare farmName: string

  @column()
  declare city: string

  @column()
  declare state: string

  @column()
  declare totalArea: number

  @column()
  declare arableArea: number

  @column()
  declare vegetationArea: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(property: Property) {
    property.id = uuidv4()
  }

  @belongsTo(() => Producer)
  declare producer: BelongsTo<typeof Producer>

  @hasMany(() => Planting)
  declare plantings: HasMany<typeof Planting>
}
