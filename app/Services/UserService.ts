import User from 'App/Models/User'

export default class UserService {
    constructor() { }

    public async create(email: string, password: string) {
        let user: any = null;

        try{
            user = await User.create({
                password,
                email,
            })
        } catch(err) {
            console.error('\n[error] [onCreate] [user]: ', err)
        }
        
        return user
    }
}
