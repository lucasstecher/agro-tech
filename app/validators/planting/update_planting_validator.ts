import vine from '@vinejs/vine'

export const updatePlantingValidator = vine.compile(
  vine.object({
    harvest: vine.string().trim().regex(/^\d{4}$/).optional(),
    culture: vine.string().trim().minLength(3).maxLength(100).optional(),
  })
)
