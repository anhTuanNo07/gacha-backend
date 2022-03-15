import { schema, rules } from '@ioc:Adonis/Core/Validator'

const gachaBackend = {
  address: schema.string({}, [rules.regex(/^(0x)?[0-9a-fA-F]{40}$/)]),
}

const paginate = {
  page: schema.number.nullableAndOptional(),
  limit: schema.number.nullableAndOptional(),
}

export const gachaValidator = schema.create(gachaBackend)

export const paginateValidator = schema.create(paginate)
