import products from './products.controllers.js'
import login from './login.controllers.js'
import world from './world.controllers.js'

module.exports = {
    ...products,
    ...login,
    ...world,
}
