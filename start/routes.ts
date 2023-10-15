/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('main/login')
})

Route.get('/dashboard', async ({ view }) => {
  return view.render('posts/list')
}).as('dashboard')


/*
 *********************************
 ********************************* API
 ********************************
*/
Route.group(() => {
  Route.post('/login', 'AuthController.login').as('api.auth.login')
  Route.get('/logout', 'AuthController.logout').as('api.auth.logout')

  Route.group(() => {
      Route.get('/', 'PostsController.list').as('api.post.fetchAll'),
      Route.get('/:id', 'PostsController.show').as('api.post.fetch'),
      Route.delete('/:id', 'PostsController.destroy').as('api.post.delete'),
      Route.patch('/:id', 'PostsController.update').as('api.post.update'),
      Route.post('/', 'PostsController.store').as('api.post.create')
  }).prefix('/posts')

  Route.group(() => {
      Route.get('/', 'UsersController.list').as('api.usser.fetchAll'), 
      Route.get('/:id', 'UsersController.show').as('api.user.fetch'), 
      Route.delete('/:id', 'UsersController.destroy').as('api.user.delete'), 
      Route.patch('/:id', 'UsersController.update').as('api.user.patch'), 
      Route.post('/', 'UsersController.store').as('api.user.create')
  }).prefix('/users')
}).prefix('/api').namespace('App/Controllers/Http/API')


/*
 *********************************
 ********************************* WEB
 ********************************
*/
Route.group(() => {
  Route.get('/login', 'AuthController.login').as('web.auth.login')

  Route.group(() => {
    Route.get('/:id/posts', 'UsersController.posts_user').as('web.user.posts')
    Route.get('/list', 'UsersController.list').as('web.user.list'), 
    Route.get('/new', 'UsersController.create').as('web.user.register'),
    Route.get('/:id/edit', 'UsersController.update').as('web.user.update'), 
    Route.get('/:id', 'UsersController.show').as('web.user.show')
  }).prefix('/users')

  Route.group(() => {
    Route.get('/favorites', 'PostsController.favorites').as('web.post.favorites'),
    Route.get('/:id', 'PostsController.show').as('web.post.show'),
    Route.get('/new', 'PostsController.create').as('web.post.create'),
    Route.get('/:id/edit', 'PostsController.update').as('web.post.update')
  }).prefix('/posts')
}).namespace('App/Controllers/Http/Web')
