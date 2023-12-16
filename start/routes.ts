import Route from '@ioc:Adonis/Core/Route'

// Rotas para a model Drink
Route.group(() => {
  Route.get('/drinks', 'DrinkController.index')
  Route.get('/drinks/:id', 'DrinkController.show')
  Route.post('/drinks', 'DrinkController.store')
  Route.put('/drinks/:id', 'DrinkController.update')
  Route.delete('/drinks/:id', 'DrinkController.destroy')
}).prefix('api/v1')

// Rotas para a model Category
Route.group(() => {
  Route.get('/categories', 'CategoryController.index')
  Route.get('/categories/:id', 'CategoryController.show')
  Route.post('/categories', 'CategoryController.store')
  Route.put('/categories/:id', 'CategoryController.update')
  Route.delete('/categories/:id', 'CategoryController.destroy')
}).prefix('api/v1')

export default Route
