import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Drink from 'App/Models/Drink'

export default class extends BaseSeeder {
  public async run() {
    await Drink.createMany([
      { name: 'Coca-Cola', categoryId: 1, description: 'Refrigerante de cola' },
      { name: 'Suco de Laranja', categoryId: 2, description: 'Suco natural de laranja' },
      { name: 'Heineken', categoryId: 3, description: 'Cerveja tipo lager' },
      { name: 'Merlot', categoryId: 4, description: 'Vinho tinto suave' },
      { name: 'Smirnoff', categoryId: 5, description: 'Vodka' },
      { name: 'Chá Verde', categoryId: 6, description: 'Chá natural verde' },
    ])
  }
}
