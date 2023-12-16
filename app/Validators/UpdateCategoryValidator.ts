import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, schema } from '@ioc:Adonis/Core/Validator'

/**
 * @swagger
 * components:
 *  schemas:
 *   UpdateCategory:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: Novo nome da categoria.
 *     required:
 *       - name
 */
export default class UpdateCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({ trim: true }),
    description: schema.string.optional({ trim: true }),
  })

  public messages: CustomMessages = {}
}
