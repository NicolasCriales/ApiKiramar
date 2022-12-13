import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import config from '../config';
import bodyParser from 'body-parser';

class Server {
	constructor() {
		this.app = express();
		this.port = config.port;
		this.paths = {
			products: '/api/products',
			world: '/api/world',
			login: '/api/login',
			Search: '/api/Search',
			supplier: '/api/supplier',
			specialized_store: '/api/specialized_store',
			auth: '/api/auth',
			createuser: '/api/createuser',
			city: '/api/city',
			order: '/api/order',
			details: '/api/datasheet',
			banners: '/api/banners',
		};

		this.middlewares();
		this.routes();


const httpsOptions = { 
		cert: fs.readFileSync('src/cert/8fbfcadbac453ff7.pem'),
		key: fs.readFileSync('.src/cert/kiramar.key'),
		ca: fs.readFileSync('src/cert/gd_bundle-g2-g1.crt')
}


this.httpsServer = https.createServer(
	httpsOptions,
	this.app
);


		/*this.httpsServer = https.createServer(
			{
				rejectUnauthorized: false,
				key: fs.readFileSync('src/cert/kiramar.com.co.pem'),
				cert: fs.readFileSync('src/cert/kiramar.com.co.pem'),
			},
			this.app
		);*/


	}

	middlewares() {
		this.app.use(
			cors({
				origin: '*',
				methods: 'GET,POST', //,HEAD,PUT,PATCH,,DELETE
				preflightContinue: false,
				optionsSuccessStatus: 204,
			})
		);
		//this.app.use(express.json({limit: '50mb'}))
		//this.app.use(express.static('public'))

		// parse application/x-www-form-urlencoded
		// this.app.use(bodyParser.urlencoded({ extended: false }))

		// parse application/json
		this.app.use(bodyParser.json());
	}

	routes() {
		this.app.use(this.paths.products, require('../routes/products.routes'));
		this.app.use(this.paths.world, require('../routes/world.routes'));
		this.app.use(this.paths.login, require('../routes/login.routes'));
		this.app.use(this.paths.Search, require('../routes/Search.routes'));
		this.app.use(this.paths.supplier, require('../routes/supplier.routes'));
		this.app.use(this.paths.specialized_store, require('../routes/specialized_store.routes'));
		this.app.use(this.paths.auth, require('../routes/auth.routes'));
		this.app.use(this.paths.createuser, require('../routes/createuser.routes'));
		this.app.use(this.paths.city, require('../routes/city.routes'));
		this.app.use(this.paths.order, require('../routes/order.routes'));
		this.app.use(this.paths.details, require('../routes/details.routes'));
		this.app.use(this.paths.banners, require('../routes/banners.routes'));
	}

	listen() {
		this.httpsServer.listen(this.port, () => {
			console.log('Server listen on port: ', this.port);
		});
	}
}

export default Server;
