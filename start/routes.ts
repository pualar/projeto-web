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

/*
 *********************************
 ********************************* API
 ********************************
*/
Route.group(() => {
  Route.post('/login', 'AuthController.login').as('api.auth.login')
  Route.get('/logout', 'AuthController.logout').as('api.auth.logout')

  Route.group(() => {
      Route.get('/:id', 'PostsController.show').where('id', /^[0-9]+$/).as('api.post.fetch')
      Route.delete('/:id', 'PostsController.destroy').where('id', /^[0-9]+$/).as('api.post.delete')
      Route.patch('/:id', 'PostsController.update').where('id', /^[0-9]+$/).as('api.post.update')
      Route.post('/', 'PostsController.store').as('api.post.create')
  }).prefix('/posts').middleware('auth')

  Route.group(() => {
      Route.patch('/password', 'UsersController.changePassword').as('api.user.change_password').middleware('auth')
      Route.get('/list', 'UsersController.list').as('api.usser.fetchAll').middleware('auth')
      //Route.get('/:id', 'UsersController.show').where('id', /^[0-9]+$/).as('api.user.fetch')
      Route.delete('/:id', 'UsersController.destroy').where('id', /^[0-9]+$/).as('api.user.delete').middleware('auth')
      Route.put('/:id/update_method=put', 'UsersController.update').as('api.user.update').middleware('auth')
      Route.post('/create', 'UsersController.store').as('api.user.create')
  }).prefix('/users')
}).prefix('/api').namespace('App/Controllers/Http/API')


/*
 *********************************
 ********************************* WEB
 ********************************
*/
Route.group(() => {
  Route.get('/error/403', 'AuthController.unauthorized').as('web.auth.unauthorized')
  Route.get('/', 'AuthController.login')
  Route.get('/login', 'AuthController.login').as('web.auth.login')
  
  Route.group(() => {
    Route.get('/dashboard', 'PostsController.list').as('dashboard')
    Route.get('/me', 'UsersController.myProfile').as('web.user.profile')
    Route.get('/me/edit', 'UsersController.myProfileEdit').as('web.user.profile.edit')
  }).middleware('auth');
  

  Route.group(() => {
    Route.get('/new', 'UsersController.create').as('web.user.register')

    Route.group(() => {
      Route.get('/:id/posts', 'UsersController.posts_user').as('web.user.posts')
      Route.get('/list', 'UsersController.list').where('id', /^[0-9]+$/).as('web.user.list')
      Route.get('/:id/edit', 'UsersController.update').where('id', /^[0-9]+$/).as('web.user.update')
      Route.get('/:id', 'UsersController.show').where('id', /^[0-9]+$/).as('web.user.show')
    }).middleware('auth')
  }).prefix('/users')

  Route.group(() => {
    Route.get('/new', 'PostsController.novo').as('web.post.create')
    Route.get('/favorites', 'PostsController.favorites').as('web.post.favorites')
    Route.get('/:id', 'PostsController.show').where('id', /^[0-9]+$/).as('web.post.show')
    Route.get('/:id/edit', 'PostsController.update').where('id', /^[0-9]+$/).as('web.post.update')
  }).prefix('/posts').middleware('auth')
}).namespace('App/Controllers/Http/Web')
