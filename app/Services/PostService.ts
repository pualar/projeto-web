import AuthMiddleware from 'App/Middleware/Auth';
import Favorite from 'App/Models/Favorite';
import Post from 'App/Models/Post'
import FavoriteService from './FavoriteService';

export default class PostService {
    private _size: number = 10;
    constructor() { }

    public async paginate(init, value?): Promise<Post[] | null> {
        
        const query = value ?
        await this._querySearch(init, value) :
        await this._paginate(init)
       
        return query;
    }

    private async _paginate(init): Promise<Post[] | null> {
        const query =  await Post.query()
        .preload('author')
        .orderBy('id', 'desc')
        .paginate(init, 10)

        return query;
    }
    
    private async _querySearch(init, value): Promise<Post[] | null> {
        const query = await Post.query()
            .preload('author')
            .orWhere('preview', 'like', `%${value}%`)
            .orWhere('title', 'like', `%${value}%`)
            .orderBy('id', 'desc')
            .paginate(init, this._size)

        return query;
    }

    /* private async _paginate(init, where, values): Promise<Post[] | null> {
        const query = await Post.query()
        .preload('author')
        .orderBy('id', 'desc')
        .paginate(init, 10)

        return query;
    } */

    private async querySingle(where, value): Promise<Post | null> {
        const query = await Post.query()
            .preload('author')
            .where(where, '=', value)
            .first()

        return query;
    }

    private async queryAll(where, value): Promise<Post[] | null> {
        const query = await Post.query()
            .preload('author')
            .where(where, '=', value)
            .orderBy('id', 'desc')

        return query;
    }

    public async query(where: string, value: any, single: boolean): Promise<any> {
        let post: Post[] | Post | null = null;
        
        try {
            post = single ? await this.querySingle(where, value) : await this.queryAll(where, value)// await Post.query()      
        } catch(err) {
        }

        return post;
    }

    public async isFavorite(user_id, post_id) {
        const favService = new FavoriteService()
        const fav = await favService.fetch(user_id, post_id)

        return fav != null  
    }
}
