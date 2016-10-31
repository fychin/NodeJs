var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes2');
// Connection URL
var url = 'mongodb://localhost:27017/dishMeu';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	console.log('Connected to server!');

	Dishes.create({
		name: 'Fried Carrot Cake',
		description: 'Classic dish, fried radish cake with eggs and sprouts',
		comments: {
			rating: 5,
			comment: 'This is unbelievably good!',
			author: 'Satisfied Customer A'
		}
	}, function(err, dish){
		if(err) throw err;

		console.log('Dish created!');
		console.log(dish);
		var id = dish._id;

		// get all the dishes (delay for awhile to show create update different time)
		setTimeout(function() {
			Dishes.findByIdAndUpdate(id, {
				$set: {
					name: 'Fried Radish Cake'
				}
			}, {
				new: true /* return updated dish*/
			}).exec(function(err, dish){
				if(err) throw err;
				console.log('Updated dish!');
				console.log(dish);

				// Add additional embedded document(s)
				dish.comments.push({
					rating: 4,
					comment: 'New updated comment',
					author: 'Customer B'
				});
				dish.comments.push({
					rating: 3,
					comment: 'Expensive but good',
					author: 'Customer C'
				})
				dish.save(function(err, dish){
					console.log('Updated Comments!');
					console.log(dish);

					db.collection('dishes').drop(function(){
						db.close();
					});
				});

			});
		}, 3000);
	});
});