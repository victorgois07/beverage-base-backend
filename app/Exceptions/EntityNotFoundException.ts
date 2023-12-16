import { Exception } from '@adonisjs/core/build/standalone'

class EntityNotFoundException extends Exception {
  /**
   * Construtor para a exceção EntityNotFoundException.
   * @param message Mensagem personalizada para a exceção.
   */
  constructor(message: string) {
    // 404 é o código de status HTTP para "Not Found"
    super(message, 404)
  }
}

export default EntityNotFoundException
