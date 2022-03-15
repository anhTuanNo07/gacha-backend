import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class DrawGachaHistory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public drawler: string

  @column()
  public amount: number

  @column()
  public itemType: number

  @column()
  public drawTime: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
