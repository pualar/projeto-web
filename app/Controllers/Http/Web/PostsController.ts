import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post';

export default class PostsController {

    public async novo({ view }: HttpContextContract) {

        return view.render('posts/create');
    }

    public async show({ view }: HttpContextContract) {
        return view.render('posts/view');
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