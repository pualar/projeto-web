import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post';

export default class PostsController {

    public async novo({ view }: HttpContextContract) {

        return view.render('posts/create');
    }

    public async show({ params, view }: HttpContextContract) {
        let post: any = null;
        console.log(params)

        try {
            post = await Post.query()
                .preload('author')
                .where('id', '=', params.id)
                .orderBy('id', 'desc')
                .first()

                console.log(JSON.stringify(post))
        } catch(err) {
            console.log(err)
        }
    
        if(post) {
            return view.render('posts/view', {post: post});
        } else return view.render('errors/not-found')
    }

    public async list({ view }: HttpContextContract) {
        const posts = await Post.all()

        return view.render('posts/list', {posts: posts});
    }

    public async favorites({ view }: HttpContextContract) {
        let favs: any[] = [];

        try {
            favs = await Post.query().where('favorite', true)
        } catch(err) {
            console.error(err)
        }

        return view.render('posts/list', { favs: favs });
    }

    public async update({ view }: HttpContextContract) {
        return view.render('posts/update');
    }



}