import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Post extends BaseModel {
  @column({ isPrimary: true }) 
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public content: string

  @column()
  public preview: string

  @column()
  public title: string
  
  @column()
  public favorite: boolean;

  @column()
  public read_time: number;

  @column()
  public author_id: number

  @belongsTo(() => User, {
    foreignKey: 'author_id'
  })
  public author: BelongsTo<typeof User> 
}
