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


    public async update({ request, params }: HttpContextContract) {
        const user = await User.findOrFail(params.id)

        const email = request.input('email', undefined)
        const password = request.input('password', undefined)

        user.email = email ? email : user.email
        user.password = password ? password : user.password

        await user.save()

        return user
    }

    /** create, register */
    public async store({ request, response, auth }: HttpContextContract) {        
        const email = request.input('email', undefined)
        const password = request.input('password', undefined)
        
        if(!email || !password) {
            response.status(400)
            return response
        }

        const userSchema = schema.create({
            email: schema.string([
                rules.email(),
                rules.unique(
                    { table: 'users', column: 'email', caseInsensitive: true }
                )
            ]),
            password: schema.string({}, [rules.minLength(8)])
        })

        const data = await request.validate({schema: userSchema })    

        const userService = new UserService()
        const user = await userService.create(email, password)

        await auth.login(user)

        return response.redirect('/dashboard')
    }

    public async show({ params }: HttpContextContract) {
        console.log("show params >>>>>>>>> ", params)

        const user = await User.findOrFail(params.id)

        return user
    }
}
