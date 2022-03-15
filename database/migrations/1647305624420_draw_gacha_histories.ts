import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DrawGachaHistories extends BaseSchema {
  protected tableName = 'draw_gacha_histories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('drawler')
      table.integer('amount')
      table.integer('item_type')
      table.timestamp('draw_time')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
