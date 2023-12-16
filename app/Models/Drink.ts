import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

/**
 * @swagger
 * components:
 *   schemas:
 *     Drink:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da bebida.
 *         name:
 *           type: string
 *           description: Nome da bebida.
 *         categoryId:
 *           type: integer
 *           description: ID da categoria da bebida.
 *         description:
 *           type: string
 *           description: Descrição da bebida.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data e hora de criação da bebida.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data e hora da última atualização da bebida.
 */
export default class Drink extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public categoryId: number

  @column()
  public alcoholic: boolean

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
