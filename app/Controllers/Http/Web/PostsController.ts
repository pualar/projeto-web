import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {

    public async create({ view }: HttpContextContract) {
        return view.render('posts/create');
    }

    public async show({ view }: HttpContextContract) {
        return view.render('posts/view');
    }

    public async list({ view }: HttpContextContract) {
        return view.render('posts/list');
    }

    public async update({ view }: HttpContextContract) {
        return view.render('posts/update');
    }



}