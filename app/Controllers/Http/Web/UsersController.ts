import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {

    public async create({ view }: HttpContextContract) {
        return view.render('main/register');
    }

    public async show({ view }: HttpContextContract) {
        return view.render('users/view');
    }

    public async list({ view }: HttpContextContract) {
        return view.render('users/list');
    }

    public async update({ view }: HttpContextContract) {
        return view.render('users/update');
    }
}