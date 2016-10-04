var User = require('../models/user');
var config = require('../../config');
var jsonwebtoken = require('jsonwebtoken');
var secretKey = config.secretKey;

// create token function for a successfully logged in user
function createToken(user){
	var token = jsonwebtoken.sign({
		_id: user._id,
		name: user.name,
		username: user.username,
	}, secretKey, {
		expiresIn: '20h'
	});
	return token;
}

module.exports = function(app, express){
	var api = express.Router();

	// post signup user
	api.post('/signup', function(req, res){
		var user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		});
		user.save(function(err, data){
			if(err){
				res.send(err)
				return;
			}
			res.json({message: 'User had been created'});
		});
	});

	// post login user
	api.post('/login', function(req, res){
		User.findOne({
			username: req.body.username
		}).select('password').exec(function(err, user){
			if(err) throw err;
			if(!user){
				res.send({message: 'User doesnt exist'});
			} else if(user){
				var validPassword = user.comparePassword(req.body.password);
				if(!validPassword){
					res.send({message: 'Invalid Password'});
				} else {
					// create tokem (successfull login)
					var token = createToken(user);
					res.json({
						success: true,
						message: 'Successfully login!',
						token: token
					});
				}
			}
		});
	});

	//**** Auth Middleware ****//
	api.use(function(req, res, next){
		console.log('Auth Middleware');
		var token = req.body.token || req.params.token || req.headers['x-access-token'];
		// check if token exists
		if(token){
			jsonwebtoken.verify(token, secretKey, function(err, decoded){
				if(err){
					res.status(403).send({success: false, message: 'Authentication failed'})
				} else {
					// verify successful
					req.decoded = decoded;
					next();
				}
			});
		} else {
			res.status(403).send({success: false, message: 'No token provided'});
		}
	});

	api.get('/', function(req, res){
		res.json('Hello Worldddd');
	});

	// get all users
	api.get('/users', function(req, res){
		User.find({}, function(err, data){
			if(err){
				res.send(err)
				return;
			}
			res.json(data);
		});
	});

	// get user
	api.get('/users/:id', function(req, res){
		User.findOne({_id: req.params.id}, function(err, data){
			if(err){
				res.send(err)
				return;
			}
			res.json(data);
		});
	});

	//
	// router.delete('/customers', function(req, res){
	// 	Customer.remove({}, function(err){
	// 		res.json({result: err ? 'error': 'ok'});
	// 	});
	// });
	//
	// router.get('/customers/:id', function(req, res){
	// 	Customer.findOne({_id: req.params.id}, function(err, data){
	// 		res.json(data);
	// 	})
	// })
	//
	// router.delete('/customers/:id', function(req, res){
	// 	Customer.remove({_id: req.params.id}, function(err){
	// 		res.json({result: err ? 'error': 'ok'});
	// 	})
	// })
	//
	// router.post('/customers/:id', function(req, res){
	// 	Customer.findOne({_id: req.params.id}, function(err, data){
	// 		var customer = data;
	// 		customer.firstname = req.body.firstname;
	// 		customer.lastname = req.body.lastname;
	// 		customer.phone = req.body.phone;
	// 		if(req.body.address) {
	// 			customer.address.street = req.body.address.street;
	// 			customer.address.city = req.body.address.city;
	// 			customer.address.state = req.body.address.state;
	// 			customer.address.zip = req.body.address.zip;
	// 		}
	//
	// 		customer.save(function(err, data){
	// 			if(err)
	// 				throw err;
	// 			res.json(data);
	// 		});
	//
	// 	});
	// });

	return api;

}