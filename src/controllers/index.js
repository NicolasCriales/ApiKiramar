import products from './products.controllers.js'
import login from './login.controllers.js'
import world from './world.controllers.js'
import category from './category.cotrollers.js'
import search from './search.controllers.js'
import supplier from './supplier.controllers.js'

module.exports = {
    ...products,
    ...login,
    ...world,
    ...category,
    ...search,
    ...supplier,
}
