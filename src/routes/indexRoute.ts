import indexController from '@Controllers/indexController'
import { Router } from 'express'

const indexRoute = Router()

indexRoute.get('/', indexController)

export default indexRoute
