var User = require('../models/user');
var config = require('../../config');

var secretKey = config.secretKey;

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
			if(err)
				throw err;
			res.json(data);
		});
	});

	// get all users
	api.get('/users', function(req, res){
		User.find({}, function(err, data){
			if(err)
				throw err;
			res.json(data);
		});
	});

	// get user
	api.get('/users/:id', function(req, res){
		User.findOne({_id: req.params.id}, function(err, data){
			if(err)
				throw err;
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
