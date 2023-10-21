import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    public async register({ view }: HttpContextContract) {
        return view.render('main/register')
    }

    public async login({ view, auth, response }: HttpContextContract) {
        if(await auth.check()) {
            return response.redirect('dashboard')
        }
        
        return view.render('main/login')
    }
}
