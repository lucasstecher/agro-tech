import router from '@adonisjs/core/services/router'
import openapi from '#config/openapi'
import AutoSwagger from 'adonis-autoswagger'

const ProducersController = () => import('#controllers/producer_controller')
const PropertiesController = () => import('#controllers/property_controller')
const PlantingsController = () => import('#controllers/planting_controller')

//OpenAPI Routes
router.get('/openapi', async () => {
  return AutoSwagger.default.docs(router.toJSON(), openapi)
})
router.get('/docs', async () => {
  return AutoSwagger.default.scalar('/openapi')
})

// Producers Routes
router.get('/producers', [ProducersController, 'index'])
router.get('/producers/:id', [ProducersController, 'show'])
router.post('/producers', [ProducersController, 'store'])
router.put('/producers/:id', [ProducersController, 'update'])
router.delete('/producers/:id', [ProducersController, 'delete'])

// Properties Routes
router.get('/properties/producer/:id', [PropertiesController, 'indexByProducer'])
router.get('/properties/:id', [PropertiesController, 'show'])
router.post('/properties/producer/:id', [PropertiesController, 'store'])
router.put('/properties/:id', [PropertiesController, 'update'])
router.delete('/properties/:id', [PropertiesController, 'delete'])

// plantings Routes
router.get('/plantings/property/:id', [PlantingsController, 'indexByProperty'])
router.get('/plantings/:id', [PlantingsController, 'show'])
router.post('/plantings/property/:id', [PlantingsController, 'store'])
router.put('/plantings/:id', [PlantingsController, 'update'])
router.delete('/plantings/:id', [PlantingsController, 'delete'])

//Dashboard Routes
router.get('/dashboard/total', [PropertiesController, 'getTotalStats'])
router.get('/dashboard/land-use', [PropertiesController, 'getLandUseStats'])
router.get('/dashboard/by-state', [PropertiesController, 'getPropertiesByState'])
router.get('/dashboard/by-crop', [PlantingsController, 'getPropertiesByCrop'])
