import { DateTime } from 'luxon'

export interface PlantingPayload {
  harvest: string
  culture: string
}

export interface PlantingUpdatePayload {
  harvest?: string
  culture?: string
}

export interface Planting {
  id: string
  propertyId: string
  harvest: string
  culture: string
  createdAt: DateTime
  updatedAt: DateTime
}
