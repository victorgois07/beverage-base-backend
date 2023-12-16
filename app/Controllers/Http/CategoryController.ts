/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints relacionados as categorias.
 */

import { inject } from '@adonisjs/fold'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryService from 'App/Services/CategoryService'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator'
import UpdateCategoryValidator from 'App/Validators/UpdateCategoryValidator'

@inject(['App/Services/CategoryService'])
export default class CategoriesController {
  private categoryService: CategoryService

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService
  }

  /**
   * @swagger
   * /api/v1/categories:
   *   get:
   *     summary: Retorna todas as categorias.
   *     tags: [Categories]
   *     responses:
   *       200:
   *         description: Lista de categorias.
   */
  public async index({ response }: HttpContextContract) {
    const categories = await this.categoryService.getAllCategories()
    return response.ok(categories)
  }

  /**
   * @swagger
   * /api/v1/categories/{id}:
   *   get:
   *     summary: Busca uma categoria pelo ID.
   *     tags: [Categories]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID da categoria.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Detalhes da categoria.
   *       404:
   *         description: Categoria não encontrada.
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const categoryId = params.id
      const category = await this.categoryService.getCategoryById(categoryId)

      if (!category) {
        return response.notFound({ message: 'Categoria não encontrada' })
      }

      return response.ok(category)
    } catch (error) {
      return response.internalServerError({ message: 'Ocorreu um erro ao buscar a categoria' })
    }
  }

  /**
   * @swagger
   * /api/v1/categories:
   *   post:
   *     summary: Cria uma nova categoria.
   *     tags: [Categories]
   *     requestBody:
   *       description: Dados da nova categoria.
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateCategory'
   *     responses:
   *       201:
   *         description: Categoria criada com sucesso.
   *       400:
   *         description: Dados inválidos.
   */
  public async store({ request, response }: HttpContextContract) {
    const categoryData = await request.validate(CreateCategoryValidator)
    const newCategory = await this.categoryService.createCategory(categoryData)
    return response.created(newCategory)
  }

  /**
   * @swagger
   * /api/v1/categories/{id}:
   *   put:
   *     summary: Atualiza uma categoria existente pelo ID.
   *     tags: [Categories]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID da categoria.
   *         schema:
   *           type: integer
   *     requestBody:
   *       description: Dados atualizados da categoria.
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateCategory'
   *     responses:
   *       200:
   *         description: Categoria atualizada com sucesso.
   *       400:
   *         description: Dados inválidos.
   *       404:
   *         description: Categoria não encontrada.
   */
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const categoryId = params.id
      const updatedData = await request.validate(UpdateCategoryValidator)

      const updatedCategory = await this.categoryService.updateCategory(categoryId, updatedData)

      if (!updatedCategory) {
        return response.notFound({ message: 'Categoria não encontrada' })
      }

      return response.ok(updatedCategory)
    } catch (error) {
      return response.badRequest({ message: 'Dados inválidos' })
    }
  }

  /**
   * @swagger
   * /api/v1/categories/{id}:
   *   delete:
   *     summary: Deleta uma categoria pelo ID.
   *     tags: [Categories]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID da categoria.
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Categoria deletada com sucesso.
   *       404:
   *         description: Categoria não encontrada.
   */
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const categoryId = params.id
      const deleted = await this.categoryService.deleteCategory(categoryId)

      if (!deleted) {
        return response.notFound({ message: 'Categoria não encontrada' })
      }

      return response.noContent()
    } catch (error) {
      return response.internalServerError({ message: 'Ocorreu um erro ao deletar a categoria' })
    }
  }
}
