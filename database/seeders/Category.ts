import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class extends BaseSeeder {
  public async run() {
    await Category.createMany([
      { name: 'Refrigerantes', description: 'Bebidas gaseificadas' },
      { name: 'Sucos Naturais', description: 'Sucos frescos e saudáveis' },
      { name: 'Cervejas', description: 'Diversas marcas de cerveja' },
      { name: 'Vinhos', description: 'Vinhos nacionais e importados' },
      { name: 'Destilados', description: 'Bebidas destiladas como vodka e gin' },
      { name: 'Chás', description: 'Chás naturais e aromatizados' },
    ])
  }
}
