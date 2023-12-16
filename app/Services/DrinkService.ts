import { inject } from '@adonisjs/core/build/standalone'
import Drink from 'App/Models/Drink'
import DrinkRepository from 'App/Repositories/DrinkRepository'
@inject(['App/Repositories/DrinkRepository'])
class DrinkService {
  constructor(private drinkRepo: DrinkRepository) {}

  /**
   * Retorna todas as bebidas.
   */
  public async getAllDrinks() {
    return this.drinkRepo.getAll()
  }

  /**
   * Busca uma bebida pelo ID.
   */
  public async getDrinkById(id: number) {
    const drink = await this.drinkRepo.getById(id)
    return drink
  }

  /**
   * Cria uma nova bebida.
   */
  public async createDrink(drinkData: Partial<Drink>) {
    return this.drinkRepo.create(drinkData)
  }

  /**
   * Atualiza uma bebida existente.
   */
  public async updateDrink(id: number, drinkData: Partial<Drink>) {
    await this.getDrinkById(id)
    return this.drinkRepo.update(id, drinkData)
  }

  /**
   * Deleta uma bebida pelo ID.
   */
  public async deleteDrink(id: number) {
    await this.getDrinkById(id)
    return this.drinkRepo.delete(id)
  }
}

export default DrinkService
