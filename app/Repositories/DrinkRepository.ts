import Drink from 'App/Models/Drink'

class DrinkRepository {
  /**
   * Busca todas as bebidas.
   */
  public async getAll() {
    return Drink.all()
  }

  /**
   * Busca uma bebida pelo seu ID.
   */
  public async getById(id: number) {
    return Drink.find(id)
  }

  /**
   * Cria uma nova bebida.
   */
  public async create(drinkData: Partial<Drink>) {
    return Drink.create(drinkData)
  }

  /**
   * Atualiza uma bebida existente.
   */
  public async update(id: number, drinkData: Partial<Drink>) {
    const drink = await Drink.findOrFail(id)
    await drink.merge(drinkData).save()
    return drink
  }

  /**
   * Deleta uma bebida pelo seu ID.
   */
  public async delete(id: number) {
    try {
      const drink = await Drink.findOrFail(id)
      await drink.delete()
      return true
    } catch (err) {
      return false
    }
  }
}

export default DrinkRepository
