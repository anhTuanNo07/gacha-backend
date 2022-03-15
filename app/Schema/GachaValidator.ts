import { schema, rules } from '@ioc:Adonis/Core/Validator'

const gachaBackend = {
  address: schema.string({}, [rules.regex(/^(0x)?[0-9a-fA-F]{40}$/)]),
}

export const gachaValidator = schema.create(gachaBackend)
