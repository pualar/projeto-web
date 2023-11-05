import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, afterFetch, afterFind, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import PostService from 'App/Services/PostService'
import { HttpContext } from '@adonisjs/http-server/build/src/HttpContext'
import FavoriteService from 'App/Services/FavoriteService'


export default class Post extends BaseModel {f
  @afterFind()
  public static async afterFindHook (post: Post) {    
    let auth: any = null

    try {
      auth = HttpContext.get()!.auth
    } catch(err) {
      console.log(err)
    }

    const postService = new PostService()    
    const fav = postService.isFavorite(auth.user.id, post.id)
    
    post.fav = fav != null
  }

  @afterFetch()
  public static async afterFetchHook (posts: Post[]) {
    const ctx = HttpContext.get()!
    const auth = ctx.auth

 // const favService = new FavoriteService();
    const postService = new PostService()

    for(let post of posts) {
      const fav = await postService.isFavorite(auth.user!.id, post.id)
     // console.log('favvvvvv', fav)
      post.fav = fav
    }
  }

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
  
  public fav: boolean;

  @column()
  public read_time: number;

  @column()
  public author_id: number

  @belongsTo(() => User, {
    foreignKey: 'author_id'
  })
  public author: BelongsTo<typeof User> 
}
