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
import UsersController from 'App/Controllers/Http/API/UsersController'

Route.get('/', async ({ view }) => {
  return view.render('login')
})

Route.get('/login', async ({ view }) => {
  return view.render('login')
})

/**
 * Rotas dos Serviços
 */
Route.group(() => {

  /** Serviços CRUD Publicaçoes */
  Route.group(() => {
      Route.get('/', 'PostsController.list') // GET posts/
      Route.get('/:id', 'PostsController.show')  // GET posts/id
      Route.delete('/:id', 'PostsController.destroy') // DELETE posts/id
      Route.patch('/:id', 'PostsController.update') // PATCH posts/id
      Route.post('/', 'PostsController.store').as('posts.store') // POST posts/
  }).prefix('/posts')

  /** Serviço CRUD Usuários */
  Route.group(() => {
      Route.get('/', 'UsersController.index') // GET users/
      Route.get('/:id', 'UsersController.show') // GET users/id
      Route.delete('/:id', 'UsersController.destroy') // DELETER users/id
      Route.patch('/:id', 'UsersController.update') // PATCH users/id
      Route.post('/', 'UsersController.store') // POST users/id
  }).prefix('/users')
}).prefix('/api').namespace('App/Controllers/Http/Api')


/**
 * Rotas das Telas
 */
Route.group(() => {
  Route.group(() => {
    Route.get('/list', 'UsersController.list').as('user.list'), // localhost:3333/user/list
    Route.get('/:id', 'UsersController.show').as('user.show'), // localhost:3333/user/id
    Route.get('/new', 'UsersController.create').as('user.register'), // localhost:3333/user/new
    Route.get('/:id/edit', 'UsersController.update').as('user.update') //localhost:3333/user/id/edit
  }).prefix('/user')

  Route.get('/dashboard', 'PostsController.list').as('posts.list'); // localhost:3333/dashboard

  Route.group(() => {
    Route.get('/:id', 'UsersController.show').as('post.show'), // localhost:3333/user/id
    Route.get('/new', 'UsersController.create').as('post.register'), // localhost:3333/user/new
    Route.get('/:id/edit', 'UsersController.update').as('post.update') //localhost:3333/user/id/edit
  }).prefix('/posts')
}).namespace('App/Controllers/Http/Web')
