import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {  schema, rules } from '@ioc:Adonis/Core/Validator'

import User from 'App/Models/User'
import UserService from 'App/Services/UserService'
//import UserService from 'App/Services/UserService'

export default class UsersController {
    private table: string = 'users';

    public async list({ }: HttpContextContract) {
        const users = await User.all()

        return users
    }

    public async destroy({ params }: HttpContextContract) {
        const user = await User.findOrFail(params.id)
        await user.delete()

        return null
    }


    public async update({ params, request, response }: HttpContextContract) {
        const {name, username, email} = request.only(['name', 'username', 'email'])
            
        const user = await User.findOrFail(params.id)
        if(!user) {
            response.status(400)
        }

        if(name) user.name = name;
        if(email) user.email = email;
        if(username) user.username = username;

        await user.save()
        
        return response.redirect('/me')
    }

    /** create, register */
    public async store({ request, response, auth }: HttpContextContract) {
        //const name = request.input('name', undefined)
        //const email = request.input('email', undefined)
        //const password = request.input('password', undefined)
        const {name, username, email, password } =
            request.only(['name', 'username', 'email', 'password'])
        
        if(!email || !password || !name) {
            response.status(400)
            return response
        }

        const userSchema = schema.create({
            name: schema.string({}, 
                [rules.minLength(3)]
            ),
            username: schema.string({}, 
                [
                    rules.unique(
                        { table: this.table, column: 'username', caseInsensitive: true }
                    ),
                    rules.minLength(3)
                ]
            ),
            email: schema.string(
                {},
                [
                    rules.email(),
                    rules.unique(
                        { table: 'users', column: 'email', caseInsensitive: true }
                    )
                ]
            ),
            password: schema.string({}, [rules.minLength(8)])
        })

        const data = await request.validate({ schema: userSchema })    
        const user = await User.create(data);

        await auth.login(user)

        return response.redirect('/dashboard')
    }

    public async show({ params }: HttpContextContract) {
        const user = await User.findOrFail(params.id)

        return user
    }

    public async changePassword( { request, auth }: HttpContextContract) {
        const user = await User.findOrFail(auth.user?.id)

        const password = request.input('password', undefined)
        user.password = password;

        await user.save()
    }
}
