import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

/**
 * @swagger
 * components:
 *  schemas:
 *   CreateCategory:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: Nome da categoria.
 *     required:
 *       - name
 */
export default class CreateCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    description: schema.string(),
  })

  public messages: CustomMessages = {}
}
