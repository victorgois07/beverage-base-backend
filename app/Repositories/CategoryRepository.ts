import InvalidCategoryDataException from 'App/Exceptions/InvalidCategoryDataException'
import Category from 'App/Models/Category'

class CategoryRepository {
  /**
   * Busca todas as categorias.
   */
  public async getAll() {
    return Category.all()
  }

  /**
   * Busca uma categoria pelo seu ID.
   */
  public async getById(id: number) {
    return Category.find(id)
  }

  /**
   * Cria uma nova categoria.
   */
  public async create(categoryData: Partial<Category>) {
    if (!this.isValidCategoryData(categoryData)) {
      throw new InvalidCategoryDataException('Invalid category data provided')
    }

    return Category.create(categoryData)
  }

  /**
   * Atualiza uma categoria existente.
   */
  public async update(id: number, categoryData: Partial<Category>) {
    const category = await Category.findOrFail(id)
    category.merge(categoryData)
    await category.save()
    return category
  }

  /**
   * Deleta uma categoria pelo seu ID.
   */
  public async delete(id: number) {
    const category = await Category.findOrFail(id)
    await category.delete()
    return true
  }

  private isValidCategoryData(categoryData: Partial<Category>): boolean {
    return !!(categoryData.name && categoryData.name.trim().length > 0)
  }
}

export default CategoryRepository
