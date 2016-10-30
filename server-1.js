var mongoose = require('mongoose'),
	assert = require('assert');

var Dishes = require('./models/dishes1.js');

// Connection URL
var url = 'mongodb://localhost:27017/dishMenu';	//dishMenu is the database to connect to
mongoose.connect(url);
var db = mongoose.connection;

// Check for error
db.on('error', console.error.bind(console, 'connection error:'));

// Run only once
db.once('open', function () {
	//connected!
	console.log('Connected correctly to server');

	// create a new dish
	var newDish = Dishes({
		name: 'Egg Tart',
		description: 'Delicious Hong Kong style egg tart freshly baked.'
	});

	// save dish
	newDish.save(function (err){
		if(err) throw err;
		console.log('Dish created!');

		// get all dishes
		Dishes.find({}, function(err, dishes){
			if(err) throw err;
			// print all entries
			console.log(dishes);

			// Delete db after use and close
			db.collection('dishes').drop(function(){
				db.close();
			});
		})
	});
});
