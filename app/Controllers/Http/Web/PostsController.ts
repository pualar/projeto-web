import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Favorite from 'App/Models/Favorite';
import Post from 'App/Models/Post';
import User from 'App/Models/User';
import PostService from 'App/Services/PostService';

export default class PostsController {
    public async novo({ view }: HttpContextContract) {
        return view.render('posts/create');
    }

    public async show({ params, view }: HttpContextContract) {
        const postService = new PostService();

        const post = await postService.query('id', params.id, true)
    
        if(post) {
            return view.render('posts/view', {post: post});
        } 
        
        return view.render('errors/not-found')
    }

    public async list({ view }: HttpContextContract) {
        const posts = await Post.query()
            .preload('author')

        return view.render('posts/list', {posts: posts});
    }

    public async favorites({ view, auth }: HttpContextContract) {
        let user: User | null = null;

        try {
            user = await User
                .query()
                .where("id", "=", auth.user!.id)
                .preload('favorites', (favsQuery) => {
                    favsQuery.preload('author')
                })
                .first()
        } catch(err) {
            console.error(err)
        }

        return view.render('posts/list', { posts: user!.favorites });
    }

    public async update({ params, view }: HttpContextContract) {
        const postService = new PostService();

        const post = await postService.query('id', params.id, true)
    
        if(post) {
            return view.render('posts/create', {post: post});
        } 
        
        return view.render('errors/not-found')
    }
}