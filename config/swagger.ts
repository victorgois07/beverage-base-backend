import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger'

export default {
  uiEnabled: true,
  uiUrl: 'docs',
  specEnabled: true,
  specUrl: '/swagger.json',

  middleware: [],

  options: {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Beverage Base Backend API',
        version: '1.0.0',
        description: 'API for managing beverages in the Beverage Base application.',
        contact: {
          name: 'Your Name',
          email: 'your@email.com',
        },
        license: {
          name: 'MIT License',
          url: 'https://opensource.org/licenses/MIT',
        },
      },
    },

    apis: ['app/**/*.ts', 'docs/swagger/**/*.yml', 'start/routes.ts'],
    basePath: '/',
  },
  mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
  specFilePath: 'docs/swagger.json',
} as SwaggerConfig
