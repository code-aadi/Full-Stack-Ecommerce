import express from 'express'
import checkOut from '../Controller/checkoutController.js'
import authMiddleware from '../Middleware/auth.middleware.js'
import addressValidation from '../Middleware/adressValidation.middleware.js'

const checkoutRouter = express.Router()

checkoutRouter.post('/', authMiddleware, addressValidation , checkOut)

export default checkoutRouter

