import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

/**
 * @swagger
 * components:
 *  schemas:
 *   Category:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID da categoria.
 *       name:
 *         type: string
 *         description: Nome da categoria.
 *       description:
 *         type: string
 *         description: Descrição da categoria.
 *       createdAt:
 *         type: string
 *         format: date-time
 *         description: Data e hora de criação da categoria.
 *       updatedAt:
 *         type: string
 *         format: date-time
 *         description: Data e hora da última atualização da categoria.
 */
export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
