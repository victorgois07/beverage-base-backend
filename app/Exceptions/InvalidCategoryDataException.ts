import { Exception } from '@adonisjs/core/build/standalone'

class InvalidCategoryDataException extends Exception {
  constructor(message: string) {
    super(message, 400) // 400 é o código de status HTTP para "Bad Request"
  }
}

export default InvalidCategoryDataException
