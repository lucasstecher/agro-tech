import vine from '@vinejs/vine'

export const createPropertyValidator = vine.compile(
  vine.object({
    farmName: vine.string().trim().minLength(3).maxLength(255),
    city: vine.string().trim().minLength(2).maxLength(100),
    state: vine.string().trim().maxLength(2),
    totalArea: vine.number().min(0.1),
    arableArea: vine.number().min(0),
    vegetationArea: vine.number().min(0),
  })
)
