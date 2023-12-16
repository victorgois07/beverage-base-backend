import { test } from '@japa/runner'

test.group('DrinkController', () => {
  test('should return a list of drinks', async ({ client, assert }) => {
    const response = await client.get('/api/v1/drinks')
    response.assertStatus(200)
    assert.isArray(response.body())
    assert.isNotEmpty(response.body())
  })

  test('should return a specific drink by ID', async ({ client }) => {
    const response = await client.get('/api/v1/drinks/1')
    response.assertStatus(200)
  })

  test('should create a new drink', async ({ client }) => {
    const response = await client.post('/api/v1/drinks').json({
      name: 'Test Drink',
      description: 'Test Description',
      alcoholic: true,
    })
    response.assertStatus(201)
  })

  test('should update an existing drink', async ({ client }) => {
    const response = await client.put('/api/v1/drinks/1').json({
      name: 'Updated Drink Name',
      description: 'Updated Description',
      alcoholic: false,
    })
    response.assertStatus(200)
  })

  test('should delete an existing drink', async ({ client }) => {
    const response = await client.delete('/api/v1/drinks/1')
    response.assertStatus(204)
  })

  test('should return a specific drink by ID', async ({ client, assert }) => {
    const responseList = await client.get('/api/v1/drinks')
    const [item] = responseList.body()
    const response = await client.get(`/api/v1/drinks/${item.id}`)
    response.assertStatus(200)
    assert.anyProperties(response.body(), ['id', 'name', 'description', 'alcoholic'])
    assert.equal(response.body().id, item.id)
  })

  test('should fail to return a non-existent drink by ID', async ({ client }) => {
    const response = await client.get('/api/v1/drinks/100')
    response.assertStatus(404)
  })

  test('should fail to create a new drink with missing fields', async ({ client }) => {
    const response = await client.post('/api/v1/drinks').json({
      name: 'Test Drink',
    })
    response.assertStatus(400)
  })

  test('should fail to create a new drink with invalid data', async ({ client }) => {
    const response = await client.post('/api/v1/drinks').json({
      name: '',
      description: 'Test Description',
      alcoholic: true,
    })
    response.assertStatus(400)
  })

  test('should fail to update a non-existent drink', async ({ client }) => {
    const response = await client.put('/api/v1/drinks/100').json({
      name: 'Updated Drink Name',
      description: 'Updated Description',
      alcoholic: false,
    })
    response.assertStatus(400)
  })

  test('should fail to update an existing drink with invalid data', async ({ client }) => {
    const response = await client.put('/api/v1/drinks/1').json({
      name: '',
      description: 'Updated Description',
      alcoholic: false,
    })
    response.assertStatus(400)
  })

  test('should fail to delete a non-existent drink', async ({ client }) => {
    const response = await client.delete('/api/v1/drinks/100')
    response.assertStatus(404)
  })
})
