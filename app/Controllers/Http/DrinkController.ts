/**
 * @swagger
 * tags:
 *   name: Drink
 *   description: Endpoints relacionados a bebidas
 */

import { inject } from '@adonisjs/fold'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DrinkService from 'App/Services/DrinkService'
import CreateDrinkValidator from 'App/Validators/CreateDrinkValidator'

@inject(['App/Services/DrinkService'])
export default class DrinkController {
  private drinkService: DrinkService

  constructor(drinkService: DrinkService) {
    this.drinkService = drinkService
  }

  /**
   * @swagger
   * /api/v1/drinks:
   *   get:
   *     summary: Retorna todas as bebidas.
   *     tags: [Drink]
   *     responses:
   *       200:
   *         description: Lista de bebidas.
   */
  public async index({ response }: HttpContextContract) {
    const drinks = await this.drinkService.getAllDrinks()
    return response.ok(drinks)
  }

  /**
   * @swagger
   * /api/v1/drinks/{id}:
   *   get:
   *     summary: Busca uma bebida pelo ID.
   *     tags: [Drink]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID da bebida.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Detalhes da bebida.
   *       404:
   *         description: Bebida não encontrada.
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const drinkId = params.id

      const drink = await this.drinkService.getDrinkById(drinkId)

      if (!drink) {
        return response.notFound({ message: 'Bebida não encontrada' })
      }

      return response.ok(drink)
    } catch (error) {
      return response.internalServerError({ message: 'Ocorreu um erro ao buscar a bebida' })
    }
  }

  /**
   * @swagger
   * /api/v1/drinks:
   *   post:
   *     summary: Cria uma nova bebida.
   *     tags: [Drink]
   *     requestBody:
   *       description: Dados da nova bebida.
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateDrink'
   *     responses:
   *       201:
   *         description: Bebida criada com sucesso.
   *       400:
   *         description: Dados inválidos.
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const drinkData = await request.validate(CreateDrinkValidator)
      const newDrink = await this.drinkService.createDrink(drinkData)
      return response.created(newDrink)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  /**
   * @swagger
   * /api/v1/drinks/{id}:
   *   put:
   *     summary: Atualiza uma bebida existente pelo ID.
   *     tags: [Drink]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID da bebida.
   *         schema:
   *           type: integer
   *     requestBody:
   *       description: Dados atualizados da bebida.
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateDrink'
   *     responses:
   *       200:
   *         description: Bebida atualizada com sucesso.
   *       400:
   *         description: Dados inválidos.
   *       404:
   *         description: Bebida não encontrada.
   */
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const validatedData = await request.validate(CreateDrinkValidator)

      const drinkId = params.id
      const updatedDrink = await this.drinkService.updateDrink(drinkId, validatedData)
      if (!updatedDrink) {
        return response.notFound({ message: 'Bebida não encontrada' })
      }

      return response.ok(updatedDrink)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  /**
   * @swagger
   * /api/v1/drinks/{id}:
   *   delete:
   *     summary: Deleta uma bebida pelo ID.
   *     tags: [Drink]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID da bebida.
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Bebida deletada com sucesso.
   *       404:
   *         description: Bebida não encontrada.
   */
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const drinkId = params.id

      const deleted = await this.drinkService.deleteDrink(drinkId)

      if (!deleted) {
        return response.notFound({ message: 'Bebida não encontrada' }) // Retorna um status 404
      }

      return response.noContent()
    } catch (error) {
      return response.internalServerError({ message: 'Ocorreu um erro ao deletar a bebida' })
    }
  }
}
