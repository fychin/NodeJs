var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	}
	},{ timestamps: true }	// createdAt: , updatedAt:
);

// the schema is useless so far
// we need to export a model using it
var Dishes = mongoose.model('Dish', dishSchema);

// make this available to Node app
module.exports = Dishes;

