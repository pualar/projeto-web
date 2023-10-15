import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    public async login({ request, response, auth, session }: HttpContextContract) {
        const { email, password } = request.only(['email', 'password'])

        try {
            await auth.attempt(email, password)
        } catch(err) {
            console.log(err)
            session.flash('form', err.message)
            return response.redirect().toRoute('web.auth.login')
        }

        return response.redirect().toRoute('dashboard')
    }

    public async logout({ response, auth }: HttpContextContract) {
        await auth.logout()
        
        return response.redirect().toRoute("web.auth.login")
    }
}
