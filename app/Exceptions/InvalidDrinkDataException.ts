import { Exception } from '@adonisjs/core/build/standalone'

class InvalidDrinkDataException extends Exception {
  public async handle(error, { response }) {
    response.status(error.status).send({
      message: this.message,
    })
  }
}

export default InvalidDrinkDataException
