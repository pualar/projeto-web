import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {

    public async create({ view }: HttpContextContract) {
        console.log('entra aqui niuncaaa?');
        return view.render('main/register');
    }

    public async show({ view }: HttpContextContract) {
        console.log('?????????????????');
        return view.render('main/register');
    }

    public async list({ view }: HttpContextContract) {
        return view.render('users/list');
    }

    public async update({ view }: HttpContextContract) {
        return view.render('users/update');
    }
}