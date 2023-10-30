import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'

export default class User extends BaseModel {
  /**
   * node ace repl
   * loadModels()
   * var user = await models.User.create({email: "admin@admin.com", password: "123"})
   */
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string
  
  @column()
  public username: string

  @column()
  public name: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Post, {
    localKey: 'id'
  })
  public posts: HasMany<typeof Post>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
