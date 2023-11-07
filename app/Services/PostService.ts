import AuthMiddleware from 'App/Middleware/Auth';
import Favorite from 'App/Models/Favorite';
import Post from 'App/Models/Post'
import FavoriteService from './FavoriteService';

export default class PostService {
    constructor() { }

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
            console.log(err)
        }

        return post;
    }

    public async isFavorite(user_id, post_id) {
        const favService = new FavoriteService()
        const fav = await favService.fetch(user_id, post_id)

        return fav != null  
    }
}
