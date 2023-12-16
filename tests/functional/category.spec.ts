import { test } from '@japa/runner'
import Category from 'App/Models/Category'

test.group('CategoryController', () => {
  test('should return a list of categories', async ({ client }) => {
    const response = await client.get('/api/v1/categories')
    response.assertStatus(200)
  })

  test('should create a new category', async ({ client, assert }) => {
    const response = await client.post('/api/v1/categories').json({
      name: 'Test Category',
      description: 'Test Description',
    })
    response.assertStatus(201)

    const category = await Category.query().where('name', 'Test Category').firstOrFail()
    assert.equal(category.description, 'Test Description')
  })

  test('should update an existing category', async ({ client, assert }) => {
    const category = new Category()
    category.name = 'Test Category'
    category.description = 'Test Description'
    await category.save()

    const response = await client.put(`/api/v1/categories/${category.id}`).json({
      name: 'Updated Category Name',
      description: 'Updated Description',
    })
    response.assertStatus(200)

    const updatedCategory = await Category.find(response.body().id)
    assert.equal(updatedCategory?.name, 'Updated Category Name')
    assert.equal(updatedCategory?.description, 'Updated Description')
  })

  test('should delete an existing category', async ({ client, assert }) => {
    const category = new Category()
    category.name = 'Test Category'
    category.description = 'Test Description'
    await category.save()

    const response = await client.delete(`/api/v1/categories/${category.id}`)
    response.assertStatus(204)

    const deletedCategory = await Category.find(category.id)
    assert.isNull(deletedCategory)
  })
})
