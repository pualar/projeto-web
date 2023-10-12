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

Route.get('/login', async ({ view }) => {
  return view.render('main/login')
})

Route.get('/dashboard', async ({ view }) => {
  return view.render('posts/list')
})
/**
 * Rotas dos Serviços
 */
Route.group(() => {
  /** Serviços CRUD Publicaçoes */
  Route.group(() => {
      Route.get('/', 'PostsController.list'),
      Route.get('/:id', 'PostsController.show'),
      Route.delete('/:id', 'PostsController.destroy'),
      Route.patch('/:id', 'PostsController.update'),
      Route.post('/', 'PostsController.store')
  }).prefix('/posts')

  /** Serviço CRUD Usuários */
  Route.group(() => {
      Route.get('/', 'UsersController.list'), 
      Route.get('/:id', 'UsersController.show'), 
      Route.delete('/:id', 'UsersController.destroy'), 
      Route.patch('/:id', 'UsersController.update'), 
      Route.post('/', 'UsersController.store')
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
