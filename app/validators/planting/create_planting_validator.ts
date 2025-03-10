import vine from '@vinejs/vine'

export const createPlantingValidator = vine.compile(
  vine.object({
    harvest: vine
      .string()
      .trim()
      .regex(/^\d{4}$/),
    culture: vine.string().trim().minLength(3).maxLength(100),
  })
)
