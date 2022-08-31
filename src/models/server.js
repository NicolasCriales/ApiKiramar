import express from 'express'
import cors from 'cors'
import https from 'https'

import config from '../config'
import  bodyParser from 'body-parser';

class Server {
    constructor() {
        this.app = express()
        this.port = config.port
        this.paths = {
            products: '/api/products',
            world: '/api/world',
            login: '/api/login',
            category: '/api/category',
            Search: '/api/Search',
            supplier: '/api/supplier',
            specialized_store: '/api/specialized_store',
            auth: '/api/auth',
            createuser: '/api/createuser',
            city: '/api/city',
            order: '/api/order'
        }

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(
            cors({
                origin: '*',
                methods: 'GET', //,HEAD,PUT,PATCH,POST,DELETE
                preflightContinue: false,
                optionsSuccessStatus: 204,
            })
        )
        //this.app.use(express.json({limit: '50mb'}))
        //this.app.use(express.static('public'))
        
        // parse application/x-www-form-urlencoded
        // this.app.use(bodyParser.urlencoded({ extended: false }))

        // parse application/json
        this.app.use(bodyParser.json())
    }

    routes() {
        this.app.use(this.paths.products, require('../routes/products.routes'))
        this.app.use(this.paths.world, require('../routes/world.routes'))
        this.app.use(this.paths.login, require('../routes/login.routes'))
        this.app.use(this.paths.category, require('../routes/category.routes'))
        this.app.use(this.paths.Search, require('../routes/Search.routes'))
        this.app.use(this.paths.supplier, require('../routes/supplier.routes'))
        this.app.use(this.paths.specialized_store, require('../routes/specialized_store.routes'))
        this.app.use(this.paths.auth, require('../routes/auth.routes'))
        this.app.use(this.paths.createuser, require('../routes/createuser.routes'))
        this.app.use(this.paths.city, require('../routes/city.routes'))
        this.app.use(this.paths.order, require('../routes/order.routes'))



    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server listen on port: ', this.port)
        })
    }
}

export default Server
