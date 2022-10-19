import products from './products.controllers.js'
import login from './login.controllers.js'
import world from './world.controllers.js'
import category from './category.cotrollers.js'
import search from './search.controllers.js'
import supplier from './supplier.controllers.js'
import specialized_store from './specialized_store.controllers.js'
import auth from './auth.controllers'
import createuser from './createuser.controllers.js'
import city from './city.controllers.js'
import order from './order.controllers.js'
import details from './details.controllers.js'
import banners from './banners.controllers.js'

module.exports = {
    ...products,
    ...login,
    ...world,
    ...category,
    ...search,
    ...supplier,
    ...specialized_store,
    ...auth,
    ...createuser,
    ...city,
    ...order,
    ...details,
    ...banners,
}
