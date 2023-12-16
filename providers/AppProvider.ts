import { IocContract } from '@adonisjs/fold'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(
    protected app: ApplicationContract,
    protected $container: IocContract
  ) {}

  public register() {}

  public async boot() {}

  public async ready() {}

  public async shutdown() {}
}
