import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {  schema, rules } from '@ioc:Adonis/Core/Validator'


import User from 'App/Models/User'
import UserService from 'App/Services/UserService'
//import UserService from 'App/Services/UserService'

export default class UsersController {
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
        const name = request.input('name', undefined)
        const email = request.input('email', undefined)
        
        const user = await User.findOrFail(params.id)
        if(!user) {
            response.status(400)
        }

        if(name) user.name = name;
        if(email) user.email = email;

        await user.save()
        
        return response.redirect('/me')
    }

    /** create, register */
    public async store({ request, response, auth }: HttpContextContract) {
        const name = request.input('name', undefined)
        const email = request.input('email', undefined)
        const password = request.input('password', undefined)
        
        if(!email || !password || !name) {
            response.status(400)
            return response
        }

        const userSchema = schema.create({
            name: schema.string(
                {}, [rules.minLength(3)]
            ),
            email: schema.string([
                rules.email(),
                rules.unique(
                    { table: 'users', column: 'email', caseInsensitive: true }
                )
            ]),
            password: schema.string({}, [rules.minLength(8)])
        })

        const data = await request.validate({schema: userSchema })    
        const user = await User.create(data);//.create(email, password)

        await auth.login(user)

        return response.redirect('/dashboard')
    }

    public async show({ params }: HttpContextContract) {
        console.log("show params >>>>>>>>> ", params)

        const user = await User.findOrFail(params.id)

        return user
    }

    public async changePassword( { request, auth }: HttpContextContract) {
        console.log("passowrd params >>>>>>>>> ", auth.user)

        const user = await User.findOrFail(auth.user?.id)

        console.log(user)

        const password = request.input('password', undefined)
        user.password = password;

        await user.save()
    }
}
