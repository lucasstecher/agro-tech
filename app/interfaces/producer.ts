import { DateTime } from 'luxon'

export interface ProducerPayload {
  name: string
  documentType: string
  document: string
}

export interface ProducerUpdatePayload {
  name?: string
  documentType?: string
  document?: string
}

export interface Producer {
  id: string
  name: string
  documentType: string
  document: string
  createdAt: DateTime
  updatedAt: DateTime
}
