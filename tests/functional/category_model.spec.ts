import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Category from 'App/Models/Category'

test.group('Category Model', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
  })

  group.each.teardown(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('it should create a new category', async ({ assert }) => {
    const category = new Category()
    category.name = 'Test Category'
    category.description = 'Test Description'

    await category.save()

    assert.exists(category.id)
    assert.equal(category.name, 'Test Category')
    assert.equal(category.description, 'Test Description')
  })

  test('it should not create a category without a name', async ({ assert }) => {
    const category = new Category()
    category.description = 'Test Description'

    try {
      await category.save()
    } catch (error) {
      assert.exists(error)
    }
  })

  test('it should not create a category with a duplicate name', async ({ assert }) => {
    const category = new Category()
    category.name = 'Test Category'
    category.description = 'Test Description'

    const duplicateCategory = new Category()
    duplicateCategory.name = 'Test Category'
    duplicateCategory.description = 'Duplicate Description'

    await category.save()

    try {
      await duplicateCategory.save()
    } catch (error) {
      assert.exists(error)
      assert.equal(
        error.message,
        'E_UNIQUE_CONSTRAINT_VIOLATION: Unique constraint violation on category_name'
      )
    }
  })

  test('it should update a category', async ({ assert }) => {
    const category = new Category()
    category.name = 'Test Category'
    category.description = 'Test Description'
    await category.save()

    category.name = 'Updated Category Name'
    category.description = 'Updated Description'
    await category.save()

    const updatedCategory = await Category.find(category.id)
    assert.equal(updatedCategory?.name, 'Updated Category Name')
    assert.equal(updatedCategory?.description, 'Updated Description')
  })

  test('it should delete a category', async ({ assert }) => {
    const category = new Category()
    category.name = 'Test Category'
    category.description = 'Test Description'
    await category.save()

    await category.delete()
    const deletedCategory = await Category.find(category.id)

    assert.isNull(deletedCategory)
  })
})
