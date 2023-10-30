import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post';
import User from 'App/Models/User';

export default class UsersController {
    async posts_user({ view, params }: HttpContextContract) {
        const posts: any[] = await Post.query()
        .preload('author')
        .where('author_id', '=', params.id)
        .orderBy('id', 'desc')

        return view.render('users/posts', {posts: posts});
    }

    public async create({ view }: HttpContextContract) {
        return view.render('main/register');
    }

    public async show({ params, view }: HttpContextContract) {
        let user: any = {emaiL: ''};

        try{
            user = await User.findOrFail(params.id)
        } catch(err) {
            console.error('\n [error] [onShow]:', err)
        }

        return view.render('users/view', { user: user })
    }

    public async list({ view }: HttpContextContract) {
        return view.render('users/list');
    }

    public async update({ view }: HttpContextContract) {
        return view.render('users/update');
    }

    public async myProfile({ view, auth }: HttpContextContract) {
        let user: any = {emaiL: ''};

        if(auth.user) {
            user = await User.findOrFail(auth.user.id)
        }

        return view.render('users/view', { user: user })
    }

    
    public async myProfileEdit({ view, auth }: HttpContextContract) {
        let user: any = {emaiL: ''};

        if(auth.user) {
            user = await User.findOrFail(auth.user.id)
        }

        return view.render('users/update', { user: user })
    }

    /* public async store({ request, response }: HttpContextContract) {
        const email = request.input('email', undefined)
        const password = request.input('password', undefined)

        if(!email || !password) {
            response.status(400)
            return response
        }

        const userService = new UserService()
        const user = await userService.create(email, password)

        return response.redirect().toRoute('users.show', { id: user.id })
    } */
}