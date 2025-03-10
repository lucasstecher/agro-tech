import { DateTime } from 'luxon'

export interface PropertyPayload {
  farmName: string
  city: string
  state: string
  totalArea: number
  arableArea: number
  vegetationArea: number
}

export interface PropertyUpdatePayload {
  farmName?: string
  city?: string
  state?: string
  totalArea?: number
  arableArea?: number
  vegetationArea?: number
}

export interface Property {
  id: string
  producerId: string
  farmName: string
  city: string
  state: string
  totalArea: number
  arableArea: number
  vegetationArea: number
  createdAt: DateTime
  updatedAt: DateTime
}
