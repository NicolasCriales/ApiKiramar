import express from 'express'
import cors from 'cors'
import https from 'https'

import config from '../config'

class Server {
    constructor() {
        this.app = express()
        this.port = config.port
        this.paths = {
            products: '/api/products',
            world: '/api/world',
            login: '/api/login',
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
    }

    routes() {
        this.app.use(this.paths.products, require('../routes/products.routes'))
        this.app.use(this.paths.world, require('../routes/world.routes'))
        this.app.use(this.paths.login, require('../routes/login.routes'))

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server listen on port: ', this.port)
        })
    }
}

export default Server
