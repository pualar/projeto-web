import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import UserService from 'App/Services/UserService';

export default class UsersController {
    posts_user({ view }: HttpContextContract) {
        return view.render('users/posts');
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