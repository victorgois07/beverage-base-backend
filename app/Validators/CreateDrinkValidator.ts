import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateDrink:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Novo nome da bebida.
 *         description:
 *           type: string
 *           description: Nova descrição da bebida.
 *         alcoholic:
 *           type: boolean
 *           description: Indica se a bebida é alcoólica.
 *       required:
 *         - name
 *         - description
 *         - alcoholic
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateDrink:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome da bebida.
 *         description:
 *           type: string
 *           description: Descrição da bebida.
 *         alcoholic:
 *           type: boolean
 *           description: Indica se a bebida é alcoólica.
 *       required:
 *         - name
 *         - description
 *         - alcoholic
 */
export default class CreateDrinkValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.required()]),
    description: schema.string({ trim: true }, [rules.required()]),
    alcoholic: schema.boolean([rules.required()]),
  })

  public messages: CustomMessages = {}
}
