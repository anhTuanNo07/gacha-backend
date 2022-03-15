import { schema, rules } from '@ioc:Adonis/Core/Validator'

const gachaBackend = {
  address: schema.string({}, [rules.regex(/^(0x)?[0-9a-f]{40}$/)]),
}

export const gachaValidator = schema.create(gachaBackend)
