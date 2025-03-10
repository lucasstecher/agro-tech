import vine from '@vinejs/vine'

export const idValidator = vine.compile(
  vine
    .string()
    .trim()
    .uuid({ version: [4] })
)
