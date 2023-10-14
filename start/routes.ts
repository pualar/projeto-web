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
/* 
Route.get('/login', async ({ view }) => {
  return view.render('main/login')
}) */


Route.get('/dashboard', async ({ view }) => {
  return view.render('posts/list')
})

Route.group(() => {
  Route.post('/login', 'AuthController.login').as('api.auth.login')
}).namespace('App/Controllers/Http/API')

Route.group(() => {
  Route.get('/login', 'AuthController.login').as('web.auth.login')
}).namespace('App/Controllers/Http/Web')

/**
 * Rotas dos Serviços
 */
Route.group(() => {
  /** Serviços CRUD Publicaçoes */
  Route.group(() => {
      Route.get('/', 'PostsController.list').as('api.post.fetchAll'),
      Route.get('/:id', 'PostsController.show').as('api.post.fetch'),
      Route.delete('/:id', 'PostsController.destroy').as('api.post.delete'),
      Route.patch('/:id', 'PostsController.update').as('api.post.update'),
      Route.post('/', 'PostsController.store').as('api.post.create')
  }).prefix('/posts')

  /** Serviço CRUD Usuários */
  Route.group(() => {
      Route.get('/', 'UsersController.list').as("api.usser.fetchAll"), 
      Route.get('/:id', 'UsersController.show').as('api.user.fetch'), 
      Route.delete('/:id', 'UsersController.destroy').as('api.user.delete'), 
      Route.patch('/:id', 'UsersController.update').as('api.user.patch'), 
      Route.post('/', 'UsersController.store').as('api.user.create')
  }).prefix('/users')
}).prefix('/api').namespace('App/Controllers/Http/API')


/**
 * Rotas das Telas
 */
Route.group(() => {
  Route.group(() => {
    Route.post('/', 'UsersController.store'),
    Route.get('/list', 'UsersController.list').as('users.list'), 
    Route.get('/new', 'UsersController.create').as('users.register'),
    Route.get('/:id/edit', 'UsersController.update').as('users.update'), 
    Route.get('/:id', 'UsersController.show').as('users.show')
  }).prefix('/users')

  Route.group(() => {
    Route.get('/:id', 'PostsController.show').as('posts.show'),
    Route.get('/new', 'PostsController.create').as('posts.register'),
    Route.get('/:id/edit', 'PostsController.update').as('posts.update')
  }).prefix('/posts')


}).namespace('App/Controllers/Http/Web')
