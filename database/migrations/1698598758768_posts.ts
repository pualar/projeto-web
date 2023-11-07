import BaseSchema from '@ioc:Adonis/Lucid/Schema'


export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('title', 255).notNullable()
      table.string('content').notNullable()
      table.string('preview', 255).notNullable()
      table.integer('author_id').notNullable().references('users.id')
      table.integer('read_time').notNullable()
    })
  }


  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
