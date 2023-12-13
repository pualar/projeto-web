import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Favorite from 'App/Models/Favorite';
import Post from 'App/Models/Post'
import FavoriteService from 'App/Services/FavoriteService';
import PostService from 'App/Services/PostService';

export default class PostsController {
    private limit = 10;
    private postService = new PostService()

    public async list({ view }: HttpContextContract) {
       /*  const posts = await Post.all()

        return posts; */
        const page = await this.postService.paginate(1);//Post.query().paginate(1, this.limit)
        return view.render('posts/list', { page })
    }

    public async destroy({ params, response }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        await post.delete()

        return response.redirect().toRoute('dashboard');
    }

    public async update({ request, params, response }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        if(!post) response.status(400)
    
        const {title, preview, content} = request.only(['title', 'preview', 'content'])
        if(title) post.title = title;
        if(preview) post.preview = preview;
        if(content) post.content = content;

        await post.save()

        return response.redirect().toRoute('web.post.show', {id: params.id})
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
        const post = await Post.query()
            .where('id', '=', params.id)
            .preload('author')

        return post
    }

    public async addFavorite({ request, auth, response }: HttpContextContract) {
        if(!auth.user) {
            response.status(403)
            return response
        }

        const post_id = request.input('post_id', undefined)

        if(!post_id) {
            response.status(400)
            return request;
        }

        const user_id = auth.user!.id

        const favService = new FavoriteService();
        const fav = await favService.fetch(user_id, post_id)
        
        if(fav) {
            await fav.delete()
        } else {   
            await Favorite.create({
                user_id,
                post_id
            })      
        }
 
        return response.redirect().toRoute('dashboard')
    }

    public async postsSearch({ request, view }: HttpContextContract) {        
        const query = request.requestData.query;
    
        const page = await this.postService.querySearch(
            1,
            query)

        return view.render('posts/list', { page, search: query } )
    }

    /**
   * Displays home page for posts
   * This is our initial list of 10 posts
   * @param param0 
   * @returns 
   */
  public async index ({ view }: HttpContextContract) {
    const page = await this.postService.paginate(1);//Post.query().paginate(1, this.limit)
    return view.render('posts/list', { page })
  }

  /**
   * Renders and returns html and page info for a specific page worth of posts
   * This is what we use to incrementally continue our initial list
   * @param param0 
   * @returns 
   */
  public async paginate({ response, params, view, request }: HttpContextContract) {
    const _query = request.requestData.query;
    let page: any = null;

    if(_query) {
        page = await this.postService.querySearch(
            params.page,
            _query)
    } else page = await this.postService.paginate(params.page)// Post.query().preload('author').paginate(params.page, this.limit)
    const _html = await view.render('partials/post', { posts: page })
    return response.json({ _html, page })
  }
}