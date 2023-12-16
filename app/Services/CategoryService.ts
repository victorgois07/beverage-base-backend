import { inject } from '@adonisjs/core/build/standalone'
import EntityNotFoundException from 'App/Exceptions/EntityNotFoundException'
import Category from 'App/Models/Category'
import CategoryRepository from 'App/Repositories/CategoryRepository'

// Anotação para injeção de dependência
@inject(['App/Repositories/CategoryRepository'])
class CategoryService {
  public categoryRepo: CategoryRepository

  constructor(categoryRepo: CategoryRepository) {
    this.categoryRepo = categoryRepo
  }

  /**
   * Retorna todas as categorias.
   */
  public async getAllCategories() {
    return this.categoryRepo.getAll()
  }

  /**
   * Busca uma categoria pelo ID.
   */
  public async getCategoryById(id: number) {
    const category = await this.categoryRepo.getById(id)
    if (!category) {
      throw new EntityNotFoundException(`Category with id ${id} not found`)
    }
    return category
  }

  /**
   * Cria uma nova categoria.
   */
  public async createCategory(categoryData: Partial<Category>) {
    return this.categoryRepo.create(categoryData)
  }

  /**
   * Atualiza uma categoria existente.
   */
  public async updateCategory(id: number, updatedData: Partial<Category>) {
    const existingCategory = await this.categoryRepo.getById(id)

    if (!existingCategory) {
      throw new EntityNotFoundException(`Category with id ${id} not found`)
    }

    const updatedCategory = await this.categoryRepo.update(id, updatedData)

    return updatedCategory
  }

  /**
   * Deleta uma categoria pelo ID.
   */
  public async deleteCategory(id: number) {
    const category = await this.categoryRepo.getById(id)
    if (!category) {
      throw new EntityNotFoundException(`Category with id ${id} not found`)
    }
    return this.categoryRepo.delete(id)
  }
}

export default CategoryService
