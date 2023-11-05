import Favorite from 'App/Models/Favorite';

export default class FavoriteService {
    public async fetch(user_id, post_id): Promise<Favorite | null> {
        const fav = await Favorite.query()
            .where((query) => {
                query
                .where('user_id', user_id)
                .where('post_id', post_id)
            }).first()
        
        return fav
    }
 }