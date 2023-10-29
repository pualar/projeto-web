import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
    public async list({}: HttpContextContract) {
        const posts = await Post.all()
        return posts;
    }

    public async destroy({ params }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        await post.delete()

        return null;
    }

    public async update({ request, params }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)

        const title = request.input('title', undefined)
        const content = request.input('content', undefined)

        post.title = title ? title : post.title
        post.content = content ? content : post.content

        await post.save()

        return post
    }

    private calculate_time(content: string) {
        const wpm = 225;
        const words = content.trim().split(/\s+/).length;
        return Math.ceil(words / wpm);
    }

    public async store({ auth, request, response }: HttpContextContract) {
        const { title, preview, content } = request.only([
            'title',
            'preview',
            'content'
        ])
        
        let read_time = 0;
        const author_id = auth.user ? auth.user.id : undefined;

        if(!title || !content || !author_id) {
            console.error("DADOS INVALIDOS!!! >> title", title)
            console.error("DADOS INVALIDOS!!! >> content", content)
            console.error("DADOS INVALIDOS!!! >> author_id", author_id)
          
            response.status(400)
            return response
        }

        read_time = this.calculate_time(content);
        const post = await Post.create({
            title,
            preview,
            content,
            author_id,
            read_time
        })

        if(post) {
            return response
                .redirect()
                .toRoute(
                    'web.user.posts',
                    { id: auth.user!.id }
                )
        } else return response
    }

    public async show({ params }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)

        return post
    }

}