const {Router} = require("express")

const usersRoutes = require('./users.routes')
const sessionRoutesRoutes = require('./sessions.routes')

const routes = Router()
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionRoutesRoutes)

module.exports=routes;