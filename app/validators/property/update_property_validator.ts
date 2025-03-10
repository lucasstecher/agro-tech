import vine from '@vinejs/vine'

export const updatePropertyValidator = vine.compile(
  vine.object({
    farmName: vine.string().trim().minLength(3).maxLength(255).optional(),
    city: vine.string().trim().minLength(2).maxLength(100).optional(),
    state: vine.string().trim().maxLength(2).optional(),
    totalArea: vine.number().min(0.1).optional(),
    arableArea: vine.number().min(0).optional(),
    vegetationArea: vine.number().min(0).optional(),
  })
)
